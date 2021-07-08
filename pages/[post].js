import React from 'react'
import { server } from '../config'
import Layout from '../components/Layout'
import Details from '../components/Details'
import Error from './_error'

export default class Discover extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    static async getInitialProps({ query, res }) {
        let statusCode
        const api = await fetch(`${server}/api/post/${query.post}`)
        const post = await api.json()

        if (post.length >= 1){
            statusCode = 200
            res.statusCode = 200
        } else {
            statusCode = 404
            res.statusCode = 404
        }

        return { post: post, statusCode: statusCode }
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
            return (
                    <Layout 
                        logo="dark"
                        header={true}
                        url={`https://zeme.team/404`}>
                            <Error statusCode={this.props.statusCode} />
                    </Layout>
            )
        }
    
        const post = this.props.post[0]

        return (
            <Layout 
                logo="dark"
                header={true}
                title={`${post.title} - Zeme Team🛡️`} 
                description={post.description} 
                image={post.asset_url}
                url={`https://zeme.team/${post.slug}`}>
                
                <main className="details">
                    <Details 
                        display="page"
                        handleScrollToTop={this.handleScrollToTop} 
                        post={post} />
                </main>

                <style jsx>{`
                    .details {
                        padding-top: 0;
                    }

                    @media only screen and (max-width: 800px) {
                        .details {
                            padding-top: 0;
                        }
                    }
                `}
                </style>
            </Layout>
        )
    }
}
