import React from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

export default class Dialog extends React.Component {
    constructor(props) {
        super(props)

        this.escFunction = this.escFunction.bind(this)
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

    handleReportPost = (event) => {
        event.preventDefault()

        console.log('submit')
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
                        <h3>Report</h3>
                        <div className="dialog-warning">
                            Please contact us at <a href="mailto:hi@zeme.team" title="Contact">hi@zeme.team</a> to report copyright violations.
                        </div>

                        <div className="dialog-form">
                            <b>Why are you reporting this?<span className="required">*</span></b>

                            <form onSubmit={this.handleReportPost}>
                                <div className="formRow">
                                    <input name="report" id="spam" value="spam" type="radio" />
                                    <label htmlFor="spam">Spam</label>
                                </div>
                                <div className="formRow">
                                    <input name="report" id="inappropriate" value="inappropriate" type="radio" />
                                    <label htmlFor="inappropriate">Harmful / Inappropriate content</label>
                                </div>
                                <div className="formRow">
                                    <input name="report" id="harassment" value="harassment" type="radio" />
                                    <label htmlFor="harassment">Bullying / Harassment</label>
                                </div>
                                <div className="formRow">
                                    <input name="report" id="unrelated" value="unrelated" type="radio" />
                                    <label htmlFor="unrelated">Unrelated to Zcash</label>
                                </div>

                                <ReCAPTCHA sitekey="6Ld8DEsbAAAAAAe7iYFd4qwmEWmWDn8mpTd4qcN8"  />
                                
                                <button className="report" type="submit">Report</button>
                            </form>
                        </div>
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
                        margin-bottom: 12px;
                        padding: 12px;
                        width: 100%;
                    }

                    .dialog-warning a {
                        color: #F4B728;
                    }

                    .formRow {
                        margin: 12px 0;
                    }

                    .formRow input {
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