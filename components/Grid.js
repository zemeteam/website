import React from 'react'
import _ from 'underscore'
import Masonry from 'react-masonry-css'
import { isMobile } from 'react-device-detect'
import Card from '../components/Card'
import styles from '../styles/Grid.module.css'

const LARGE_VIEWPORT = 1400
const BREAKPOINT_COLS_SMALL = { 
    default: 3, 
    1264: 2, 
    940: 1 
}

const BREAKPOINT_COLS_LARGE = { 
    default: 5,
    2276: 4, 
    1840: 3, 
    1404: 2, 
    940: 1 
}

export default class Grid extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            screenWidth: 0,
        }

    }

    static async getInitialProps(context) {
        return { 
            display: display,
            hasMore: hasMore,
            handleDetailsModal: handleDetailsModal,
            posts: posts,
            theme: theme
        }
    }

    componentDidMount() {
        this.setState({ 
            screenWidth: window.innerWidth
        })
    }

    setRandomHeight (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    render() {
        const loading = _(isMobile ? 1 : 9).times(id => <div id={id} key={id} className={styles.loading} style={{height: this.setRandomHeight(200,544)}}></div>)

        return ( 
            <div className="grid">
                <Masonry
                    breakpointCols={this.state.screenWidth >= LARGE_VIEWPORT ? BREAKPOINT_COLS_LARGE : BREAKPOINT_COLS_SMALL}
                    className={styles.grid}
                    columnClassName={styles.grid_column}>
                        {this.props.posts.map((post) => (
                            <Card 
                                post={post} 
                                key={`${this.props.theme}-${post.slug}`} 
                                id={post.slug} 
                                theme={this.props.theme} 
                                display={this.props.display}
                                handleOpenModal={this.props.handleDetailsModal} />
                        ))}

                        {/* show loading if user hits end of feed */}
                        {this.props.hasMore ? loading : '' }
                </Masonry>

                <style jsx>{`
                `}</style>
            </div>
        )
    }
}