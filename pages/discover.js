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
const POSTS_PER_PAGE = 500
const TRENDING_DAYS_BACK = 7

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
            tabsVisible: true,
            page: 'discover',
            title: '',
            posts: [],
            router: props.router,
        }

        this.targetElement = null
        this.targetCreateModalref = React.createRef()
        this.targetDetailsModalref = React.createRef()
    }

    componentDidMount() {
        // listen for browser back button clicks
        window.addEventListener('popstate', (event) => {
            if (event.state) {
                // this.handleCreateModal()
                this.handleCloseDetailsModal()
            }
        })
    }

    componentWillUnmount() {
        // clear body scroll locks
        clearAllBodyScrollLocks()
    }

    handleTabChange = (tab) => {
        // update state
        this.setState({
            currentRangeStart: 0,
            currentRangeEnd: POSTS_PER_PAGE,
            currentTab: tab,
            posts: []
        })

        // fetch post data
        tab === 'trending' ? this.fetchTrending(true, true) : this.fetchLatest(true, true)

        // scroll to top
        window.scrollTo(0, 0)
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

        this.targetElement = this.targetDetailsModalref.current

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

    fetchLatest = async (first = true, reset = false) => {
        const { data, error } = await Supabase
            .from('posts')
            .select('id, slug, asset_url, title, description, address, created_at, status, view_count')
            .range(reset ? 0 : this.state.currentRangeStart, reset ? POSTS_PER_PAGE : this.state.currentRangeEnd)
            .filter('status', 'eq', POST_STATUS_LIVE)
            .order('created_at', { 
                ascending: false 
            })

        // check to ensure the query returned results
        if (data.length > 0){

            // update states 
            this.setState({ posts: [...this.state.posts, ...data],
                currentRangeStart: this.state.currentRangeStart + POSTS_PER_PAGE + 1,
                currentRangeEnd: this.state.currentRangeEnd + POSTS_PER_PAGE + 1,
                hasMore: data.length === (POSTS_PER_PAGE + 1) ? true : false
            })

        } else {
            // no more post results exist
            this.setState({ hasMore: false }) 
        }            
    }

    fetchTrending = async (first = true, reset = false) => {
        const { data, error } = await Supabase
            .from('posts')
            .select('id, slug, asset_url, title, description, address, created_at, status, view_count')
            .range(reset ? 0 : this.state.currentRangeStart, reset ? POSTS_PER_PAGE : this.state.currentRangeEnd)
            .filter('status', 'eq', POST_STATUS_LIVE)
            .order('view_count', { 
                ascending: false 
            })          

        // check to ensure the query returned results
        if (data.length > 0){
            // update states 
            this.setState({ 
                posts: [...this.state.posts, ...data],
                currentRangeStart: this.state.currentRangeStart + POSTS_PER_PAGE + 1,
                currentRangeEnd: this.state.currentRangeEnd + POSTS_PER_PAGE + 1,
                hasMore: data.length === (POSTS_PER_PAGE + 1) ? true : false
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

                <div>
                    <Modal 
                        page='create' 
                        post={[]}
                        ref={this.targetCreateModalref}
                        visible={this.state.createModalVisible} 
                        handleCloseModal={this.handleCreateModal} />

                    <Modal 
                        page='details' 
                        post={this.state.currentPost}
                        ref={this.targetDetailsModalref}
                        visible={this.state.detailsModalVisible} 
                        handleCloseModal={this.handleCloseDetailsModal} />
                    
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
                        threshold={1500}>

                        <Grid 
                            display="modal"
                            hasMore={this.state.hasMore}
                            handleDetailsModal={this.handleDetailsModal}
                            posts={this.state.posts} 
                            theme="discover" />

                    </InfiniteScroll>
                </main>

                <style jsx>{`
                    .discover {
                        animation: fade .25s;
                        margin: auto;
                        margin-bottom: 300px;
                        padding: 0px;
                        padding-top: 76px;
                        position: relative;
                        transition: opacity .25s ease-in;
                        z-index: 3;
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