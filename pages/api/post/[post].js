import { Supabase } from '../../../lib/supabase'

const POST_STATUS_LIVE = 1

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

        case 'PUT':
            if (req.query.id) {
                // save the page view to the database (no identifying information is saved)
                await Supabase.from('views').insert({ post_id: req.query.id })

                // increment the counter on the posts object
                await Supabase.rpc('increment', { x: 1, post_id: req.query.id })

                res.status(200).json({ message: `Succesfully updated post with slug ${slug}.`})
            } else {
                res.status(400).json({ message: `Failed to update post with slug ${slug}.` })
            }
            
            break

        default:
            res.setHeader('Allow', ['GET, PUT'])
            res.status(405).end(`Method ${method} not supported.`)
    }
}