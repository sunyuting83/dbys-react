import React, { Component } from 'react'

export default class Notice extends Component {
  constructor(props) {
    super(props)
    this.state = {
      notice: this.props.data
    }
  }

  startmarquee(lh,speed,delay) {
		var p=false;
		var t;
		var o=this._marquee;
		o.innerHTML+=o.innerHTML;
		o.style.marginTop=0;

		function start(){
			t=setInterval(scrolling,speed);
			if(!p) o.style.marginTop=parseInt(o.style.marginTop)-1+"px";
		}

		function scrolling(){
			if(parseInt(o.style.marginTop)%lh!=0){
				o.style.marginTop=parseInt(o.style.marginTop)-1+"px";
				if(Math.abs(parseInt(o.style.marginTop))>=o.scrollHeight/2) o.style.marginTop=0;
			}else{
				clearInterval(t);
				setTimeout(start,delay);
			}
		}
		setTimeout(start,delay);
	}
  componentDidMount(){
    let marHeight = this._marquee.childNodes[0].clientHeight
    if(this.props.data.length > 0) this.startmarquee(marHeight,marHeight,3500);
  }

  render() {
    const notice = this.state.notice
    return (
      <div class="block catalog">
        <div class="row">
          <div class="col col-20 one-news"><b>网站</b><span>公告</span></div>
          <div class="col col-80 marqueebox">
            <div ref={c => this._marquee = c}>
              {notice && notice.length > 0 ? notice.map((x,i)=> 
                <span key={i}>{x}</span>
              ):
              <span>还没有公告</span>}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
