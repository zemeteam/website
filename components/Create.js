import React from 'react'
import { server } from '../config'
import { bech32 } from 'bech32'
import striptags from 'striptags'
import ReCAPTCHA from 'react-google-recaptcha'
import Wallets from './Wallets'

const FILE_TYPES_ACCEPTED = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/webp']
const FILE_SIZE_LIMIT = 10000000 // 10mb

export default class Create extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            address: '',
            description: '',
            error: null,
            image: '',
            loading: false,
            progress: false,
            reason: null,
            status: 'ready',
            showWallets: false,
            title: ''
        }

        this.recaptchaRef = React.createRef()
    }

    static async getInitialProps(context) {
        return { 
            display: display
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        const recaptchaValue = this.recaptchaRef.current.getValue()

        // only proceed if the form isn't already submitting
        if (!this.state.loading) {
            // set loading state to true
            this.setState({ loading: true }) 

            // check to ensure a file was selected
            if (this.state.image === '') {
                this.setState({ 
                    loading: false,
                    status: 'error', 
                    error: 'Please upload a file (jpg, png, gif, webp).' 
                })   
                return
            }
            
            // check to ensure the title was entered
            if (this.state.title === '') {
                this.setState({ 
                    loading: false,
                    status: 'error', 
                    error: 'Please enter a title.' 
                })   
                return
            }

            // check to ensure the z-address was entered
            if (this.state.address === '' || this.validateAddress(this.state.address) !== 'zs') {
                this.setState({ 
                    loading: false,
                    status: 'error', 
                    error: 'Please enter a valid Zcash z-address.' 
                }) 
                return
            }  

            // check to ensure captcha was completed
            if (!recaptchaValue) {
                this.setState({ 
                    loading: false,
                    status: 'error', 
                    error: 'Please complete the CAPTCHA.' 
                })   
                return
            }  

            // insert the post object into Supabase
            const res = await fetch(`${server}/api/post`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(
                    { 
                        address: striptags(this.state.address.trim()), 
                        description: striptags(this.state.description.trim().substring(0,4999)),
                        title: striptags(this.state.title.trim().substring(0,99)),
                    }
                )
            })
            const data = await res.json()

            // if the submit completed update the ui
            if (res.ok && data) {
                this.setState({
                    status: 'complete'
                })      

                // redirect to the live post
                window.location.href = "/" + data.slug
            } else {
                this.setState({ 
                    loading: false,
                    status: 'error', 
                    error: 'An unknow error happened. Please try again.' 
                })  
                return                       
            }
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

    handleAddressChange = (event) => {
        this.setState({
            address: striptags(event.target.value.trim())
        })
    }

    handleTitleChange = (event) => {
        this.setState({
            title: striptags(event.target.value.trim().substring(0,99))
        })
    }

    handleDescriptionChange = (event) => {
        this.setState({
            description: striptags(event.target.value.trim().substring(0,4999))
        })
    }

    handleFileChange = (event) => {
        const file = event.target.files[0]
        
        // ensure the file size is less than the limit and the file is a supported image type
        if (file && FILE_SIZE_LIMIT >= file.size && FILE_TYPES_ACCEPTED.includes(file.type)) {
            console.log(file)
            this.setState({
                image: file
            })
        }
      }

    validateAddress = (address) => {
        try {
            bech32.decode(address)
            return bech32.decode(address).prefix
        } catch (error) {
            return false
        }
    }

    render() {
        const display = this.props.display

        return ( 
            <div className="create">
                <form onSubmit={this.handleSubmit}>

                    <div className="form-row">
                        <input onChange={this.handleFileChange} accept=".jpg, .png, .jpeg, .gif, .webp" type="file" />
                    </div>
                    <div className="form-row">
                        <label htmlFor="title">Title<span className="required">*</span></label><br />
                        <input id="title" placeholder="Add a title" onChange={this.handleProgress} type="text" onChange={this.handleTitleChange} autoComplete="off" maxLength="100" />
                    </div>

                    <div className="form-row">
                        <label htmlFor="description">Description</label><br />
                        <textarea id="description" placeholder="Write a description (optional)" style={{height: 120}} onChange={this.handleDescriptionChange} autoComplete="off" maxLength="5000"></textarea>
                    </div>

                    <div className="form-row">
                        <label htmlFor="address">Zcash z-address<span className="required">*</span></label><br />
                        <input id="address" placeholder="e.g. zs1n7pjuk54xp9..." type="text" onChange={this.handleAddressChange} style={{marginBottom: 6}} />
                    </div>

                    <div className="wallet">
                        <div onClick={() => this.handleNeedWallet() }>Need a Zcash z-address?</div>
                    </div>

                    <div className="wallets">
                        <Wallets visible={this.state.showWallets} />
                    </div>

                    <div className="recaptcha">
                        <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} ref={this.recaptchaRef} />
                    </div>

                    {this.state.status === 'error' &&
                        <div className="form-error">
                            {this.state.error}
                        </div>
                    }

                    <div className={`button ${this.state.loading ? 'disabled' : ''}`}>
                        <button className="post" type="submit">Post</button>
                    </div>


                </form>
                <style jsx>{`
                    .create {
                        font-family: 'Overpass Mono', monospace !important;
                        letter-spacing: -0.6px;
                        margin: auto;
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
                        border: solid 1px #F5F5F5;
                        color: #000000;
                        font-family: 'Overpass Mono', monospace !important;
                        font-size: 15px;
                        letter-spacing: -0.6px;
                        margin-bottom: 16px;
                        margin-top: 6px;
                        outline: none;
                        padding: 14px;
                        transition: background .25s;
                        width: 640px;
                    }

                    .create input {
                        height: 56px;
                    }

                    .create input:focus, 
                    .create textarea:focus {
                        background-color: #ffffff;
                        border: solid 1px #F4B728;
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


                    .create .form-error {
                        color: #FF3D45;
                        margin: 12px 0;
                        text-align: right;
                    }

                    .create .recaptcha,
                    .create .button {
                        display: flex;
                        justify-content: flex-end;
                        margin-top: 16px;
                    }

                    .create .disabled{
                        opacity: .5;
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
                        margin-bottom: 200px;
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
                            font-size: 16px;
                            width: 100%
                        }
                    }

                `}</style>
            </div>
        )
    }
}