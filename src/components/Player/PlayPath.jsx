import React, { Component } from 'react'
import iScroll from 'JRoll'
import ReactIScroll from 'react-iscroll'
export default class PlayPath extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: props.data,
      a: {
        t: 'hls',
        i: 0
      },
      b: {
        t: 'hls',
        i: 0,
        q: 0
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
  mcb = (msg,t,i,q) => {
    return () => {
      this.setState({
        b: {
          t: t,
          i: i,
          q: q
        },
        a: {
          ...this.state.a,
          t: t
        }
      })
      this.props.callback(msg)
    }
  }
  setMenus = (i,t) => {
    return () => {
      let list = []
      if(t === 'hls') {
        list = this.state.list.hls[i]
        this.setState({
          a: {
            t: t,
            i: i,
          },
          mlist: list
        })
      }else {
        list = this.state.list.player[i]
        this.setState({
          a: {
            t: t,
            i: i,
          },
          plist: list
        })
      }
    }
  }
  playTitle(tp) {
    return(
      <div className="catalog">
        <div className="row">
          <div className="col col-10">
            <span className="title-icon ticon-play"></span>
          </div>
          <div className="col b-title">{tp === 'hls' ? '高清播放' : '云播放'}</div>
        </div>
      </div>
    )
  }
  haventMore(list, tp) {
    return (
      <div className="block catalog">
        <ReactIScroll 
          iScroll={iScroll} 
          className="inner d-row" 
          options={{ eventPassthrough: true, scrollX: true, scrollY: false }}>
          <ul className="list">
            <li>
            {list && list.length > 0 &&
              list.map((item,index) => (
                <span 
                  className={this.state.a.i === index && this.state.a.t === tp?"label-blue acitve":"label-blue"} 
                  key={index} 
                  onClick={this.cb({'path': item.path, 'type': tp},tp,index)}>
                  {item.name}
                </span>
              ))
            }
            </li>
          </ul>
        </ReactIScroll>
      </div>
    )
  }
  hasMore(list, mlist, tp, play_path) {
    return (
      <div>
        <div className="catalog">
          <ReactIScroll 
            iScroll={iScroll} 
            className="inner" 
            options={{ eventPassthrough: true, scrollX: true, scrollY: false }}>
            <ul className="list">
              <li>
              {list && list.length > 0 && 
                list.map((item,index) => (
                <span 
                  className={this.state.a.i === index && this.state.a.t === tp?"label-blue acitve":"label-blue"}
                  onClick={this.setMenus(index,tp)}
                >
                  {index * 10 + 1} - {list.length -1 === index ? play_path : (index + 1) * 10}
                </span>
                ))
              }
              </li>
            </ul>
          </ReactIScroll>
        </div>
        <div className="block catalog">
          <ReactIScroll 
            iScroll={iScroll} 
            className="inner d-row" 
            options={{ eventPassthrough: true, scrollX: true, scrollY: false }}>
            <ul className="list">
              <li>
              {mlist && mlist.length > 0 &&
                mlist.map((item,index) => (
                  <span 
                    className={
                      this.state.b.i === index && 
                      this.state.b.t === tp &&
                      this.state.a.i === this.state.b.q ?
                      "label-blue acitve"
                      :
                      "label-blue"} 
                    key={index} 
                    onClick={this.mcb({'path': item.path, 'type': tp},tp,index, this.state.a.i)}>
                    {item.name}
                  </span>
                ))
              }
            </li>
          </ul>
          </ReactIScroll>
        </div>
      </div>
    )
  }
  componentDidMount() {
    if(this.state.list.more) {
      this.setState({
        mlist: this.props.data.hls[0],
        plist: this.props.data.player[0]
      })
    }
  }
  render() {
    const {list, mlist, plist} = this.state
    // console.log(this.state.a.i,this.state.b.q)
    return (
      <div>
        {this.playTitle('hls')}
        {list.more === false?
        this.haventMore(list.hls, 'hls')
        :
        this.hasMore(list.hls, mlist, 'hls', list.paly_count)
        }
        {this.playTitle('player')}
        {list.more === false?
        this.haventMore(list.player, 'player')
        :
        this.hasMore(list.player, plist, 'player', list.paly_count)
        }
      </div>
    )
  }
}
