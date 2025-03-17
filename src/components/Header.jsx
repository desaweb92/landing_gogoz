import React, { useState } from "react";
import { motion } from "framer-motion";
import Logo from "../assets/images/logo-gogoz.png";

const Header = () => {
  const [selected, setSelected] = useState(null);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isHeaderVisible, setHeaderVisible] = useState(true);

  const handleClick = (index) => {
    setSelected(index);
    setMenuOpen(false);
    setHeaderVisible(false);
  };
  const handleShowMenu = () => {
    setHeaderVisible(true); // Mostrar el encabezado
    setMenuOpen(true); // Abrir el menú
  };

  const menuItems = [
    { label: "Sobre Nosotros", href: "#about" },
    { label: "Servicios", href: "#services" },
    { label: "Testimonios", href: "#testimonials" },
    { label: "Contacto", href: "#contact" },
  ];

  return (
    <>
      {/* Botón para mostrar el menú nuevamente */}
      <div
        className={`fixed top-4 left-4 z-30 md:hidden ${
          isHeaderVisible ? "hidden" : "flex"
        }`}
      >
        <button
          onClick={handleShowMenu}
          className="bg-purple-500 text-white p-2 rounded-full"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
      <header
        className={`bg-gradient-to-b from-purple-600 to-blue-500 text-white w-48 p-4 h-full fixed top-0 left-0 flex flex-col items-center space-y-4 overflow-hidden transition-transform duration-300 ${
          isHeaderVisible ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Elementos flotantes */}
        <div className="absolute inset-0">
          <motion.div
            className="w-8 h-8 bg-pink-500 rounded-full blur-lg opacity-70"
            animate={{ y: [0, -20, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{ top: "10%", left: "30%" }}
          />
          <motion.div
            className="w-6 h-6 bg-violet-500 rounded-full blur-lg opacity-70"
            animate={{ y: [0, 20, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{ top: "70%", left: "70%" }}
          />
        </div>

        {/* Logo con efecto de brillo */}
        <motion.img
          src={Logo}
          alt="GOGO'Z Logo"
          className="w-24 mb-4 relative z-10 mx-auto md:mx-0"
          initial={{ opacity: 0, y: -20, rotate: -10 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
        />

        {/* Espirales y curvas */}
        <svg className="absolute w-full h-full pointer-events-none">
          <path
            d="M 40 100 Q 50 120, 60 100 T 80 100"
            stroke="rgba(255, 105, 180, 0.5)"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M 40 200 Q 50 220, 60 200 T 80 200"
            stroke="rgba(138, 43, 226, 0.5)"
            strokeWidth="2"
            fill="none"
          />
        </svg>

        {/* Menú hamburguesa para móviles */}
        <div className="md:hidden z-30">
          <button
            onClick={() => setMenuOpen(!isMenuOpen)}
            className="flex flex-col space-y-1"
          >
            <span
              className={`block h-1 w-8 bg-white transition-transform ${
                isMenuOpen ? "rotate-45 translate-y-1" : ""
              }`}
            ></span>
            <span
              className={`block h-1 w-8 bg-white transition-opacity ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block h-1 w-8 bg-white transition-transform ${
                isMenuOpen ? "-rotate-45 -translate-y-1" : ""
              }`}
            ></span>
          </button>
        </div>

        {/* Navegación */}
        <nav
          className={`w-full relative z-10 items-center justify-center ${
            isMenuOpen ? "flex" : "hidden"
          } md:w-full md:relative md:z-10 md:block`}
        >
          <ul className="w-full flex flex-col items-center space-y-2">
            {menuItems.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 * index }}
                whileHover={{ scale: 1.1 }}
                onClick={() => handleClick(index)}
                className="w-full text-center"
              >
                <a
                  href={item.href}
                  className={`block py-2 w-full text-center relative ${
                    selected === index
                      ? "bg-purple-700 text-white"
                      : "bg-purple-500 hover:bg-pink-500"
                  }`}
                >
                  {item.label}
                  {/* Iconos estilizados */}
                  <span className="absolute right-2">
                    {selected === index ? (
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : null}
                  </span>
                </a>
              </motion.li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
