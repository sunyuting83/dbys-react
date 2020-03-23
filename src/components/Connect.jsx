import React, { Component } from 'react';
import {IndexJson, ListJson, PlayerJson, LivePlatformJson} from './api';

const Connect = (MyComponent) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        url: this.props.url,
        data: {},
        pages: this.props.pages
      };
    }

    makeData(page,data) {
      // console.log(page);
      switch (page) {
        case 'index':
          return IndexJson(data);
        case 'category':
          return ListJson(data);
        case 'player':
          return PlayerJson(data);
        case 'platform':
          return LivePlatformJson(data);
        default:
          return IndexJson(data);
      }
    }

    static getDerivedStateFromProps(props, state) {
        // console.log(props.memorys);
        if (props.url !== state.url) {
            return {
                url: props.url,
                pages: props.pages,
                data: {status:3}
            }
        }
        return null;
    }

    getData() {
      const {url, pages} = this.state;
      // console.log(url,pages);
      fetch(url, {
          method:'GET',
          header: {
            Accept:'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
          }
      }).then(function (response) {
          if (response.ok) {
              response.text().then(function (data) {
                  // console.log(data);
                  const json = this.makeData(pages,data);
                  if(json.status === 0) {
                    this.setState({
                      data: json
                    })
                  }else {
                    this.setState({
                        data: {
                          status: 1,
                          message: '发生错误'
                        }
                    });
                  };
              }.bind(this));
          } else {
              console.log('请求失败，状态码为', response.status);
              this.setState({
                  data: {
                    status: 1,
                    message: response.status
                  }
              });
          }
      }.bind(this))
      .catch((e) => {
        this.setState({
            data: {
              status: 1,
              message: e.message
            }
        });
      });
    }

    componentDidMount() {
      this.getData()
    }

    componentDidUpdate(nextProps) {
      if(this.state.url !== nextProps.url) this.getData()
    }

    render() {
      return <MyComponent { ...this.props } data={this.state.data} />
    }
  }
}

export {
  Connect,
}
