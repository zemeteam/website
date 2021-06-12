import React from 'react'
import Layout from '../components/Layout'

export default class Terms extends React.Component {

    render() {
        return (
            <Layout 
                logo="dark"
                title="Terms of Service - Zeme Team"
                description="The official terms of service for Zeme Team."
                url="https://zeme.team/terms">
                
                <main className="policy">
                    <h1>Terms of Service</h1>

                    <div className="copy">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet quis eu est vitae libero, at vel congue. Quis aliquam sapien at dignissim aliquam sagittis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet quis eu est vitae libero, at vel congue. Quis aliquam sapien at dignissim aliquam sagittis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet quis eu est vitae libero, at vel congue. Quis aliquam sapien at dignissim aliquam sagittis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet quis eu est vitae libero, at vel congue. Quis aliquam sapien at dignissim aliquam sagittis.<br />
                        <br />
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet quis eu est vitae libero, at vel congue. Quis aliquam sapien at dignissim aliquam sagittis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet quis eu est vitae libero, at vel congue. Quis aliquam sapien at dignissim aliquam sagittis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet quis eu est vitae libero, at vel congue. Quis aliquam sapien at dignissim aliquam sagittis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet quis eu est vitae libero, at vel congue. Quis aliquam sapien at dignissim aliquam sagittis.<br />
                        <br />
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet quis eu est vitae libero, at vel congue. Quis aliquam sapien at dignissim aliquam sagittis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet quis eu est vitae libero, at vel congue. Quis aliquam sapien at dignissim aliquam sagittis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet quis eu est vitae libero, at vel congue. Quis aliquam sapien at dignissim aliquam sagittis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet quis eu est vitae libero, at vel congue. Quis aliquam sapien at dignissim aliquam sagittis.<br />
                        <br />
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet quis eu est vitae libero, at vel congue. Quis aliquam sapien at dignissim aliquam sagittis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet quis eu est vitae libero, at vel congue. Quis aliquam sapien at dignissim aliquam sagittis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet quis eu est vitae libero, at vel congue. Quis aliquam sapien at dignissim aliquam sagittis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet quis eu est vitae libero, at vel congue. Quis aliquam sapien at dignissim aliquam sagittis.<br />
                        <br />
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet quis eu est vitae libero, at vel congue. Quis aliquam sapien at dignissim aliquam sagittis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet quis eu est vitae libero, at vel congue. Quis aliquam sapien at dignissim aliquam sagittis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet quis eu est vitae libero, at vel congue. Quis aliquam sapien at dignissim aliquam sagittis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet quis eu est vitae libero, at vel congue. Quis aliquam sapien at dignissim aliquam sagittis.
                    </div>
                </main>

                <style jsx>{`
                    h1 {
                        font-size: 36px;
                        line-height: 46px;
                        text-align: center;
                        text-transform: uppercase;
                    }

                    .policy {
                        margin: auto;
                        max-width: 100%;
                        padding: 92px 24px;
                        width: 900px;
                    }

                    .copy {
                        font-family: 'Overpass Mono', monospace;
                        font-size: 16px;
                        letter-spacing: -0.6px;
                        line-height: 30px;
                        padding-top: 12px;
                    }

                    @media only screen and (max-width: 600px) {
                        h1 {
                            font-size: 24px;
                            line-height: 34px;
                        }

                        .policy {
                            padding: 92px 16px;
                        }
                    }
                `}
                </style>
            </Layout>
        )
    }
}