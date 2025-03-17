import React from 'react';
import { motion } from 'framer-motion';
import Logo from "../assets/images/logo-gogoz.png";
const HeroSection = () => {
  return (
    <section className="relative text-center text-white h-screen bg-gradient-to-b from-purple-600 to-blue-500 overflow-hidden">
      {/* Elementos flotantes */}
      <div className="absolute inset-0">
        <motion.div
          className="w-16 h-16 bg-pink-500 rounded-full blur-lg opacity-70"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          style={{ top: "10%", left: "20%" }}
        />
        <motion.div
          className="w-12 h-12 bg-violet-500 rounded-full blur-lg opacity-70"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          style={{ top: "60%", right: "20%" }}
        />
      </div>

      <svg className="absolute w-full h-full pointer-events-none">
        <path
          d="M 100 200 Q 150 150, 200 200 T 300 200"
          stroke="rgba(255, 105, 180, 0.5)"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M 100 400 Q 150 450, 200 400 T 300 400"
          stroke="rgba(138, 43, 226, 0.5)"
          strokeWidth="2"
          fill="none"
        />
      </svg>

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 flex flex-col justify-center items-center z-10"
      >
        <img src={Logo} className='w-[30%] my-4' alt="" />
        <h1 className="text-5xl mb-4 font-bold font-cherry-bomb-one">Detalles Personalizados</h1>
        <p className="text-[25px] font-estonia">Haz que cada momento sea especial con GOGO'Z</p>
        <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover opacity-50">
          <source src="/videos/promo-video.mp4" type="video/mp4" />
        </video>
      </motion.div>
    </section>
  );
};

export default HeroSection;
