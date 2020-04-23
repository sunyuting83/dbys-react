import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import reactStringReplace from 'react-string-replace';

export default class Suggestions extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: this.props.query,
      results: this.props.results,
      hides: this.props.hd,
      first: this.props.first
    };

    this.setKeyData = this.setKeyData.bind(this);
  }

  setKeyData() {
    // 设置搜索联想数据 到 redux
    this.props.act_search_key({
      query: this.state.key,
      results: this.state.results,
      hides: this.state.hides,
      first: this.state.first
    });
  }

  componentWillReceiveProps(nextProps) {
    let k = nextProps.query,
        r = nextProps.results,
        h = nextProps.hd,
        f = nextProps.first;
    if (k !== undefined && r !== undefined && h !== undefined ) {
      this.setState({
        key: k,
        results: r,
        hides: h,
        first: f
      });
    }
  }

  render() {
    let results = this.state.results;
    let first = this.state.first;
    return (
      <ul className={`search-over ${this.state.hides ? `` : `hd`}`}>
        {first && first.id && (
        <Link to={`/item/${first.id}`} onClick={this.setKeyData}>
          <div className="first">
            <div className="first-img"><img src={first.cover} alt={first.title} /></div>
            <div className="first-text">
              <h1>{reactStringReplace(first.title, this.state.key, (match, i) => (
                <span className="blue" key={i}>{match}</span>
              ))}</h1>
              <h5>{first.apk_count}人下载 {first.size}</h5>
            </div>
          </div>
        </Link>
        )}
        {results && results.length > 0 && results.map(r => (
        <Link className="list" key={r.id} to={`/item/${r.id}`} onClick={this.setKeyData}>
          <i className="fa fa-search"></i>
          <span>{
            reactStringReplace(r.title, this.state.key, (match, i) => (
              <span className="blue" key={i}>{match}</span>
            ))
          }</span>
        </Link>
        ))}
      </ul>
    )
  }
}