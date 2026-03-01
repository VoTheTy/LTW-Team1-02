import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Categories from '../components/Categories';
import BestSellers from '../components/BestSellers';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

const LandingPage = () => {
    return (
        <div className="font-sans text-apple-text bg-white min-h-screen">
            <Navbar />
            <main>
                <Hero />
                <Features />
                <Categories />
                <BestSellers />
                <Newsletter />
            </main>
            <Footer />
        </div>
    );
};

export default LandingPage;
