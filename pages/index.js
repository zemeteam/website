import React from 'react'
import { withRouter } from 'next/router'
import { server } from '../config'
import Tabs from '../components/Tabs'
import Layout from '../components/Layout'
import Grid from '../components/Grid'
import Background from '../components/Background'
import Modal from '../components/Modal'
import SwipeableViews from 'react-swipeable-views'

const POSTS_PER_PAGE = 1000

class Discover extends React.Component {
    constructor(props) {
        super(props)  

        this.state = { 
            createModalVisible: false,
            currentPost: [],
            currentRangeStart: 0,
            currentRangeEnd: POSTS_PER_PAGE,
            detailsModalVisible: false,
            hasMore: false,
            tabsVisible: true,
            latest: [],
            page: 'discover',
            tabIndex: 0,
            title: '',
            trending: [],
            router: props.router,
        }
    }

    componentDidMount() {
        // listen for browser back button clicks
        window.addEventListener('popstate', (event) => {
            if (event.state) {
                this.handleCloseCreateModal()
                this.handleCloseDetailsModal()
            }
        })

        // fetch content
        this.fetchTrending()
        this.fetchLatest()
    }

    handleTabChange = (tabIndex) => {
        // scroll to top
        window.scrollTo(0, 0)
        
        // update state
        this.setState({
            currentRangeStart: 0,
            currentRangeEnd: POSTS_PER_PAGE,
            tabIndex: tabIndex
        })
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
        this.state.router.push('/') 

        this.setState({ 
            detailsModalVisible: false,
            page: 'discover',
            title: ''
        })   
    }

    handleCloseCreateModal = () => {
        // change router state 
        this.state.router.push('/') 

        this.setState({ 
            createModalVisible: false,
            page: 'discover',
            title: ''
        })   
    }

    handleChangeIndex = (index) => {
        this.setState({
            tabIndex: index
        })

        this.handleTabChange(index)
    }

    fetchLatest = async () => {
        const res = await fetch(`${server}/api/posts/latest`)
        const posts = await res.json()

        // check to ensure the query returned results
        if (posts.length > 0){
            // update states 
            this.setState({ latest: [...this.state.latest, ...posts],
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
                trending: [...this.state.trending, ...posts],
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
                    tabIndex={this.state.tabIndex} 
                    handleTabChange={this.handleTabChange} 
                    handleCreateModal={this.handleCreateModal} />


                <main className="discover">
                    <SwipeableViews resistance enableMouseEvents index={this.state.tabIndex} onChangeIndex={this.handleChangeIndex}>     
                        <div className="trending">      
                            <Grid 
                                display="modal"
                                hasMore={false}
                                handleDetailsModal={this.handleDetailsModal}
                                posts={this.state.trending} 
                                theme="discover" />
                        </div>

                        <div className="latest">
                            <Grid 
                                display="modal"
                                hasMore={false}
                                handleDetailsModal={this.handleDetailsModal}
                                posts={this.state.latest} 
                                theme="discover" />
                        </div>
                    </SwipeableViews>
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

                    .trending {
                        overflow: hidden;
                    }

                    .latest {
                        overflow: hidden;
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
                        .trending {
                            margin: auto;
                            width: calc(100% - 32px);
                        }

                        .latest {
                            margin: auto;
                            width: calc(100% - 32px);
                        }
                    }
                `}</style>
            </Layout>
        )
    }
}

export default withRouter(Discover)