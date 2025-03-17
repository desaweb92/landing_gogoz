import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <section id="contact" className="px-6 py-16 bg-white text-center mb-20 md:mb-8">
      {/* Elementos flotantes */}
      <div className="absolute inset-0">
        <motion.div
          className="w-12 h-12 bg-purple-400 rounded-full blur-lg opacity-70"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          style={{ top: '10%', left: '20%' }}
        />
        <motion.div
          className="w-10 h-10 bg-blue-400 rounded-full blur-lg opacity-70"
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
        Contáctanos
      </motion.h2>

      <div className="max-w-3xl mx-auto bg-gradient-to-b from-purple-300 to-blue-300 p-8 rounded-lg shadow-lg text-left">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div>
            <label className="block text-gray-700 font-estonia">Nombre</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-600"
              placeholder="Tu nombre"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-estonia">Correo Electrónico</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-600"
              placeholder="tuemail@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-estonia">Mensaje</label>
            <textarea
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-600"
              placeholder="Escribe tu mensaje aquí"
              rows="4"
              required
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="submit"
            className="w-full md:w-[30%] px-4 py-2 bg-fuchsia-600 text-white rounded-full font-cherry-bomb-one"
          >
            Enviar Mensaje
          </motion.button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 text-gray-600 font-estonia"
        >
          <h3 className="text-2xl mb-2 text-green-600 font-cherry-bomb-one">Información General</h3>
          <p>Dirección: Calle Principal 123, Ciudad, País</p>
          <p>Teléfono: +123 456 7890</p>
          <p>Email: info@example.com</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
