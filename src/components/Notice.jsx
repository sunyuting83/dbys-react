import React, { Component } from 'react'

export default class Notice extends Component {
  constructor(props) {
    super(props)
    this.state = {
      notice: this.props.data
    }
  }

  render() {
    const notice = this.state.notice
    return (
      <div class="block catalog">
        <div class="row">
          <div class="col col-20 one-news"><b>网站</b><span>公告</span></div>
          <div class="col col-80 marqueebox">
            <span>{notice}</span>
          </div>
        </div>
      </div>
    )
  }
}
