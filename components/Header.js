import React from 'react'
import Menu from './Menu'

export default class Header extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            menuVisible: false
        }
    }

    static async getInitialProps(context) {
        return { 
            background: background,
            logo: logo,
            handleClose: handle
        }
    }

    handleMenuToggle = () => {
        this.setState({ 
            menuVisible: !this.state.menuVisible,
        })   
    }

    render() {
        const background = this.props.background
        const logo = this.props.logo

        return ( 
            <div className="header" style={{backgroundColor: background, zIndex: this.state.menuVisible ? 10 : 4}}>
                {!this.state.menuVisible &&
                    <div className="menu" onClick={() => this.handleMenuToggle() }>
                        <img src="/icon-menu.png" />
                        <div>Menu</div>
                    </div>
                }

                {this.props.handleClose &&
                    <div className="logo" onClick={() => this.props.handleClose()}>
                        <img src={`/${logo}.png`} alt="Zeme Team" />
                    </div>
                }

                {!this.props.handleClose &&
                    <div className="logo">
                        <a href="/discover" title="Zeme Team🛡️: Zcash memes, Zcash gifs, Zcash art"> 
                            <img src={`/${logo}.png`} alt="Zeme Team" />
                        </a>
                    </div>
                }
                                
                {this.state.menuVisible && 
                    <Menu 
                        visible={this.state.menuVisible} 
                        handleMenuToggle={this.handleMenuToggle} />
                }

                <style jsx>{`
                    .header {
                        height: 76px;
                        position: absolute;
                        text-transform: uppercase;
                        width: 100%;
                    }

                    .menu {
                        height: 76px;
                        font-size: 15px;
                        position: absolute;
                        transition: opacity .25s;
                        user-select: none;
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
                        left: 30px;
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
                        left: 38px;
                        position: relative;
                        top: 20px;
                    }

                    .logo {
                        left: calc(50% - 21px);
                        position: relative;
                        top: 27px;
                        cursor: url(/pointer.png), auto;
                        cursor: -webkit-image-set(
                            url('/pointer.png') 1x,
                            url('/pointer@2x.png') 2x,
                            url('/pointer@3x.png') 3x
                        ), auto;  
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