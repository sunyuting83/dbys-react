import React,{Component} from 'react'
import { NavLink } from 'react-router-dom'
import Header from '@/components/Header'
import DefaultImg from '@/components/defaultImg'
import Nothing from '@/components/nothing'
import JRoll from 'JRoll'
import {
  Pkey,
  Description,
  GlobalTitle} from '@/components/config'
import Error from '@/components/Error'
import { Store } from '@/pages/root'

let outime
class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    }
  }

  setTitle(){
    document.title = `${GlobalTitle} - 我的收藏 - 在线观看,免费观看`
    document.getElementsByTagName('meta')['keywords'].content = Pkey('我的收藏')
    document.getElementsByTagName('meta')['description'].content = Description
  }

  getHeight() {
    const _this = this
    outime = setTimeout(()=>{
      _this.makeScroll()
    },80)
  }

  makeScroll() {
    // 创建外层jroll实例
    var jroll = new JRoll(this._container, {
      scrollBarY:true,
      bounce:false
    })
    
    let current = null
    var items = document.querySelectorAll(".scroll")
    for (var i=0,l=items.length; i<l; i++) {
      // 每行创建jroll实例
      const maxXX = items[0].querySelector('.delete').offsetWidth
      var j = new JRoll(items[i], {
        scrollX:true,
        bounce:false,
        maxX: -maxXX
      })
      j.on("scrollStart", function() {
        if (current && current !== this) {
          current.scrollTo(0, 0, 100)
          current = null
        }
      })

      j.on("scroll", function(e) {
        if (this.x === 0 && !current) {
          this.call(jroll, e)
        } else {
          current = this
        }
      })

      j.on("scrollEnd", function() {
        if (this.x > -50) {
          this.scrollTo(0, 0, 100)
          current = null
        } else {
          this.scrollTo(this.maxScrollX, 0, 100)
        }
      })
    }
  }

  deleteH(e, id) {
    e.preventDefault()
    let data = this.state.data
    this.setState({
      data: {
        ...this.state.data,
        status: 3
      }
    })
    data.list = data.list.filter(x=> x.id !== id)
    localStorage.setItem('favorites',JSON.stringify(data.list))
    const _this = this
    outime = setTimeout(()=>{
      _this.setState({
        data: {
          ...data,
          status: 0,
          list: data.list
        }
      })
      if(data.list.length > 0) _this.makeScroll()
    },80)
    // const key = 'savebook'
    // this.items = this.items.filter(x=> x.id !== id)
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
    this.setTitle()
    if(data.list.length > 0) this.getHeight()
  }
  componentWillUnmount() {
    clearTimeout(outime)
  }
  render() {
    const {data} = this.state
    return (
      <div className={"skin " + this.props.data.skin}>
        {data.status === 0?
          <div>
            <Header menu={data.menu} menumore={data.menumore} setSkin={this.props.setSkin} title="我的收藏" />
            <section 
              className="content has-header"
              ref={c => this._container = c} 
              >
              <div>
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
                  <div key={i} className="scroll">
                    <NavLink 
                      className="row movie margin-b15 fav" 
                      to={`/player/${x.id}`}>
                      <div className="col col-33 movie-img no-padding">
                        <DefaultImg src={x.img} alt={x.title} />
                        <em>{x.remarks}</em>
                        {parseInt(x.score) > 0?<i>{x.score}分</i>:null}
                      </div>
                      <div className="col col-66">
                        <h3>{x.title}</h3>
                        <p dangerouslySetInnerHTML={{__html: x.profiles}}></p>
                      </div>
                      <div className="col col-20 delete" onClick={(e) => this.deleteH(e, x.id)}>
                        <i className="icon icon-trash"></i>
                        <div>删除</div>
                      </div>
                    </NavLink>
                  </div>
                )):
                <Nothing />}
                </div>
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