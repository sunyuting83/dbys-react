import React, { Component } from 'react'
import iScroll from 'iScroll'
import ReactIScroll from 'react-iscroll'
export default class PlayPath extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: props.data,
      a: {
        t: 'hls',
        i: 0
      }
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
  cb = (msg,t,i) => {
    return () => {
      this.setState({
        a: {
          t: t,
          i: i
        }
      })
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
        {list.more === false?
        <div className="block catalog">
          <ReactIScroll 
            iScroll={iScroll} 
            className="inner" 
            options={{ eventPassthrough: true, scrollX: true, scrollY: false }}>
            <ul className="list">
              <li>
              {list && list.hls.length > 0 &&
                list.hls.map((item,index) => (
                  <span 
                    className={this.state.a.i === index && this.state.a.t === 'hls'?"label-blue acitve":"label-blue"} 
                    key={index} 
                    onClick={this.cb({'path': item.path, 'type': 'hls'},'hls',index)}>
                    {item.name}
                  </span>
                ))
              }
            </li>
          </ul>
          </ReactIScroll>
        </div>
        :
        <div className="catalog">
          <ReactIScroll 
            iScroll={iScroll} 
            className="inner" 
            options={{ eventPassthrough: true, scrollX: true, scrollY: false }}>
            <ul className="list">
              <li>
              {list && list.hls.length > 0 && 
                list.hls.map((item,index) => (
                <span>{index * 10 + 1} - {list.hls.length -1 === index ? list.paly_count : (index + 1) * 10}</span>
                ))
              }
              </li>
            </ul>
          </ReactIScroll>
        </div>
        }
        <div className="catalog">
          <div className="row">
            <div className="col col-10">
              <span className="title-icon ticon-play"></span>
            </div>
            {list && list.player.length > 0 ? <div className="col b-title">云播放</div> : null}
          </div>
        </div>
        <div className="block catalog">
          <div className="d-row">
            {list && list.player.length > 0 &&
              list.player.map((item,index) => (
                <div className="d-col d-15" key={index} onClick={this.cb({'path': item.path, 'type': 'player'},'player',index)}>
                  <span className={this.state.a.i === index && this.state.a.t === 'player'?"label-blue acitve":"label-blue"}>{unescape(item.name)}</span>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    )
  }
}
