import React, { Component } from 'react'

export default class PlayPath extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: props.data
    }
  }
  static getDerivedStateFromProps(props, state) {
    if (JSON.stringify(props.data) !== JSON.stringify(state.list)) {
      return {
        list: props.data
      }
    }
    return null;
  }
  cb = (msg) => {
    return () => {
      this.props.callback(msg)
    }
  }

  render() {
    const list = this.state.list
    return (
      <div>
        <div className="catalog">
          <div className="row">
            <div className="col col-10">
              <span className="title-icon ticon-play"></span>
            </div>
            {list && list.hls.length > 0 ? <div className="col b-title">高清播放</div> : null}
          </div>
        </div>
        <div className="block catalog">
          <div className="row row-wrap">
            {list && list.hls.length > 0 &&
              list.hls.map((item,index) => (
                <div className="col col-15" key={index} onClick={this.cb({'path': item.path, 'type': 'hls'})}>
                  <span className="label-blue">{unescape(item.name)}</span>
                </div>
              ))
            }
          </div>
        </div>
        <div className="catalog">
          <div className="row">
            <div className="col col-10">
              <span className="title-icon ticon-play"></span>
            </div>
            {list && list.player.length > 0 ? <div className="col b-title">云播放</div> : null}
          </div>
        </div>
        <div className="block catalog">
          <div className="row row-wrap">
            {list && list.player.length > 0 &&
              list.player.map((item,index) => (
                <div className="col col-15" key={index} onClick={this.cb({'path': item.path, 'type': 'player'})}>
                  <span className="label-blue">{unescape(item.name)}</span>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    )
  }
}
