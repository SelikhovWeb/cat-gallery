import React, { FC, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/lazy';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Gallery.css';
import { Lazy, Navigation, Pagination } from 'swiper';
import {
  getNewPhoto,
  increment,
  decrement,
  Statuses,
  getBreeds
} from '../../redux/features/catBreeds';
// @ts-ignore
import { ReactComponent as RefreshLogo } from '../../icons/refresh.svg';
import Button from '../Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useSwiper } from 'swiper/react';
// @ts-ignore
import { ReactComponent as CatLogo } from '../../icons/cat.svg';

const Gallery: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // @ts-ignore
    dispatch(getBreeds());
  }, []);
  const { allBreeds, status } = useSelector((state: RootState) => state.breeds);

  const { index } = useSelector((state: RootState) => state.breeds);

  const shouldRender = allBreeds && allBreeds.length && status === Statuses.SUCCESS;

  const swiper = useSwiper();
  console.log(swiper);
  return (
    <div className="gallery-wrapper">
      <div className="new-photo-btn-wrapper">
        <Button
          isInvisible={!shouldRender}
          // @ts-ignore
          onClick={() => dispatch(getNewPhoto(allBreeds[index]?.id))}>
          <div>New photo</div>
        </Button>
      </div>
      {status === Statuses.LOADING && (
        <Swiper lazy={true} navigation={true} modules={[Lazy, Navigation]} className="mySwiper">
          <SwiperSlide>
            <div className="swiper-lazy-preloader swiper-lazy-preloader-black " />
          </SwiperSlide>
        </Swiper>
      )}
      {shouldRender ? (
        <Swiper
          // @ts-ignore
          style={{ '--swiper-navigation-color': '#7E5AE1', '--swiper-pagination-color': '#7E5AE1' }}
          className="mySwiper"
          onSwiper={(swiper) => swiper.slideTo(index)}
          onNavigationNext={() => dispatch(increment())}
          onNavigationPrev={() => dispatch(decrement())}
          lazy={true}
          navigation={true}
          pagination={{
            type: 'progressbar'
          }}
          modules={[Lazy, Pagination, Navigation]}>
          {allBreeds.map((breed) => (
            <SwiperSlide key={breed?.name}>
              <div className="gallery-slide-wrapper">
                <img data-src={breed?.image?.url} className="swiper-lazy breed-photo" />
                <div className="swiper-lazy-preloader swiper-lazy-preloader-black " />
                <div className="breed-info">
                  <div className="breed-name">{breed?.name}</div>
                  <div className="breed-description">{breed?.description}</div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : null}
    </div>
  );
};

export default Gallery;
