import React, { Component } from 'react'
export default class Popup extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      status: props.status,
      message: props.message
    }
  }
  static getDerivedStateFromProps(props, state) {
    if (props.status !== state.state) {
      return {
        status: props.status,
        message: props.message
      }
    }
    return null;
  }
  closePopup() {
    this.props.openPopup({
      open:false,
      message:''
    })
  }
  render() {
    const {status,message} = this.state
    return (
      <div>
        <div className={status?"modal-overlay modal-overlay-visible":"modal-overlay"}></div>
        <div className={status?"modal modal-in":"modal modal-out"} style={{display: 'block', marginTop: '-59px'}}>
          <div className="modal-inner">
            <div className="modal-text">{message}</div>
          </div>
          <div className="modal-buttons ">
            <span className="modal-button" onClick={this.closePopup.bind(this)}>取消</span>
            <span className="modal-button modal-button-bold" onClick={this.closePopup.bind(this)}>确定</span></div>
        </div>
      </div>
    )
  }
}