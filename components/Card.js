import React from 'react'
import Link from 'next/link'
import VisibilitySensor from 'react-visibility-sensor'
import { isMobile } from 'react-device-detect'
import QR from './QR'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import styles from '../styles/Card.module.css'

export default class Card extends React.Component {
    constructor(props) {
        super(props)

        this.state = { 
            copied: false,
            imgHeight: 196,
            isHovering: false,
            isLoaded: false
        }
    }

    static async getInitialProps(context) {
        return { 
            id: id,
            display: display,
            post: post,
            theme: theme
        }
    }

    extractImageId = (asset_url) => {
        const regex = /([^\/]+)(?=\.\w+$)/
        const imageId = asset_url.match(regex)[0]

        return imageId
    }

    onImgLoad = ({target:img}) => {
        this.setState({ 
            imgHeight: img.offsetHeight,
            isLoaded: true
        })
    }

    handleMouseEnter = () => {
        this.setState({
            isHovering: true
        })
    }

    handleMouseLeave = () => {
        this.setState({
            isHovering: false
        })
    }

    handleCopyAddress = () => {
        this.setState({
            copied: true
        })
    }

    render() {
        const post = this.props.post
        const cardHover = (
            <div className={styles.postCardHover} 
                style={{ 
                    height: this.state.imgHeight,
                    border: this.props.theme === 'details' ? 'solid 2px #f5f5f5' : 'none',
                }}>
                    <div className={styles.QRblock}>
                        <QR address={post.address} size={110} iconSize={36} />
                    </div> 
            </div>
        )
        const picture = (
            <picture>
                <source 
                    srcSet={`https://res.cloudinary.com/zemeteam/image/upload/c_scale,w_700/${this.extractImageId(post.asset_url)}.webp`}
                    onLoad={this.onImgLoad}
                    type="image/webp" />
                <img 
                    src={`https://res.cloudinary.com/zemeteam/image/upload/c_scale,w_700/${this.extractImageId(post.asset_url)}`}
                    alt={post.title}
                    onLoad={this.onImgLoad} />
            </picture>    
        )

        return ( 
            <div 
                className="post-card" 
                style={{ 
                    backgroundColor: this.props.theme === 'details' ? '#f9f9f9' : '',
                    height: this.state.imgHeight,
                }}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
            >                         

                <VisibilitySensor partialVisibility={true} offset={{ top:-450, bottom:-450 }}>
                    {({isVisible}) => {
                        return (
                            <div className={`post-card-inner ${!this.state.isLoaded ? 'post-card-loading' : ''}`} style={{opacity: isVisible ? 1 : 0 }}> 
                                {!isVisible && 
                                    // this is needed to trigger the VisibilitySensor
                                    <div style={{height: 1}}></div> 
                                }

                                {!isMobile && this.state.isHovering && 
                                    <div>
                                        
                                        {/* if the card is being opened in a modal the Link needs to use Next.js links */}
                                        {this.props.display === 'modal' &&
                                            <Link 
                                                href={`/beta-testing-staging-data-only?page=discover&id=${post.id}`} 
                                                as={`/${post.slug}`}
                                                scroll={false}
                                            >
                                                <a href={post.slug} title={post.title} onClick={() => this.props.handleOpenModal(post) }>   
                                                    {cardHover}
                                                </a>
                                            </Link>
                                        }

                                        {/* if the card is being opened as a page don't use Next.js links */}
                                        {this.props.display === 'page' &&
                                            <a href={post.slug} title={post.title}>   
                                                {cardHover}
                                            </a>
                                        }

                                        <CopyToClipboard text={post.address} onClick={(e) => e.stopPropagation()} onCopy={() => this.handleCopyAddress() }>
                                            <div className="QR-address">
                                                {post.address.substr(0, 8)}...{post.address.substr(post.address.length - 5)}&nbsp;
                                                
                                                {this.state.copied ? 
                                                    <b style={{color: '#5DF428'}}>copied</b>
                                                : 
                                                    <b style={{color: '#F9BB00'}}>copy</b>
                                                }
                                            </div>
                                        </CopyToClipboard>

                                        <a href={`https://twitter.com/intent/tweet?url=https://zeme.team/${encodeURIComponent(post.slug)}&text=${encodeURIComponent(post.title)}%20on%20@zemeteam%20%24ZEC%0D%0D&hashtags=Zcash%2CZeme`} target="_blank" title="Tweet it">
                                            <div className="tweet"></div>
                                        </a>
                                    </div>
                                }

                                {/* if PostCard is being opened in a modal the Link needs to use Next.js links */}
                                {isVisible && this.props.display === 'modal' &&
                                    <Link 
                                        href={`/beta-testing-staging-data-only?page=discover&id=${post.id}`} 
                                        as={`/${post.slug}`}
                                        scroll={false}
                                    >
                                        <a href={post.slug} title={post.title} onClick={() => this.props.handleOpenModal(post) }>   
                                            {picture}
                                        </a>
                                    </Link>
                                }

                                {/* if PostCard is being opened as a page don't use Next.js links */}
                                {this.props.display === 'page' &&
                                    <a href={post.slug} title={post.title}>   
                                        {picture}
                                    </a>
                                }
                            </div>
                        )
                    }}
                </VisibilitySensor>

                <style jsx>{`
                    .post-card {
                        position: relative;
                        user-select: none;
                    }

                    .post-card-inner {
                        transition: opacity .5s;
                    }

                    .post-card-loading {
                        animation: pulsate 1.25s infinite;
                        height: 244px;
                    }

                    .QR-address {
                        color: #666666;
                        cursor: url(/pointer.png), auto;
                        cursor: -webkit-image-set(
                            url('/pointer.png') 1x,
                            url('/pointer@2x.png') 2x,
                            url('/pointer@3x.png') 3x
                        ), auto;  
                        font-family: 'Overpass Mono', monospace;
                        font-size: 12px;
                        left: calc(50% - 90px);
                        overflow: hidden;
                        position: absolute;
                        text-align: center;
                        text-overflow: ellipsis;
                        top: calc(50% + 60px);
                        white-space: nowrap;
                        width: 180px;
                    }

                    .tweet {
                        animation: fade .25s;
                        background-image: url(/twitter.png);
                        background-position: top center;
                        background-repeat: no-repeat;
                        background-size: cover;
                        bottom: 16px;
                        cursor: url(/pointer.png), auto;
                        cursor: -webkit-image-set(
                            url('/pointer.png') 1x,
                            url('/pointer@2x.png') 2x,
                            url('/pointer@3x.png') 3x
                        ), auto;  
                        height: 40px;
                        position: absolute;
                        right: 16px;
                        transition: opacity .25s;
                        width: 40px;
                    }

                    .tweet:active {
                        opacity: .50;
                    }

                    @keyframes pulsate {
                        0% {
                            opacity: 1;
                        }
                    
                        50% {
                            opacity: .35;
                        }

                        100% {
                            opacity: 1;
                        }
                    }

                    @keyframes fade {
                        0% {
                            opacity: 0;
                        }

                        100% {
                            opacity: 1;
                        }
                    }

                    @media only screen and (max-width: 800px) {
                        .post-card-hover {
                            background-color: transparent;
                        }

                        .QR-block,
                        .tweet {
                            display: none;
                        }

                        .QR-address {
                            display: none;
                        }
                    }

                `}</style>
            </div>
        )
    }
}