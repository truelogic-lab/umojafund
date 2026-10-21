import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import StatsBar from '../components/StatsBar';
import Features from '../components/Features';
import WhyChoose from '../components/WhyChoose';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <Header />
      <main>
        <Hero />
        <Reveal><HowItWorks /></Reveal>
        <Reveal delay={0.1}><StatsBar /></Reveal>
        <Reveal><Features /></Reveal>
        <Reveal><WhyChoose /></Reveal>
        <Reveal><Testimonials /></Reveal>
        <Reveal><CTA /></Reveal>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
