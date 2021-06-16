import React from 'react'
import Link from 'next/link'

export default class Tabs extends React.Component {
    constructor(props) {
        super(props)
    }

    static async getInitialProps(context) {
        return { 
            active: this.props.active 
        }
    }

    render() {
        const active = this.props.active 

        return ( 
            <div>
                <div className="tabs">
                    <Link 
                        href={`/discover?page=create`} 
                        as={`/create`}
                        scroll={false}
                    >
                        <a onClick={() => this.props.handleCreateModal() }>
                            <div className="tabs-create">
                                <img src="/icon-plus.png" />
                            </div>
                        </a>
                    </Link>

                    <ul>
                        <li 
                            className={active === "trending" ? "active" : ''}
                            onClick={() => { this.props.handleTabChange('trending') }}
                            style={{ marginRight: 0 }}
                        >
                            <div className="icon">
                                <img src={active === "trending" ? "/icon-trending-white.png" : '/icon-trending-gray.png'} style={{width: 24}} />
                            </div>
                            <div className="label">Trending</div>
                        </li>

                        <li 
                            className={active === "latest" ? "active" : ''}
                            onClick={() => { this.props.handleTabChange('latest') }}
                        >
                            <div className="icon">
                                <img src={active === "latest" ? "/icon-latest-white.png" : '/icon-latest-gray.png'} style={{width: 24}} />
                            </div>
                            <div className="label">Latest</div>
                        </li>
                    </ul>
                </div>
                <style jsx>{`
                    .tabs {
                        // background-image: linear-gradient(to bottom, 
                        //     rgba(50,50,50, 1), 
                        //     rgba(0,0,0, 1) 100%);
                        background-color: #000000;
                        border: solid 1px #323232;
                        border-radius: 12px;
                        bottom: 20px;
                        box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.65);
                        height: 58px;
                        left: calc(50% - 240px);
                        padding: 0;
                        position: fixed;
                        width: 480px;
                        z-index: 4;
                    }

                    .tabs ul {
                        list-style: none;
                        margin: 0;
                        padding: 0;
                    }

                    .tabs ul li {
                        border-bottom: solid 3px #000000;
                        color: #999999;
                        cursor: url(/pointer.png), auto;
                        cursor: -webkit-image-set(
                            url('/pointer.png') 1x,
                            url('/pointer@2x.png') 2x,
                            url('/pointer@3x.png') 3x
                        ), auto;  
                        display: inline-block;
                        font-size: 13px;
                        line-height: 53px;
                        padding: 0 10px;
                        text-transform: uppercase;
                        transition: all .25s;
                        user-select: none;
                    }

                    .tabs ul li:active {
                        opacity: .75;
                    }
                    .tabs ul li:hover {
                        border-bottom: solid 3px #666666;
                        color: #d6d6d6;
                    }

                    .tabs ul li.active {
                        border-bottom: solid 3px #F9BB00;
                        color: #ffffff;
                        display: inline-block;
                    }

                    .tabs ul li:nth-child(1) {
                        float: left;
                        margin-left: 38px;
                    }

                    .tabs ul li:nth-child(2) {
                        float: right;
                        margin-right: 60px;
                    }

                    .tabs ul li .icon {
                        display: inline-block;
                        margin-right: 8px;
                    }

                    .tabs ul li .icon img {
                        vertical-align: middle;
                    }

                    .tabs ul li .label {
                        display: inline-block;
                    }

                    .tabs-create {
                        background: linear-gradient(102deg, rgba(255,157,66,1), rgba(255,75,99,1));
                        border-radius: 30px;
                        box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.85);
                        color: #ffffff;
                        cursor: url(/pointer.png), auto;
                        cursor: -webkit-image-set(
                            url('/pointer.png') 1x,
                            url('/pointer@2x.png') 2x,
                            url('/pointer@3x.png') 3x
                        ), auto;  
                        font-size: 24px;
                        height: 56px;
                        left: calc(50% - 28px);
                        position: absolute;
                        text-align: center;
                        transition: transform .5s;
                        top: -20px;
                        user-select: none;
                        width: 56px;
                    }

                    .tabs-create img {
                        cursor: url(/pointer.png), auto;
                        cursor: -webkit-image-set(
                            url('/pointer.png') 1x,
                            url('/pointer@2x.png') 2x,
                            url('/pointer@3x.png') 3x
                        ), auto;  
                        line-height: 56px;
                        margin: 11px 0;
                        transition: opacity .5s;
                        width: 32px;
                    }

                    .tabs-create:hover,
                    .tabs-create img:hover {
                        transform: scale(1.05);
                    }

                    .tabs-create:active,
                    .tabs-create img:active {
                        transform: scale(.95);
                    }

                    @media only screen and (max-width: 600px) {
                        .tabs {
                            bottom: 0;
                            border: 0;
                            border-radius: 0;
                            left: 0;
                            width: 100%;
                        }

                        .tabs ul li {
                            padding: 0;
                            text-align: center;
                            width: 50%
                        }

                        .tabs ul li:nth-child(1) {
                            float: none;
                            margin-left: 0;
                        }

                        .tabs ul li:nth-child(2) {
                            float: none;
                            margin-right: 0;
                        }

                        .tabs ul li .icon {
                            display: none;
                        }

                        .tabs ul li .label {
                            font-size: 12px;
                        }
                    }
                `}</style>
            </div>
        )
    }
}