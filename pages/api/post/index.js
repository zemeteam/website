import striptags from 'striptags'
import formidable from 'formidable'
import { bech32 } from 'bech32'
import { Supabase } from '../../../lib/supabase'
import { Cloudinary } from '../../../lib/cloudinary'

const TYPE_IMAGE_POST = 1
const STATUS_PUBLIC = 1
const STATUS_IN_REVIEW = 2
const FILE_TYPES_ACCEPTED = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/webp']
const FILE_SIZE_LIMIT = 20000000 // 20MB
const IMAGE_ASPECT_RATIO_MIN = 0.5
const IMAGE_ASPECT_RATIO_MAX = 2

export const config = {
    api: {
        bodyParser: false
    }
} 

export default async(req, res) => {
    const method = req.method

    const generateId = (length) => {
        let result = ''
        const characters = 'abcdefghijklmnopqrstuvwxyz0123456789'
        const charactersLength = characters.length
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength))
        }
        return result
    }
    
    const slugify = (string) => {
        const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
        const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
        const p = new RegExp(a.split('').join('|'), 'g')
      
        return string.toString().toLowerCase()
          .replace(/\s+/g, '-') // Replace spaces with -
          .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
          .replace(/&/g, '-and-') // Replace & with 'and'
          .replace(/[^\w\-]+/g, '') // Remove all non-word characters
          .replace(/\-\-+/g, '-') // Replace multiple - with single -
          .replace(/^-+/, '') // Trim - from start of text
          .replace(/-+$/, '') // Trim - from end of text
    }

    const validateAddress = (address) => {
        try {
            bech32.decode(address)
            return bech32.decode(address).prefix
        } catch (error) {
            return false
        }
    }

    switch(method) {
        case 'POST':
            try {
                const post = await new Promise((resolve, reject) => {
                    const form = new formidable()
                
                    form.parse(req, (err, fields, files) => {
                        if (err) reject({ err })
                        resolve({ err, fields, files })
                    }) 
                })

                // ensure the file size is less than the limit and the file is a supported image type
                if (post.files.image && FILE_SIZE_LIMIT <= post.files.image.size && !FILE_TYPES_ACCEPTED.includes(post.files.image.type)) {
                    res.status(400).json({ message: `Image invalid. File too large or not supported format.` })
                    return
                }

                // check to ensure the z-address was entered
                if (post.fields.address === '' || validateAddress(post.fields.address) !== 'zs') {
                    res.status(400).json({ message: `Z-address invalid. Please enter a valid Zcash z-address.` })
                    return
                }  

                // if the post is valid then proceed to save it
                if (post.fields.address && post.fields.title) {
                    const id = generateId(6)
                    const slug = slugify(post.fields.title.trim()) + '-' + id

                    // upload image to cloudinary (create additional sizes needed)
                    const image = await Cloudinary.uploader.upload(post.files.image.path, { 
                        public_id: slug, 
                        moderation: 'aws_rek',
                    })

                    // ensure the image ratio is within our accepted boundaries 
                    if ((image.height / image.width) >= IMAGE_ASPECT_RATIO_MIN && (image.height / image.width) <= IMAGE_ASPECT_RATIO_MAX ) {

                        // save to database
                        const { data, error } = await Supabase
                            .from('posts')
                            .insert(
                                { 
                                    address: striptags(post.fields.address.trim()),
                                    asset_url: image.secure_url, 
                                    description: striptags(post.fields.description ? post.fields.description.trim().substring(0,4999) : ''),
                                    pid: id,
                                    title: striptags(post.fields.title.trim().substring(0,99)),
                                    type: TYPE_IMAGE_POST,
                                    slug: slug,
                                    status: image.moderation[0].status !== 'rejected' ? STATUS_PUBLIC : STATUS_IN_REVIEW
                                }
                            )
                            if (data) {
                                // run the transformations
                                await Cloudinary.image(slug, {transformation: [
                                    { crop: 'scale', width: 700 },
                                    { format: 'webp', crop: 'scale' },
                                    { format: 'webp', crop: 'scale', width: 700 },
                                    { format: 'webp', crop: 'scale', width: 1200 }
                                ]})

                                res.status(200).json({ message: `Succesfully created post with slug ${slug}.`, slug: slug })
                            }
            
                            if (error) {
                                res.status(400).json({ message: `An unknow error happened. Please try again.` })
                            }

                        } else {
                            // delete the image from Cloudinary since the ratio is not accepted
                            await Cloudinary.uploader.destroy(slug)

                            res.status(400).json({ message: `Image aspect ratio must be between 1:2 and 2:1.` })
                        }
                    } else {
                        res.status(400).json({ message: `Title and z-address are required.` })
                    }
                } catch (error) {
                    res.status(400).json({ message: error })
                }

            break

        default:
            res.setHeader('Allow', ['POST'])
            res.status(405).end(`Method ${method} not supported.`)
    }
}