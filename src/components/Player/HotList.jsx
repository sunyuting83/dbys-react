import React, { Component } from 'react'
import DefaultImg from '@/components/defaultImg'
import { NavLink } from 'react-router-dom';
export default class HotList extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      list: props.data
    }
  }
  static getDerivedStateFromProps(props, state) {
    if (JSON.stringify(props.data) !== JSON.stringify(state.list)) {
      return {
        list: props.data
      }
    }
    return null;
  }
  render() {
    const list = this.state.list
    return (
      <div>
        <div className="catalog">
          <div className="row">
            <div className="col col-10">
              <span className="title-icon ticon-hot"></span>
            </div>
            <div className="col col-70 b-title">
              猜你喜欢
            </div>
          </div>
        </div>
        <div className="block catalog">
          <div className="row row-wrap">
            {list.length > 0 && list.map(x => 
            <NavLink to={`/player/${x.id}`} key={x.id} className="col col-33 movie">
              <div className="movie-img">
                <DefaultImg src={x.img} alt={x.title} />
                <em>{x.remarks}</em>
                {parseInt(x.score) > 0?<i>{x.score}分</i>:null}
              </div>
              <span className="title">{x.title}</span>
            </NavLink>
            )
            }
          </div>
        </div>
      </div>
    )
  }
}