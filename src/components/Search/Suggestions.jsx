import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import reactStringReplace from 'react-string-replace'

export default class Suggestions extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: props.query,
      results: props.results,
      hides: props.hd
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.query !== undefined && props.results !== undefined && props.hd !== undefined) {
      return {
        key: props.query,
        results: props.results,
        hides: props.hd
      }
    }
    return null;
  }

  render() {
    const {results, hides} = this.state
    return (
      <ul className={`search-over ${hides ? `` : `hd`}`}>
        {results && results.length > 0 && results.map(r => (
        <Link className="list" key={r.id} to={`/player/${r.id}`}>
          <i className="fa fa-search"></i>
          <span>{
            reactStringReplace(r.title, this.state.key, (match, i) => (
              <span className="suggestions" key={i}>{match}</span>
            ))
          }</span>
        </Link>
        ))}
      </ul>
    )
  }
}