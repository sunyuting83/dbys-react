import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
                  {s.title}
                </div>
                <div className="col col-20 f13 text-right">
                  更多
                </div>
              </div>
            </div>
            <div className="block catalog">
              <div className="row row-wrap">
                {s.list.length > 0 && s.list.map((l, index) => (
                <Link className="col col-33 movie" to={l.url} key={index}>
                  <div className="movie-img">
                    <img src={l.img} alt={l.title} />
                    <em>{l.rate}</em>
                  </div>
                  <span className="title">{l.title}</span>
                </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
}
