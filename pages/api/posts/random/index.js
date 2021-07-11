import { Supabase } from '../../../../lib/supabase'
import _ from 'underscore'

const POST_STATUS_LIVE = 1
const POSTS_PER_PAGE = 500
const POST_VIEW_THRESHOLD = 5

export default async(req, res) => {
    const method = req.method
    const view_count = req.query.view_count ? req.query.view_count : POST_VIEW_THRESHOLD

    switch(method) {
        case 'GET':
            if (view_count >= POST_VIEW_THRESHOLD) {
                var { data } = await Supabase
                    .from('posts')
                    .select('id, slug, asset_url, title, description, address, created_at, status, view_count')
                    .range(0, POSTS_PER_PAGE)
                    .filter('status', 'eq', POST_STATUS_LIVE)
                    .lte('view_count', view_count)     
            } else {
                var { data } = await Supabase
                    .from('posts')
                    .select('id, slug, asset_url, title, description, address, created_at, status, view_count')
                    .range(0, POSTS_PER_PAGE)
                    .filter('status', 'eq', POST_STATUS_LIVE)
                    .gte('view_count', view_count)  
            }
            
            if (data.length > 0) {
                // set cache 1min
                res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=60')
                res.status(200).json(_.shuffle(data))
            } else {
                res.status(400).json({ message: `Random posts not found` })
            }
            break
        default:
            res.setHeader('Allow', ['GET'])
            res.status(405).end(`Method ${method} not supported.`)
    }
}