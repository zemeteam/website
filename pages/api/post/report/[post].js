import { Supabase } from '../../../../lib/supabase'

export default async(req, res) => {
    const method = req.method
    const slug = req.query.post

    switch(method) {
        case 'POST':
            // todo add report post query
            await Supabase.from('reports')
                .insert([
                    { 
                        post_id: this.props.post.id, //change this
                        reason: this.state.reason //change this
                    }
                ])
            
            break

        default:
            res.setHeader('Allow', ['POST'])
            res.status(405).end(`Method ${method} not supported.`)
    }
}