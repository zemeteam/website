import React from 'react'

export default class Dialog extends React.Component {
    constructor(props) {
        super(props)

        this.escFunction = this.escFunction.bind(this)
    }

    static async getInitialProps(context) {
        return { 
            post: post, 
            visible: visible 
        }
    }

    componentDidMount(){
        // event listener for esc key
        window.addEventListener("keydown", this.escFunction, false)
    }

    componentWillUnmount(){
        // remove listener for esc key
        window.removeEventListener("keydown", this.escFunction, false)
    }

    escFunction = (event) => {
        if(this.props.visible && event.keyCode === 27) {
            this.props.handleCloseDialog(event)
        }
        event.stopPropagation()
    }


    render() {
        const post = this.props.post
        const visible = this.props.visible

        return ( 
            <div>
                <div 
                    className={`dialog ${visible ? "dialog-show" : "dialog-hide"}`} 
                    onClick={() => this.props.handleCloseDialog()} />

                <div className={`dialog-body ${visible ? "dialog-show" : "dialog-hide"}`}>
                    <div className="dialog-close" onClick={() => this.props.handleCloseDialog() }>
                        <img src="/icon-close.png" alt="Close" />
                    </div>

                    <div className="dialog-report">

                    </div>
                </div>


                <style jsx>{`
                    .dialog {
                        background-color: rgba(0,0,0,.5);
                        height: 100%;
                        margin: auto;
                        overflow: scroll;
                        position: fixed;
                        text-align: center;
                        top: 0;
                        width: 100%;
                        z-index: 7;
                    }

                    .dialog-body {
                        background-color: #ffffff;
                        border-radius: 20px;
                        box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.2);
                        position: fixed;
                        left: calc(50% - 250px);
                        min-height: 400px;
                        top: 150px;
                        width: 500px;
                        z-index: 8;
                    }

                    .dialog-close {
                        background-color: #DBDBDB;
                        border-radius: 25px;
                        cursor: pointer;
                        height: 50px;
                        float: right;
                        line-height: 50px;
                        position: relative;
                        text-align: center;
                        top: 16px;
                        transition: opacity .25s;
                        right: 16px;
                        width: 50px;
                    }

                    .dialog-close:active {
                        opacity: .5;
                    }

                    .dialog-close img { 
                        margin-top: 13px;
                        width: 24px;
                    }

                    .dialog-report {
                        text-align: left;
                    }

                    .dialog-report img {
                        border-radius: 12px;
                        max-width: 1000px;
                    }

                    .dialog-show {
                        animation: slideIn .25s;
                    }

                    .dialog-hide {
                        animation: slideOut .25s;
                    }
                    
                    @keyframes slideIn {
                        0% {
                            opacity: 0 !important;
                        }
                        100% {
                            opacity: 1 !important;
                        }
                    }

                    @keyframes slideOut {
                        0% {
                            opacity: 1 !important;
                        }
                        100% {
                            opacity: 0 !important;
                        }
                    }
                `}</style>
            </div>
        )
    }
}