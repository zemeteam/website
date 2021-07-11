import { Supabase } from '../../../../lib/supabase'
import _ from 'underscore'

const POST_STATUS_LIVE = 1
const POSTS_PER_PAGE = 1000
const POST_SCORE_CUTOFF = 2
const POST_SCORE_CUTOFF_MULTIPLIER = 3

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
                
                if (data.length > 0){
                    const posts = []

                    // loop over the posts and determine how old they are and apply a sort score
                    _.each(data, function(post){
                        let created = new Date(post.created_at)
                        let today = new Date()
                        let diff = Math.abs(today - created)
                        let daysLive = Math.ceil(diff / (1000 * 60 * 60 * 24))

                        // append the calculated score to the post
                        post.score = daysLive <= POST_SCORE_CUTOFF ? post.view_count / daysLive : post.view_count / (daysLive * POST_SCORE_CUTOFF_MULTIPLIER)

                        // append the post to posts
                        posts.push(post)
                    })

                    // sort the posts array by score
                    const sorted = _.sortBy(posts, 'score').reverse()

                    // set cache 10min
                    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate')
                    res.status(200).json(sorted)
                } else {
                    res.status(400).json({ message: `Trending posts not found` })
                }
            break
        default:
            res.setHeader('Allow', ['GET'])
            res.status(405).end(`Method ${method} not supported.`)
    }
}