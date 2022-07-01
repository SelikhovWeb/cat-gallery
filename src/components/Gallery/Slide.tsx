import React, { FC } from 'react';
import './Gallery.css';

type ObjectFromApi = { [key: string]: any };

interface SlideProps {
  breed: ObjectFromApi;
}

const Slide: FC<SlideProps> = ({ breed }) => {
  return (
    <div className="gallery-slide-wrapper">
      {breed?.image ? (
        <>
          <img data-src={breed?.image?.url} className="swiper-lazy breed-photo" />
          <div className="swiper-lazy-preloader swiper-lazy-preloader-black " />
        </>
      ) : (
        <div className="no-image-message">
          Oops, something happened with image, please try another :(
        </div>
      )}
      <div className="breed-info">
        <div className="breed-name">{breed?.name}</div>
        <div className="breed-description">{breed?.description}</div>
      </div>
    </div>
  );
};

export default Slide;
