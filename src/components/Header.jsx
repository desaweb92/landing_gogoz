import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../assets/images/logo-gogoz.png";

const Header = () => {
  const [selected, setSelected] = useState(null);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isHeaderVisible, setHeaderVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Detectar cambio de tamaño de pantalla
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setHeaderVisible(true);
        setMenuOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Controlar scroll para móviles
  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      setScrollY(window.scrollY);
      if (window.scrollY > 100 && isHeaderVisible) {
        setHeaderVisible(false);
      } else if (window.scrollY <= 100 && !isHeaderVisible) {
        setHeaderVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHeaderVisible, isMobile]);

  const handleClick = (index) => {
    setSelected(index);
    if (isMobile) {
      setMenuOpen(false);
      setHeaderVisible(false);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
    setHeaderVisible(true);
  };

  const menuItems = [
    { label: "Sobre Nosotros", href: "#about", icon: "👥" },
    { label: "Servicios", href: "#services", icon: "🛠️" },
    { label: "Testimonios", href: "#testimonials", icon: "💬" },
    { label: "Contacto", href: "#contact", icon: "📧" },
  ];

  const floatingShapes = [
    { color: "bg-pink-300", size: "w-10 h-10", delay: 0, y: [-10, 10, -10] },
    { color: "bg-purple-300", size: "w-8 h-8", delay: 0.5, y: [10, -10, 10] },
    { color: "bg-blue-300", size: "w-6 h-6", delay: 1, y: [-5, 5, -5] },
  ];

  // Variantes de animación para móvil/desktop
  const headerVariants = {
    mobile: {
      x: isHeaderVisible ? 0 : "-100%",
      opacity: isHeaderVisible ? 1 : 0,
    },
    desktop: {
      x: 0,
      opacity: 1
    }
  };

  return (
    <>
      {/* Botón flotante para móviles */}
      <AnimatePresence>
        {isMobile && !isHeaderVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="fixed top-4 left-4 z-50 md:hidden"
          >
            <button
              onClick={toggleMenu}
              className="p-3 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 shadow-lg hover:shadow-xl transition-all"
              aria-label="Abrir menú"
            >
              <motion.div
                animate={isMenuOpen ? "open" : "closed"}
                variants={{
                  open: { rotate: 90 },
                  closed: { rotate: 0 },
                }}
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
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header principal */}
      <motion.header
        initial={false}
        animate={isMobile ? headerVariants.mobile : headerVariants.desktop}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed top-0 left-0 h-screen ${isMobile ? "w-64" : "w-72"} bg-gradient-to-b from-white to-gray-50 shadow-xl z-40 border-r border-gray-200`}
      >
        {/* Elementos decorativos flotantes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {floatingShapes.map((shape, i) => (
            <motion.div
              key={i}
              className={`${shape.color} ${shape.size} rounded-full absolute opacity-20 blur-md`}
              animate={{
                y: shape.y,
                x: [0, 5, 0],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                repeatType: "reverse",
                delay: shape.delay,
              }}
              style={{
                top: `${20 + i * 20}%`,
                left: `${10 + i * 15}%`,
              }}
            />
          ))}
        </div>

        {/* Contenido del header */}
        <div className="relative z-10 h-full flex flex-col p-6">
          {/* Logo con animación */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8 mt-4 flex justify-center"
          >
            <motion.img
              src={Logo}
              alt="Logo"
              className={`${isMobile ? "w-32" : "w-40"} h-auto`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            />
          </motion.div>

          {/* Menú de navegación */}
          <nav className="flex-1">
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <motion.a
                    href={item.href}
                    className={`flex items-center px-4 py-3 rounded-xl text-gray-700 hover:text-purple-600 transition-colors ${
                      selected === index
                        ? "bg-purple-100 text-purple-600 font-medium"
                        : "hover:bg-gray-100"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleClick(index)}
                  >
                    <span className="text-xl mr-3">{item.icon}</span>
                    <span className="text-sm md:text-base">{item.label}</span>
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-auto pt-4 border-t border-gray-200"
          >
            <p className="text-xs md:text-sm text-gray-500 text-center">
              Con ❤️ para nuestros clientes
            </p>
          </motion.div>
        </div>

        {/* Botón de cierre para móviles */}
        {isMobile && (
          <motion.button
            onClick={() => setHeaderVisible(false)}
            className="md:hidden absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            whileHover={{ scale: 1.1 }}
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
        )}
      </motion.header>
    </>
  );
};

export default Header;