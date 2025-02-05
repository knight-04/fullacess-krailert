import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const calculateScrollProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const progress = (scrollTop / documentHeight) * 100;
      
      setScrollProgress(progress);
      setIsVisible(scrollTop > 300);
    };

    window.addEventListener('scroll', calculateScrollProgress);
    return () => window.removeEventListener('scroll', calculateScrollProgress);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 p-2 
          bg-white rounded-full shadow-lg
          transition-all duration-300
          transform hover:-translate-y-0.5
          hover:shadow-xl"
          aria-label="Scroll to top"
        >
          <div className="relative w-12 h-12">
            <svg
              width="48"
              height="48" 
              viewBox="0 0 48 48"
              className="absolute top-0 left-0"
            >
              <circle
                cx="24"
                cy="24"
                r={radius}
                strokeWidth="3"
                fill="none"
              />
              <circle
                cx="24"
                cy="24"
                r={radius}
                stroke="#00155E"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                transform="rotate(-90 24 24)"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-200"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-[#00155E]">
              <ArrowUp size={24} />
            </div>
          </div>
        </button>
      )}
    </>
  );
};

export default ScrollProgress;