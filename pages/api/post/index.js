import striptags from 'striptags'
import { bech32 } from 'bech32'
import { Supabase } from '../../../lib/supabase'

const TYPE_IMAGE_POST = 1
const STATUS_PUBLIC = 1
const FILE_TYPES_ACCEPTED = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/webp']
const FILE_SIZE_LIMIT = 10000000 // 10mb

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
            const post = req.body

            if (post.address && post.description && post.title) {
                const id = generateId(6)
                const slug = slugify(post.title.trim()) + '-' + id
                const { data, error } = await Supabase
                    .from('posts')
                    .insert(
                        { 
                            address: striptags(post.address.trim()),
                            asset_url: 'https://res.cloudinary.com/zemeteam/image/upload/v1623541173/e77462601d5a7e7dd500dca25c4ee5aeed7e270e_tr7ujl.jpg', //todo set this dynamically from cloudinary
                            description: striptags(post.description.trim().substring(0,4999)),
                            pid: id,
                            title: striptags(post.title.trim().substring(0,99)),
                            type: TYPE_IMAGE_POST,
                            slug: slug,
                            status: STATUS_PUBLIC
                        }
                    )
                    if (data) {
                        res.status(200).json({ message: `Succesfully created post with slug ${slug}.`, slug: slug })
                    }
    
                    if (error) {
                        res.status(400).json({ message: `Failed to create post with slug ${slug}.` })
                    }
            } else {
                res.status(400).json({ message: `Failed to create post with slug ${slug}.` })
            }

            break

        default:
            res.setHeader('Allow', ['POST'])
            res.status(405).end(`Method ${method} not supported.`)
    }
}