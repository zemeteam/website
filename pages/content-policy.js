import React from 'react'
import Layout from '../components/Layout'

export default class ContentPolicy extends React.Component {

    render() {
        return (
            <Layout 
                logo="dark"
                header={true}
                title="Content Policy - Zeme Team"
                description="The official content policy for Zeme Team."
                url="https://zeme.team/content-policy">
                
                <main className="policy">
                    <h1>Content Policy</h1>

                    <div className="copy">
                        <p>We want to keep Zeme Team a safe and supportive place where you can create, share, and browse Zcash content. Our content policy outlines what we do and don’t allow on Zeme Team. </p>
                        <br />
                        
                        <h2>Don’t spam.</h2>
                        <p>Don’t post spammy content, including suspicious links and offers. </p>
                        <br />
                        
                        <h2>Don’t bully or harass others.</h2>
                        <p>Don’t bully, harass, or attack anyone for any reason. We don’t tolerate threats of violence, hate speech, and content that aims to degrade, shame, or harm other people. Posts that are trolling or bullying Zcash will be removed as well.</p>
                        <br />
                        
                        <h2>Keep it appropriate.</h2>
                        <p>In the interest of keeping all Zemers safe, please ensure your posts are appropriate for a diverse audience. This means no:</p>
                        <ul>
                            <li>Graphic violence</li>
                            <li>Pornography</li>
                            <li>Illegal content (for example: attempting to distribute weapons and drugs).</li>
                        </ul>
                        <br />
                        
                        <h2>Respect intellectual property & copyrights.</h2>
                        <p>Make sure you have the rights to post the content you’re sharing. If you believe someone has infringed on your copyright on Zeme Team, contact us. </p>
                        <br />
                        
                        <h2>Keep it relevant to Zcash.</h2>
                        <p>There are lots of great projects out there (and we love them too!), but Zeme Team is specifically designed for sharing Zcash content. We kindly ask that you help keep our platform cohesive by posting only Zcash-related media. </p>
                        <br />
                        
                    </div>
                </main>

                <style jsx>{`
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
                        line-height: 28px;
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