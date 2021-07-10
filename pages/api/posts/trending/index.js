import { Supabase } from '../../../../lib/supabase'
import _ from 'underscore'

const POST_STATUS_LIVE = 1
const POSTS_PER_PAGE = 1000

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
                .filter('status', 'eq', POST_STATUS_LIVE)
                .order('view_count', { 
                    ascending: false 
                })  
                
                if (data.length > 0){
                    res.status(200).json(data)
                } else {
                    res.status(400).json({ message: `Trending posts not found` })
                }
            break
        default:
            res.setHeader('Allow', ['GET'])
            res.status(405).end(`Method ${method} not supported.`)
    }
}