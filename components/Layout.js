import React from 'react'
import Head from 'next/head'
import _ from 'underscore'
import s from 'underscore.string'
import Header from './Header'
import Menu from './Menu'

export default class Layout extends React.Component {
    constructor(props) {
        super(props)

        this.state = { 
            menuVisible: false
        }
    }

    handleMenuToggle = () => {
        this.setState({ 
            menuVisible: !this.state.menuVisible,
        })   
    }

    render() {
        const children = this.props.children
        const description = this.props.description ? this.props.description : 'Earn shielded Zcash for creating Zcash content (zcash gifs, zcash memes, zemes, zcash infographics, zcash price charts, zcash educational graphics, zcash quotes, etc).'
        const title = this.props.title ? this.props.title : 'Zeme Team 🛡️: Zcash memes, Zcash gifs, Zcash art'
        const logo = this.props.logo === 'dark' ? 'zemeteam-logo-dark' : 'zemeteam-logo'

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
                    <meta property="og:description" content={s.capitalize(description)} />
                    <meta property="twitter:description" content={s.capitalize(title)} />
                    <meta property="twitter:domain" content="https://zeme.team" />
                    <meta property="twitter:site" content="@zemeteam" />
                    <meta property="twitter:creator" content="@zemeteam" />
                </Head>
                
                <Menu 
                    visible={this.state.menuVisible} 
                    handleMenuToggle={this.handleMenuToggle} />

                <div className="container">
                    <Header 
                        background="transparent"
                        handleMenuToggle={this.handleMenuToggle} 
                        logo={logo} />

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
                        background-color: #ffffff;
                        justify-content: center;
                        min-height: 100vh;
                        padding: 0;
                    }
                `}</style>
            </div>
        )
    }
}