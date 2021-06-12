import React from 'react'
import Layout from '../components/Layout'

function CustomError({ statusCode }) {

    CustomError.getInitialProps = getInitialProps

    function getInitialProps({ res, err }) {
        let statusCode
        // If the res variable is defined it means nextjs is in server side
        if (res) {
            statusCode = res.statusCode
        } else if (err) {
            // if there is any error in the app it should
            // return the status code from here
            statusCode = err.statusCode
        } else {
            // Something really bad/weird happen and status code
            // cannot be determined.
            statusCode = null
        }
        return { statusCode }
    }
  
    return (
        <Layout 
            logo="dark"
            title={statusCode + ' - Zeme Team'} 
            description={'Page not found'} 
            url={'https://zeme.team/404'}>

            <div className="error">
                {statusCode === 404 && 
                    <h1>
                        <span style={{ color: `#F4B728` }}>404 / </span> 
                        <span>ZEME NOT FOUND</span>
                    </h1>
                }
                {statusCode !== 404 && 
                    <h1>Unknown error</h1>
                }

                <a href="https://zeme.team/" title="Zeme Team">
                    <div className="button">
                        Back to home
                    </div>
                </a>
            </div>

            <style jsx>{`
                .error {
                    height: 400px;
                    margin: auto;
                    padding-top: 200px;
                    text-align: center;
                }

                h1 {
                    font-family: 'Overpass Mono', monospace;
                    font-size: 52px;
                    line-height: 60px;
                }

                .button {
                    background-color: #ffffff;
                    border: solid 1px #F4B728;
                    border-radius: 80px;
                    color: #F4B728;
                    cursor: pointer;
                    font-size: 13px;
                    height: 40px;
                    line-height: 40px;
                    margin: auto;
                    text-align: center;
                    text-transform: uppercase;
                    transition: opacity .25s;
                    width: 200px;
                }

                .button:hover {
                    opacity: .75;
                }

                .button:active {
                    opacity: .5;
                }
            `}</style>
        </Layout>
  )
}

export default CustomError