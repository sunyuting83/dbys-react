import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Back from '@/components/back'
import {setHeight} from '@/components/config'

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showmore: false,
      menu: props.menu,
      menumore: props.menumore,
      title: props.title,
      showskin: false,
      tpid: 0,
      skinitem: [
        {
          color: '#2095f2',
          name: 'blue'
        },{
          color: '#f4433a',
          name: 'red'
        },{
          color: '#219587',
          name: 'green'
        },{
          color: '#3f56b4',
          name: 'violet'
        },{
          color: '#ff993d',
          name: 'orange'
        },{
          color: '#fd583d',
          name: 'dorange'
        },{
          color: '#5f7b89',
          name: 'grey'
        },{
          color: '#c8405d',
          name: 'pink'
        },{
          color: '#373e45',
          name: 'black'
        }
      ],
      color: 'blue'
    }
  }
  toggle(){
    this.setState({showmore:!this.state.showmore})
  }
  setSkin(color){
    this.setState({
      color: color
    })
    this.props.setSkin(color)
  }
  toggleSkin() {
    this.setState({showskin: !this.state.showskin})
  }
  componentDidMount() {
    let s
    const skin = localStorage.getItem('skin')
    if(skin) {
      s = skin
    }else{
      s = 'blue'
    }
    this.setState({
      color: s
    })
    const u = this.state.menumore.filter(x => x.id === parseInt(this.props.id))
    if(u.length > 0) {
      this.setState({
        tpid: u[0].top_id
      })
    }
  }
  render() {
    const {showmore, menu, menumore, title, skinitem, showskin, color} = this.state
    // console.log(title)
    return (
      <div>
        <header>
          {title?<Back />:
          <div className="logo">
            <span>爱看</span>
            <em>影视</em>
          </div>
          }
          {title?
          <div className="title">{title}</div>:null
          }
          <div className="header-item">
            <span className="icon icon-search" onClick={()=>{setHeight(this.props.height)}}></span>
            <span className="icon icon-history" onClick={()=>{setHeight(this.props.height)}}></span>
            <NavLink to="/favorites" className="icon icon-fav" onClick={()=>{setHeight(this.props.height)}}></NavLink>
            <span className={showskin?"icon icon-skin active":"icon icon-skin"} onClick={this.toggleSkin.bind(this)}></span>
          </div>
        </header>
        <div className={showskin? "choose_skin row active":"choose_skin row"}>
          {skinitem && skinitem.length > 0 && skinitem.map(x => 
            <div 
              className="col" 
              onClick={()=>this.setSkin(x.name)}>
              <em style={{"background":x.color}}>
                {color === x.name?<i></i>:null}
              </em>
            </div>
          )}
        </div>
        <div className="sub-header">
          <div className="sub-class">
            <ul>
              <NavLink 
                to="/" 
                title="首页" 
                exact 
                activeClassName="active"
                onClick={()=>{setHeight(this.props.height, this.props.page)}}>
                  首页
                  <em></em>
              </NavLink>
              {menu.length > 0 && menu.map((s, i) => (
                <NavLink 
                  activeClassName="active" 
                  to={`/class/${s.id}`} 
                  key={i}
                  className={this.state.tpid === s.id?'active':null}
                  onClick={()=>{setHeight(this.props.height, this.props.page)}}>
                    {s.c_name}
                    <em></em>
                </NavLink>
              ))}
            </ul>
          </div>
          <div className="open-class" onClick={this.toggle.bind(this)}>
            <span></span>
            <i className={showmore?"icon icon-class active":"icon icon-class"}></i>
          </div>
        </div>
        <section className="content class" style={{display:showmore?'block':false}}>
          <div className="block row row-wrap">
            {menumore.length > 0 && menumore.map((s, i) => (
              <NavLink 
                to={`/list/${s.id}`} 
                className="col col-25 padding-tb15" 
                key={i}
                onClick={()=>{setHeight(this.props.height)}}>
                  <i className={"class-icon cicon-i"+s.id}></i>
                  <span>{s.c_name}</span>
              </NavLink>
            ))}
          </div>
        </section>
      </div>
    )
  }
};
