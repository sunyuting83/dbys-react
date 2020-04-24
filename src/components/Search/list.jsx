import React, { Component } from 'react';
import ReactPullLoad, { STATS } from 'react-pullload';
import { Link } from 'react-router-dom';
import {SearchUrl} from '@/components/config'
import HttpServer from '@/components/fetch'
import DefaultImg from '@/components/defaultImg'
import Nothing from '@/components/nothing'

let scrollTop = 0,
    outime;
export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMore: true,
      data: [],
      action: STATS.init,
      page: 1,
      isScrollBottom: scrollTop,
      scrollheight: 0
    };
    this.setData = this.setData.bind(this);
    this.onScrollHandle = this.onScrollHandle.bind(this);
  }

  onScrollHandle(event) {
    const clientHeight = event.target.clientHeight,
          scrollHeight = event.target.scrollHeight,
          scrollTop = event.target.scrollTop,
          isBottom = (clientHeight + scrollTop === scrollHeight);

    if (this.state.isScrollBottom !== isBottom) {
      this.setState({
        isScrollBottom: isBottom
      })
    }
  }

  async getFirstData(key) {
    const data = await HttpServer(SearchUrl(key, 1))
    if (data.length > 0) {
      this.setState({
        data: data,
        action: STATS.reset,
        page: 1,
        key: key
      });
    } else {
      this.setState({ action: STATS.reset, hasMore: false });
    }
  }
  async getNewData(key, x) {
    const data = await HttpServer(SearchUrl(key, Number(x + 1)))
    if (data.length > 0) {
      this.setState({
        data: [
            ...this.state.data
        ],
        action: STATS.reset,
        page: x + 1
      });
      data.forEach((item, index) => {
        this.state.data.push(item);
      });
    } else {
      this.setState({ action: STATS.reset, hasMore: false });
    }
  }

  handleAction = action => {
    const _this = this
    if ((action === this.state.action || action === STATS.refreshing) && (this.state.action === STATS.loading || action === STATS.loading) && this.state.action === STATS.refreshing) {
      return false
    }
    if (action === STATS.refreshing) { //刷新
      outime = setTimeout(() => {
        _this.getFirstData(this.state.key);
      }, 300)
    } else if (action === STATS.loading) { //加载更多
      if (!this.state.hasMore) {
        return;
      }
      const key = this.state.key,
            x = this.state.page;
      this.setState({ hasMore: true });
      outime = setTimeout(() => {
        _this.getNewData(key, x);
      }, 300)
    }
    this.setState({ action: action })
  }

  setData () {
    let scrollTop = document.getElementById("train-course").scrollTop;
  }

  componentDidMount() {
    if (this.contentNode) {
      this.contentNode.addEventListener('scroll', this.onScrollHandle.bind(this));
      this.contentNode.scrollTop = scrollTop
    };

    document.getElementById("train-course").addEventListener('scroll', (ev) => this.onScrollHandle(ev));//给元素添加滚动监听
    // console.log(this.props.list);
    let k = this.props.data;
    // console.log(k, this.state.key);
    if (k !== this.state.key) {
      this.getFirstData(k);
    }
  }
  componentWillUnmount() {
    if (this.contentNode) {
      this.contentNode.removeEventListener('scroll', this.onScrollHandle.bind(this));
      scrollTop = this.contentNode.scrollTop
    };
    clearTimeout(outime)
  }

  componentWillReceiveProps(nextProps) {
    let k = nextProps.data;
    if (k !== this.state.key) {
      this.getFirstData(k);
      document.getElementById("train-course").scrollTop = 0
    };
  }

  render() {
    const { data, hasMore } = this.state;
    return (
      <section className="content hasheader">
      {data && data.length > 0 ?
        <ReactPullLoad 
          id="train-course" 
          className="scroll-block" 
          isBlockContainer={true} 
          downEnough={200} 
          action={this.state.action} 
          handleAction={this.handleAction} 
          hasMore={hasMore} 
          distanceBottom={1000}>
          <div className="block catalog">
            <div className="row row-wrap">
              {data.map((l, index) => (
              <Link 
                className="col col-33 movie" 
                to={`/player/${l.id}`} 
                key={l.id}>
                <div className="movie-img">
                  <DefaultImg src={l.img} alt={l.title} />
                  <em>{l.remarks}</em>
                  {parseInt(l.score) > 0?<i>{l.score}分</i>:null}
                </div>
                <span className="title">{l.title}</span>
              </Link>
              ))}
            </div>
          </div>
        </ReactPullLoad>
      :
      <Nothing />}
      </section>
    );
  }
}
