import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';

interface NewsfeedProps {
  image: string;
}

const NewsFeedCard = ({ image }: NewsfeedProps) => {
  return (
    <div className="rounded-md shadow-newsfeed-card">
      <img src={image} alt="newsfeed_image" className="rounded-t-md" />
      <div className="py-6 px-6">
        <p className="text-[17px] mb-3 font-medium text-dark leading-[1.53]">
          The 3 Fundamental Rules to Keep Your user Website Goal Orientated
        </p>
        <Link
          href="/"
          className="text-link text-[15px] font-medium  flex items-center gap-2 leading-[1.33] "
        >
          Learn more <ChevronRight size={18} />
        </Link>
      </div>
    </div>
  );
};

export default NewsFeedCard;
