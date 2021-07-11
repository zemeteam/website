import React from 'react'
import Head from 'next/head'
import _ from 'underscore'
import s from 'underscore.string'
import Header from './Header'

export default class Layout extends React.Component {
    constructor(props) {
        super(props)

        this.state = { 
        }
    }

    render() {
        const children = this.props.children
        const description = this.props.description ? this.props.description.substring(0,200) : 'Earn shielded Zcash for creating Zcash content (zcash gifs, zcash memes, zemes, zcash infographics, zcash price charts, zcash educational graphics, zcash quotes, etc).'
        const title = this.props.title ? this.props.title : 'Zeme Team🛡️: Zcash memes, Zcash gifs, Zcash art'
        const logo = this.props.logo === 'dark' ? 'zemeteam-logo-dark' : 'zemeteam-logo'
        const header = this.props.header
        const image = this.props.image ? this.props.image : 'https://zeme.team/zeme-team-logo.png'
        const url = this.props.url ? this.props.url : 'https://zeme.team'

        return ( 
            <div className="layout">
                <Head>
                    <title>{s.capitalize(title)}</title>
                    <meta charSet="utf-8" />
                    <link rel="icon" href="/favicon.ico" />
                    <meta name="theme-color" content="#000000" />
                    <meta name="mobile-web-app-capable" content="yes" />
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    <meta name="description" content={s.capitalize(description)} />
                    <meta property="og:title" content={s.capitalize(title)} />
                    <meta property="og:description" content={s.capitalize(description)} />
                    <meta property="og:image" content={image} />
                    <meta property="og:url" content={url} />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta property="og:site_name" content="Zeme Team🛡️" />
                    <meta name="twitter:image:alt" content="Zeme Team🛡️" />
                </Head>
                
                <div className="container" style={{ backgroundColor: this.props.logo === 'dark' ? '#FFFFFF' : '#F9D149' }}>
                    {header &&
                        <Header 
                            background="transparent"
                            logo={logo} />
                    }
                    {children}
                </div>
                
                <style jsx>{`
                    @import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@700&display=swap');
                    @import url('https://fonts.googleapis.com/css2?family=Overpass+Mono&display=swap');

                    * { 
                        -moz-box-sizing: border-box; 
                        -webkit-box-sizing: border-box; 
                        box-sizing: border-box; 
                    }

                    .container {
                        align-items: center;
                        justify-content: center;
                        min-height: 100vh;
                        padding: 0;
                    }
                `}</style>
            </div>
        )
    }
}