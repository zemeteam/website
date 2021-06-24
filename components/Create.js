import React from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import Wallets from './Wallets'

export default class QR extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            error: null,
            progress: false,
            reason: null,
            status: 'ready',
            showWallets: false
        }

        this.recaptchaRef = React.createRef()
    }

    static async getInitialProps(context) {
        return { 
            display: display
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()

        console.log('hi')

        const recaptchaValue = this.recaptchaRef.current.getValue()

        // only proceed if the captcha was filled out
        if (recaptchaValue) {

        }
    }

    handleNeedWallet = () => {
        this.setState({
            showWallets: !this.state.showWallets
        })
    }

    handleProgress = (event) => {
        if (event.target.value.length > 0) {
            this.setState({
                progress: true
            })
        }
    }


    render() {
        const display = this.props.display

        return ( 
            <div className="create">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-row">
                        <label htmlFor="title">Title<span className="required">*</span></label><br />
                        <input id="title" placeholder="Add a title" onChange={this.handleProgress} type="text" />
                    </div>

                    <div className="form-row">
                        <label htmlFor="description">Description</label><br />
                        <textarea id="description" placeholder="Write a description (optional)" style={{height: 120}}></textarea>
                    </div>

                    <div className="form-row">
                        <label htmlFor="address">Zcash z-addr<span className="required">*</span></label><br />
                        <input id="address" placeholder="e.g. zs1n7pjuk54xp9..." type="text" />
                    </div>

                    <div className="wallet">
                        <div onClick={() => this.handleNeedWallet() }>Need a Zcash z-addr?</div>
                    </div>

                    <div className="wallets">
                        <Wallets visible={this.state.showWallets} />
                    </div>

                    <div className="recaptcha">
                        <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} ref={this.recaptchaRef} onChange={this.handleRecaptchaChange} />
                    </div>

                    <div className="button">
                        <button className="post" type="submit">Post</button>
                    </div>


                </form>
                <style jsx>{`
                    .create {
                        font-family: 'Overpass Mono', monospace !important;
                        letter-spacing: -0.6px;
                        margin: auto;
                        margin-bottom: 100px;
                        padding-top: 100px;
                        text-align: left;
                        width: 640px;
                    }

                    .create label {
                        font-size: 14px;
                        font-weight: 800;
                    }

                    .create input, 
                    .create textarea {
                        background-color: #F5F5F5;
                        border-radius: 16px;
                        border: 0;
                        color: #000000;
                        font-family: 'Overpass Mono', monospace !important;
                        margin-bottom: 16px;
                        margin-top: 6px;
                        padding: 14px;
                        width: 640px;
                    }

                    .create input::placeholder, 
                    .create textarea::placeholder {
                        color: #666666;
                    }

                    .create .wallet {
                        color: #F4B728;
                        cursor: url(/pointer.png), auto;
                        cursor: -webkit-image-set(
                            url('/pointer.png') 1x,
                            url('/pointer@2x.png') 2x,
                            url('/pointer@3x.png') 3x
                        ), auto;  
                        font-size: 13px;
                    }

                    .create .wallets {
                        margin-bottom: 12px;
                        margin-top: 12px;
                    }

                    .create .recaptcha,
                    .create .button {
                        display: flex;
                        justify-content: flex-end;
                        margin-top: 16px;
                    }

                    .create .button .post {
                        background-color: #F4B728;
                        border-radius: 12px;
                        border: 0;
                        box-shadow: 0px 4px 10px rgba(244, 183, 40, .5);
                        color: #000000;
                        cursor: url(/pointer.png), auto;
                        cursor: -webkit-image-set(
                            url('/pointer.png') 1x,
                            url('/pointer@2x.png') 2x,
                            url('/pointer@3x.png') 3x
                        ), auto;  
                        font-family: "Syncopate", -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
                        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
                        font-size: 13px;
                        height: 42px;
                        line-height: 42px;
                        text-transform: uppercase; 
                        transition: all .5s;
                        user-select: none;
                        width: 160px;                       
                    }

                    .create .button .post:hover {
                        background-color: #FFCB51;
                    }

                    @media only screen and (max-width: 600px) {
                        .create {
                            padding: 0 16px;
                            padding-top: 100px;
                            width: 100%

                        }

                        .create input, 
                        .create textarea {
                            width: 100%
                        }
                    }

                `}</style>
            </div>
        )
    }
}