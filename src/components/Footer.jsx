import React from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaTwitter, FaHeart } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import Logo from "../assets/images/logo-gogoz.png";

const Footer = () => {
  const socialLinks = [
    {
      icon: <FaFacebook className="text-blue-600" size={20} />,
      href: "https://facebook.com",
      bg: "bg-blue-100 hover:bg-blue-200",
    },
    {
      icon: <FaInstagram className="text-pink-600" size={20} />,
      href: "https://instagram.com",
      bg: "bg-pink-100 hover:bg-pink-200",
    },
    {
      icon: <FaTwitter className="text-blue-400" size={20} />,
      href: "https://twitter.com",
      bg: "bg-blue-100 hover:bg-blue-200",
    },
    {
      icon: <IoMail className="text-red-500" size={20} />,
      href: "mailto:contacto@gogoz.com",
      bg: "bg-red-100 hover:bg-red-200",
    },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white border-t border-gray-200 px-6 py-6 w-full"
    >
      <div className="max-w-6xl mx-auto">
        {/* Contenido principal */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo y texto */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex flex-col items-center md:items-start gap-2"
          >
            <img 
              src={Logo} 
              className="w-20 h-auto" 
              alt="GOGO'Z Logo" 
            />
            <p className="text-gray-600 text-sm max-w-xs text-center md:text-left">
              Creando experiencias memorables con mucho amor y profesionalismo.
            </p>
          </motion.div>

          {/* Redes sociales */}
          <div className="flex flex-col items-center md:items-end gap-4">
            <h3 className="text-lg font-medium text-gray-700">
              Síguenos en redes
            </h3>
            <div className="flex gap-3">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`${link.bg} p-3 rounded-full transition-colors`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 300,
                    delay: index * 0.1
                  }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider y copyright */}
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4 }}
          className="border-t border-gray-100 my-6"
        />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm flex items-center">
            Hecho con <FaHeart className="text-pink-400 mx-1" /> por GOGO'Z
          </p>
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} GOGO'Z. Todos los derechos reservados.
          </p>
          <motion.a
            href="#terms"
            whileHover={{ scale: 1.05 }}
            className="text-gray-500 hover:text-purple-500 text-sm"
          >
            Términos y condiciones
          </motion.a>
        </div>
      </div>

      {/* Elemento decorativo */}
   
    </motion.footer>
  );
};

export default Footer;