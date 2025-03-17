import React from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import Logo from "../assets/images/logo-gogoz.png";

const Footer = () => {
  return (
    <footer className="z-30 bg-gradient-to-r from-fuchsia-500 to-purple-600 px-6 py-2 text-center text-white shadow-lg  fixed bottom-0 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex md:flex-row flex-col items-center justify-between space-y-4"
      >
        <img src={Logo} className="w-16 md:w-28" alt="" />
        <p className="text-sm font-estonia">
          &copy; 2025 GOGO'Z. Todos los derechos reservados.
        </p>
        <div className="flex space-x-4">
          <motion.a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="text-white hover:text-yellow-300"
          >
            <FaFacebook size={24} />
          </motion.a>
          <motion.a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="text-white hover:text-yellow-300"
          >
            <FaInstagram size={24} />
          </motion.a>
          <motion.a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="text-white hover:text-yellow-300"
          >
            <FaTwitter size={24} />
          </motion.a>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
