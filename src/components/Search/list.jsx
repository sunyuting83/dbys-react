import React, { Component } from 'react';
import ReactPullLoad, { STATS } from 'react-pullload';
import { Link } from 'react-router-dom';
import { get } from '../public/httpServer';
import DefaultImg from '../public/defaultImg';
// redux 开始
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { mapstate } from "../../reducers/data";
import * as act_search from "../../actions/index";

let scrollTop = 0;
class List extends Component {
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
        this.download = this.download.bind(this);
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

    getFirstData(key) {
        // console.log(key);
        let param = {
            key: key,
            page: 1
        }
        get('search', param).then((data) => {
            if (data.length > 0) {
                this.setState({
                    data: data,
                    action: STATS.reset,
                    page: param.page,
                    key: key
                });
            } else {
                this.setState({ action: STATS.reset, hasMore: false });
            }
        }).catch((err) => {
            console.log(err);
        });
    }
    getNewData(key, x) {
        let param = {
            key: key,
            page: Number(x + 1)
        };
        get('search', param).then((data) => {
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
        }).catch((err) => {
            console.log(err);
        });
    }

    handleAction = action => {

        // console.info(action, this.state.action, action === this.state.action);
        //new action must do not equel to old action
        if ((action === this.state.action || action === STATS.refreshing) && (this.state.action === STATS.loading || action === STATS.loading) && this.state.action === STATS.refreshing) {
            // console.info("It's same action or on loading or on refreshing ", action, this.state.action, action === this.state.action);
            return false
        }

        if (action === STATS.refreshing) { //刷新
            setTimeout(() => {
                //refreshing complete
                this.getFirstData(this.state.key);
            }, 300)
        } else if (action === STATS.loading) { //加载更多
            let key = this.state.key,
                x = this.state.page;
            this.setState({ hasMore: true });
            setTimeout(() => {
                this.getNewData(key, x);
            }, 300)
        }

        //DO NOT modify below code
        this.setState({ action: action })
    }

    setData () {
        // 设置首页高度到 redux
        let scrollTop = document.getElementById("train-course").scrollTop;
        let {key, data, page} = this.state;
        this.props.act_search_data({
            key: key,
            data: data,
            page: page,
            scrollTop: scrollTop
        });
    }

    download(event, id) {
        let downEl = this.refs.frame;
        let param = {
            id: id
        };
        get('download', param).then((data) => {
            if (data) {
                downEl.src = data;
            }
        }).catch((err) => {
            console.log(err);
        });
        
        event.preventDefault();
    }

    componentDidMount() {
        if (this.contentNode) {
            this.contentNode.addEventListener('scroll', this.onScrollHandle.bind(this));
            this.contentNode.scrollTop = scrollTop
        };

        document.getElementById("train-course").addEventListener('scroll', (ev) => this.onScrollHandle(ev));//给元素添加滚动监听
        // console.log(this.props.list);
        if (this.props.list.length > 0) {
            this.setState({
                key: this.props.data,
                data: this.props.list,
                action: STATS.reset,
                page: this.props.page
            });
            setTimeout(function () {
                document.getElementById("train-course").scrollTop = this.props.listHeight
            }.bind(this), 200)
        }else {
            let k = this.props.data;
            // console.log(k, this.state.key);
            if (k !== this.state.key) {
                this.getFirstData(k);
            }
        }
    }
    componentWillUnmount() {
        if (this.contentNode) {
            this.contentNode.removeEventListener('scroll', this.onScrollHandle.bind(this));
            scrollTop = this.contentNode.scrollTop
        };
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
            <section className="content nobottom bgcolor-fff">
                <ReactPullLoad id="train-course" className="scroll-block" isBlockContainer={true} downEnough={200} action={this.state.action} handleAction={this.handleAction} hasMore={hasMore} distanceBottom={1000}>
                {
                    data.length > 0 && data.map((apk, i) => (
                        <Link to={`/item/${apk.id}`} className="row apkls" key={apk.id} onClick={this.setData}>
                            <div className="col col-20"><DefaultImg src={apk.more.cover} /></div>
                            <div className="col col-66 apkmore">
                                <h1>{apk.title}</h1>
                                <div>
                                    <span>{apk.apk_count}人下载</span>
                                    <span>{apk.more.apk_size}</span>
                                </div>
                                <h3>{apk.more.intro}</h3>
                            </div>
                            <button className="col download" onClick={(e) => { this.download(e, apk.id) }} >下载</button>
                        </Link>
                    ))
                }
                </ReactPullLoad>
                
                <iframe ref="frame" src="" title="download" style={{ display: 'none' }}></iframe>
            </section>
        );
    }
}

function bindact(dispatch) {
    return bindActionCreators(act_search, dispatch)
}

export default connect(mapstate, bindact)(List);
