import React,{Component} from 'react'
import { NavLink } from 'react-router-dom'
import Header from '@/components/Header'
import DefaultImg from '@/components/defaultImg'
import {setHeight} from '@/components/config'
import {
  Pkey,
  Description,
  GlobalTitle} from '@/components/config'
import Error from '@/components/Error'
import { Store } from '@/pages/root'
class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hname: 'favoritesheight',
      data: {},
      scrollTop: 0
    }
    this.handleScroll = this.handleScroll.bind(this);
  }

  setTitle(id,data){
    let title = data.menu.filter(x => x.id === Number(id))[0].c_name
    document.title = `${GlobalTitle} - 我的收藏 - 在线观看,免费观看`
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
    setTimeout(()=>{
      let scroll = this._container
      scroll.scrollTop = h
    },100)
  }

  componentDidMount(){
    const menu = JSON.parse(localStorage.getItem('menu'))
    let data = {
      status: 0,
      list: [],
      menu: menu.menu,
      menumore: menu.menumore
    }
    const favorites = localStorage.getItem('favorites')
    if(favorites) data.list = JSON.parse(favorites)
    this.setState({
      data: data
    })
    this.getHeight()
  }
  render() {
    const {data, scrollTop, hname} = this.state
    return (
      <div className={"skin " + this.props.data.skin}>
        {data.status === 0?
          <div>
            <Header menu={data.menu} menumore={data.menumore} setSkin={this.props.setSkin}  height={scrollTop} page={hname} title="我的收藏" />
            <section 
              className="content has-header"
              ref={c => this._container = c} 
              id="totop" 
              onScrollCapture={() => this.handleScroll()}>
              <div className="catalog">
                <div className="row">
                  <div className="col col-10">
                    <span className={"title-icon ticon-favorites"}></span>
                  </div>
                  <div className="col col-70 b-title">
                    我的收藏
                  </div>
                </div>
              </div>
              <div className="block catalog">
              {data.list && data.list.length > 0 ? data.list.map((x,i) => (
                <NavLink 
                  className="row movie margin-b15 fav" 
                  to={`/player/${x.id}`} 
                  key={i}
                  onClick={()=>{setHeight(scrollTop, hname)}}>
                  <div className="col col-33 movie-img no-padding">
                    <DefaultImg src={x.img} alt={x.title} />
                    <em>{x.remarks}</em>
                    {parseInt(x.score) > 0?<i>{x.score}分</i>:null}
                  </div>
                  <div className="col col-66">
                    <h3>{x.title}</h3>
                    <p dangerouslySetInnerHTML={{__html: x.profiles}}></p>
                  </div>
                </NavLink>
              )):
              <div>萨都亩有</div>}
              </div>
            </section>
          </div>
          :
          <Error data={data} />
        }
      </div>
    )
  }
}
export default Store(Favorites)