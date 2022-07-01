import React, { FC, useEffect } from 'react';
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
import Button from '../Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useSwiper } from 'swiper/react';
import Slide from './Slide';

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
      {!shouldRender && (
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
          initialSlide={index}
          allowTouchMove={false}
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
              <Slide key={breed.name} breed={breed} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : null}
      <div className="new-photo-btn-wrapper">
        <Button
          isInvisible={!shouldRender}
          // @ts-ignore
          onClick={() => dispatch(getNewPhoto(allBreeds[index]?.id))}>
          <div>New photo</div>
        </Button>
      </div>
    </div>
  );
};

export default Gallery;
