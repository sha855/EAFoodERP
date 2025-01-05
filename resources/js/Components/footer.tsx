import { Link } from '@inertiajs/react';
import Logo from './Logo';
import { FaFacebook, FaTwitter } from 'react-icons/fa';
import { Dribbble } from 'lucide-react';
import Container from './Container';

export default function Footer() {
  return (
    <Container>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 pt-8 pb-10 border-t">
        <div className="flex items-center gap-3 justify-self-center lg:justify-self-start">
          <Logo />
          <span className="text-sm">
            Copyright &#169; 2024{' '}
            <Link
              className="text-custom-orange border-b border-orange"
              href="/"
            >
              RedQ,Inc.
            </Link>
          </span>
        </div>
        <div className="flex items-center gap-6 justify-self-center">
          <Link
            className="text-sm text-dark leading-4 hover:text-custom-orange"
            href="/"
          >
            Support
          </Link>
          <Link
            className="text-sm text-dark leading-4 hover:text-custom-orange"
            href="/"
          >
            About Us
          </Link>
          <Link
            className="text-sm text-dark leading-4 hover:text-custom-orange"
            href="/"
          >
            Privacy
          </Link>
          <Link
            className="text-sm text-dark leading-4 hover:text-custom-orange"
            href="/"
          >
            Contact
          </Link>
        </div>
        <div className="flex items-center gap-3 justify-self-center lg:justify-self-end">
          <h4 className="text-sm leading-4">Social:</h4>
          <FaFacebook className="text-facebook" size={25} />
          <FaTwitter className="text-twitter" size={25} />
          <Dribbble className="fill-[#e74d89] text-[#b2215a]" size={25} />
        </div>
      </div>
    </Container>
  );
}
