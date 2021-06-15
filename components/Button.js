import React from 'react'

export default class Button extends React.Component {
    constructor(props) {
        super(props)
    }

    static async getInitialProps(context) {
        return { 
            label: label,
            type: type
        }
    }

    render() {
        const type = this.props.type
        const label = this.props.label

        return ( 
            <div className={`button ${type}`}>
                <div className="image">
                    {type === 'button-tweet' &&
                        <img src="icon-twitter.png" alt="Icon" />
                    }

                    {type === 'button-tip' &&
                        <img src="zcash.png" alt="Icon" />
                    }
                </div>
                
                <div className="label">{label}</div>
                
                <style jsx>{`
                    .button {
                        border-radius: 12px;
                        color: #000000;
                        cursor: url(/pointer.png), auto;
                        cursor: -webkit-image-set(
                            url('/pointer.png') 1x,
                            url('/pointer@2x.png') 2x,
                            url('/pointer@3x.png') 3x
                        ), auto;  
                        display: flex;
                        font-size: 15px;
                        height: 58px;
                        line-height: 58px;
                        padding: 0 16px;
                        position: fixed;
                        right: 24px;
                        text-transform: uppercase; 
                        transition: all .5s;
                        user-select: none;
                    }

                    .button:active {
                        transform: scale(.95);
                    }

                    .button .image,
                    .button .label {
                        display: inline-block;
                        margin: auto;
                    }

                    .button .label {
                        padding-right: 6px;
                    }

                    .button-tweet {
                        background-color: #07D2FF;
                        bottom: 24px;
                        box-shadow: 0px 4px 10px rgba(7, 210, 255, .5);
                        width: 145px;
                    }

                    .button-tweet:hover {
                        background-color: #52E0FF;
                    }

                    .button-tip {
                        background-color: #F4B728;
                        bottom: 96px;
                        box-shadow: 0px 4px 10px rgba(244, 183, 40, .5);
                        width: 108px;                       
                    }

                    .button-tip:hover {
                        background-color: #FFCB51;
                    }

                    .button-tweet .image img,
                    .button-tip .image img {
                        vertical-align: middle;
                        width: 20px;
                    }

                    @media only screen and (max-width: 800px) {
                        .button {
                            height: 46px;
                            font-size: 13px;
                            line-height: 46px;
                            right: 12px;
                        }

                        .button-tweet {
                            bottom: 20px;
                            width: 128px;
                        }

                        .button-tip {
                            bottom: 76px;
                            width: 96px;
                        }
                    }
                `}</style>
            </div>
        )
    }
}