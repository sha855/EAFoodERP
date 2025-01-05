import React, { useState, useEffect, useRef } from 'react';
import { FaPlay } from 'react-icons/fa6';

const ModalVideoComponent: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [bannerOpen, setBannerOpen] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (modalOpen && videoRef.current) {
      videoRef.current.play();
    } else if (videoRef.current) {
      videoRef.current.pause();
    }
  }, [modalOpen]);

  const closeModalOnOutsideClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      setModalOpen(false);
    }
  };

  const handleEscapeKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setModalOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleEscapeKey);
    return () => {
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  return (
    <div className="relative font-inter antialiased">
      <img
        className="absolute top-[35px] left-[-50px] z-40 hidden md:inline-block lg:inline-block"
        src="/assets/img/video-dot-1.svg"
        alt="img"
      />
      <img
        className="absolute bottom-[50px] left-[-50px] z-40 hidden md:inline-block lg:inline-block"
        src="/assets/img/video-wave-1.svg"
        alt="img"
      />
      <img
        className="absolute bottom-[170px] right-[-30px] z-10 hidden md:inline-block lg:inline-block"
        src="/assets/img/video-shape-1.svg"
        alt="img"
      />

      <main className="relative  overflow-hidden">
        <div className="w-full mx-auto ">
          <div className="flex justify-center">
            <div>
              <button
                className="relative flex justify-center items-center rounded-[12px] group w-full"
                onClick={() => setModalOpen(true)}
                aria-controls="modal"
                aria-label="Watch the video"
              >
                <img
                  className=" shadow-xl w-full rounded-[12px]"
                  src="assets/img/vdo-thumb.png"
                  width="768"
                  height="432"
                  alt="Modal video thumbnail"
                />

                <div className="w-[70px] h-[70px] md:w-[106px] md:h-[106px] lgw-[106px] lg:h-[106px] bg-gradient-red-org rounded-full flex items-center justify-center absolute">
                  <FaPlay className="w-8 h-8 md:w-12 md:h-12 lg:w-12 lg:h-12 text-white" />
                </div>
              </button>

              {modalOpen && (
                <>
                  <div
                    className="fixed inset-0 z-[99999] bg-black bg-opacity-50 transition-opacity"
                    onClick={() => setModalOpen(false)}
                  ></div>

                  <div
                    id="modal"
                    className="fixed inset-0 z-[99999] flex px-4 md:px-6 py-6"
                    role="dialog"
                    aria-modal="true"
                    onClick={closeModalOnOutsideClick}
                  >
                    <div className="max-w-5xl mx-auto h-full flex items-center">
                      <div className="w-full max-h-full rounded-md shadow-2xl aspect-video bg-black overflow-hidden">
                        <video
                          ref={videoRef}
                          width="1920"
                          height="1080"
                          loop
                          controls
                        >
                          <source
                            src="https://cruip-tutorials.vercel.app/modal-video/video.mp4"
                            type="video/mp4"
                          />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ModalVideoComponent;
