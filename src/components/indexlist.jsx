import React from 'react';
import { NavLink } from 'react-router-dom';
import DefaultImg from '@/components/defaultImg'
import {setHeight} from '@/components/config'
import Nothing from '@/components/nothing'

const indexList = (props) => {
  return (
    <div>
      {props.data && props.data.length > 0 ? props.data.map((s, i) => (
        <div key={i}>
          <div className="catalog">
            <div className="row">
              <div className="col col-10">
                <span className={"title-icon ticon-t" + s.id}></span>
              </div>
              <div className="col col-70 b-title">
                {s.c_name}
              </div>
              <div className="col col-20 f13 text-right">
                <NavLink to={props.page === 'indexheight'?`/class/${s.id}`:`/list/${s.id}`} onClick={()=>{setHeight(props.height, props.page)}}>
                  更多
                </NavLink>
              </div>
            </div>
          </div>
          <div className="block catalog">
            <div className="row row-wrap">
              {s.movie && s.movie.length > 0 && s.movie.map((l, index) => (
              <NavLink 
                className="col col-33 movie" 
                to={`/player/${l.id}`} 
                key={l.id}
                onClick={()=>{setHeight(props.height, props.page)}}>
                <div className="movie-img">
                  <DefaultImg src={l.img} alt={l.title} />
                  <em>{l.remarks}</em>
                  {parseInt(l.score) > 0?<i>{l.score}分</i>:null}
                </div>
                <span className="title">{l.title}</span>
              </NavLink>
              ))}
            </div>
            {props.page === 'indexheight'?
              <div class="row row-wrap">
              {s.smallclass.length > 0 && s.smallclass.map((l, index) => (
                <div class="col col-25"  key={l.id}>
                  <NavLink 
                    className="label-blue" 
                    to={`/list/${l.id}`}
                    onClick={()=>{setHeight(props.height, props.page)}}>
                    {l.c_name}
                  </NavLink>
                </div>
              ))}
            </div>:null}
          </div>
        </div>
      )):
      <Nothing />}
    </div>
  )
}
export default indexList
