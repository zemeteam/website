import React from 'react'
import Link from 'next/link'

export default class Menu extends React.Component {
    constructor(props) {
        super(props)
    }

    static async getInitialProps(context) {
        return { 
            background: 'transparent'
        }
    }

    render() {
        const background = this.props.background
        const logo = this.props.logo

        return ( 
            <div className="header">
                <div className="menu" onClick={() => this.props.handleMenuToggle() }>
                    <img src="/icon-menu.png" />
                    <div>Menu</div>
                </div>

            
                <div className="logo">
                    <a href="/discover" title="Zeme Team🛡️: Zcash memes, Zcash gifs, Zcash art"> 
                        <img src={`/${logo}.png`} alt="Zeme Team" />
                    </a>
                </div>

                <style jsx>{`
                    .header {
                        height: 76px;
                        position: absolute;
                        text-transform: uppercase;
                        width: 100%;
                        z-index: 4;
                    }

                    .menu {
                        height: 76px;
                        font-size: 15px;
                        position: absolute;
                        transition: opacity .25s;
                        user-select: none;
                        width: 160px;
                        z-index: 4;
                    }

                    .menu:active {
                        opacity: .5;
                    }

                    .menu img {
                        cursor: url(/pointer.png), auto;
                        cursor: -webkit-image-set(
                            url('/pointer.png') 1x,
                            url('/pointer@2x.png') 2x,
                            url('/pointer@3x.png') 3x
                        ), auto;  
                        display: inline-block;
                        height: 26px;
                        left: 38px;
                        position: relative;
                        top: 28px;
                    }

                    .menu div {
                        color: #000000;
                        cursor: url(/pointer.png), auto;
                        cursor: -webkit-image-set(
                            url('/pointer.png') 1x,
                            url('/pointer@2x.png') 2x,
                            url('/pointer@3x.png') 3x
                        ), auto;  
                        display: inline-block;
                        left: 46px;
                        position: relative;
                        top: 20px;
                    }

                    .logo {
                        left: calc(50% - 21px);
                        position: relative;
                        top: 27px;
                        width: 42px;
                    }

                    .logo img {
                        width: 100%;
                        height: 100%;
                    }

                    @media only screen and (max-width: 600px) {
                        .menu img {
                            height: 36px;
                            left: 20px;
                            top: 22px;
                        }
                        

                        .menu div {
                            display: none;
                        }
                    }
                `}</style>
            </div>
        )
    }
}