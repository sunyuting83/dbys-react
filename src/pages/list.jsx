import React,{Component} from 'react';
import Header from '@/components/Header'
import {ListUrl, getSkin} from '@/components/config'
import HttpServer from '@/components/fetch'
import Error from '@/components/Error'
import { NavLink } from 'react-router-dom'
import { Store } from '@/pages/root'
class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      id: props.match.params.id
    }
  }

  async getData(url) {
    let data = await HttpServer(url,'detail')
    this.setState({
      data: data,
      skin: getSkin()
    })
  }

  componentDidMount(){
    console.log(this.state.id)
    const url = ListUrl(this.state.id)
    this.getData(url)
  }
  componentWillReceiveProps(nextProps, nextState) {
    let nextid = nextProps.match.params.id
    if (nextid !== this.state.id) {
      console.log(nextProps)
      this.setState({
        data: {
          status: 3
        },
        id: nextid
      })
      const url = ListUrl(nextid)
      this.getData(url)
    }
  }
  render() {
    const {data} = this.state
    return (
      <div className={"skin " + this.props.data.skin}>
        {data.status === 0?
          <div>
            <Header menu={data.menu} menumore={data.menumore} title={data.ctitle} setSkin={this.props.setSkin} />
            <section className="content has-header">
              <div className="block catalog">
                
              </div>
            </section>
          </div>
          :
          <Error data={data} />
        }
      </div>
    )
  }
}
export default Store(List)