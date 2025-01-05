import React, { useEffect, useState } from 'react';
import Logo from '../Logo';
import { Link, usePage } from '@inertiajs/react';
import Container from '../Container';
import clsx from 'clsx';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import { X } from 'lucide-react';
import { MenuList } from './menuList';
import { MenuItems } from '@/types/menu';
import { PageProps } from '@/types';

const Header = () => {
  const auth = usePage<PageProps>().props;
  const [scrolled, setScrolled] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [hashQuery, setHashQuery] = useState(location.hash);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <div
        id="header"
        className={clsx(
          'fixed top-0 left-0 w-full transition-all duration-[350ms] ease-in-out z-40 py-[30px]',
          scrolled && 'bg-white shadow-md !py-2 md:py-4 lg:py-4'
        )}
      >
        <Container>
          <nav className=" border-gray-200 dark:bg-gray-900 dark:border-gray-700">
            <div className=" flex flex-wrap items-center justify-between mx-auto">
              <div className="flex items-center justify-between w-full lg:w-auto">
                <a
                  href="#"
                  className="flex items-center space-x-3 rtl:space-x-reverse"
                >
                  <Logo />
                </a>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(true)}
                  className="inline-flex items-center p-2  justify-center text-sm text-gray-500 rounded-lg lg:hidden  "
                >
                  <span className="sr-only">Open main menu</span>
                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={clsx(
                        'h-0.5 w-8 bg-white',
                        scrolled && '!bg-black'
                      )}
                    ></span>
                    <span
                      className={clsx(
                        'h-0.5 w-8 bg-white',
                        scrolled && '!bg-black'
                      )}
                    ></span>
                    <span
                      className={clsx(
                        'h-0.5 w-6 bg-white',
                        scrolled && '!bg-black'
                      )}
                    ></span>
                    <span></span>
                  </div>
                </button>
                <div
                  className="ml-11 hidden w-full lg:block lg:w-auto"
                  id="navbar-dropdown"
                >
                  <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:mt-0 md:border-0">
                    {MenuList.map((item: MenuItems, index: number) => (
                      <li key={index} className="pr-3">
                        <a
                          href={item.path}
                          onClick={() => setHashQuery(item.path)}
                          target={item.newTab ? '_blank' : '_self'}
                          className={clsx(
                            'block py-1 px-1  hover:text-text text-base',
                            hashQuery === item.path && !scrolled
                              ? '!text-dark'
                              : hashQuery === item.path && scrolled
                                ? 'text-custom-orange'
                                : null,
                            scrolled ? 'text-dark py-4' : 'text-white'
                          )}
                          aria-current="page"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="lg:flex items-center gap-8 hidden">
                {!auth.auth.user ? (
                  <Link
                    href="/login"
                    className={clsx(
                      'text-[15px] font-bold text-white border-b pb-1.5 hover:text-black hover:border-black',
                      scrolled && '!text-black !border-black'
                    )}
                  >
                    Login
                  </Link>
                ) : (
                  <Link
                    href={route('overview')}
                    className={clsx(
                      'text-[15px] font-bold text-white border-b pb-1.5 hover:text-black hover:border-black',
                      scrolled && '!text-black !border-black'
                    )}
                  >
                    Dashboard
                  </Link>
                )}

                <Link
                  href="#"
                  className={clsx(
                    'text-[15px] font-bold py-2 px-4 bg-white rounded-full text-custom-orange hover:bg-black hover:text-white',
                    scrolled && '!bg-black !text-white'
                  )}
                >
                  Join Free
                </Link>
              </div>
            </div>
          </nav>
        </Container>
        <Drawer
          open={isDrawerOpen}
          onClose={() => setDrawerOpen(!isDrawerOpen)}
          direction="right"
          className="!w-4/5 sm:!w-3/5 md:!w-3/5 relative"
        >
          <X
            onClick={() => setDrawerOpen(false)}
            className=" absolute right-2 top-2 text-red-500"
            size={40}
            strokeWidth={1}
          />
          <div className="p-6 px-10 pt-10 flex flex-col gap-5">
            {MenuList.map((item: MenuItems, index: number) => (
              <Link
                key={index}
                href={item.path}
                className={clsx(
                  'flex text-lg items-center gap-3 relative text-dark ',
                  hashQuery === item.path &&
                    'text-custom-orange before:absolute before:-left-5  before:w-2 before:h-2 before:rounded-full before:bg-custom-orange'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </Drawer>
      </div>
    </div>
  );
};

export default Header;
