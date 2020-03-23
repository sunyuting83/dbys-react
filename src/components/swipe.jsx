import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Swiper from 'Swiper'
import '@/components/mySwiper.css'

class indexSwiper extends Component {
  constructor(props) {
    super(props);
    let data = this.props.data;
    this.state = {
      swiper: data
    }
  }

  componentDidMount() {
    new Swiper('.swiper-container', {
      loop: true,
      autoplay: {
        delay: 4000,
        stopOnLastSlide: false,
        disableOnInteraction: true
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
    let swiper = this.state.swiper;
    return (
      <div>
        {swiper && swiper.length > 0 && (
          <div className='swiper-container'>
            <div className='swiper-wrapper'>
              {swiper.length > 0 && swiper.map((s, i) => (
                <div className="swiper-slide">
                  <Link to={`/item/${s.url}`} key={i}>
                    <img src={s.img} className="swiper-img" alt={s.title} />
                    <div className="swiper-word">
                      {s.title}
                    </div>
                  </Link>
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
