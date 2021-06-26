import React from 'react'
import { Supabase } from '../lib/supabase'
import ReCAPTCHA from 'react-google-recaptcha'

export default class Dialog extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            error: null,
            reason: null,
            status: 'ready'
        }

        this.escFunction = this.escFunction.bind(this)
        this.recaptchaRef = React.createRef()
    }

    static async getInitialProps(context) {
        return { 
            post: post, 
            visible: visible 
        }
    }

    componentDidMount(){
        // event listener for esc key
        window.addEventListener("keydown", this.escFunction, false)
    }

    componentWillUnmount(){
        // remove listener for esc key
        window.removeEventListener("keydown", this.escFunction, false)
    }

    escFunction = (event) => {
        event.stopPropagation()
        if(this.props.visible && event.keyCode === 27) {
            this.props.handleCloseDialog(event)
        }
    }

    handleReasonChange = (reason) => {
        this.setState({
            reason: reason
        })      
    }

    handleReportPost = async (event) => {
        event.preventDefault()

        // only proceed if a reason was filled out
        if (this.state.reason !== null) {
            const recaptchaValue = this.recaptchaRef.current.getValue()

            // only proceed if the captcha was filled out
            if (recaptchaValue) {
                const { data, error } = await Supabase
                .from('reports')
                .insert([
                    { 
                        post_id: this.props.post.id,
                        reason: this.state.reason
                    }
                ])

                // if the submit completed update the ui
                if (data) {
                    this.setState({
                        status: 'complete'
                    })      
                }

                // if the submit errored out update the ui
                if (error) {
                    this.setState({ 
                        status: 'error', 
                        error: 'An unknow error happened. Please try again.' 
                    })                         
                }
            } else {
                // captcha not completed
                this.setState({ 
                    status: 'error', 
                    error: 'Please complete the CAPTCHA.' 
                })   
            }
        } else {
            // the user didn't select a report reason
            this.setState({ 
                status: 'error', 
                error: 'Please specify a reason.' 
            })   
        }
    }


    render() {
        const post = this.props.post
        const visible = this.props.visible

        return ( 
            <div>
                <div 
                    className={`dialog ${visible ? "dialog-show" : "dialog-hide"}`} 
                    onClick={() => this.props.handleCloseDialog()} />

                <div className={`dialog-body ${visible ? "dialog-show" : "dialog-hide"}`}>
                    <div className="dialog-close" onClick={() => this.props.handleCloseDialog() }>
                        <img src="/icon-close.png" alt="Close" />
                    </div>

                    <div className="dialog-report">
                        <h3 style={{paddingLeft: 32}}>Report</h3>
                        {this.state.status !== 'complete' &&
                            <div className="dialog-warning">
                                Please contact us at <a href="mailto:hi.zeme.team@gmail.com" title="Contact">hi.zeme.team@gmail.com</a> to report copyright violations.
                            </div>
                        }
                        
                        {this.state.status !== 'complete' &&
                            <div className="dialog-form">
                                <b>Why are you reporting this?<span className="required">*</span></b>

                                <form onSubmit={this.handleReportPost}>
                                    <div className="form-row">
                                        <input name="report" id="spam" value="spam" type="radio" onChange={() => this.handleReasonChange('spam')} />
                                        <label htmlFor="spam">Spam</label>
                                    </div>

                                    <div className="form-row">
                                        <input name="report" id="inappropriate" value="inappropriate" type="radio" onChange={() => this.handleReasonChange('inappropriate')} />
                                        <label htmlFor="inappropriate">Harmful / Inappropriate content</label>
                                    </div>

                                    <div className="form-row">
                                        <input name="report" id="harassment" value="harassment" type="radio" onChange={() => this.handleReasonChange('harassment')} />
                                        <label htmlFor="harassment">Bullying / Harassment</label>
                                    </div>

                                    <div className="form-row">
                                        <input name="report" id="unrelated" value="unrelated" type="radio" onChange={() => this.handleReasonChange('unrelated')} />
                                        <label htmlFor="unrelated">Unrelated to Zcash</label>
                                    </div>

                                    <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} ref={this.recaptchaRef} />
                                    
                                    {this.state.status === 'error' &&
                                        <div className="form-error">
                                            {this.state.error}
                                        </div>
                                    }

                                    <button className="report" type="submit">Report</button>
                                </form>
                            </div>
                        }

                        {this.state.status === 'complete' &&
                            <div className="form-success">
                                <img src="./icon-check.png" alt="Complete" width={100} />
                                <h2>Report submitted!</h2>
                                <div>Thanks for keeping Zeme Team safe.</div>
                            </div>
                        }
                    </div>
                </div>


                <style jsx>{`
                    .dialog {
                        background-color: rgba(0,0,0,.5);
                        height: 100%;
                        margin: auto;
                        overflow: scroll;
                        position: fixed;
                        text-align: center;
                        top: 0;
                        width: 100%;
                        z-index: 7;
                    }

                    .dialog-body {
                        background-color: #ffffff;
                        border-radius: 20px;
                        box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.2);
                        font-family: 'Overpass Mono', monospace !important;
                        font-size: 14px;
                        letter-spacing: -0.6px;
                        line-height: 20px;
                        left: calc(50% - 250px);
                        padding: 0 24px;
                        position: fixed;
                        top: 100px;
                        width: 500px;
                        z-index: 8;
                    }

                    .dialog-close {
                        background-color: rgba(245,245,245,.85);
                        border-radius: 25px;
                        cursor: url(/pointer.png), auto;
                        cursor: -webkit-image-set(
                            url('/pointer.png') 1x,
                            url('/pointer@2x.png') 2x,
                            url('/pointer@3x.png') 3x
                        ), auto;  
                        height: 50px;
                        float: right;
                        line-height: 50px;
                        position: relative;
                        text-align: center;
                        top: 16px;
                        transition: opacity .25s;
                        width: 50px;
                    }

                    .dialog-close:active {
                        opacity: .5;
                    }

                    .dialog-close img { 
                        margin-top: 13px;
                        width: 24px;
                    }

                    .dialog-report {
                        text-align: left;
                    }

                    .dialog-report img {
                        border-radius: 12px;
                        max-width: 1000px;
                    }

                    .dialog-show {
                        animation: slideIn .25s;
                    }

                    .dialog-hide {
                        animation: slideOut .25s;
                    }

                    .dialog-title {
                        height: 80px;
                        line-height: 80px;
                        text-align: center;
                        text-transform: uppercase;
                        width: 100%:
                    }

                    .dialog-warning {
                        background-color: #FFF9EB;
                        border-radius: 8px;
                        margin-bottom: 16px;
                        padding: 12px;
                        width: 100%;
                    }

                    .dialog-warning a {
                        color: #F4B728;
                    }

                    .form-error {
                        color: #FF3D45;
                        margin: 12px 0;
                    }

                    .form-success {
                        padding-bottom: 46px;
                        text-align: center;
                    }

                    .form-row {
                        margin: 12px 0;
                    }

                    .form-row label {
                        cursor: url(/pointer.png), auto;
                        cursor: -webkit-image-set(
                            url('/pointer.png') 1x,
                            url('/pointer@2x.png') 2x,
                            url('/pointer@3x.png') 3x
                        ), auto; 
                    }

                    .form-row input {
                        cursor: url(/pointer.png), auto;
                        cursor: -webkit-image-set(
                            url('/pointer.png') 1x,
                            url('/pointer@2x.png') 2x,
                            url('/pointer@3x.png') 3x
                        ), auto; 
                        margin-right: 8px;
                    }
                    
                    .report {
                        background-color: #F4B728;
                        border-radius: 80px;
                        border: 0;
                        color: #ffffff;
                        cursor: url(/pointer.png), auto;
                        cursor: -webkit-image-set(
                            url('/pointer.png') 1x,
                            url('/pointer@2x.png') 2x,
                            url('/pointer@3x.png') 3x
                        ), auto;  
                        float:right;
                        outline: 0;
                        margin-bottom: 24px;
                        margin-top: 12px;
                        padding: 12px;
                        text-transform: uppercase;
                        font-family: "Syncopate", -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
                            Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
                        width: 120px;
                    }
                    

                    @keyframes slideIn {
                        0% {
                            opacity: 0 !important;
                        }
                        100% {
                            opacity: 1 !important;
                        }
                    }

                    @keyframes slideOut {
                        0% {
                            opacity: 1 !important;
                        }
                        100% {
                            opacity: 0 !important;
                        }
                    }

                    @media only screen and (max-width: 600px) {
                        .dialog-body {
                            left: 0;
                            margin: 5%;
                            top: 0;
                            width: 90%;
                        }
                    }
                `}</style>
            </div>
        )
    }
}