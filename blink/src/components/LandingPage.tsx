import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from './Navbar';
import Footer from './Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-100 to-indigo-100 dark:from-gray-900 dark:to-indigo-900">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

const Hero: React.FC = () => (
  <section className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-800 dark:to-indigo-800 text-white py-32">
    <div className="container mx-auto px-4 flex items-center">
      <div className="w-1/2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-6xl font-extrabold mb-6 leading-tight">NexusNFT: Post-Claim Experience Platform</h1>
          <p className="text-2xl mb-12 max-w-2xl">Connect your NFTs to exclusive content and experiences</p>
          <Link href="/dashboard">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-purple-600 font-bold py-4 px-10 rounded-full text-xl inline-block shadow-lg hover:shadow-xl transition duration-300"
            >
              Explore Dashboard
            </motion.a>
          </Link>
        </motion.div>
      </div>
      <div className="w-1/2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" className="w-full h-auto">
          <path d="M500 10C229.4 10 10 229.4 10 500s219.4 490 490 490 490-219.4 490-490S770.6 10 500 10zm0 911.1c-232 0-421.1-189.1-421.1-421.1S268 78.9 500 78.9 921.1 268 921.1 500 732 921.1 500 921.1z" fill="#fff"/>
          <path d="M500 206.5c-162.1 0-293.5 131.4-293.5 293.5S337.9 793.5 500 793.5 793.5 662.1 793.5 500 662.1 206.5 500 206.5zm0 519.1c-124.3 0-225.6-101.3-225.6-225.6S375.7 274.4 500 274.4 725.6 375.7 725.6 500 624.3 725.6 500 725.6z" fill="#fff"/>
          <path d="M500 342.3c-87 0-157.7 70.7-157.7 157.7S413 657.7 500 657.7 657.7 587 657.7 500 587 342.3 500 342.3zm0 247.5c-49.6 0-89.8-40.2-89.8-89.8s40.2-89.8 89.8-89.8 89.8 40.2 89.8 89.8-40.2 89.8-89.8 89.8z" fill="#fff"/>
        </svg>
      </div>
    </div>
  </section>
);

const Features: React.FC = () => (
  <section id="features" className="py-24 bg-white dark:bg-gray-800">
    <div className="container mx-auto px-4">
      <h2 className="text-4xl font-bold text-center mb-16 text-gray-800 dark:text-white">Our Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {[
          { title: 'NFT Registration', icon: 'M12 4v16m8-8H4' },
          { title: 'Content Creation', icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6' },
          { title: 'Access Control', icon: 'M12 15v2m0 0v2m0-2h2m-2 0h-2m4-6l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2' },
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-purple-50 dark:bg-gray-700 p-8 rounded-xl shadow-md hover:shadow-lg transition duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-600 dark:text-purple-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
            </svg>
            <h3 className="text-2xl font-semibold mb-4 text-purple-600 dark:text-purple-400">{feature.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">Empower your NFT experience with our advanced {feature.title.toLowerCase()} system.</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Testimonials: React.FC = () => (
  <section id="testimonials" className="bg-purple-100 dark:bg-gray-900 py-24">
    <div className="container mx-auto px-4">
      <h2 className="text-4xl font-bold text-center mb-16 text-gray-800 dark:text-white">What Our Users Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {[1, 2].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-600 dark:text-purple-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg italic">"This platform has transformed our NFT experience. Highly recommended!"</p>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-200 dark:bg-purple-700 rounded-full mr-4"></div>
              <div>
                <p className="font-semibold text-gray-800 dark:text-white">John Doe</p>
                <p className="text-gray-500 dark:text-gray-400">NFT Enthusiast</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Contact: React.FC = () => (
  <section id="contact" className="py-24 bg-white dark:bg-gray-800">
    <div className="container mx-auto px-4">
      <h2 className="text-4xl font-bold text-center mb-16 text-gray-800 dark:text-white">Contact Us</h2>
      <div className="max-w-2xl mx-auto bg-purple-50 dark:bg-gray-700 p-12 rounded-xl shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-purple-600 dark:text-purple-400 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <p className="text-center mb-8 text-xl text-gray-600 dark:text-gray-300">
          Have questions or want to learn more about our platform? Get in touch with us!
        </p>
        <div className="text-center">
          <a href="mailto:contact@example.com" className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 text-2xl font-semibold">
            contact@example.com
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default LandingPage;
