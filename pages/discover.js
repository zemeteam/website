import React from 'react'
import { withRouter } from 'next/router'
import { Supabase } from '../lib/supabase'
import InfiniteScroll from 'react-infinite-scroller'
import Masonry from 'react-masonry-css'
import Card from '../components/Card'
import Tabs from '../components/Tabs'
import Layout from '../components/Layout'
import Background from '../components/Background'
import Modal from '../components/Modal'
import styles from '../styles/Grid.module.css'
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'

const POST_STATUS_LIVE = 1
const POSTS_PER_PAGE = 50
const TRENDING_DAYS_BACK = 7
const FETCH_MORE_THRESHOLD = 1200
const BREAKPOINT_COLS = { 
    default: 5,
    2276: 4, 
    1840: 3, 
    1404: 2, 
    940: 1 
}

class Discover extends React.Component {

    constructor(props) {
        super(props)  

        this.state = { 
            createModalVisible: false,
            currentPost: [],
            currentTab: 'trending',
            currentRangeStart: 0,
            currentRangeEnd: POSTS_PER_PAGE,
            detailsModalVisible: false,
            hasMore: true,
            isScrolling: false,
            tabsVisible: true,
            page: 'discover', //props.router.query.page
            title: 'Zeme Team🛡️: Zcash memes, Zcash gifs, Zcash art',
            posts: [],
            router: props.router
        }

        this._timeout = null
        this.targetElement = null
    }

    componentDidMount() {
        // listen for browser back button clicks
        window.addEventListener('popstate', (event) => {
            if (event.state) {
                // this.handleCreateModal()
                this.handleCloseDetailsModal()
            }
        })

        this.targetElement = document.querySelector('#modal')

        // event listener for scrolling
        document.addEventListener("scroll", this.handleScrolling, false)
    }

    componentWillUnmount() {
        // remove listener for scrolling
        document.removeEventListener("scroll", this.handleScrolling, false)
        clearAllBodyScrollLocks()
    }

    handleTabChange = (tab) => {
        this.setState({ currentTab: tab })  
    }

    handleCreateModal = () => {
        // change router state
        if (this.state.createModalVisible) {
            this.state.router.push('/discover') //todo change this to / instead of /discover
            disableBodyScroll(this.targetElement)
        } else {
            enableBodyScroll(this.targetElement)
        }

        this.setState({ 
            createModalVisible: !this.state.createModalVisible,
            page: !this.state.createModalVisible ? 'create' : 'discover'
        }) 
    }

    handleDetailsModal = (post) => {
        this.setState({ 
            currentPost: post,
            detailsModalVisible: true,
            tabsVisible: false,
            page: 'details',
            title: post.title + ' - Zeme Team🛡️'
        })   

        disableBodyScroll(this.targetElement)
    }

    handleCloseDetailsModal = () => {
        // change router state
        this.state.router.push('/discover') //todo change this to / instead of /discover

        this.setState({ 
            detailsModalVisible: false,
            page: 'discover',
            title: 'Zeme Team🛡️: Zcash memes, Zcash gifs, Zcash art'
        })   

        enableBodyScroll(this.targetElement)
    }

    handleScrolling = () => {
        if(!this.state.isScrolling) {
            this.setState({
                isScrolling: true
            })
       
            this._timeout = setTimeout(() => {
                this._timeout = null
                this.setState({
                    isScrolling: false
                })
            }, 500)
        }
    }

    fetchLatest = async () => {
        const posts = await Supabase
            .from('posts')
            .select('id, slug, asset_url, title, description, address, created_at, status')
            .range(this.state.currentRangeStart, this.state.currentRangeEnd)
            .filter('status', 'eq', POST_STATUS_LIVE)
            .order('created_at', { 
                ascending: false 
            })

        // check to ensure the query returned results
        if (posts.data.length > 0){

            // update states 
            this.setState({ 
                posts: [...this.state.posts, ...posts.data],
                currentRangeStart: this.state.currentRangeStart++ + POSTS_PER_PAGE,
                currentRangeEnd: this.state.currentRangeEnd++ + POSTS_PER_PAGE
            })

        } else {
            // no more post results exist
            this.setState({ hasMore: false }) 
        }            
    }

