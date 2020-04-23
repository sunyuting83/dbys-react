import React,{Component} from 'react';
import Header from '@/components/Search/header'
import { Store } from '@/pages/root'
import {
  Keywords,
  Description,
  GlobalTitle} from '@/components/config'
import HotList from '@/components/Search/hotKey'

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    }
  }
  componentDidMount() {
    document.title = `${GlobalTitle} - 最新电影,高清电影,免费电影,在线电影,最新电视剧`
    document.getElementsByTagName('meta')['keywords'].content = Keywords
    document.getElementsByTagName('meta')['description'].content = Description
  }
  render() {
    return (
      <div className={"skin " + this.props.data.skin}>
        <Header />
        <HotList />
      </div>
    )
  }
}
export default Store(Search)