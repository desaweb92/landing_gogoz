import React from 'react';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import TestimonialsSection from './components/TestimonialsSection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Layout from './components/Layout';

const App = () => {
  return (
    <div>
       <Layout>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <TestimonialsSection />
      <Contact />
      <Footer />
      </Layout>
    </div>
  );
};

export default App;
