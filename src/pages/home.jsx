import React from 'react';
import Navbar from '../component/layout/navbar/header';
import FeaturedProperties from '../component/home/properties/featureproperty';
import Footer from '../component/layout/footer/contact';
import ScrollToTop from '../component/home/scroll/scrolltotop';
import Blog from '../component/home/content/blog';
import RegistrationForm from '../component/layout/footer/register'
import HouseFeatures from '../component/home/properties/modelhome';


const HomePage = () => {
  return (
    <div className="relative min-h-screen">
      <div className="absolute bg-blue-100" />
        <Navbar />
        <Blog id="about" />
        <FeaturedProperties id="properties" />
        <HouseFeatures id="project"/>
        <RegistrationForm id="register" />
        <ScrollToTop />
        <Footer id="contact" />

    </div>
  );
};

export default HomePage;