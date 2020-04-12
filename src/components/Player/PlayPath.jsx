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
            className="inner d-row" 
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
        <div>
          <div className="catalog">
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
                    onClick={this.setMenus(index,'hls')}
                  >
                    {index * 10 + 1} - {list.hls.length -1 === index ? list.paly_count : (index + 1) * 10}
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
                        this.state.b.t === 'hls' &&
                        this.state.a.i === this.state.b.q ?
                        "label-blue acitve"
                        :
                        "label-blue"} 
                      key={index} 
                      onClick={this.mcb({'path': item.path, 'type': 'hls'},'hls',index, this.state.a.i)}>
                      {item.name}
                    </span>
                  ))
                }
              </li>
            </ul>
            </ReactIScroll>
          </div>
        </div>
        }
        <div className="catalog">
          <div className="row">
            <div className="col col-10">
              <span className="title-icon ticon-play"></span>
            </div>
            {list && list.hls.length > 0 ? <div className="col b-title">云播放</div> : null}
          </div>
        </div>
        {list.more === false?
        <div className="block catalog">
          <ReactIScroll 
            iScroll={iScroll} 
            className="inner d-row" 
            options={{ eventPassthrough: true, scrollX: true, scrollY: false }}>
            <ul className="list">
              <li>
              {list && list.player.length > 0 &&
                list.player.map((item,index) => (
                  <span 
                    className={this.state.a.i === index && this.state.a.t === 'player'?"label-blue acitve":"label-blue"} 
                    key={index} 
                    onClick={this.cb({'path': item.path, 'type': 'player'},'player',index)}>
                    {item.name}
                  </span>
                ))
              }
            </li>
          </ul>
          </ReactIScroll>
        </div>
        :
        <div>
          <div className="catalog">
            <ReactIScroll 
              iScroll={iScroll} 
              className="inner" 
              options={{ eventPassthrough: true, scrollX: true, scrollY: false }}>
              <ul className="list">
                <li>
                {list && list.player.length > 0 && 
                  list.player.map((item,index) => (
                  <span 
                    className={this.state.a.i === index && this.state.a.t === 'player'?"label-blue acitve":"label-blue"}
                    onClick={this.setMenus(index,'player')}
                  >
                    {index * 10 + 1} - {list.player.length -1 === index ? list.paly_count : (index + 1) * 10}
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
                {plist && plist.length > 0 &&
                  plist.map((item,index) => (
                    <span 
                      className={
                        this.state.b.i === index && 
                        this.state.b.t === 'player' &&
                        this.state.a.i === this.state.b.q ?
                        "label-blue acitve"
                        :
                        "label-blue"} 
                      key={index} 
                      onClick={this.mcb({'path': item.path, 'type': 'player'},'player',index, this.state.a.i)}>
                      {item.name}
                    </span>
                  ))
                }
              </li>
            </ul>
            </ReactIScroll>
          </div>
        </div>
        }
      </div>
    )
  }
}
