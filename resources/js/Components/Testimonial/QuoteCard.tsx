import { QuoteCardProps } from '@/types/feature';
import React from 'react';

const QuoteCard = ({ QuoteMsg }: QuoteCardProps) => {
  return (
    <div>
      <div className="inline-flex items-start gap-2  md:relative lg:relative">
        <img
          className="mx-auto relative w-4"
          src="/assets/img/testimonials-qoute-1.svg"
          alt="qoute"
        />
        <p className="text-lg	 md:text-xl lg:text-xl leading-relaxed text-center text-quote-text italic">
          {QuoteMsg}
        </p>
      </div>
    </div>
  );
};

export default QuoteCard;
