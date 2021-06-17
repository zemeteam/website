import React from 'react'
import Layout from '../components/Layout'

export default class Terms extends React.Component {

    render() {
        return (
            <Layout 
                logo="dark"
                header={true}
                title="Terms of Service - Zeme Team"
                description="The official terms of service for Zeme Team."
                url="https://zeme.team/terms">
                
                <main className="policy">
                    <h1>Terms of Service</h1>

                    <div className="copy">
                        <p>These Terms of Service ("Terms") govern your access to and use of the Zeme Team website. Please read these Terms carefully, and contact us if you have any questions. By accessing or using Zeme Team, you agree to be bound by these Terms, our Privacy Policy, and our Content Policy.</p>
                        <br />
                        
                        <h2>Using Zeme Team</h2>
                        <p>Zeme Team allows you to share your Zcash related content with the world and earn shielded tips from the community. You may use Zeme Team only if you can comply with these Terms and all applicable laws. You can't use Zeme Team if it would be prohibited by U.S. sanctions. Any use or access by anyone under the age of 13 is not allowed. You may only use Zeme Team if you are over the age at which you can provide consent to data processing under the laws of your country.</p>
                        <br />
                        
                        <h2>Posting content</h2>
                        <p>Zeme Team allows you to post content, including images, text, links, and other materials. Anything that you post or otherwise make available on Zeme Team is referred to as "User Content." You retain all rights in, and are solely responsible for, the User Content you post to Zeme Team.
                        <br /><br />
                        We reserve the right to remove or modify User Content, or change the way it's used in Zeme Team, for any reason. This includes User Content that we believe violates these Terms, our Content Policy, or any other policies.
                        <br /><br />
                        If we remove your User Content from Zeme Team, we may keep your User Content for a reasonable period of time for backup, archival, or audit purposes. Zeme Team and its users may retain and continue to use, store, display, reproduce, modify, create derivative works, perform, and distribute any of your User Content that other users have stored or shared on Zeme Team.
                        </p>
                        <br />
                        
                        <h2>Security</h2>
                        <p>While we work to protect the security of your content, Zeme Team can't guarantee that unauthorized third parties won't be able to defeat our security measures. Additionally, Zeme Team serves as a public archive for Zcash content. Given the public nature of our service, we ask that you refrain from posting any sensitive material or content that you would not like others to have access to.</p>
                        <br />
                        
                        <h2>Third party links, sites and services</h2>
                        <p>Zeme Team may contain links to third party websites, services, offers, or other events or activities that are not owned or controlled by us. We don't endorse or assume any responsibility for any such third party sites, information, materials, products, or services. If you access any third party website, service, or content from Zeme Team, you do so at your own risk and you agree that Zeme Team has no liability arising from your use of or access to any third party website, service, or content.</p>
                        <br />
                        
                        <h2>Termination</h2>
                        <p>Zeme Team may terminate or suspend your right to access or use Zeme Team for any reason on appropriate notice. We may terminate or suspend your access immediately and without notice if we have a good reason, including any violation of our Content Policy.</p>
                        <br />
                        
                        <h2>Indemnity</h2>
                        <p>If you use Zeme Team for commercial purposes, you agree to indemnify and hold harmless Zeme Team and their affiliates from and against any claims, suits, proceedings, disputes, demands, liabilities, damages, losses, costs and expenses, including, without limitation, reasonable legal and accounting fees (including costs of defense of claims, suits or proceedings brought by third parties), in any way related to your access to or use of our Service, your User Content, or your breach of any of these Terms.</p>
                        <br />
                        
                        <h2>Disclaimers</h2>
                        <p>Zeme Team and their affiliates take no responsibility and assume no liability for any User Content that you or any other person or third party posts or sends using our Service. You understand and agree that you may be exposed to User Content that's inaccurate, objectionable, inappropriate for children, or otherwise unsuited to your purpose.
                        </p><br />
                        
                        <h2>Limitation of liability</h2>
                        <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, ZEME TEAM SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM (A) YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICE; (B) ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICE, INCLUDING WITHOUT LIMITATION, ANY DEFAMATORY, OFFENSIVE OR ILLEGAL CONDUCT OF OTHER USERS OR THIRD PARTIES; OR (C) UNAUTHORIZED ACCESS, USE OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT. IN NO EVENT SHALL ZEME TEAM'S AGGREGATE LIABILITY FOR ALL CLAIMS RELATING TO THE SERVICE EXCEED ONE HUNDRED U.S. DOLLARS (U.S. $100.00).
                        </p><br />
                        
                        <h2>Arbitration</h2>
                        <p>For any dispute you have with Zeme Team, you agree to first contact us and try to resolve the dispute with us informally. If Zeme Team isn't able to resolve the dispute with you informally, we each agree to resolve any claim, dispute, or controversy (excluding claims for injunctive or other equitable relief) arising out of or in connection with or relating to these Terms through binding arbitration or (for qualifying claims) in small claims court.</p>
                        <br />
                        
                        <h2>General terms</h2>
                        <p>We may revise these Terms from time to time and the most current version will always be posted on our website. By continuing to access or use Zeme Team after revisions become effective, you agree to be bound by the new Terms. If you don't agree to the new terms, please stop using Zeme Team.
                        <br /><br />
                        No waiver of any term of these Terms shall be deemed a further or continuing waiver of such term or any other term, and Zeme Team's failure to assert any right or provision under these Terms shall not constitute a waiver of such right or provision.
                        </p>
                        <br />
                        
                        <p>Last updated: June 14, 2021</p>

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