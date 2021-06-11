import React from 'react'
import Details from './Details'

export default class Modal extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            post: [],
            visible: true,
        }

        this.escFunction = this.escFunction.bind(this)
        this.modalRef = React.createRef()
    }

    static async getInitialProps(context) {
        return { 
            page: page, 
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
            this.handleClose()
        }
        event.stopPropagation()
    }

    handleScrollToTop = () => { 
        this.modalRef.current.scrollTop = 0
    }

    handleClose = () => {
        this.setState({ 
            visible: false,
        })   

        // close the modal once the transistion finishes
        setTimeout(() => {        
            this.props.handleCloseModal()
        }, 150)
    }

    render() {
        const page = this.props.page
        const post = this.props.post
        const visible = this.state.visible

        return ( 
            <div className={`modal ${visible ? "modal-show" : "modal-hide"}`} ref={this.modalRef}>
                <div className="modal-body">
                    <div className="modal-close" onClick={() => this.handleClose() }>
                        <img src="/icon-close.png" alt="Close" />
                    </div>

                    {page === 'details' && 
                        <div className="modal-post">
                            <Details post={post} handleScrollToTop={this.handleScrollToTop} display="modal" />
                        </div>
                    } 

                    {page === 'create' && 
                        <div>CREATE ZEME</div>
                    } 
                </div>

                <style jsx>{`
                    .modal {
                        background-color: #ffffff;
                        height: 100vh;
                        margin: auto;
                        overflow: scroll;
                        position: fixed;
                        text-align: center;
                        width: 100%;
                        z-index: 5;
                    }

                    .modal-body {
                        position: relative;
                        z-index: 6;
                    }

                    .modal-close {
                        background-color: #DBDBDB;
                        border-radius: 25px;
                        cursor: pointer;
                        height: 50px;
                        float: right;
                        line-height: 50px;
                        position: absolute;
                        text-align: center;
                        top: 16px;
                        transition: opacity .25s;
                        right: 16px;
                        width: 50px;
                    }

                    .modal-close:active {
                        opacity: .5;
                    }

                    .modal-close img { 
                        margin-top: 13px;
                        width: 24px;
                    }

                    .modal-post {
                        text-align: left;
                    }

                    .modal-post img {
                        border-radius: 12px;
                        max-width: 1000px;
                    }

                    .modal-show {
                        animation: slideIn .2s;
                    }

                    .modal-hide {
                        animation: slideOut .2s;
                    }
                    
                    @keyframes slideIn {
                        0% {
                            top: 100vh;
                        }
                        100% {
                            top: 0;
                        }
                    }

                    @keyframes slideOut {
                        0% {
                            top: 0;
                        }
                        100% {
                            top: 100vh;
                        }
                    }
                `}</style>
            </div>
        )
    }
}