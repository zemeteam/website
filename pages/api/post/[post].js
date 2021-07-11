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
                // set cache 1hr
                res.setHeader('Cache-Control', 'maxage=3600, s-maxage=3600, stale-while-revalidate')
                res.status(200).json(data)
            } else {
                res.status(400).json({ message: `Post with slug ${slug} not found` })
            }
            break

        case 'PUT':
            if (req.body.id) {
                // save the page view to the database (no identifying information is saved)
                await Supabase.from('views').insert({ post_id: req.body.id })

                // increment the counter on the posts object
                await Supabase.rpc('increment', { x: 1, post_id: req.body.id })

                res.status(200).json({ message: `Succesfully updated post with slug ${slug}.`})
            } else {
                res.status(400).json({ message: `Failed to update post with slug ${slug}.` })
            }
            break

        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT'])
            res.status(405).end(`Method ${method} not supported.`)
    }
}