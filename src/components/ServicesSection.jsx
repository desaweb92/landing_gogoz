import React, { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Fiesta from "../assets/images/fiesta.jpg";
import Ancheta from "../assets/images/Ancheta.jpg";
import Desayuno from "../assets/images/Desayuno.jpg";
import Pocillos from "../assets/images/pocillos.jpg";
import Afiche from "../assets/images/Afiche.jpg";
import Personalizada from "../assets/images/Personalizada.jpg";

gsap.registerPlugin(ScrollTrigger);

const ServicesSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const controls = useAnimation();

  const services = [
    {
      title: "CAMISETAS Y BUZOS",
      description: "Transformamos espacios con diseños exclusivos que reflejan tu estilo único y rebelde.",
      icon: Fiesta,
      gradient: "from-[#FF2A6D] to-[#B36BE3]",
      shadow: "shadow-[0_8px_20px_-5px_rgba(255,42,109,0.3)]",
    },
    {
      title: "GORRAS Y ACCESORIOS",
      description: "Creamos anchetas llenas de detalles especiales para ocasiones que merecen ser recordadas.",
      icon: Ancheta,
      gradient: "from-[#B36BE3] to-[#6D8EFB]",
      shadow: "shadow-[0_8px_20px_-5px_rgba(109,142,251,0.3)]",
    },
    {
      title: "AGENDAS",
      description: "Desayunos diseñados para hacer cada mañana una experiencia extraordinaria y llena de estilo.",
      icon: Desayuno,
      gradient: "from-[#6D8EFB] to-[#FF2A6D]",
      shadow: "shadow-[0_8px_20px_-5px_rgba(179,107,227,0.3)]",
    },
    {
      title: "POCILLOS Y TAZAS",
      description: "Piezas únicas que convierten tu momento de café en una declaración de actitud.",
      icon: Pocillos,
      gradient: "from-[#FF2A6D] to-[#6D8EFB]",
      shadow: "shadow-[0_8px_20px_-5px_rgba(255,42,109,0.3)]",
    },
     {
      title: "DISEÑO A TU MEDIDA",
      description: "Soluciones creativas adaptadas 100% a tus necesidades, sin límites ni moldes.",
      icon: Personalizada,
      gradient: "from-[#6D8EFB] to-[#B36BE3]",
      shadow: "shadow-[0_8px_20px_-5px_rgba(109,142,251,0.3)]",
    },
  ];

  useEffect(() => {
    if (isInView) {
      controls.start("visible");

      // Animación de fragmentos rotos con GSAP
      gsap.utils.toArray(".floating-fragment").forEach((fragment, i) => {
        gsap.to(fragment, {
          y: i % 2 === 0 ? -20 : 20,
          x: i % 3 === 0 ? -10 : 10,
          rotation: (i * 7) % 15 - 7,
          duration: 3 + i,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }
  }, [isInView, controls]);

  // Variantes de animación
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12,
      },
    },
    hover: {
      y: -8,
      transition: { type: "spring", stiffness: 300 },
    },
  };

  const imageVariants = {
    hover: {
      scale: 1.03,
      rotate: 1,
      transition: { type: "spring", stiffness: 400 },
    },
  };

  // Fragmentos rotos para decoración
  const fragments = [
    { size: "w-10 h-10", top: "10%", left: "15%" },
    { size: "w-8 h-8", top: "70%", left: "10%" },
    { size: "w-12 h-12", top: "30%", right: "20%" },
    { size: "w-6 h-6", bottom: "20%", left: "70%" },
    { size: "w-9 h-9", bottom: "60%", right: "15%" },
    { size: "w-7 h-7", top: "50%", right: "5%" },
  ];

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative px-6 py-20 md:py-28 overflow-hidden bg-gradient-to-b from-gray-80 to-white"
    >
      {/* Definición del degradado para los fragmentos */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <linearGradient id="fragment-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF2A6D" />
            <stop offset="100%" stopColor="#6D8EFB" />
          </linearGradient>
        </defs>
      </svg>

      {/* Textura de fondo (líneas rotas) */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 3px,
              rgba(0, 0, 0, 0.02) 3px,
              rgba(0, 0, 0, 0.02) 6px
            ),
            repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 4px,
              rgba(0, 0, 0, 0.02) 4px,
              rgba(0, 0, 0, 0.02) 8px
            )
          `,
        }}
      />

      {/* Fragmentos rotos flotantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {fragments.map((fragment, i) => (
          <motion.div
            key={i}
            className={`floating-fragment absolute ${fragment.size} opacity-30`}
            style={{
              top: fragment.top,
              left: fragment.left,
              right: fragment.right,
              bottom: fragment.bottom,
            }}
          >
            <svg className="w-full h-full" viewBox="0 0 20 20" fill="none">
              <path
                d={i % 2 === 0 ? "M3 3 L12 7 L7 15 L3 3 Z" : "M18 3 L10 10 L18 17 L18 3 Z"}
                fill="url(#fragment-gradient)"
                stroke="white"
                strokeWidth="0.3"
              />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Contenido principal */}
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div initial="hidden" animate={controls} variants={containerVariants}>
          {/* Título con efecto de fragmento */}
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <motion.h2
              className="text-4xl md:text-5xl mb-4"
              style={{
                background: "linear-gradient(to right, #FF2A6D, #6D8EFB)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              whileHover={{ scale: 1.03 }}
            >
              NUESTROS SERVICIOS
            </motion.h2>
            <motion.div
              className="w-24 h-1 mx-auto rounded-full"
              style={{ background: "linear-gradient(to right, #FF2A6D, #6D8EFB)" }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            />
          </motion.div>

          {/* Grid de servicios con estilo rockero */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover="hover"
                className={`bg-white/90 backdrop-blur-sm rounded-xl ${service.shadow} border border-gray-100 overflow-hidden transition-all duration-300 flex flex-col`}
                style={{
                  clipPath: "polygon(5% 0%, 100% 0%, 98% 100%, 90% 99%, 0% 90%)",
                }}
              >
                {/* Imagen con efecto hover */}
                <motion.div
                  className="overflow-hidden h-48"
                  variants={imageVariants}
                >
                  <img
                    src={service.icon}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Contenido */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl mb-3" style={{ color: "#FF2A6D" }}>
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 flex-grow">{service.description}</p>

                  {/* Botón con degradado y efecto hover */}
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(179, 107, 227, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    className={`self-end px-6 py-2 rounded-full text-[#6D8EFB] font-medium mt-auto mb-3`}
                    style={{
                      background: `linear-gradient(to left, ${service.gradient})`,
                    }}
                  >
                    ¡QUERO VER!
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Flecha decorativa con estilo fragmentado */}
      <motion.div
        className="flex justify-center mt-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <motion.svg
          className="w-12 h-12"
          fill="none"
          stroke="url(#fragment-gradient)"
          viewBox="0 0 24 24"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 19V5m0 0l5 5m-5-5l-5 5"
          />
        </motion.svg>
      </motion.div>
    </section>
  );
};

export default ServicesSection;
