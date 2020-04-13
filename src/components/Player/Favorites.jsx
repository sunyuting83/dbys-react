import React, {Component} from 'react'
export default class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data
    }
  }
  static getDerivedStateFromProps(props, state) {
    if (JSON.stringify(props.data) !== JSON.stringify(state.data)) {
      return {
        data: props.data
      }
    }
    return null;
  }

  sum (m, n) {
    var num = Math.floor(Math.random() * (m - n) + n)
    return num
  }
  setFavorites() {
    const data = this.state.data
        , favorites = localStorage.getItem('favorites')
        , json = {
            id: data.id,
            cid: data.cid,
            img: data.img,
            title: data.title,
            remarks: data.remarks,
            score: data.score,
            profiles: data.profiles.substring(0, 46)
          }
    if(favorites) {
      let jsons = JSON.parse(favorites)
      const c = jsons.filter(y => y.id === data.id)
      if(c.length === 0) {
        if(jsons.length === 50) jsons = jsons.slice(0,-1)
        jsons = [json, ...jsons]
        localStorage.setItem('favorites', JSON.stringify(jsons))
        this.props.openPopup({
          message: '成功加入收藏夹!',
          open:true
        })
      }else{
        this.props.openPopup({
          message: '已经收藏过了!',
          open:true
        })
      }
    }else{
      const jsons = [json]
      localStorage.setItem('favorites', JSON.stringify(jsons))
      this.props.openPopup({
        message: '成功加入收藏夹!',
        open:true
      })
    }
  }
  render() {
    return (
      <div>
        <div className="block catalog">
          <div className="row f11 text-left h88">
            <div className="col" >
              <div className="row" style={{'align-items':'center'}}>
                <div className="col col-33 ">
                  <i className="iconp icon-digg-up"></i>
                </div>
                <span className="col">{this.sum(34,999)}</span>
              </div>
            </div>
            <div className="col" >
              <div className="row" style={{'align-items':'center'}}>
                <div className="col col-33 ">
                  <i className="iconp icon-digg-down"></i>
                </div>
                <span className="col">{this.sum(34,230)}</span>
              </div>
            </div>
            <div className="col" onClick={this.setFavorites.bind(this)}>
              <div className="row" style={{'align-items':'center'}}>
                <div className="col col-33 ">
                  <i className="iconp icon-favorites"></i>
                </div>
                <span className="col">收藏</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}