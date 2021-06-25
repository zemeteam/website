import React from 'react'
import { Supabase } from '../lib/supabase'
import _ from 'underscore'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import ReactTooltip from 'react-tooltip'
import Grid from './Grid'
import QR from './QR'
import Button from './Button'
import Wallets from './Wallets'
import Dialog from './Dialog'
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'

const POST_STATUS_LIVE = 1
const POST_STATUS_IN_REVIEW = 2
const POST_VIEW_THRESHOLD = 5
const POSTS_PER_PAGE = 500

export default class Details extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            copied: false,
            currentRangeStart: 0,
            currentRangeEnd: POSTS_PER_PAGE,
            dialogVisible: false,
            hasMore: true,
            imgWidth: 700,
            isLoaded: false,
            posts: [],
            showWallets: false
        }

        this._timeout = null
        this.tipRef = React.createRef()
        this.targetElement = null
        this.image = React.createRef()
    }

    static async getInitialProps(context) {
        return { 
            display: display,
            post: post
        }
    }

    componentDidMount() {
        this.targetElement = document.querySelector('#dialog')

        // preload the image
        const img = this.image.current
        if (img && img.complete) {
            this.setState({ 
                imgWidth: img.offsetWidth,
                isLoaded: true,
            })
        }

        // fetch random posts
        this.fetchRandom(this.props.post.view_count)

        // save page view
        this.savePageView(this.props.post.id, this.props.post.status)
    }

    fetchRandom = async (views) => {
        // display random posts based on their view_count
        if (views >= POST_VIEW_THRESHOLD) {
            var { data, error } = await Supabase
                .from('posts')
                .select('id, slug, asset_url, title, description, address, created_at, status, view_count')
                .range(this.state.currentRangeStart, this.state.currentRangeEnd)
                .filter('status', 'eq', POST_STATUS_LIVE)
                .lte('view_count', views)     
        } else {
            var { data, error } = await Supabase
                .from('posts')
                .select('id, slug, asset_url, title, description, address, created_at, status, view_count')
                .range(this.state.currentRangeStart, this.state.currentRangeEnd)
                .filter('status', 'eq', POST_STATUS_LIVE)
                .gte('view_count', views)  
        }
            
        // check to ensure the query returned results
        if (data.length > 0){
            // update states 
            this.setState({ 
                posts: [...this.state.posts, ..._.shuffle(data)],
                currentRangeStart: this.state.currentRangeStart + POSTS_PER_PAGE + 1,
                currentRangeEnd: this.state.currentRangeEnd + POSTS_PER_PAGE + 1,
                hasMore: false
            })
        
        } else {
            // no more post results exist
            this.setState({ hasMore: false }) 
        }
    }

    onImgLoad = ({target:img}) => {
        if (!this.state.isLoaded) {
            this.setState({ 
                imgWidth: img.offsetWidth,
                isLoaded: true,
            })
        }
    }

    extractImageId = (asset_url) => {
        const regex = /([^\/]+)(?=\.\w+$)/
        const imageId = asset_url.match(regex)[0]

        return imageId
    }

    savePageView = async (id, status) => {
        // only update the counters if the post is live
        if (status === POST_STATUS_LIVE) {
            // save the page view to the database 
            // no identifying information is saved
            const { data, error } = await Supabase
            .from('views')
            .insert([
                { post_id: id, }
            ])

            // increment the counter on the posts object
            const { data1, error1 } = await Supabase
            .rpc('increment', { 
                x: 1, 
                post_id: id 
            })
        }
    }

    handleDetailsModal = (post) => {
        this.setState({ 
            copied: false,
            currentPost: post
        })   

        this.props.handleScrollToTop()
    }

    handleCopyAddress = () => {
        this.setState({
            copied: true
        })
    }

    handleTipClick = () => {
        this.tipRef.current.scrollIntoView()
    }

    handleNeedWallet = () => {
        this.setState({
            showWallets: !this.state.showWallets
        })
    }

    handleReport = () => {
        // enable or disable body scroll if dialog is open
        this.state.dialogVisible ? enableBodyScroll(this.targetElement) : disableBodyScroll(this.targetElement)

        this.setState({
            dialogVisible: !this.state.dialogVisible
        })   
    }

    convertMonthToString = (month) => {
        switch(month) {
            case 1:
                return "Jan"
            case 2:
                return "Feb"
            case 3:
                return "Mar"
            case 4:
                return "Apr"
            case 5:
                return "May"
            case 6:
                return "Jun"
            case 7:
                return "Jul"     
            case 8:
                return "Aug"
            case 9:
                return "Sep"    
            case 10:
                return "Oct"    
            case 11:
                return "Nov"   
            case 12:
                return "Dec"    
            default:
                return "Jan"
          }
    }

    setImageUrl = (asset, extension) => {
        if (asset.includes('.gif')) {
            return `https://res.cloudinary.com/zemeteam/image/upload/c_scale/${this.extractImageId(asset)}.webp`
        } else {
            return `https://res.cloudinary.com/zemeteam/image/upload/w_1200,c_scale/${this.extractImageId(asset)}${extension}`
        }
    }

    render() {
        const post = this.state.currentPost ? this.state.currentPost : this.props.post
        const dateCreated = new Date(post.created_at)

        return ( 
            <div className="post-details">
                {post.status === POST_STATUS_LIVE &&
                    <div>
                        <div className="inner" style={{ width: this.state.imgWidth }}>
                            <div className={`image-container ${!this.state.isLoaded ? 'pulsate' : '' }`}>
                                <picture>
                                    <source 
                                        srcSet={this.setImageUrl(post.asset_url, '.webp')}
                                        className="image"
                                        onLoad={this.onImgLoad}
                                        type="image/webp" />
                                    <img 
                                        src={this.setImageUrl(post.asset_url)}
                                        alt={post.title}
                                        ref={this.image}
                                        className="image"
                                        style={{ width: this.state.imgWidth }}
                                        onLoad={this.onImgLoad} />
                                </picture>    
                            </div>

                            <div className="title">
                                {post.title}
                            </div>

                            <div className="description" style={{ color: post.description ? '#000000' : '#666666' }}>
                                {post.description ? post.description : 'No description'}
                            </div>

                            <div className="created" ref={this.tipRef}>
                                {this.convertMonthToString(dateCreated.getMonth())} {dateCreated.getDate()} {dateCreated.getFullYear()}
                            </div>

                            <div className="QR">
                                <CopyToClipboard text={post.address} onCopy={() => this.handleCopyAddress() }>
                                    <div>
                                        <QR address={post.address} 
                                            size={120} 
                                            iconSize={38} />

                                        <div className="QR-address">
                                            {post.address}&nbsp;
                                            
                                            {this.state.copied ? 
                                                <b style={{color: '#5DF428'}}>copied</b>
                                            : 
                                                <b style={{color: '#F9BB00'}}>copy</b>
                                            }
                                        </div>
                                    </div>
                                </CopyToClipboard>
                            </div>

                            <div className="shielded-stats" style={{ width: this.state.imgWidth }}>
                                <div className="inside">
                                    <div className="label">Tips received</div>
                                    <div className="block">
                                        <img src="icon-shield.png" alt="Shield" width={20} />
                                        <div>SHIELDED</div>
                                    </div>
                                    <img src="icon-info.png" alt="Info" className="more-info" width={24} data-tip data-for="shielded-info" />
                                </div>
                                <div className="inside">
                                    <div className="label">Earned</div>
                                    <div className="block">
                                        <img src="icon-shield.png" alt="Shield" width={20} />
                                        <div>SHIELDED</div>
                                    </div>
                                    <img src="icon-info.png" alt="Info" className="more-info" width={24} data-tip data-for="shielded-info" />
                                </div>
                            </div>
                            
                            <div>
                                <div className="wallet">
                                    <div onClick={() => this.handleNeedWallet() }>Need a wallet?</div>
                                </div>

                                <div className="report">
                                    <div>
                                        <img src="icon-attention.png" width={18} />
                                    </div>
                                    <div onClick={() => this.handleReport()}>Report post</div>
                                </div>
                            </div>

                            <div className="wallets">
                                <Wallets visible={this.state.showWallets} />
                            </div>
                        </div>

                        <div className="tooltip">
                            <ReactTooltip backgroundColor="black" id="shielded-info">
                                Shielded transactions on Zcash (addresses starting with "z") <br />
                                are fully private. Z-addrs hide transaction history, account <br />  
                                balances, amounts, etc. from public view. Privacy matters.
                            </ReactTooltip>
                        </div>
                    </div>
                }

                {/* the post is pending review */}
                {post.status === POST_STATUS_IN_REVIEW &&
                    <div className="pending-review">
                        <img src="in-review.png" />
                        <div className="header">
                            Pending Review
                        </div>
                        <div className="header2">
                            This post is currently under review.<br /> Please check again later.
                        </div>
                    </div>
                }

                {/* report post dialog */}
                <div id="dialog">
                    {this.state.dialogVisible && 
                        <Dialog 
                            post={post} 
                            visible={this.state.dialogVisible}
                            handleCloseDialog={this.handleReport} />

                    }
                </div>

                <div className="more">
                    <div className="label">More Zemes</div>
                    
                    <Grid 
                        display={this.props.display}
                        hasMore={false}
                        handleDetailsModal={this.handleDetailsModal}
                        posts={this.state.posts} 
                        theme="details" />

                </div>

                {post.status === POST_STATUS_LIVE &&
                    <div>
                        <a href={`https://twitter.com/intent/tweet?url=https://zeme.team/${encodeURIComponent(post.slug)}&text=${encodeURIComponent(post.title)}%20on%20@zemeteam%20%24ZEC%0D%0D&hashtags=Zcash%2CZeme`} target="_blank" title="Tweet">
                            <Button label="Tweet" type="button-tweet" />
                        </a>
                    
                        <div onClick={() => this.handleTipClick() }>
                            <Button label="Tip" type="button-tip"  />
                        </div>
                    </div>
                }

                <style jsx>{`
                    .post-details {
                        margin: auto;
                        padding: 0;
                        text-align: center;
                        width: 100%;
                    }

                    .post-details .inner {
                        margin: auto;
                        top: 76px;
                        position: relative;
                        min-width: 500px;
                        max-width: 750px;
                    }

                    .post-details .image-container {
                        background-color: #ececec;
                        border-radius: 20px;
                        height: auto;
                        padding: 0;
                        min-height: 320px;
                        user-select: none;
                        width: 100%;
                    }

                    .post-details .image-container.pulsate {
                        animation: pulsate 1.25s infinite;
                    }

                    .post-details .image {
                        border-radius: 20px;
                        display: block;
                        max-width: 750px;
                        min-width: 500px;
                    }

                    .post-details .title {
                        font-size: 20px;
                        line-height: 26px;
                        margin-top: 24px;
                        text-align: left;
                        text-transform: uppercase;
                    }

                    .post-details .description {
                        font-family: 'Overpass Mono', monospace;
                        font-size: 16px;
                        letter-spacing: -0.6px;
                        line-height: 28px;
                        margin-top: 12px;
                        text-align: left;
                        white-space: pre-line;
                    }

                    .post-details .created {
                        color: #666666;
                        font-family: 'Overpass Mono', monospace;
                        font-size: 13px;
                        margin-top: 12px;
                        text-align: left;
                    }

                    .post-details .QR {
                        border: solid 1px #E9E9E9;
                        border-radius: 24px;
                        cursor: url(/pointer.png), auto;
                        cursor: -webkit-image-set(
                            url('/pointer.png') 1x,
                            url('/pointer@2x.png') 2x,
                            url('/pointer@3x.png') 3x
                        ), auto;  
                        margin: auto;
                        margin-top: 28px;
                        padding: 32px;
                        text-align: center;
                        transition: opacity .25s;
                    }

                    .post-details .QR:active {
                        opacity: .5;
                    }

                    .post-details .QR-address {
                        color: #666666;
                        cursor: url(/pointer.png), auto;
                        cursor: -webkit-image-set(
                            url('/pointer.png') 1x,
                            url('/pointer@2x.png') 2x,
                            url('/pointer@3x.png') 3x
                        ), auto;  
                        font-family: 'Overpass Mono', monospace;
                        font-size: 13px;
                        margin: auto;
                        max-width: 380px;
                        text-align: center;
                        word-wrap: break-word;
                        width: 100%;
                    }

                    .post-details .shielded-stats {
                        display: flex;
                        margin: auto;
                        margin-top: 24px;
                        text-align: left;
                    }

                    .post-details .shielded-stats .label {
                        color: #666666;
                        font-family: 'Overpass Mono', monospace;
                        font-size: 14px;
                    }

                    .post-details .shielded-stats .inside {
                        background-color: #f9f9f9;
                        border-radius: 24px;
                        height: 92px;
                        overflow: hidden;
                        padding: 18px 20px;
                        position: relative;
                        width: 50%;
                    }

                    .post-details .shielded-stats .inside .block {
                        display: flex;
                        margin-top: 6px;
                    }

                    .post-details .shielded-stats .inside .block img {
                        margin-right: 8px;
                    }

                    .post-details .shielded-stats .inside .block div {
                        font-size: 16px;
                        margin-top: 4px;
                    }

                    .post-details .shielded-stats .inside .more-info {
                        position: absolute;
                        right: 16px;
                        top: 16px;
                    }

                    .post-details .shielded-stats .inside:nth-child(1) {
                        margin-right: 16px;
                    }

                    .post-details .report,
                    .post-details .wallet { 
                        color: #909090;
                        cursor: url(/pointer.png), auto;
                        cursor: -webkit-image-set(
                            url('/pointer.png') 1x,
                            url('/pointer@2x.png') 2x,
                            url('/pointer@3x.png') 3x
                        ), auto;  
                        display: flex;
                        float: right;
                        font-family: 'Overpass Mono', monospace;
                        font-size: 13px;
                        margin-top 16px;
                        transition: color .25s;
                    }

                    .post-details .wallet {
                        color: #F4B728;
                        float: left;
                    }

                    .post-details .wallets {
                        margin-bottom: 12px;
                        margin-top: 48px;
                    }

                    .post-details .report:hover,
                    .post-details .wallet:hover {
                        color: #000000;
                    }

                    .post-details .report div,
                    .post-details .wallet div  {
                        display: inline-block;
                        float: right;
                    }

                    .post-details .report img {
                        margin-right: 6px;
                    }

                    .post-details .more {
                        border-top: solid 1px #E9E9E9;
                        font-size: 16px;
                        margin: auto;
                        margin-top: 176px;
                        padding-bottom: 176px;
                        text-align: center;
                        width: 95%;
                    }

                    .post-details .more .label {
                        margin-top: 48px; 
                        margin-bottom: 36px;
                        text-transform: uppercase;
                    }

                    .post-details .pending-review {
                        padding-top: 54px;
                        text-align: center;
                    }

                    .post-details .pending-review .header {
                        margin-top: 32px;
                        text-transform: uppercase;
                    }

                    .post-details .pending-review .header2 {
                        color: #666666;               
                        font-family: 'Overpass Mono', monospace;
                        font-size: 16px;
                        letter-spacing: -0.45px;     
                        margin-top: 12px;
                    }

                    .tooltip {
                        font-family: 'Overpass Mono', monospace !important;
                        font-size: 13px !important;
                        width: 300px !important;
                    }

                    @keyframes pulsate {
                        0% {
                            opacity: 1;
                        }
                    
                        50% {
                            opacity: .15;
                        }

                        100% {
                            opacity: 1;
                        }
                    }

                    @media only screen and (max-width: 750px) {
                        .post-details .inner {
                            max-width: 100%;
                            min-width: 100%;  
                            padding-top: 0;
                            width: 100% !important;
                        }

                        .post-details .image {
                            border-radius: 0;
                            margin: 0;
                            margin-top: 0;
                            max-width: 100%;
                            min-width: 100%;
                            padding: 0;
                        }

                        .post-details .QR {
                            margin: 16px;
                        }

                        .post-details .QR .address {

                        }

                        .post-details .title {
                            padding: 0 16px;
                        }

                        .post-details .description {
                            padding: 0 16px;
                        }

                        .post-details .created {
                            padding: 0 16px;
                        }

                        .post-details .wallet {
                            padding-left: 20px;
                        }

                        .post-details .report {
                            padding-right: 20px;
                        }

                        .post-details .shielded-stats {
                            display: block;
                            padding: 0 16px;
                        }

                        .post-details .shielded-stats .inside {
                            width: 100%;
                        }

                        .post-details .shielded-stats .inside:nth-child(1) {
                            margin-bottom: 12px;
                            margin-right: 0;
                        }

                        .post-details .image-container {
                            border-radius: 0;
                            min-height: 168px;
                        }

                        .post-details .shielded-stats {
                            max-width: 100%;
                            min-width: 100%;                            
                        }
                    }
                `}</style>
            </div>
        )
    }
}