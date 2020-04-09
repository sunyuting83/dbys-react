import React,{Component} from 'react';
import { NavLink } from 'react-router-dom';
import Header from '@/components/Header'
import {PlayerUrl} from '@/components/config'
import HttpServer from '@/components/fetch'
import Error from '@/components/Error'

import PlayPath from '@/components/Player/PlayPath'
import More from '@/components/Player/More'
import HotList from '@/components/Player/HotList'
export default class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      id: props.match.params.id,
      status: 3
    }
  }

  async getData(url) {
    let data = await HttpServer(url)
    this.setState({
      data: data
    })
    document.title = data.title
  }

  sum (m, n) {
    var num = Math.floor(Math.random() * (m - n) + n);
    return num
  }

  componentDidMount(){
    const url = PlayerUrl(this.state.id)
    this.getData(url)
  }
  componentWillReceiveProps(nextProps, nextState) {
    let nextid = nextProps.match.params.id
    if (nextid !== this.state.id) {
      this.setState({
        status: 3,
        id: nextid
      })
      const url = PlayerUrl(nextid)
      this.getData(url)
    }
  }
  render() {
    const {data} = this.state
    return (
      <div className="skin red">
        {data.status === 0?
          <div>
            <Header menu={data.menu} menumore={data.menumore} />
            <section className="content has-header">
              {/* 收藏开始 */}
              <div>
                <div className="block catalog">
                  <div className="row f11 text-left h88">
                    <div className="col" >
                      <div className="row" style={{'align-items':'center'}}>
                        <div className="col col-33 ">
                          <i className="iconp icon-digg-up"></i>
                        </div>
                        <span className="col">{this.sum(34,999)}</span>
                      </div>
                    </div>
                    <div className="col" >
                      <div className="row" style={{'align-items':'center'}}>
                        <div className="col col-33 ">
                          <i className="iconp icon-digg-down"></i>
                        </div>
                        <span className="col">{this.sum(34,230)}</span>
                      </div>
                    </div>
                    <NavLink className="col" to="/">
                      <div className="row" style={{'align-items':'center'}}>
                        <div className="col col-33 ">
                          <i className="iconp icon-favorites"></i>
                        </div>
                        <span className="col">收藏</span>
                      </div>
                    </NavLink>
                  </div>
                </div>
              </div>
              {/* 收藏结束 */}
              <PlayPath data={data.play_path} />
              <HotList data={data.hotlist} />
              <More data={data} />
            </section>
          </div>
          :
          <Error data={data} />
        }
      </div>
    )
  }
}