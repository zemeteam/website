import { Supabase } from '../../../../lib/supabase'

export default async(req, res) => {
    const method = req.method
    const slug = req.query.post

    switch(method) {
        case 'POST':
            if (req.body.id && req.body.reason) {
                // insert the report into Supabase
                await Supabase.from('reports').insert({ post_id: req.body.id, reason: req.body.reason })

                res.status(200).json({ message: `Succesfully reported post with slug ${slug}.`})
            } else {
                res.status(400).json({ message: `Failed to report post with slug ${slug}.` })
            }
            break

        default:
            res.setHeader('Allow', ['POST'])
            res.status(405).end(`Method ${method} not supported.`)
    }
}