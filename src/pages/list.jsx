import React,{Component} from 'react';
import Header from '@/components/Header'
import {ListUrl,
  Pkey,
  Description,
  GlobalTitle} from '@/components/config'
import HttpServer from '@/components/fetch'
import ReactPullLoad,{ STATS } from 'react-pullload'
import Error from '@/components/Error'
import { NavLink } from 'react-router-dom'
import { Store } from '@/pages/root'
import DefaultImg from '@/components/defaultImg'
import Nothing from '@/components/nothing'

let scrollTop = 0,
    outime;
class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      id: 0,
      page: 1,
      hasMore: true,
      action: STATS.init,
      isScrollBottom: scrollTop,
      scrollheight: 0
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.match.params.id !== state.id) {
      return {
        id: props.match.params.id,
        page: props.match.params.page,
        data:{
          status: 3
        }
      }
    }
    return null;
  }
  setTitle(id,data){
    let title = data.ctitle
    document.title = `${GlobalTitle} -${title} - 在线观看,免费观看`
    document.getElementsByTagName('meta')['keywords'].content = Pkey(title)
    document.getElementsByTagName('meta')['description'].content = Description
  }
  async getData(id,newpage) {
    if(Number(newpage) === 1) newpage = Number(newpage)
    // console.log(this.props.match)
    const p = {
      path: this.props.match.path,
      id: id,
      page: newpage
    }
    let data = await HttpServer(ListUrl(p))
    if(data.status === 0 && data.movies.length > 0) {
      if(newpage === 1) {
        this.setState({
          data: data,
          action: STATS.reset,
          page: newpage
        });
      }else {
        let stateData = this.state.data
        this.setState({
          data: {
            ...stateData,
            movies: stateData.movies.concat(data.movies)
          },
          action: STATS.reset,
          page: newpage
        });
      }
      this.setTitle(id,data)
    } else {
      this.setState({ 
        action: STATS.reset, 
        hasMore: false,
        data: {
          ...this.state.data,
          status: 1
        } 
      });
    }
  }
  onScrollHandle(event) {
    const clientHeight = event.target.clientHeight
    const scrollHeight = event.target.scrollHeight
    const scrollTop = event.target.scrollTop
    const isBottom = (clientHeight + scrollTop === scrollHeight)
    if (this.state.isScrollBottom !== isBottom) {
      this.setState({
        isScrollBottom: isBottom
      })
    }
  }
  handleAction = (action) => {
    const {id,page} = this.state;
    if ((action === this.state.action || action === STATS.refreshing) && (this.state.action === STATS.loading || action === STATS.loading) && this.state.action === STATS.refreshing) {
      return false
    }
    if (action === STATS.refreshing) { //刷新
      outime = setTimeout(() => {
          this.getData(id, 1);
      }, 300)
    } else if (action === STATS.loading) { //加载更多
      if (!this.state.hasMore) {
        return;
      }
      this.setState({hasMore: true});
      outime = setTimeout(() => {
        this.getData(id,Number(page) + 1);
      }, 300)
    }
    this.setState({action: action})
  }
  componentDidMount() {
    if (this.contentNode) {
      this.contentNode.addEventListener('scroll', this.onScrollHandle.bind(this));
      this.contentNode.scrollTop = scrollTop
    };
    let {id,page} = this.state;
    if(!page) page = 1
    let isGoback = sessionStorage.getItem("isGoBack");
    if (isGoback === "1") {//返回回来的页面
        let listInfo = JSON.parse(sessionStorage.getItem(`listInfo:${id}`));
        // console.log(listInfo)
        if(listInfo) {
          this.setState({
              page: listInfo.pIndex,
              data: listInfo.courseData
          }, () => document.getElementById("train-course").scrollTop = listInfo.scorllTop)
        }else {//从其他页面进入的列表页
          this.getData(id,page);
        }
    } else {//从其他页面进入的列表页
      this.getData(id,page);
    }
  }
  setListener() {
    outime = setTimeout(()=> {
      document.getElementById('train-course').addEventListener('scroll', (ev) => this.onScrollHandle(ev));//给元素添加滚动监听
    },10)
  }
  componentDidUpdate(prevProps, prevState){
    let {id,page} = this.state;
    if(!page) page = 1
    if(this.state.id !== prevState.id) this.getData(id,page)
  }
  componentWillUnmount() {
    if (this.contentNode) {
      this.contentNode.removeEventListener('scroll', this.onScrollHandle.bind(this));
      scrollTop = this.contentNode.scrollTop
    };
    clearTimeout(outime)
  }
  gotoDetial(ev) {
    //存储数据
    // console.log(ev)
    const listInfo = {
      pIndex: this.state.page,
      courseData: this.state.data,
      scorllTop: document.getElementById("train-course").scrollTop
    }
    sessionStorage.setItem(`listInfo:${this.state.id}`, JSON.stringify(listInfo));
  }
  render() {
    const {data, hasMore, id} = this.state
    return (
      <div className={"skin " + this.props.data.skin}>
        {data.status === 0?
          <div>
            {this.setListener()}
            <Header menu={data.menu} menumore={data.menumore} title={data.ctitle} setSkin={this.props.setSkin} id={id} path={this.props.match.path} />
            {data.movies && data.movies.length > 0 ?
              <ReactPullLoad 
                id="train-course" 
                ref={scroll => this.ScrollId = scroll} 
                className="content has-header scroll-block" 
                downEnough={150} 
                action={this.state.action} 
                handleAction={this.handleAction} 
                hasMore={hasMore} 
                distanceBottom={150}>
              <div className="block catalog">
                <div className="row row-wrap">
                {data.movies.map((l, index) => (
                  <NavLink 
                    className="col col-33 movie" 
                    to={`/player/${l.id}`} 
                    key={l.id}
                    onClick={(e)=>{this.gotoDetial(e)}}>
                    <div className="movie-img">
                      <DefaultImg src={l.img} alt={l.title} />
                      <em>{l.remarks}</em>
                      {parseInt(l.score) > 0?<i>{l.score}分</i>:null}
                    </div>
                    <span className="title">{l.title}</span>
                  </NavLink>
                ))}
                </div>
              </div>
              </ReactPullLoad>
            :
            <Nothing />
            }
          </div>
          :
          <Error data={data} getData={()=>this.getData(id, this.state.page)} />
        }
      </div>
    )
  }
}
export default Store(List)