import React from 'react';
import TestimonialSlider from './Slider';
import Container from '../Container';

const Testimonial = () => {
  return (
    <div>
      <Container>
        <div className="text-center">
          <img
            className="mx-auto"
            src="/assets/img/testimonials-block-image.png"
            alt="feature img"
          />
          <h2 className="mt-11 font-medium text-[30px] leading-[1.6] text-center tracking-[-0.02em] text-[#0f2137] mb-9">
            What people say about our product
          </h2>
          <TestimonialSlider />
        </div>
      </Container>
    </div>
  );
};

export default Testimonial;
