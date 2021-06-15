import React from 'react'
import { Supabase } from '../lib/supabase'
import Layout from '../components/Layout'
import Details from '../components/Details'
import Error from './_error'

export default class Discover extends React.Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    static async getInitialProps({ query, res }) {
        let statusCode
        const slug = query.post

        const { data, error } = await Supabase
            .from('posts')
            .select('id, slug, asset_url, title, description, address, created_at, status')
            .eq('slug', slug)  

        if (data.length >= 1){
            statusCode = 200
            res.statusCode = 200
        } else {
            statusCode = 404
            res.statusCode = 404
        }

        return { post: data, statusCode: statusCode }
    }

    componentDidMount() {
        this.handleScrollToTop()
    }

    handleScrollToTop = () => { 
        window.scrollTo(0, 0)
    }

    render() {
        // if the post is not found, display the error view
        if (this.props.statusCode === 404) {
            return <Error statusCode={this.props.statusCode} />
        }
    
        const post = this.props.post[0]

        return (
            <Layout 
                logo="dark"
                title={` ${post.title} - Zeme Team🛡️`} 
                description={post.description} 
                url="https://zeme.team">
                
                <main className="details">
                    <Details 
                        display="page"
                        handleScrollToTop={this.handleScrollToTop} 
                        post={post} />
                </main>

                <style jsx>{`
                    .details {
                        padding-top: 50px;
                    }

                    @media only screen and (max-width: 800px) {
                        .details {
                            padding-top: 78px;
                        }
                    }
                `}
                </style>
            </Layout>
        )
    }
}
