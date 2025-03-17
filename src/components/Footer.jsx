import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-fuchsia-500 p-4 text-center text-white fixed bottom-0 w-full">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        &copy; 2023 GOGO'Z. Todos los derechos reservados.
      </motion.p>
    </footer>
  );
};

export default Footer;
