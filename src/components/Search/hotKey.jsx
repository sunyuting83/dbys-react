import React, { Component } from 'react'
import HttpServer from '@/components/fetch'
import { HotUrl } from '@/components/config'
import { Link } from 'react-router-dom';

export default class HotList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hot: [],
      key: []
    };
    this.pushKey = this.pushKey.bind(this);
  }
  pushKey(key) {
    this.props.handleSearchKey(key);
  }

  async getData() {
    let data = await HttpServer(HotUrl)
    if(data.status === 0) {
      this.setState({
        hot: data.hotlist,
        key: data.hotkey
      })
    }
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    const {hot, key} = this.state;
    return (
      <section className="content hasheader">
        {key && key.length > 0?
        <div>
          <div className="catalog">
            <div className="row">
              <div className="col col-10">
                <span className="title-icon ticon-hot"></span>
              </div>
              <div className="col col-70 b-title">
                热映搜索词
              </div>
            </div>
          </div>
          <div className="block catalog">
            <div className="row row-wrap">
              {key.map((x,i) => 
              <div className="col search-nav">
                <span className="title">{x}</span>
              </div>
              )}
            </div>
          </div>
        </div>
        :
        null
        }
        {hot && hot.length > 0 ?
        <div>
          <div className="catalog">
            <div className="row">
              <div className="col col-10">
                <span className="title-icon ticon-hot"></span>
              </div>
              <div className="col col-70 b-title">
                热映大片抢先看
              </div>
            </div>
          </div>
          <div className="block catalog">
            <div className="row row-wrap">
              {hot.map((x,i) => 
              <Link className="col col-50 search-nav" to={`/player/${x.id}`}>
                <span className="title"><i>{i+1}</i>{x.title}</span>
              </Link>
              )}
            </div>
          </div>
        </div>
        :null }
      </section>
    );
  }
}
