import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

SwiperCore.use([Navigation, Pagination]);
function SwiperSection({ children, between = 0 }) {
  const [swiper, setSwiper] = useState(null);
  const [mainIndex, setMainIndex] = useState(0);

  const btnPrevRef = useRef(null);
  const btnNextRef = useRef(null);

  const swiperParams = {
    onBeforeInit: (swipe) => {
      swipe.params.navigation.prevEl = btnPrevRef.current;
      swipe.params.navigation.nextEl = btnNextRef.current;
      swipe.activeIndex = mainIndex;
      swipe.navigation.update();
    },
    onSwiper: setSwiper,
    onSlideChange: (e) => {
      console.log(e.activeIndex);
      setMainIndex(e.activeIndex);
    },
    navigation: {
      nextEl: btnNextRef.current,
      prevEl: btnPrevRef.current,
    },
    spaceBetween: between,
    slidesPerView: 'auto',

    observer: true,
    observeParents: true,
    breakpoints: {
      768: {
        spaceBetween: 0,
      },
    },
  };

  const slideTo = (index) => {
    console.log(index);
    if (swiper) swiper.slideTo(index);
  };

  return (
    <Swiper {...swiperParams} ref={setSwiper}>
      {children}
    </Swiper>
  );
}

export default SwiperSection;
