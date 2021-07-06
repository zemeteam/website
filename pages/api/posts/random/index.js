import { Supabase } from '../../../../lib/supabase'

const POST_STATUS_LIVE = 1
const POSTS_PER_PAGE = 500
const POST_VIEW_THRESHOLD = 5

export default async(req, res) => {
    const body = req.body
    const method = req.method

    switch(method) {
        case 'GET':
                try {
                    if (body.view_count >= POST_VIEW_THRESHOLD) {
                        var { data } = await Supabase
                            .from('posts')
                            .select('id, slug, asset_url, title, description, address, created_at, status, view_count')
                            .range(body.start ? body.start : 0, body.end ? body.end : POSTS_PER_PAGE)
                            .filter('status', 'eq', POST_STATUS_LIVE)
                            .lte('view_count', body.view_count)     
                    } else {
                        var { data } = await Supabase
                            .from('posts')
                            .select('id, slug, asset_url, title, description, address, created_at, status, view_count')
                            .range(body.start ? body.start : 0, body.end ? body.end : POSTS_PER_PAGE)
                            .filter('status', 'eq', POST_STATUS_LIVE)
                            .gte('view_count', body.view_count)  
                    }
                    
                    if (data.length > 0){
                        res.status(200).json(_.shuffle(data))
                    } else {
                        res.status(400).json({ message: `Random posts not found` })
                    }
                } catch (error) {
                    res.status(400).json({ message: `Random posts not found` })
                }
            break
        default:
            res.setHeader('Allow', ['GET'])
            res.status(405).end(`Method ${method} not supported.`)
    }
}