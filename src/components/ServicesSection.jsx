import React from 'react';
import { motion } from 'framer-motion';

const ServicesSection = () => {
  return (
    <section id="services" className="py-16 bg-white text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl mb-4"
      >
        Nuestros Servicios
      </motion.h2>
      <div className="flex justify-center space-x-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-fuchsia-200 p-4 rounded shadow"
        >
          <h3 className="text-2xl">Diseño Personalizado</h3>
          <p>Creamos diseños únicos para ti.</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-violet-200 p-4 rounded shadow"
        >
          <h3 className="text-2xl">Producción Rápida</h3>
          <p>Entregas en tiempo récord.</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-blue-200 p-4 rounded shadow"
        >
          <h3 className="text-2xl">Calidad Garantizada</h3>
          <p>Solo usamos los mejores materiales.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
