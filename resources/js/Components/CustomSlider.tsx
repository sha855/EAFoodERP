import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/pagination';

// Import required modules
import { Pagination } from 'swiper/modules';

export default function App() {
  const pagination = {
    clickable: true,
    renderBullet: function (index: any, className: any) {
      return `<span class="${className} custom-bullet"></span>`;
    },
  };

  useEffect(() => {
    const bullets = document.querySelectorAll('.swiper-pagination-bullet');
    bullets.forEach((bullet, index) => {
      const button = (
        <button
          className={`cursor-pointer border-none outline-none bg-transparent appearance-none w-[231px] shadow-sm rounded-[40px] p-[15px] flex items-center text-left transition-shadow duration-400 gap-1 hover:shadow-[rgba(132, 159, 184, 0.12) 0px 14px 40px;]`}
          type="button"
          role="tab"
        >
          <div>
            <img src="/assets/img/testimonials-1.png" alt="quote" />
          </div>

          <div>
            <h4 className="font-medium text-[17px] leading-[22px] text-[#19191b] mb-1">
              Mariana Dickey
            </h4>
            <p className="text-[15px] leading-none text-[#696879] opacity-70">
              UI Designer
            </p>
          </div>
        </button>
      );

      // Render the button using React into the bullet
      const container = document.createElement('div');
      bullet.appendChild(container);
      ReactDOM.render(button, container);
    });
  }, []);

  return (
    <>
      <Swiper
        style={{
          height: '30vh',
        }}
        pagination={pagination}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
      </Swiper>
    </>
  );
}
