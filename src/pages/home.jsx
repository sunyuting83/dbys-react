import React,{Component} from 'react';
import Header from '@/components/Header'
import Swiper from '@/components/swipe'
import IndexList from '@/components/indexlist'
import {IndexUrl} from '@/components/config'
import HttpServer from '@/components/fetch'
import Error from '@/components/Error'
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    }
  }

  async getData() {
    let data = await HttpServer(IndexUrl,'index')
    this.setState({
      data: data
    })
    if(data.status === 0) {
      data['ttl'] = Date.now() + 7200000
      localStorage.setItem('index', JSON.stringify(data))
    }
  }

  componentDidMount(){
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
    // var ptoken = "DCAE7F35109330C66943B4DE9F0E8ABD9027DF92CF6A4E27C34D2457AFC2FD2A51625151F0D10C0FE37DC3C1D0BD4825";
    // var sg = window.fxxk(ptoken);
    // console.log(sg)
  }
  render() {
    const {data} = this.state
    return (
      <div>
        {data.status === 0?
          <div>
            <Header menu={data.menu} menumore={data.menumore} />
            <section className="content has-header">
              <Swiper data={data.swiper} />
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