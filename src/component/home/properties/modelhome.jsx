import React, { useState } from 'react';
import { houseData } from '../../mockdata/mockproperty';
import { BedDouble, CarFront, CookingPot, Fence, LucideHouse, ShowerHead } from 'lucide-react';

const renderIcon = (IconComponent) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full" strokeWidth="1.5">
    <IconComponent />
  </svg>
);

const HouseDetails = ({ id }) => {
  const [activeTab, setActiveTab] = useState('single');
  const currentHouse = houseData[activeTab];

  const featureIcons = [
    { icon: BedDouble, label: currentHouse.features.bedroom },
    { icon: ShowerHead, label: currentHouse.features.bathroom },
    { icon: CarFront, label: currentHouse.features.garage },
    { icon: CookingPot, label: currentHouse.features.kitchen },
    { icon: Fence, label: currentHouse.features.area },
    { icon: LucideHouse, label: currentHouse.features.useable }
  ];

  return (
    <section id={id}>
      <div className="max-w-full mx-auto p-4 bg-white">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => setActiveTab('single')}
            className={`px-6 py-2 rounded-lg text-xs md:text-lg font-medium transition-colors duration-200
              ${activeTab === 'single' ? 'bg-[#00155E] text-white' : 'bg-stone-200 text-gray-700 hover:bg-[#00155E] hover:text-white'}`}
          >
            King บ้านเดี่ยว 2 ชั้น
          </button>
          <button
            onClick={() => setActiveTab('double')}
            className={`px-6 py-3 rounded-lg text-xs md:text-lg font-medium transition-colors duration-200
              ${activeTab === 'double' ? 'bg-[#00155E] text-white' : 'bg-stone-200 text-gray-700 hover:bg-[#00155E] hover:text-white'}`}
          >
            Queen บ้านแฝด 2 ชั้น
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
          <div className="md:col-span-2 space-y-8">
            <div>
              <h2 className="flex justify-center text-lg md:text-2xl font-medium text-[#00155E] mb-1">
                {currentHouse.title}
              </h2>
              <p className="flex justify-center text-sm md:text-lg text-gray-600">ฟังก์ชั่นของบ้าน</p>
            </div>

            <div className="relative max-w-xs md:max-w-xs mx-auto">
              <div className="absolute left-1/2 w-px bg-gray-300 -translate-x-1/2 h-44 top-20"></div>

              <div className="flex flex-col items-center">
                <div className="w-10 h-10 mb-1 text-gray-700">
                  {renderIcon(featureIcons[0].icon)}
                </div>
                <span className="text-sm text-gray-700 font-medium">{featureIcons[0].label}</span>
              </div>

              <div className="grid grid-cols-2 gap-x-48 mt-3">
                {[1, 2].map((index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="w-10 h-10 mb-1 text-gray-700">
                      {renderIcon(featureIcons[index].icon)}
                    </div>
                    <span className="text-sm text-gray-700 font-medium">
                      {featureIcons[index].label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-x-48 mt-14">
                {[3, 4].map((index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="w-10 h-10 mb-1 text-gray-700">
                      {renderIcon(featureIcons[index].icon)}
                    </div>
                    <span className="text-sm text-gray-700 text-center font-medium whitespace-nowrap">
                      {featureIcons[index].label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-center mt-5">
                <div className="w-10 h-10 mb-1 text-gray-700">
                  {renderIcon(featureIcons[5].icon)}
                </div>
                <span className="text-sm text-gray-700 font-medium">
                  {featureIcons[5].label}
                </span>
              </div>
            </div>
          </div>

          <div className="md:col-span-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-6 px-4">
                <div className="max-w-2xl mx-auto md:max-w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div className="aspect-video w-full">
                        <img
                          src={currentHouse.house[0].url}
                          alt="House exterior"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2 md:gap-4">
                        {[1, 2].map((index) => (
                          <div key={index} className="aspect-video w-full">
                            <img
                              src={currentHouse.house[index].url}
                              alt="House interior"
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-2 md:gap-4">
                        {[3, 4].map((index) => (
                          <div key={index} className="aspect-video w-full">
                            <img
                              src={currentHouse.house[index].url}
                              alt="House interior"
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="aspect-video w-full">
                        <img
                          src={currentHouse.house[5].url}
                          alt="House interior"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto md:px-40">
          <div className="text-center my-10">
            <h2 className="text-lg md:text-2xl mb-10 text-[#00155E]">
              {activeTab === 'single' ? 'แปลนบ้าน King บ้านเดี่ยว 2 ชั้น' : 'แปลนบ้าน Queen บ้านแฝด 2 ชั้น'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {currentHouse.plan.map((plan, index) => (
              <div key={index} className="aspect-video">
                <img
                  src={plan.url}
                  alt={`House plan ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HouseDetails;