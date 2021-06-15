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
            <div className="download-wallets" style={{ display: visible ? 'flex' : 'none'}}>
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
                        <div className="platforms">Android, iOS, desktop</div>
                    </a>
                </div>

                <style jsx>{`
                    .download-wallets {
                        display: flex;
                        font-family: 'Overpass Mono', monospace;
                        margin: auto;
                        margin-bottom: 12px;
                        margin-top: 48px;
                        width: 100%;
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

                    .download-wallets .wallet-choice:nth-child(3) {
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
                            padding: 0 16px;
                        }

                        .download-wallets .wallet-choice .name {
                            font-size: 12px;
                        }

                        .download-wallets .wallet-choice .platforms {
                            font-size: 11px;
                        }
                    }
                `}</style>
            </div>
        )
    }
}