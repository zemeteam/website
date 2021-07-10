import React from 'react'

export default class Background extends React.Component {
    constructor(props) {
        super(props)
    }

    static async getInitialProps(context) {
        return { 
            animate: animate
        }
    }

    render() {
        const animate = this.props.animate

        return ( 
            <div className="background">
                <div className="background-gradient"></div>
                <div className={animate ? 'background-logo background-animate' : 'background-logo' }></div>
                
                <style jsx>{`
                    .background-gradient {
                        background-image: url(/background-gradient.webp);
                        background-position: top center;
                        background-repeat: no-repeat;
                        background-size: cover;
                        height: 100vh;
                        left: 0;
                        position: fixed;
                        width: 100%;
                        z-index: 1
                    }
                      
                    .background-logo {
                        background-image: url(/background-zcash-logo.webp);
                        background-position: top center;
                        background-repeat: no-repeat;
                        background-size: cover;
                        height: 100vh;
                        left: 0;
                        opacity: 1;
                        position: fixed;
                        width: 100%;
                        z-index: 2;
                    }

                    .background-animate {
                        animation: pulse 3s infinite;
                    }
                      
                    @keyframes pulse {
                        0% {
                            opacity: 1;
                        }
                      
                        50% {
                            opacity: .3;
                        }
                      
                        100% {
                            opacity: 1;
                        }
                    }
                `}</style>
            </div>
        )
    }
}