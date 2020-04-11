import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Swiper from 'Swiper'

class indexSwiper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      swiper: this.props.data
    }
  }

  componentDidMount() {
    new Swiper('.swiper-container', {
      loop: true,
      autoplay: {
        delay: 5000,
        stopOnLastSlide: false,
        disableOnInteraction: false
      },
      direction: 'horizontal',
      pagination: {
        el: '.swiper-pagination',
      },
      spaceBetween: 15,
      loopedSlides: 2
    })
  }

  render() {
    const swiper = this.state.swiper;
    return (
      <div>
        {swiper && swiper.length > 0 && (
          <div className='swiper-container' style={{marginBottom:0}}>
            <div className='swiper-wrapper'>
              {swiper.length > 0 && swiper.map((s, i) => (
                <div className="swiper-slide"  key={i}>
                  <NavLink to={`/player/${s.id}`}>
                    <img src={s.img} className="swiper-img" alt={s.title} />
                    <div className="swiper-word">
                      {s.title}
                    </div>
                  </NavLink>
                </div>
              ))
              }
            </div>
            <div className="swiper-pagination"></div>
          </div>
        )}
      </div>
    )
  }
}

export default indexSwiper;
