import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import logo from '@/components/icons/logo.png'

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showmore: false,
      menu: props.menu,
      menumore: props.menumore
    }
  }
  toggle(){
    this.setState({showmore:!this.state.showmore})
  }
  render() {
    const {showmore, menu, menumore} = this.state
    return (
      <div>
        <header>
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="title" />
            </Link>
          </div>
          <div className="hs-search">
            <em></em>
            <div type="text" className="search" placeholder="请输入片名或主演名"></div>
          </div>
        </header>
        <div className="sub-header">
          <div className="sub-class">
            <ul>
              <Link to="/" title="首页" className="active">首页<em></em></Link>
              {menu.length > 0 && menu.map((s, i) => (
                <Link to={s.id} key={i}>{s.c_name}<em></em></Link>
              ))}
            </ul>
          </div>
          <div className="open-class" onClick={this.toggle.bind(this)}>
            <span></span>
            <i className={showmore?"icon icon-class active":"icon icon-class"}></i>
          </div>
        </div>
        <div className="goToTop"></div>
        <section className="content class" style={{display:showmore?'block':false}}>
          <div className="block row row-wrap">
            {menumore.length > 0 && menumore.map((s, i) => (
              <Link to={s.id} className="col col-25 padding-tb15" key={i}>
                <i className="class-icon cicon-movie"></i>
                <span>{s.c_name}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    )
  }
};
