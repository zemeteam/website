import { Supabase } from '../../../../lib/supabase'

const POST_STATUS_LIVE = 1
const POST_STATUS_LIVE_WITH_LIMITS = 3
const POSTS_PER_PAGE = 1000
const TRENDING_DAYS_BACK = 7

export default async(req, res) => {
    const method = req.method
    const start = req.query.start ? req.query.start : 0
    const end = req.query.end ? req.query.end : POSTS_PER_PAGE

    switch(method) {
        case 'GET':
            const { data } = await Supabase
                .from('posts')
                .select('id, slug, asset_url, title, description, address, created_at, status, view_count')
                .range(start, end)
                .or(`status.eq.${POST_STATUS_LIVE},status.eq.${POST_STATUS_LIVE_WITH_LIMITS}`)
                .filter('status', 'eq', POST_STATUS_LIVE)
                .order('created_at', { 
                    ascending: false 
                })

                if (data.length > 0){
                    // set cache 1min
                    res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=60')
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