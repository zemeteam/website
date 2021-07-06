import { Supabase } from '../../../../lib/supabase'

const POST_STATUS_LIVE = 1
const POSTS_PER_PAGE = 500
const TRENDING_DAYS_BACK = 7

export default async(req, res) => {
    const body = req.body
    const method = req.method

    switch(method) {
        case 'GET':
            const { data } = await Supabase
                .from('posts')
                .select('id, slug, asset_url, title, description, address, created_at, status, view_count')
                .range(body.start ? body.start : 0, body.end ? body.end : POSTS_PER_PAGE)
                .filter('status', 'eq', POST_STATUS_LIVE)
                .order('created_at', { 
                    ascending: false 
                })

                if (data.length > 0){
                    res.status(200).json(data)
                } else {
                    res.status(400).json({ message: `Latest posts not found` })
                }
            break
        default:
            res.setHeader('Allow', ['GET'])
            res.status(405).end(`Method ${method} not supported.`)
    }
}