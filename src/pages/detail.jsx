import React,{Component} from 'react';
import Header from '@/components/Header'
import {DetailUrl} from '@/components/config'
import HttpServer from '@/components/fetch'
import Error from '@/components/Error'
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      id: 0,
      page: ''
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

  async getData(url) {
    let data = await HttpServer(url,'detail')
    this.setState({
      data: data
    })
  }

  componentDidMount(){
    const url = DetailUrl(this.state.page,this.state.id)
    this.getData(url)
  }
  render() {
    const {data} = this.state
    return (
      <div>
        {data.status === 0?
          <div>
            <Header menu={data.menu} menumore={data.menumore} />
            <section className="content has-header">
              <div>what</div>
            </section>
          </div>
          :
          <Error data={data} />
        }
      </div>
    )
  }
}