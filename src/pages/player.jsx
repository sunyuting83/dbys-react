import React,{Component} from 'react';
import Header from '@/components/Header'
import {
  PlayerUrl,
  GlobalTitle,
  Pkey} from '@/components/config'
import HttpServer from '@/components/fetch'
import Error from '@/components/Error'

import PlayPath from '@/components/Player/PlayPath'
import More from '@/components/Player/More'
import HotList from '@/components/Player/HotList'
import Favorites from '@/components/Player/Favorites'
import Popup from '@/components/Popup'
export default class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      id: props.match.params.id,
      status: 3,
      message: '',
      open:false,
    }
  }

  async getData(url) {
    let data = await HttpServer(url)
    this.setState({
      data: data
    })
    document.title = `${GlobalTitle} - ${data.title}-在线观看,免费观看`
    document.getElementsByTagName('meta')['keywords'].content = Pkey(data.title)
    document.getElementsByTagName('meta')['description'].content = data.profiles.substring(0, 52)
  }

  openPopup(cb) {
    this.setState(cb)
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
    const {data, message, open} = this.state
    return (
      <div className="skin red">
        {data.status === 0?
          <div>
            <Header menu={data.menu} menumore={data.menumore} />
            <section className="content has-header">
              <Favorites data={data} openPopup={this.openPopup.bind(this)} />
              <PlayPath data={data.play_path} />
              <HotList data={data.hotlist} />
              <More data={data} />
            </section>
            <Popup message={message} status={open} openPopup={this.openPopup.bind(this)} />
          </div>
          :
          <Error data={data} />
        }
      </div>
    )
  }
}