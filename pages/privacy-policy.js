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
                        <p>This Privacy Policy document contains types of information that is collected and recorded by Zeme Team and how we use it.</p>
                        <br />
 
                        <p>If you have additional questions or require more information about our Privacy Policy, please contact us at zemeteam@gmail.com.</p>
                        <br />

                        <p>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>
                        <br/ >

                        <h2>Information we collect</h2>
                        <p>Zeme Team is committed to protecting your privacy. We do not use cookies, capture session data, or collect any personally identifiable information (e.g. IP address).</p>
                        <br />

                        <p>We only collect data that is absolutely essential to Zeme Team’s functionality. This includes view tallies (the number of times a page was viewed), and data that is submitted to us when you create a post or file a report. This information is used to:</p>

                        <ul>
                            <li>Display your posts on the Zeme Team website</li>
                            <li>Organize the main feed experience</li>
                            <li>Find and prevent inappropriate content, including spam and fraud</li>
                        </ul>

                        <p>Zeme Team is a public archive for Zcash related content. When you submit a post, it may be viewable to anyone on the internet. As such, we ask that you refrain from posting any sensitive material, or content that you would not like others to have access to.</p>
                        <br />

                        <h2>Transferring your information</h2>
                        <p>Zeme Team is a worldwide service. By using our products or services, you authorize us to transfer and store your information outside your home country, including in the United States, for the purposes described in this policy.</p>
                        <br />

                        <h2>How and when we share information</h2>
                        <p>Anyone can see the posts and post details that you create. This may include the image, title, description, and z-address that you provide during the post creation process. Additionally, we may share this data with:</p>
                        <ul>
                            <li>Third-party companies, service providers or individuals that we work with to process information on our behalf for the purposes described in this Privacy Policy. For example, we share data with file processing services to help display images efficiently on the Zeme Team website.</li>
                            <li>Law enforcement agencies or government agencies. We only share information if we believe that disclosure is reasonably necessary to comply with a law, regulation or legal request; to protect the safety, rights, or property of the public, or any person; or to detect, prevent, or otherwise address fraud, security or technical issues.</li>
                        </ul>
                        <br />


                        <h2>How long we keep your information for</h2>
                        <p>We keep your information only so long as we need it to provide Zeme Team to you and fulfill the purposes described in this policy. This is also the case for anyone that we share your information with and who carries out services on our behalf. When we no longer need to use your information and there is no need for us to keep it to comply with our legal or regulatory obligations, we’ll remove it from our systems.</p>
                        <br />


                        <h2>Third-Party Privacy Policies</h2>
                        <p>Zeme Team may contain links to other websites. However, our Privacy Policy does not apply to these third-party sites. We strongly advise you to consult the respective Privacy Policies of these third-party services for more information. </p>

                        <br />
                        <h2>Children's Information</h2>

                        <p>Zeme Team does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information to Zeme Team, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.</p>
                        <br />

                        <h2>Changes to this policy</h2>
                        <p>We may change this policy from time to time and if we do, we’ll post any changes on this page. If you continue to use Zeme Team after those changes are in effect, you agree to the new policy. If the changes are significant, we may provide a more prominent notice or get your consent, as required by law.</p>
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