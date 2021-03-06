import React from 'react'
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'

export default class Menu extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            menuVisible: false
        }

        this.escFunction = this.escFunction.bind(this)
        this.targetElement = null
    }

    static async getInitialProps(context) {
        return { 
            visible: false
        }
    }
    
    componentDidMount(){
        document.addEventListener("keydown", this.escFunction, false)
        this.targetElement = document.querySelector('#menu')
    }

    componentWillUnmount(){
        document.removeEventListener("keydown", this.escFunction, false)
    }

    componentDidUpdate(){
        this.props.visible ? disableBodyScroll(this.targetElement) : enableBodyScroll(this.targetElement)
    }

    escFunction(event){
        event.stopPropagation()

        if(this.props.visible && event.keyCode === 27) {
            this.handleClose()
        }
    }

    handleClose(){
        this.props.handleMenuToggle()
        enableBodyScroll(this.targetElement)
    }

    render() {
        const visible = this.props.visible

        return ( 
            <div id="menu">
                {visible && 
                    <div className={`menu ${visible ? "menu-show" : "menu-hide"}`}>

                        <div className="menu-body">
                            <div className="menu-close" onClick={() => this.handleClose() }>
                                <img src="/icon-close-white.png" alt="Close" />
                            </div>

                            <ul>
                                <li>
                                    <a href="/" title="Zeme Team🛡️: Zcash memes, Zcash gifs, Zcash art">
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a href="mailto:hi.zeme.team@gmail.com" title="Contact" target="_blank">
                                        Contact
                                    </a>
                                </li>
                                <li>
                                    <a href="/content-policy" title="Content Policy" target="_blank">
                                        Content Policy
                                    </a>
                                </li>
                                <li>
                                    <a href="/privacy-policy" title="Privacy Policy" target="_blank">
                                        Privacy Policy
                                    </a>
                                </li>
                                <li>
                                    <a href="/terms" title="Terms of Service" target="_blank">
                                        Terms
                                    </a>
                                </li>
                                <li style={{color: '#00acee'}}>
                                    <a href="https://twitter.com/zemeteam" target="_blank" title="Zeme Team on Twitter">
                                        @zemeteam
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <style jsx>{`
                            .menu {
                                align-items: center;
                                background-color: rgba(0,0,0,.92);
                                color: #ffffff;
                                height: 100%;
                                left: 0;
                                margin: 0;
                                overflow: scroll;
                                padding: 0;
                                position: fixed;
                                text-align: center;
                                top: 0;
                                width: 100%;
                                z-index: 8;
                            }

                            .menu-body {
                                height: 100vh;
                                display: flex;
                            }

                            .menu ul {
                                list-style: none;
                                margin: auto;
                                padding: 0;
                                position: relative;
                                width: auto;
                            }

                            .menu ul li {
                                font-size: 32px;
                                height: 80px;
                                line-height: 80px;
                                text-transform: uppercase;
                                transition: all .25s;
                                user-select: none;
                            }

                            .menu ul li:active {
                                opacity: .5;
                            }

                            .menu ul li:hover {
                                color: #F4B728;
                                cursor: url(/pointer.png), auto;
                                cursor: -webkit-image-set(
                                    url('/pointer.png') 1x,
                                    url('/pointer@2x.png') 2x,
                                    url('/pointer@3x.png') 3x
                                ), auto;  
                            }

                            .menu ul li a {
                                height: 100%;
                                padding: 12px;
                            }

                            .menu-close {
                                background-color: #323232;
                                border-radius: 25px;
                                cursor: url(/pointer.png), auto;
                                cursor: -webkit-image-set(
                                    url('/pointer.png') 1x,
                                    url('/pointer@2x.png') 2x,
                                    url('/pointer@3x.png') 3x
                                ), auto;  
                                height: 50px;
                                line-height: 50px;
                                position: fixed;
                                top: 16px;
                                transition: opacity .25s;
                                right: 16px;
                                user-select: none;
                                width: 50px;
                                z-index: 9;
                            }

                            .menu-close:active {
                                opacity: .5;
                            }

                            .menu-close img { 
                                margin-top: 13px;
                                user-select: none;
                                width: 24px;
                            }

                            .menu-show {
                                animation: fadeIn .3s;
                            }
        
                            .menu-hide {
                                animation: fadeOut .3s;
                            }

                            @keyframes fadeIn {
                                0% {
                                    opacity: 0;
                                }
                                100% {
                                    opacity: 1;
                                }
                            }
        
                            @keyframes fadeOut {
                                0% {
                                    opacity: 1;
                                }
                                100% {
                                    opacity: 0;
                                }
                            }

                            @media only screen and (max-width: 600px) {
                                .menu ul li {
                                    font-size: 20px;
                                    height: 64px;
                                    line-height: 64px;
                                }

                                .menu-body {
                                    height: 75vh;
                                }
                            }
                        `}</style>
                    </div>
                }
            </div>
        )
    }
}