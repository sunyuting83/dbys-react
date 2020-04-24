import React,{Component} from 'react'
import Header from '@/components/Header'
import IndexList from '@/components/indexlist'
import {
  ClassUrl,
  Pkey,
  Description,
  GlobalTitle} from '@/components/config'
import HttpServer from '@/components/fetch'
import Error from '@/components/Error'
import { Store } from '@/pages/root'

let outime
class Classify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      hname: `classheight:${props.match.params.id}`,
      data: {},
      scrollTop: 0
    }
    this.handleScroll = this.handleScroll.bind(this);
  }
  async getData(id) {
    const url = ClassUrl(id)
    let data = await HttpServer(url)
    this.setState({
      data: data
    })
    if(data.status === 0) {
      data['ttl'] = Date.now() + 7200000
      localStorage.setItem(`classify:${id}`, JSON.stringify(data))
      this.setTitle(id,data)
      this.getHeight()
    }
  }
  setTitle(id,data){
    let title = data.menu.filter(x => x.id === Number(id))[0].c_name
    document.title = `${GlobalTitle} -${title} - 在线观看,免费观看`
    document.getElementsByTagName('meta')['keywords'].content = Pkey(title)
    document.getElementsByTagName('meta')['description'].content = Description
  }
  handleScroll() {
    let scrollTop = this._container.scrollTop;
    this.setState({
      scrollTop: scrollTop
    })
  }

  getHeight() {
    let h = sessionStorage.getItem(this.state.hname)
    if (!h) h = 0
    outime = setTimeout(()=>{
      let scroll = this._container
      scroll.scrollTop = h
    },100)
  }

  componentDidMount(){
    const id = this.state.id
    let cache = localStorage.getItem(`classify:${id}`);
    if(cache === null) {
      this.getData(id);
    }else {
      const now = Date.now() + 1;
      cache = JSON.parse(cache);
      // console.log(cache)
      if(now >= cache.ttl) {
        localStorage.removeItem(`classify:${id}`);
        this.getData(id);
      }else{
        this.setState({
          data: cache
        })
        this.setTitle(id,cache)
        this.getHeight(id)
      }
    }
  }
  componentWillReceiveProps(nextProps, nextState) {
    let nextid = nextProps.match.params.id
    if (nextid !== this.state.id) {
      this.setState({
        data: {
          status: 3
        },
        id: nextid,
        hname: `classheight:${nextid}`
      })
      this.getData(nextid)
    }
  }
  componentWillUnmount() {
    clearTimeout(outime)
  }
  render() {
    const {data, scrollTop, hname} = this.state
    return (
      <div className={"skin " + this.props.data.skin}>
        {data.status === 0?
          <div>
            <Header menu={data.menu} menumore={data.menumore} setSkin={this.props.setSkin}  height={scrollTop} page={hname} />
            <section 
              className="content has-header"
              ref={c => this._container = c} 
              id="totop" 
              onScrollCapture={() => this.handleScroll()}>
              <IndexList data={data.movielist} height={scrollTop}  page={hname} />
            </section>
          </div>
          :
          <Error data={data} getData={()=>this.getData(this.state.id)} />
        }
      </div>
    )
  }
}
export default Store(Classify)