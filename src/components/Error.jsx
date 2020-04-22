import React, { Component } from 'react'
import loading from '@/components/icons/load.svg'
import error from '@/components/icons/error.svg'
export default class Error extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      button: false
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.data.status !== state.data.status) {
      return {
        data: props.data
      }
    }
    return null;
  }
  setButton(status) {
    this.setState({
      button: !status
    })
    this.props.getData()
  }

  render() {
    const { data, button } = this.state;
    return (
      <div>
        {data.status === 1 ?
        <div>
          <div><img src={error} style={{marginTop: '50%',width:'28%'}} alt="loading" /></div>
          <div>
            {data.message}
          </div>
          <button disabled={button} onClick={()=>this.setButton(button)} className="reload">重新加载</button>
        </div>
        :
        <img src={loading} style={{marginTop: '50%',width:'28%'}} alt="loading" />
        }
      </div>
    )
  }
}