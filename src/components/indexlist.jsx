import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class indexList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: props.data
    }
  }

  render() {
    let list = this.state.list;
    return (
      <div>
        {list.length > 0 && list.map((s, i) => (
          <div key={i}>
            <div className="catalog">
              <div className="row">
                <div className="col col-10">
                  <span className="title-icon user-sishoucang"></span>
                </div>
                <div className="col col-70 b-title">
                  {s.c_name}
                </div>
                <div className="col col-20 f13 text-right">
                  更多
                </div>
              </div>
            </div>
            <div className="block catalog">
              <div className="row row-wrap">
                {s.movie.length > 0 && s.movie.map((l, index) => (
                <NavLink className="col col-33 movie" to={'detail/'+l.url} key={l.id}>
                  <div className="movie-img">
                    <img src={l.img} alt={l.title} />
                    <em>{l.remarks}</em>
                    {parseInt(l.score) > 0?<i>{l.score}分</i>:null}
                  </div>
                  <span className="title">{l.title}</span>
                </NavLink>
                ))}
              </div>
              <div class="row row-wrap">
                {s.smallclass.length > 0 && s.smallclass.map((l, index) => (
                  <div class="col col-25"  key={l.id}>
                    <NavLink className="label-blue" to={'/'+l.id}>
                      {l.c_name}
                    </NavLink>
                  </div>
                ))}
            </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
}
