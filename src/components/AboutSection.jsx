import React from 'react';
import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <section id="about" className="w-full px-8 py-16 text-justify bg-gradient-to-t from-pink-200 to-purple-300 flex flex-col items-center justify-center">
    <div className="absolute inset-0">
        <motion.div
          className="w-12 h-12 bg-pink-500 rounded-full blur-lg opacity-70"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          style={{ top: "10%", left: "20%" }}
        />
        <motion.div
          className="w-10 h-10 bg-violet-500 rounded-full blur-lg opacity-70"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          style={{ top: "60%", right: "20%" }}
        />
      </div>


      {/* Contenido principal */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-5xl mb-4 font-cherry-bomb-one text-blue-600 relative z-10 text-center "
      >
        Sobre Nosotros
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-lg max-w-2xl mx-auto font-estonia text-black"
      >
        En GOGO'Z, nos especializamos en crear detalles personalizados que hacen de cada momento algo único y especial. Nuestro equipo de diseñadores y artesanos trabaja arduamente para ofrecer productos de alta calidad que reflejan tu estilo y personalidad.
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-lg max-w-2xl mx-auto font-estonia text-black"
      >
        Desde diseños exclusivos hasta producción rápida, nos aseguramos de que cada detalle sea perfecto. Utilizamos solo los mejores materiales y técnicas para garantizar que nuestros productos no solo sean hermosos, sino también duraderos.
      </motion.p>

      {/* Iconos estilizados */}
      <div className="flex justify-center space-x-4 mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-pink-500 p-4 rounded-full"
        >
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8c1.654 0 3-1.346 3-3s-1.346-3-3-3-3 1.346-3 3 1.346 3 3 3zM21 12c0 4.667-3.781 7-7 7s-7-2.333-7-7 2.333 7 7 7zm-12.994-1c-3.278 0-4.989-3.319-4.989-6.994S6.722 3 10 3s6.994 3.319 6.994 6.994-3.319 6.994-6.994 6.994z"
            />
          </svg>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="bg-violet-500 p-4 rounded-full"
        >
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm1 17h-2v-6H7v-2h4V7h2v4h4v2h-4v6z"
            />
          </svg>
        </motion.div>
      </div>
    </section>
  );
};
export default AboutSection;
