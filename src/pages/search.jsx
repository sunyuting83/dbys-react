import React,{Component} from 'react';
import Header from '@/components/Search/header'
import { Store } from '@/pages/root'
import {
  Keywords,
  Description,
  GlobalTitle} from '@/components/config'
import HotList from '@/components/Search/hotKey'
import List from '@/components/Search/list'

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: false,
      isGoback: '0'
    }
    this.handleSearchKey = this.handleSearchKey.bind(this);
  }
  componentDidMount() {
    document.title = `${GlobalTitle} - 最新电影,高清电影,免费电影,在线电影,最新电视剧`
    document.getElementsByTagName('meta')['keywords'].content = Keywords
    document.getElementsByTagName('meta')['description'].content = Description
    const isGoback = sessionStorage.getItem("isGoBack");
    this.setState({
      isGoback: isGoback
    })
  }
  handleSearchKey(key) {
    this.setState({
      key: key
    })
  }
  componentWillReceiveProps(nextProps, nextState) {
    const nextGoBack = sessionStorage.getItem("isGoBack");
    if(nextGoBack && nextGoBack === '1') {
      const s = sessionStorage.getItem(`listInfo:search`)
      if (s) {
        const listInfo = JSON.parse(s);
        if (nextGoBack !== this.state.isGoback) {
          this.setState({
            isGoback: nextGoBack,
            key: listInfo.searchKey
          })
        }
      }
    }
  }
  render() {
    const key = this.state.key
    return (
      <div className={"skin " + this.props.data.skin}>
        <Header handleSearchKey={this.handleSearchKey} word={key} />
        {key && key.length > 0 ?
        <List data={key} isGoback={this.state.isGoback} />
        :
        <HotList handleSearchKey={this.handleSearchKey} />
        }
      </div>
    )
  }
}
export default Store(Search)