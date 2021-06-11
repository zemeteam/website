import React from 'react'
import Layout from '../components/Layout'

export default class Privacy extends React.Component {

    render() {
        return (
            <Layout 
                logo="dark"
                title="Privacy Policy - Zeme Team"
                description="The official privacy policy for Zeme Team."
                url="https://zeme.team/privacy-policy">
                
                <main className="policy">
                    <h1>Privacy Policy</h1>

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
                            font-size: 30px;
                            line-height: 40px;
                        }
                    }
                `}
                </style>
            </Layout>
        )
    }
}