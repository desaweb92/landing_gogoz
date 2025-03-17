import React from 'react';
import { motion } from 'framer-motion';
import Fiesta from '../assets/images/fiesta.jpg';
import Ancheta from '../assets/images/Ancheta.jpg';
import Desayuno from '../assets/images/Desayuno.jpg';
import Pocillos from '../assets/images/pocillos.jpg';
import Afiche from '../assets/images/Afiche.jpg';
import Personalizada from '../assets/images/Personalizada.jpg';

const ServicesSection = () => {
  const services = [
    {
      title: 'Decoraciones Personalizadas',
      description: 'Hacemos que cada espacio refleje tu estilo y personalidad.',
      icon: Fiesta,
      bgColor: 'bg-pink-200',
    },
    {
      title: 'Anchetas',
      description: 'Crea recuerdos inolvidables con nuestras anchetas únicas.',
      icon: Ancheta,
      bgColor: 'bg-purple-200',
    },
    {
      title: 'Desayunos Personalizados',
      description: 'Comienza tu día de manera especial con nuestros desayunos.',
      icon: Desayuno,
      bgColor: 'bg-violet-200',
    },
    {
      title: 'Pocillos y Tazas',
      description: 'Disfruta de tus bebidas favoritas con estilo y originalidad.',
      icon: Pocillos,
      bgColor: 'bg-blue-200',
    },
    {
      title: 'Afiches',
      description: 'Decora tus espacios con afiches diseñados especialmente para ti.',
      icon: Afiche,
      bgColor: 'bg-indigo-200',
    },
    {
      title: 'Diseño Personalizado',
      description: 'Creamos diseños únicos para cualquier ocasión.',
      icon: Personalizada,
      bgColor: 'bg-fuchsia-200',
    },
  ];

  return (
    <section id="services" className="px-6 z-[-10] md:z-10 relative py-16 bg-gradient-to-b from-pink-200 to-purple-300 text-center overflow-hidden">
      {/* Elementos flotantes */}
      <div className="absolute inset-0">
        <motion.div
          className="w-12 h-12 bg-pink-400 rounded-full blur-lg opacity-70"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          style={{ top: '10%', left: '20%' }}
        />
        <motion.div
          className="w-10 h-10 bg-purple-400 rounded-full blur-lg opacity-70"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          style={{ top: '60%', right: '20%' }}
        />
      </div>

      {/* Contenido principal */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl mb-8 text-fuchsia-600 font-cherry-bomb-one"
      >
        Nuestros Servicios
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 * index }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`${service.bgColor} p-6 rounded-lg shadow-lg text-left relative`}
          >
            <img
              src={service.icon}
              alt={service.title}
              className="w-28 h-28 mx-auto mb-4 rounded-full shadow-lg"
            />
            <h3 className="text-2xl mb-2 text-green-600 font-cherry-bomb-one">{service.title}</h3>
            <p className="text-gray-600 font-estonia">{service.description}</p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="mt-4 px-4 py-2 bg-fuchsia-600 text-white rounded-full font-cherry-bomb-one"
            >
              Más Información
            </motion.button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
