import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PropertyCard = ({ property }) => {
  const { status, title, price, description, image } = property;
  const images = Array.isArray(image) ? image : [image];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const previousImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="bg-white overflow-hidden">
      <div className="relative">
        <div className="relative h-64 overflow-hidden">
          {images.length > 0 ? (
            <>
              <img
                src={images[currentImageIndex]}
                alt={`${title} - image ${currentImageIndex + 1}`}
                className="w-full h-64 object-cover transition-transform duration-500"
              />
              
              {images.length > 1 && (
                <>
                  <button 
                    onClick={previousImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6 text-white/50 hover:text-white" />
                  </button>
                  
                  <button 
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6 text-white/50 hover:text-white" />
                  </button>

                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          currentImageIndex === index ? 'bg-white' : 'bg-white/50'
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No image available</span>
            </div>
          )}
        </div>

        <div className="absolute top-0 left-0">
          <div className="bg-[#F15882] text-white py-1.5 px-8 translate-y-3">
            {status}
          </div>
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-blue-900 text-2xl font-bold mb-2">{title}</h2>
        <div className="text-lg text-navy-900">
          {/* เริ่มต้นที่ {price} ล้านบาท */}
          {price}
        </div>
        <div className="block relative h-0.5 my-7 bg-black/30 rounded-full" />
        <p className="text-gray-500 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default PropertyCard;