import React, { Component } from 'react'
import Suggestions from './Suggestions'
import Back from '@/components/back'
import {KeyUrl} from '@/components/config'
import HttpServer from '@/components/fetch'

let timeout
export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      results: [],
      hides: false,
      goback: true
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onKeyup = this.onKeyup.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  static getDerivedStateFromProps(props, state) {
    if (props.word !== undefined && props.word !== false) {
      return {
        goback: false
      }
    }
    return null;
  }

  async getInfo () {
    let data = await HttpServer(KeyUrl(this.state.query))
    this.setState({
      results: data,
      hides: true
    })
  }

  handleInputChange () {
    // 监听输入字符
    const _this = this
    this.setState({
      query: this.search.value
    }, () => {
      clearTimeout(timeout)
      if (this.state.query && this.state.query.length > 0) {
        if (this.state.query.length % 1 === 0) {
          timeout = setTimeout(function () { ///延迟与服务器交互时间提高效率
            _this.getInfo()
          }, 500)
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
      goback: false
    };
    this.setState(data);
    this.props.handleSearchKey(this.state.query);
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

  goSearch() {
    this.search.value = '';
    let data = {
      query: '',
      results: [],
      hides: false,
      goback: true
    };
    this.setState(data);
    this.props.handleSearchKey(false);
    this.search.focus()
  }

  componentWillUnmount(){
    clearTimeout(timeout)
  }

  render() {
    const { results, hides, query, goback } = this.state
    return (
      <header className="search">
        {goback?
        <Back />
        :
        <div 
          onClick={this.goSearch.bind(this)} 
          className="header-item">
            <i className="icon icon-back"></i>
        </div>
        }
        <div className="hs-search">
          <em></em>
          <input
            type="text" 
            name="search" 
            placeholder="请输入片名或主演名"
            ref={input => this.search = input}
            onChange={this.handleInputChange}
            onKeyUp={this.onKeyup} />
          {query && query.length >= 1?
            <button onClick={this.handleSubmit} className="search-button">搜索</button>
            :
            null
          }
        </div>          
        <Suggestions results={results} hd={hides} query={query} />
      </header>
    );
  }
}
