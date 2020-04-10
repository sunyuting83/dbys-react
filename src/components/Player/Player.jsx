import React, {Component} from 'react'
import Hls from "hls.js"
import DPlayer from "react-dplayer"
export default class Player extends Component {

  render() {
    const {type, path, status} = this.props
    console.log(path)
	  return (
      <div>
        {status?
        <div>
        {type === 'hls'?
          <DPlayer
            video={{
              url: path.length > 0 ? path : 'https://hkdy.com-hs-hkdy.com/20190405/BtgUlzWt/index.m3u8',
              type: 'customHls',
              autoplay:true,
              customType: {
                'customHls': function (video, player) {
                  const hls = new Hls()
                  hls.loadSource(video.src)
                  hls.attachMedia(video)
                }
              }
            }}
          />:
          <iframe src={path} title="iframe" allowFullScreen="" style={{height:'13.85rem',width:'100%'}} frameBorder="0"></iframe>}
        </div>
        :<div className="playbg"></div>
        }
      </div>
		)
	}
}