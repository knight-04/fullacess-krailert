import React, { useState, useEffect } from 'react';
import { Menu, XIcon } from 'lucide-react';
import { slides } from '../../mockdata/mockproperty'

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [textVisible, setTextVisible] = useState(true);

  const menuItems = [
    { title: 'เกี่ยวกับเรา', section: '#about' },
    { title: 'โครงการ', section: '#properties' },
    { title: 'กำลังดำเนินการ', section: '#project' },
    { title: 'ลงทะเบียน', section: '#register' },
    { title: 'ติดต่อเรา', section: '#contact' }
  ];



  const handleScrollTo = (sectionId) => {
    setIsMenuOpen(false);
    const element = document.querySelector(sectionId);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSlideChange = (index) => {
    if (isTransitioning || index === currentSlide) return;

    setIsTransitioning(true);
    setTextVisible(false);

    setTimeout(() => {
      setCurrentSlide(index);
      setTimeout(() => {
        setTextVisible(true);
        setIsTransitioning(false);
      }, 800);
    }, 500);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isTransitioning) {
        handleSlideChange((currentSlide + 1) % slides.length);
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlide, isTransitioning]);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
        {!isScrolled ? (
          <div className="container mx-auto px-6">
            <div className="md:flex md:flex-col md:items-center">
              {/* Desktop Layout */}
              <div className="hidden md:flex md:flex-col md:items-center">
                <img
                  src='/images/Logo/Real/logo626.png'
                  className="w-24 h-24 object-cover mb-6 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
                  alt="Logo"
                />


                <div className="flex items-center space-x-12">
                  {menuItems.map((item) => (
                    <button
                      key={item.title}
                      onClick={() => handleScrollTo(item.section)}
                      className="text-md tracking-wider text-white hover:text-gray-200 relative group drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
                    >
                      {item.title}
                      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Layout */}
              <div className="md:hidden flex items-center justify-between h-20">

                <img
                  src='/images/Logo/Real/logo626.png'
                  className="h-20 object-contain drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
                  alt="Logo"
                />

                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white hover:text-gray-200 p-5">
                  <Menu className="h-8 w-8" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between h-16">
              {/* Desktop Layout */}
              <div className="hidden md:flex items-center flex-1">
                <button
                  onClick={() => handleScrollTo('#hero')}
                  className="flex items-center space-x-2"
                >
                  <img
                    src='/images/Logo/Real/logo1-.png'
                    className="w-auto h-7 object-cover"
                    alt="Logo"
                  />
                </button>
              </div>

              <div className="hidden md:flex items-center space-x-12">
                {menuItems.map((item) => (
                  <button
                    key={item.title}
                    onClick={() => handleScrollTo(item.section)}
                    className="text-sm tracking-wider text-blue-900 hover:text-blue-900 relative group"
                  >
                    {item.title}
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-900 transition-all duration-300 group-hover:w-full"></span>
                  </button>
                ))}
              </div>

              {/* Mobile Layout */}
              <div className="md:hidden flex items-center justify-between flex-1">
                <button
                  onClick={() => handleScrollTo('#hero')}
                  className="flex items-center"
                >
                  <img
                    src='/images/Logo/Real/logo1-.png'
                    className="h-7 object-contain"
                    alt="Logo"
                  />
                </button>
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-blue-900 hover:text-blue-700 p-5">
                  <Menu className="h-6 w-6 " />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Menu Overlay and Panel */}
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <div
              className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu Panel */}
            <div className="md:hidden fixed top-0 right-0 w-1/2 h-screen bg-white shadow-lg z-50">
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="flex justify-end items-center p-6 border-b">
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 text-gray-800 hover:text-gray-600"
                  >
                    <XIcon className="h-6 w-6" />
                  </button>
                </div>

                {/* Mobile Menu Items */}
                <div className="flex-1 flex flex-col py-8">
                  {menuItems.map((item) => (
                    <button
                      key={item.title}
                      onClick={() => handleScrollTo(item.section)}
                      className="py-4 px-6 text-base text-gray-800 hover:bg-gray-50 text-left relative group"
                    >
                      {item.title}
                      <span className="absolute left-6 bottom-3 w-0 h-0.5 bg-gray-800 transition-all duration-300 group-hover:w-16"></span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative h-screen overflow-hidden">
        <div className="relative h-full">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-[2500ms] ease-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              style={{
                zIndex: index === currentSlide ? 2 : 1,
              }}
            >
              <img
                src={slide.url}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-[2500ms]" />
            </div>
          ))}
        </div>

        {/* Carousel Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSlideChange(index)}
              disabled={isTransitioning}
              className={`w-2 h-2 rounded-full transition-all duration-300 
                ${currentSlide === index ? 'bg-white w-4' : 'bg-white/50'}
                ${isTransitioning ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-white/70'}
              `}
            />
          ))}
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-x-0 bottom-3 z-10">
          <div className="container mx-auto px-4 mb-20">
            <div
              className={`transform transition-all duration-1000 ease-out max-w-4xl mx-auto
                ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}
              `}
            >
              <p className="text-xl md:text-3xl text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] font-bold tracking-wider leading-relaxed text-center">
                {slides[currentSlide].text}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;