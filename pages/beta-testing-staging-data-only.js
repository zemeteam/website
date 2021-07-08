import React from 'react'
import { withRouter } from 'next/router'
import { server } from '../config'
import InfiniteScroll from 'react-infinite-scroller'
import Tabs from '../components/Tabs'
import Layout from '../components/Layout'
import Grid from '../components/Grid'
import Background from '../components/Background'
import Modal from '../components/Modal'

const POSTS_PER_PAGE = 1000

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
            hasMore: false,
            tabsVisible: true,
            page: 'discover',
            title: '',
            posts: [],
            router: props.router,
        }
    }

    static async getInitialProps({ query, res }) {
        const trendingApi = await fetch(`${server}/api/posts/trending`)
        const trending = await trendingApi.json()

        const latestApi = await fetch(`${server}/api/posts/latest`)
        const latest = await latestApi.json()

        return { trending: trending, latest: latest }
    }


    componentDidMount() {
        // listen for browser back button clicks
        window.addEventListener('popstate', (event) => {
            if (event.state) {
                this.handleCloseCreateModal()
                this.handleCloseDetailsModal()
            }
        })
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
        tab === 'trending' ? this.fetchTrending() : this.fetchLatest()

        // scroll to top
        window.scrollTo(0, 0)
    }

    handleCreateModal = () => {
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
    }

    handleCloseDetailsModal = () => {
        // change router state
        this.state.router.push('/beta-testing-staging-data-only') 

        this.setState({ 
            detailsModalVisible: false,
            page: 'discover',
            title: ''
        })   
    }

    handleCloseCreateModal = () => {
        // change router state 
        this.state.router.push('/beta-testing-staging-data-only') 

        this.setState({ 
            createModalVisible: false,
            page: 'discover',
            title: ''
        })   
    }

    fetchLatest = async () => {
        const res = await fetch(`${server}/api/posts/latest`)
        const posts = await res.json()

        // check to ensure the query returned results
        if (posts.length > 0){
            // update states 
            this.setState({ posts: [...this.state.posts, ...posts],
                currentRangeStart: this.state.currentRangeStart + POSTS_PER_PAGE + 1,
                currentRangeEnd: this.state.currentRangeEnd + POSTS_PER_PAGE + 1,
                hasMore: posts.length === (POSTS_PER_PAGE + 1) ? true : false
            })

        } else {
            // no more post results exist
            this.setState({ hasMore: false }) 
        }            
    }

    fetchTrending = async () => {
        const res = await fetch(`${server}/api/posts/trending`)
        const posts = await res.json()

        // check to ensure the query returned results
        if (posts.length > 0){
            // update states 
            this.setState({ 
                posts: [...this.state.posts, ...posts],
                currentRangeStart: this.state.currentRangeStart + POSTS_PER_PAGE + 1,
                currentRangeEnd: this.state.currentRangeEnd + POSTS_PER_PAGE + 1,
                hasMore: posts.length === (POSTS_PER_PAGE + 1) ? true : false
            })
            
        } else {
            // no more post results exist
            this.setState({ hasMore: false }) 
        }
    }

    render() {
        return (
            <Layout title={this.state.title} url="https://zeme.team" header={true}>

                <Background animate />

                {this.state.createModalVisible &&
                    <Modal 
                        page='create' 
                        post={[]}
                        visible={this.state.createModalVisible} 
                        handleCloseModal={this.handleCloseCreateModal} />
                }

                {this.state.detailsModalVisible &&
                    <Modal 
                        page='details' 
                        post={this.state.currentPost}
                        visible={this.state.detailsModalVisible} 
                        handleCloseModal={this.handleCloseDetailsModal} />
                }   
                
                <Tabs 
                    active={this.state.currentTab} 
                    handleTabChange={this.handleTabChange} 
                    handleCreateModal={this.handleCreateModal} />

                <main className="discover">
                    <InfiniteScroll
                        pageStart={0}
                        hasMore={this.state.hasMore}
                        threshold={1500}>

                        <Grid 
                            display="modal"
                            hasMore={this.state.hasMore}
                            handleDetailsModal={this.handleDetailsModal}
                            posts={this.state.currentTab === 'trending' ? this.props.trending : this.props.latest} 
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