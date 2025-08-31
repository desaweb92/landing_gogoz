import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    if (isMobile && menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobile, menuOpen]);

  const handleNavigation = (href) => {
    const target = document.querySelector(href);
    if (target) {
      window.scrollTo({
        top: target.offsetTop,
        behavior: "smooth",
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
    { label: "Sobre Nosotros", href: "#about", icon: "brush" },
    { label: "Servicios", href: "#services", icon: "tshirt" },
    { label: "Testimonios", href: "#testimonials", icon: "star" },
    { label: "Contacto", href: "#contact", icon: "energy" },
  ];

  // Variantes de animación
  const menuVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    closed: {
      x: "-100%",
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  const menuItemVariants = {
    open: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    }),
    closed: { opacity: 0, x: -30 },
  };

  const hamburgerVariants = {
    open: { rotate: 90, scale: 1.1 },
    closed: { rotate: 0, scale: 1 },
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-900 text-white">
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
            className="p-3 rounded-full bg-gradient-to-br from-[#FF2A6D] to-[#B36BE3] shadow-lg shadow-[#FF2A6D]/50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <motion.div animate={menuOpen ? "open" : "closed"} variants={hamburgerVariants}>
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
          className="w-72 bg-black/90 backdrop-blur-sm border-r border-[#FF2A6D]/30 flex-shrink-0"
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="sticky top-0 h-screen flex flex-col p-6 overflow-y-auto">
            {/* Logo con efecto de brillo */}
            <motion.div
              className="mb-8 flex justify-center"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(179, 107, 227, 0.5)" }}
            >
              <div className="p-2 border-2 border-[#B36BE3]/50 rounded-lg">
                <img src={Logo} alt="Logo" className="w-40 h-auto" />
              </div>
            </motion.div>

            {/* Menú de navegación */}
            <nav className="flex-1">
              <ul className="space-y-2">
                {menuItems.map((item, index) => (
                  <motion.li key={index} custom={index} initial="closed" animate="open" variants={menuItemVariants}>
                    <motion.a
                      href={item.href}
                      className={`flex items-center px-4 py-3 rounded-xl transition-colors ${
                        selected === index
                          ? "bg-gradient-to-r from-[#FF2A6D]/20 to-[#B36BE3]/20 text-white border border-[#FF2A6D] shadow-lg"
                          : "hover:bg-gray-800 hover:border-[#6D8EFB] border border-gray-700"
                      }`}
                      whileHover={{ scale: 1.02, boxShadow: "0 0 10px rgba(109, 142, 251, 0.3)" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleClick(index, item.href);
                      }}
                    >
                      <span className="mr-3">
                        {item.icon === "brush" && (
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2l4 10 3-3 3 3-4 10-4-10z" />
                            <path d="M7 22l5-5" />
                            <path d="M16 17l-4 4 4 4" />
                          </svg>
                        )}
                        {item.icon === "tshirt" && (
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2L8 6l4 4 4-4-4-4zm0 12l-4-4-4 4 4 4 4-4zm8 8v-4l-4-4" />
                            <path d="M16 16l4 4-4 4-4-4" />
                          </svg>
                        )}
                        {item.icon === "star" && (
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2l3 6 6 1-4 4 1 6-5-3-5 3 1-6L3 9l6-1z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        )}
                        {item.icon === "energy" && (
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polygon points="13 2 18 7 13 12 18 17 13 22 8 17 3 12 8 7 13 2" />
                          </svg>
                        )}
                      </span>
                      <span className="text-base">{item.label}</span>
                      {selected === index && (
                        <motion.span className="ml-auto" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                          <svg className="w-5 h-5 text-[#FF2A6D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </motion.span>
                      )}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Footer del sidebar */}
            <div className="mt-auto pt-4 border-t border-gray-700/50">
              <p className="text-sm text-gray-400 text-center font-bold tracking-wider">
                <span className="text-[#FF2A6D]">DISEÑO</span> CON{" "}
                <span className="text-[#B36BE3]">ACTITUD</span>
              </p>
            </div>
          </div>
        </motion.aside>
      ) : (
        <AnimatePresence>
          {menuOpen && (
            <motion.aside
              ref={menuRef}
              className="fixed inset-y-0 left-0 w-64 bg-black/95 backdrop-blur-sm z-40 shadow-xl border-r border-[#FF2A6D]/30"
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
            >
              <div className="h-full flex flex-col p-6 overflow-y-auto">
                {/* Logo y botón de cierre */}
                <div className="flex justify-between items-center mb-8">
                  <div className="p-2 border-2 border-[#B36BE3]/50 rounded-lg">
                    <img src={Logo} alt="Logo" className="w-32 h-auto" />
                  </div>
                  <motion.button
                    onClick={toggleMenu}
                    className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors border border-gray-600"
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Cerrar menú"
                  >
                    <svg className="w-5 h-5 text-[#FF2A6D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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
                          className={`flex items-center px-4 py-3 rounded-xl transition-colors ${
                            selected === index
                              ? "bg-gradient-to-r from-[#FF2A6D]/20 to-[#B36BE3]/20 text-white border border-[#FF2A6D] shadow-lg"
                              : "hover:bg-gray-800 hover:border-[#6D8EFB] border border-gray-700"
                          }`}
                          whileHover={{ scale: 1.02, boxShadow: "0 0 10px rgba(109, 142, 251, 0.3)" }}
                          whileTap={{ scale: 0.98 }}
                          onClick={(e) => {
                            e.preventDefault();
                            handleClick(index, item.href);
                          }}
                        >
                          <span className="mr-3">
                            {item.icon === "brush" && (
                              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 2l4 10 3-3 3 3-4 10-4-10z" />
                                <path d="M7 22l5-5" />
                                <path d="M16 17l-4 4 4 4" />
                              </svg>
                            )}
                            {item.icon === "tshirt" && (
                              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 2L8 6l4 4 4-4-4-4zm0 12l-4-4-4 4 4 4 4-4zm8 8v-4l-4-4" />
                                <path d="M16 16l4 4-4 4-4-4" />
                              </svg>
                            )}
                            {item.icon === "star" && (
                              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 2l3 6 6 1-4 4 1 6-5-3-5 3 1-6L3 9l6-1z" />
                                <circle cx="12" cy="12" r="3" />
                              </svg>
                            )}
                            {item.icon === "energy" && (
                              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polygon points="13 2 18 7 13 12 18 17 13 22 8 17 3 12 8 7 13 2" />
                              </svg>
                            )}
                          </span>
                          <span className="text-base">{item.label}</span>
                          {selected === index && (
                            <motion.span className="ml-auto" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                              <svg className="w-5 h-5 text-[#FF2A6D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </motion.span>
                          )}
                        </motion.a>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                {/* Footer del sidebar */}
                <div className="mt-auto pt-4 border-t border-gray-700/50">
                  <p className="text-sm text-gray-400 text-center font-bold tracking-wider">
                    <span className="text-[#FF2A6D]">DISEÑO</span> CON{" "}
                    <span className="text-[#B36BE3]">ACTITUD</span>
                  </p>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      )}

      {/* Contenido Principal */}
      <main
        className={`flex-1 overflow-x-hidden transition-all duration-300 ${
          !isMobile ? "md:ml-0" : ""
        }`}
      >
        <div className="min-h-screen bg-gray-900">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
