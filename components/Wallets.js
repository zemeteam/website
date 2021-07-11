import React from 'react'

export default class Wallets extends React.Component {
    constructor(props) {
        super(props)
    }

    static async getInitialProps(context) {
        return { 
            visible: visible,
        }
    }

    render() {
        const visible = this.props.visible

        return ( 
            <div>
                <div className={`download-wallets ${visible ? "wallet-show" : "wallet-hide"}`}>
                    <div className="wallet-close" onClick={() => this.props.handleCloseWallet() }>
                        <img src="/icon-close.png" alt="Close" />
                    </div>

                    <div className="wallet-choice">
                        <a href="https://nighthawkwallet.com/" target="_blank" title="Nighthawk Wallet">
                            <img src="icon-nighthawk-wallet.png" width={68} />
                            <div className="name">Nighthawk</div>
                            <div className="platforms">Android, iOS</div>
                        </a>
                    </div>

                    <div className="wallet-choice">
                        <a href="https://unstoppable.money/" target="_blank" title="Unstoppable Wallet">
                            <img src="icon-unstoppable.png" width={68} />
                            <div className="name">Unstoppable</div>
                            <div className="platforms">Android, iOS</div>
                        </a>
                    </div>
                    
                    <div className="wallet-choice">
                        <a href="https://www.zecwallet.co/" target="_blank" title="Zecwallet Lite">
                            <img src="icon-zeclite.png" width={68} />
                            <div className="name">Zecwallet Lite</div>
                            <div className="platforms">Android, iOS, PC</div>
                        </a>
                    </div>
                </div>

                <div className={`overlay ${visible ? "overlay-show" : "overlay-hide"}`} onClick={() => this.props.handleCloseWallet()} ></div>

                <style jsx>{`
                    .download-wallets {
                        display: flex;
                        font-family: 'Overpass Mono', monospace;
                        margin: auto;
                        width: 100%;
                    }

                    .wallet-show {
                        display: flex;
                    }

                    .wallet-hide {
                        display: none;
                    }

                    .wallet-close {
                        background-color: rgba(245,245,245,.85);
                        border-radius: 25px;
                        cursor: url(/pointer.png), auto;
                        cursor: -webkit-image-set(
                            url('/pointer.png') 1x,
                            url('/pointer@2x.png') 2x,
                            url('/pointer@3x.png') 3x
                        ), auto;  
                        height: 50px;
                        line-height: 50px;
                        position: absolute;
                        text-align: center;
                        top: 16px;
                        right: 16px;
                        transition: opacity .25s;
                        width: 50px;
                    }

                    .wallet-close:active {
                        opacity: .5;
                    }

                    .wallet-close img { 
                        margin-top: 13px;
                        width: 24px;
                    }

                    .overlay {
                        background-color: rgba(0,0,0,.5);
                        height: 100%;
                        display: none;
                        margin: auto;
                        overflow: scroll;
                        position: fixed;
                        text-align: center;
                        top: 0;
                        left: 0;
                        width: 100%;
                        z-index: 7;
                    }

                    .overlay-show {
                        display: none; 
                    }

                    .overlay-hide {
                        display: none;
                    }

                    .download-wallets .wallet-choice {
                        border: solid 1px #E9E9E9;
                        border-radius: 20px;
                        letter-spacing: -0.4px;     
                        margin-right: 12px;
                        padding: 28px 16px;
                        text-align: center;
                        width: 33.3%;
                    }

                    .download-wallets .wallet-choice:nth-child(4) {
                        margin-right: 0;   
                    }

                    .download-wallets .wallet-choice .name {
                        font-size: 14px;
                        font-weight: 700;
                    }

                    .download-wallets .wallet-choice .platforms {
                        color: #909090;
                        font-size: 13px;
                    }

                    @media only screen and (max-width: 800px) {
                        .download-wallets {
                            background-color: #ffffff;
                            bottom: -70vh;
                            border-top-left-radius: 20px;
                            border-top-right-radius: 20px;
                            display: block;
                            height: 70vh;
                            left: 0;
                            margin: 0;
                            margin-right: 0;
                            overflow: scroll;
                            padding: 14px;
                            position: fixed;
                            transition: all .2s;
                            z-index: 10;
                        }

                        .wallet-show {
                            bottom: 0;
                        }
                        
                        .wallet-hide {
                            bottom: -70vh;
                        }

                        .overlay-show {
                            display: block; 
                        }

                        .download-wallets .wallet-choice {
                            border: 0;
                            width: 100%;
                        }

                        .download-wallets .wallet-choice:nth-child(2),
                        .download-wallets .wallet-choice:nth-child(3) {
                            padding-bottom: 0;
                        }
                    }
                `}</style>
            </div>
        )
    }
}