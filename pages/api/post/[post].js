import { Supabase } from '../../../lib/supabase'

export default async(req, res) => {
    const method = req.method
    const slug = req.query.post

    switch(method) {
        case 'GET':
            const { data } = await Supabase
                .from('posts')
                .select('id, slug, asset_url, title, description, address, created_at, status, view_count')
                .eq('slug', slug)  

            if (data.length > 0){
                res.status(200).json(data)
            } else {
                res.status(400).json({ message: `Post with slug ${slug} not found` })
            }
            break
        default:
            res.setHeader('Allow', ['GET'])
            res.status(405).end(`Method ${method} not supported.`)
    }
}