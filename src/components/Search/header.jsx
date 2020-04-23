import React, { Component } from 'react'
import Suggestions from './Suggestions'
import HttpServer from '@/components/fetch'
import Back from '@/components/back'

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      results: [],
      hides: true,
      first: {}
    };
    this.clearInput = this.clearInput.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onKeyup = this.onKeyup.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  getInfo () {
    let param = {
      key: this.state.query
    };
    // get('searchkey', param).then((data) => {
    //     this.setState({
    //         first: data.first,
    //         results: data.list,
    //         hides: true
    //     })
    // }).catch((err) => {
    //     console.log(err);
    // });
  }

  clearInput () {
    // 清除搜索词
    this.search.value = '';
    let data = {
      query: '',
      results: [],
      hides: false,
      first: {}
    };
    this.setState(data);
    this.props.handleSearchKey(false);
    this.props.act_search_key(data);
    this.props.act_search_data({
      key: false,
      data: [],
      page: 1,
      scrollTop: 0
    });
    this.search.focus()
  }

  handleInputChange () {
    // 监听输入字符
    this.setState({
      query: this.search.value
    }, () => {
      if (this.state.query && this.state.query.length > 0) {
        if (this.state.query.length % 1 === 0) {
          this.getInfo()
        }
      } else if (!this.state.query) {
        this.setState({
          query: '',
          results: [],
          hides: false
        })
      }
    });
  }

  onKeyup(e) {
    // 监听回车
    if (e.keyCode === 13) {
      this.handleSubmit();
    }
  }

  handleSubmit () {
    // 提交 获得数据
    let data = {
      query: this.state.query,
      results: [],
      hides: false,
      first: {}
    };
    this.setState(data);
    this.props.act_search_key(data);
    this.props.handleSearchKey(this.state.query);
  }

  goBack() {
    this.clearInput();
    // history.goBack()
  }

  componentDidMount() {
    let data = this.state
    // console.log(data);
    if (data.query.length > 0) {
      this.search.value = data.query;
      this.setState(data);
    };
    this.search.focus()
  }

  render() {
    return (
      <header className="search">
        <Back />
        <div className="hs-search">
          <em></em>
          <input
            type="text" 
            name="search" 
            placeholder="请输入片名或主演名"
            ref={input => this.search = input}
            onChange={this.handleInputChange}
            onKeyUp={this.onKeyup} />
          {this.state.query && this.state.query.length >= 1?
            <button onClick={this.handleSubmit} className="search-button">搜索</button>
            :
            null
          }
        </div>          
        <Suggestions first={this.state.first} results={this.state.results} hd={this.state.hides} query={this.state.query} />
      </header>
    );
  }
}
