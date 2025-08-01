import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import Logo from "../assets/images/logo-gogoz.png";

const Layout = ({ children }) => {
  const [selected, setSelected] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Detectar cambio de tamaño de pantalla
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setMenuOpen(false);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (isMobile && menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobile, menuOpen]);

  const handleNavigation = (href) => {
    const target = document.querySelector(href);
    if (target) {
      window.scrollTo({
        top: target.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const handleClick = (index, href) => {
    setSelected(index);
    if (isMobile) {
      setMenuOpen(false);
    }
    handleNavigation(href);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const menuItems = [
    { label: "Sobre Nosotros", href: "#about", icon: "👥" },
    { label: "Servicios", href: "#services", icon: "🛠️" },
    { label: "Testimonios", href: "#testimonials", icon: "💬" },
    { label: "Contacto", href: "#contact", icon: "📧" },
  ];

  // Variantes de animación
  const menuVariants = {
    open: { 
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    closed: { 
      x: "-100%",
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const menuItemVariants = {
    open: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }),
    closed: { opacity: 0, x: -30 }
  };

  const hamburgerVariants = {
    open: { rotate: 90, scale: 1.1 },
    closed: { rotate: 0, scale: 1 }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Menú Hamburguesa para móvil */}
      {isMobile && (
        <motion.div
          className="fixed top-4 left-4 z-50 md:hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring" }}
        >
          <motion.button
            onClick={toggleMenu}
            className="p-3 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <motion.div
              animate={menuOpen ? "open" : "closed"}
              variants={hamburgerVariants}
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </motion.div>
          </motion.button>
        </motion.div>
      )}

      {/* Menú Lateral */}
      {!isMobile ? (
        <motion.aside
          className="w-72 bg-white/90 backdrop-blur-sm border-r border-gray-200 flex-shrink-0"
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="sticky top-0 h-screen flex flex-col p-6 overflow-y-auto">
            {/* Logo */}
            <motion.div 
              className="mb-8 flex justify-center"
              whileHover={{ scale: 1.05 }}
            >
              <img 
                src={Logo} 
                alt="Logo" 
                className="w-40 h-auto"
              />
            </motion.div>

            {/* Menú de navegación */}
            <nav className="flex-1">
              <ul className="space-y-2">
                {menuItems.map((item, index) => (
                  <motion.li
                    key={index}
                    custom={index}
                    initial="closed"
                    animate="open"
                    variants={menuItemVariants}
                  >
                    <motion.a
                      href={item.href}
                      className={`flex items-center px-4 py-3 rounded-xl text-gray-700 transition-colors ${
                        selected === index
                          ? "bg-purple-100 text-purple-600 font-medium"
                          : "hover:bg-gray-100"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleClick(index, item.href);
                      }}
                    >
                      <span className="text-xl mr-3">{item.icon}</span>
                      <span className="text-base">{item.label}</span>
                      {selected === index && (
                        <motion.span
                          className="ml-auto"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring" }}
                        >
                          <svg
                            className="w-5 h-5 text-purple-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </motion.span>
                      )}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Footer del sidebar */}
            <div className="mt-auto pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500 text-center">
                Con ❤️ para nuestros clientes
              </p>
            </div>
          </div>
        </motion.aside>
      ) : (
        <AnimatePresence>
          {menuOpen && (
            <motion.aside
              ref={menuRef}
              className="fixed inset-y-0 left-0 w-64 bg-white/95 backdrop-blur-sm z-40 shadow-xl"
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
            >
              <div className="h-full flex flex-col p-6 overflow-y-auto">
                {/* Logo y botón de cierre */}
                <div className="flex justify-between items-center mb-8">
                  <img 
                    src={Logo} 
                    alt="Logo" 
                    className="w-32 h-auto"
                  />
                  <motion.button
                    onClick={toggleMenu}
                    className="p-2 rounded-full bg-gray-100"
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Cerrar menú"
                  >
                    <svg
                      className="w-5 h-5 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </motion.button>
                </div>

                {/* Menú de navegación */}
                <nav className="flex-1">
                  <ul className="space-y-2">
                    {menuItems.map((item, index) => (
                      <motion.li
                        key={index}
                        custom={index}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuItemVariants}
                      >
                        <motion.a
                          href={item.href}
                          className={`flex items-center px-4 py-3 rounded-xl text-gray-700 transition-colors ${
                            selected === index
                              ? "bg-purple-100 text-purple-600 font-medium"
                              : "hover:bg-gray-100"
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={(e) => {
                            e.preventDefault();
                            handleClick(index, item.href);
                          }}
                        >
                          <span className="text-xl mr-3">{item.icon}</span>
                          <span className="text-base">{item.label}</span>
                          {selected === index && (
                            <motion.span
                              className="ml-auto"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring" }}
                            >
                              <svg
                                className="w-5 h-5 text-purple-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </motion.span>
                          )}
                        </motion.a>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                {/* Footer del sidebar */}
                <div className="mt-auto pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500 text-center">
                    Con ❤️ para nuestros clientes
                  </p>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      )}

      {/* Contenido Principal */}
      <main className={`flex-1 overflow-x-hidden transition-all duration-300 ${
        !isMobile ? "md:ml-0" : ""
      }`}>
        <div className="min-h-screen">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;