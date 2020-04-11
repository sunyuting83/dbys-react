import React,{Component} from 'react'
const Store = (MyStore) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: {}
      }
    }
    getSkin() {
      let s = ''
      const skin = localStorage.getItem('skin')
      if(skin) {
        s = skin
      }else{
        s = 'blue'
        localStorage.setItem('skin', s)
      }
      return s
    }
    setSkin(skin) {
      localStorage.setItem('skin', skin)
      this.setState({
        data: {
          ...this.state.data,
          skin: skin
        }
      })
    }
    componentDidMount() {
      const s =this.getSkin()
      const data = {
        skin: s
      }
      this.setState({
        data: data
      })
    }
    render() {
      return (
        <MyStore { ...this.props } data={this.state.data} setSkin={this.setSkin.bind(this)} />
      )
    }
  }
}

export {
  Store
}