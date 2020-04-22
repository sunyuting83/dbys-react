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
import Play from '@/components/Player/Player'
import { Store } from '@/pages/root'

let timeo
class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      id: props.match.params.id,
      message: '',
      open:false,
      playpath:'',
      playtype:'hls',
      playstatus:true
    }
  }

  async getData(url) {
    const data = await HttpServer(url)
    let playpath = '', playtype = ''
    if(data.status === 0) {
      const has = data.play_path.hasOwnProperty('hls')
      if(has) {
        if(data.play_path.more) {
          playpath = data.play_path.hls[0][0].path
        }else{
          playpath = data.play_path.hls[0].path
        }
        playtype = 'hls'
      }else{
        if(data.play_path.more) {
          playpath = data.play_path.player[0][0].path
        }else {
          playpath = data.play_path.player[0].path
        }
        playtype = 'play'
      }
      this.setState({
        data: data,
        playpath: playpath,
        playtype: playtype
      })
      document.title = `${GlobalTitle} - ${data.title}-在线观看,免费观看`
      document.getElementsByTagName('meta')['keywords'].content = Pkey(data.title)
      if(data.profiles) {
        document.getElementsByTagName('meta')['description'].content = data.profiles.substring(0, 52)
      }else{
        document.getElementsByTagName('meta')['description'].content = Pkey(data.title)
      }
    }else {
      this.setState({
        data: {
          ...this.state.data,
          status: 1
        }
      })
    }
  }
  openPopup(cb) {
    this.setState(cb)
  }
  setHistory(time){
    console.log(time)
  }
  changePlay(cb) {
    if(this.state.playpath !== cb.path) {
      this.setState({
        playstatus: false
      })
      timeo = setTimeout(()=>{
        this.setState({
          playpath: cb.path,
          playtype: cb.type,
          playstatus: true
        })
      },100)
    }
  }
  componentDidMount(){
    const url = PlayerUrl(this.state.id)
    this.getData(url)
  }
  componentWillReceiveProps(nextProps, nextState) {
    let nextid = nextProps.match.params.id
    if (nextid !== this.state.id) {
      this.setState({
        data: {
          status: 3
        },
        id: nextid
      })
      const url = PlayerUrl(nextid)
      this.getData(url)
    }
  }
  componentWillUnmount(){
    clearTimeout(timeo)
    sessionStorage.setItem("isGoBack", 1)
  }
  render() {
    const {data, message, open, playpath, playtype, playstatus} = this.state
    return (
      <div className={"skin " + this.props.data.skin}>
        {data.status === 0?
          <div>
            <Header menu={data.menu} menumore={data.menumore} title={data.title} setSkin={this.props.setSkin} />
            <section className="content has-header">
              <Play path={playpath} type={playtype} status={playstatus} callback={this.setHistory.bind(this)} />
              <Favorites data={data} openPopup={this.openPopup.bind(this)} />
              <PlayPath data={data.play_path} callback={this.changePlay.bind(this)} />
              <HotList data={data.hotlist} />
              <More data={data} />
            </section>
            <Popup message={message} status={open} openPopup={this.openPopup.bind(this)} />
          </div>
          :
          <Error data={data} getData={()=>this.getData(PlayerUrl(this.state.id))} />
        }
      </div>
    )
  }
}
export default Store(Player)