    fetchTrending = async () => {
        // add days back to query
        const posts = await Supabase
            .from('posts')
            .select('id, slug, asset_url, title, description, address, created_at, status')
            .range(this.state.currentRangeStart, this.state.currentRangeEnd)
            .filter('status', 'eq', POST_STATUS_LIVE)
            .order('view_count', { 
                ascending: false 
            })          
            
        // check to ensure the query returned results
        if (posts.data.length > 0){

            // update states 
            this.setState({ 
                posts: [...this.state.posts, ...posts.data],
                // currentRangeStart: this.state.currentRangeStart++ + POSTS_PER_PAGE,
                // currentRangeEnd: this.state.currentRangeEnd++ + POSTS_PER_PAGE
            })
            
        } else {
            // no more post results exist
            this.setState({ hasMore: false }) 
        }
    }

    render() {
        return (
            <Layout 
                title={this.state.title} 
                description="Earn shielded Zcash for creating Zcash graphics (zcash gifs, zcash memes, zemes, zcash infographics, zcash price charts, zcash educational graphics, zcash quotes, etc)." 
                url="https://zeme.team">

                <Background animate />

                <div id="modal">
                    {this.state.createModalVisible &&
                        <Modal 
                            page='create' 
                            post={[]}
                            visible={this.state.createModalVisible} 
                            handleCloseModal={this.handleCreateModal} />
                    }

                    {this.state.detailsModalVisible &&
                        <Modal 
                            page='details' 
                            post={this.state.currentPost}
                            visible={this.state.detailsModalVisible} 
                            handleCloseModal={this.handleCloseDetailsModal} />
                    }   
                </div>
                
                <Tabs 
                    active={this.state.currentTab} 
                    handleTabChange={this.handleTabChange} 
                    handleCreateModal={this.handleCreateModal} />

                <main className="discover">
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={this.state.currentTab === 'trending' ? this.fetchTrending : this.fetchLatest}
                        hasMore={this.state.hasMore}
                        threshold={FETCH_MORE_THRESHOLD}
                    >
                        <Masonry
                            breakpointCols={BREAKPOINT_COLS}
                            className={styles.grid}
                            columnClassName={styles.grid_column}>
                                {this.state.posts.map((post) => (
                                    <Card 
                                        post={post} 
                                        key={post.slug} 
                                        id={post.slug} 
                                        theme="discover" 
                                        display="modal"
                                        isScrolling={this.state.isScrolling} 
                                        handleOpenModal={this.handleDetailsModal} />
                                ))}

                                {this.state.hasMore ? <div className="post-loading"></div> : '' }
                                {this.state.hasMore ? <div className="post-loading"></div> : '' }
                                {this.state.hasMore ? <div className="post-loading"></div> : '' }
                                {this.state.hasMore ? <div className="post-loading"></div> : '' }
                                {this.state.hasMore ? <div className="post-loading"></div> : '' }
                                {this.state.hasMore ? <div className="post-loading"></div> : '' } 
                                {this.state.hasMore ? <div className="post-loading"></div> : '' }
                                {this.state.hasMore ? <div className="post-loading"></div> : '' }
                                {this.state.hasMore ? <div className="post-loading"></div> : '' }
                        </Masonry>
                    </InfiniteScroll>
                </main>

                <style jsx>{`
                    html,
                    body {
                        background-color: #F9D149;
                    }

                    .discover {
                        animation: fade .5s;
                        margin: auto;
                        margin-bottom: 300px;
                        padding: 0px;
                        padding-top: 76px;
                        position: relative;
                        transition: opacity .25s ease-in;
                        z-index: 3;
                    }

                    .disable-scroll {
                        height: 100%; 
                        overflow: hidden;
                    }

                    .loader {
                        display: flex;
                        justify-content: center;
                        position: relative;
                        width: 100%;
                        z-index: 3;
                    }

                    .post-loading {
                        animation: pulsate 1.25s infinite;
                        height: 244px;
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
                    
                        75% {
                            opacity: 0;
                        }

                        100% {
                            opacity: 1;
                        }
                    }

                    @media only screen and (max-width: 940px) {
                        .discover {
                            padding-left: 16px;
                            padding-right: 16px;
                        }
                    }
                `}</style>
            </Layout>
        )
    }
}

export default withRouter(Discover)