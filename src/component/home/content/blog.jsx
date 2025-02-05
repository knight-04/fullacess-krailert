import React from 'react';

const HeroSection = ({id}) => {
  return (
    <>
   <link href="https://fonts.googleapis.com/css2?family=Hurricane&display=swap" rel="stylesheet"/>
   <link href="https://fonts.googleapis.com/css2?family=The+Nautigal:wght@400;700&display=swap" rel="stylesheet"/>

      
      <section id={id}>
        <div className="min-h-[30rem] bg-[#544D44] flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-white font-bold text-2xl mb-4">
            รู้จัก ไกรเลิศ
          </h2>

          <h1 className="text-white font-light text-4xl md:text-7xl mb-6" style={{ fontFamily: "'Hurricane', serif" }}>
            Home is where the Heart is
          </h1>

          <p className="text-white font-light text-lg mb-8 max-w-2xl">
            "บ้านให้ความสุข" เพราะเราเชื่อว่าจุดเริ่มต้นสำคัญของความสุขคือครอบครัว และบ้านคือจุดเริ่มต้นของการสร้างครอบครัว
          </p>
        </div>
      </section>
    </>
  );
};

export default HeroSection;