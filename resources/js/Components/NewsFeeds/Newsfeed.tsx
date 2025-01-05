import React from 'react';
import Container from '../Container';
import NewsFeedCard from './NewsFeedCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';

const Newsfeed = () => {
  return (
    <section id="blog">
      <Container>
        <div className="w-full flex flex-col pt-[80px] pb-10">
          {/* Title */}
          <div className="col-span-full text-center flex flex-col pb-[60px]">
            <h1 className="text-xl md:text-xl lg:text-2xl font-medium leading-8 text-dark mb-[14px]">
              What our author post on Newsfeed
            </h1>
            <p className="text-[15px] font-normal text-dark">
              Build an incredible workplace and grow your business with Gusto
            </p>
          </div>

          <Swiper
            navigation={true}
            modules={[Navigation]}
            spaceBetween={30}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 30,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            className="mySwiper w-full !py-5"
          >
            <SwiperSlide>
              <NewsFeedCard image="/assets/img/blog-1.webp" />
            </SwiperSlide>
            <SwiperSlide>
              <NewsFeedCard image="/assets/img/blog-2.webp" />
            </SwiperSlide>
            <SwiperSlide>
              <NewsFeedCard image="/assets/img/blog-3.webp" />
            </SwiperSlide>
          </Swiper>
        </div>
      </Container>
    </section>
  );
};

export default Newsfeed;
