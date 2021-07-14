import React from 'react'
import { QRCode } from 'react-qrcode-logo'

export default class QR extends React.Component {
    constructor(props) {
        super(props)
    }

    static async getInitialProps(context) {
        return { 
            address: address,
            iconSize: iconSize,
            size: size
        }
    }

    render() {
        const address = this.props.address
        const iconSize = this.props.iconSize
        const size = this.props.size

        return ( 
            <div className="QR-code">
                <div className="inner">
                    <div className="label">Tip Creator</div>
                    <QRCode 
                        value={address} 
                        logoImage="/zcash.png" 
                        logoWidth={iconSize} 
                        size={size} />
                </div>

                <style jsx>{`
                    .QR-code {
                        border-radius: 12px;
                        height: 100%;
                        overflow: hidden;
                        text-align: center;
                    }

                    .QR-code:before {
                        content: ' ';
                        display: inline-block;
                        height: 100%;
                        vertical-align: middle;
                    }

                    .QR-code .inner {
                        display: inline-block;
                        vertical-align: middle; 
                    }

                    .QR-code .label {
                        text-transform: uppercase;
                        width: 100%;
                    }
                `}</style>
            </div>
        )
    }
}