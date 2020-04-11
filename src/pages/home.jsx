import React,{Component} from 'react'
import Header from '@/components/Header'
import Swiper from '@/components/swipe'
import Notice from '@/components/Notice'
import IndexList from '@/components/indexlist'
import {
  IndexUrl,
  Keywords,
  Description,
  GlobalTitle} from '@/components/config'
import HttpServer from '@/components/fetch'
import Error from '@/components/Error'
import { Store } from '@/pages/root'
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    }
  }
  async getData() {
    let data = await HttpServer(IndexUrl)
    this.setState({
      data: data
    })
    if(data.status === 0) {
      data['ttl'] = Date.now() + 7200000
      localStorage.setItem('index', JSON.stringify(data))
    }
  }

  componentDidMount(){
    console.log(this.props.data)
    document.title = `${GlobalTitle} - 最新电影,高清电影,免费电影,在线电影,最新电视剧`
    document.getElementsByTagName('meta')['keywords'].content = Keywords
    document.getElementsByTagName('meta')['description'].content = Description
    let cache = localStorage.getItem('index');
    if(cache === null) {
      this.getData();
    }else {
      const now = Date.now() + 1;
      cache = JSON.parse(cache);
      // console.log(cache)
      if(now >= cache.ttl) {
        localStorage.removeItem('index');
        this.getData();
      }else{
        this.setState({
          data: cache
        })
      }
    }
  }
  render() {
    const {data} = this.state
    return (
      <div className={"skin " + this.props.data.skin}>
        {data.status === 0?
          <div>
            <Header menu={data.menu} menumore={data.menumore} setSkin={this.props.setSkin} />
            <section className="content has-header">
              <Swiper data={data.swiper} />
              <Notice data={data.notice} />
              <IndexList data={data.movielist} />
            </section>
          </div>
          :
          <Error data={data} />
        }
      </div>
    )
  }
}
export default Store(Home)