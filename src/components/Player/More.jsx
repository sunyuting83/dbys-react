import React, {Component} from 'react'
import { NavLink } from 'react-router-dom'
import DefaultImg from '@/components/defaultImg'
export default class More extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      hideshow:false
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
  setShow() {
    this.setState({hideshow:!this.state.hideshow})
  }
  render() {
    const data = this.state.data
    return (
      <div>
        <div className="block catalog">
          <div className="row row-wrap">
              <div className="col col-33 movie">
                  <div className="movie-img">
                    <DefaultImg src={data.img} alt={data.title} />
                    <em>{data.remarks}</em>
                  </div>
              </div>
              <div className="col text-left">
                  <h1 className="col f14">{data.title}</h1>
                  <p className="col f11 h88">主演：
                    {data.performer.length > 0 && data.performer.map(x =>(
                      <NavLink to={`/tags/performer/${x.id}/${x.p_name}`} className="h88">{x.p_name}</NavLink>
                    ))}
                  </p>
                  <p className="col f11 h88">导演：
                    {data.director.length > 0 && data.director.map(x =>(
                      <NavLink to={`/tags/director/${x.id}/${x.d_name}`} className="h88">{x.d_name}</NavLink>
                    ))}
                  </p>
                  <div className="row f11 h88">
                    <div className="col">年份：{data.year}</div>
                    <div className="col">评分：{data.score}分</div>
                  </div>
                  <div className="row f11 h88">
                    <div className="col">区域：
                    {data.area.length > 0 && data.area.map(x =>(
                      <NavLink to={`/tags/area/${x.id}/${x.a_name}`} className="h88">{x.a_name}</NavLink>
                    ))}
                    </div>
                    <div className="col">语言：{data.languarge}</div>
                  </div>
              </div>
          </div>
          <div className="row">
            <div className={this.state.hideshow?"col f11 text-left h88 contents active":"col f11 text-left h88 contents"} dangerouslySetInnerHTML={{__html: data.profiles}} />
            {this.state.hideshow?
            null:
            <div className="col col-10 anniu" onClick={this.setShow.bind(this)}>
              <i className="iconp icon-down"></i>
            </div>}
          </div>
          {this.state.hideshow?
          <div className="row">
            <div className="col anniu" onClick={this.setShow.bind(this)}>
              <i className="iconp icon-up"></i>
            </div>
          </div>:null}
        </div>
      </div>
    )
  }
}