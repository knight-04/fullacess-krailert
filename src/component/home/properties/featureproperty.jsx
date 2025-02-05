import React, { useState } from 'react';
import PropertyCard from './propertycard'
import { properties } from '../../mockdata/mockproperty'


const FeaturedProperties = ({ id }) => {
  const [activeFilter, setActiveFilter] = useState('all');

  return (
    <section id={id} className="py-16 bg-white">
      <div className="container mx-auto md:px-40">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-8 text-blue-900">
            โครงการที่น่าสนใจ
          </h2>


        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-20">
          {properties
            .filter(property => activeFilter === 'all' || property.type === activeFilter)
            .map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;