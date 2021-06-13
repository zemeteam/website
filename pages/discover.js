import React from 'react'
import { withRouter } from 'next/router'
import { Supabase } from '../lib/supabase'
import InfiniteScroll from 'react-infinite-scroller'
import Tabs from '../components/Tabs'
import Layout from '../components/Layout'
import Grid from '../components/Grid'
import Background from '../components/Background'
import Modal from '../components/Modal'
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'

const POST_STATUS_LIVE = 1
const POSTS_PER_PAGE = 50
const TRENDING_DAYS_BACK = 7
const FETCH_MORE_THRESHOLD = 1200

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
            page: 'discover',
            title: '',
            posts: [],
            router: props.router,
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

        // event listener for window resize
        window.addEventListener('resize', this.handleResize)
    }

    componentWillUnmount() {
        // remove listener for scrolling
        document.removeEventListener("scroll", this.handleScrolling, false)

        // remove listener for window resize
        window.removeEventListener('resize', this.handleResize)

        // clear body scroll locks
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
            title: ''
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

    handleResize = () => {
        console.log('resize')
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
            <Layout title={this.state.title} url="https://zeme.team">

                <Background animate />

                <div id="modal" className="modal">
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
                        <Grid 
                            display="modal"
                            hasMore={this.state.hasMore}
                            handleDetailsModal={this.handleDetailsModal}
                            isScrolling={this.state.isScrolling}
                            posts={this.state.posts} 
                            theme="discover" />

                    </InfiniteScroll>
                </main>

                <style jsx>{`
                    html,
                    body {
                        background-color: #F9D149;
                    }

                    .modal {
                        overflow: auto;
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