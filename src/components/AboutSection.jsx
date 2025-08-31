import React, { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  useEffect(() => {
    // Animación de fragmentos rotos con GSAP
    const fragments = gsap.utils.toArray(".floating-fragment");
    fragments.forEach((fragment, i) => {
      gsap.to(fragment, {
        y: i % 2 === 0 ? -25 : 25,
        x: i % 3 === 0 ? -10 : 10,
        rotation: (i * 7) % 15 - 7,
        duration: 3 + i,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    // Efecto parallax para el fondo
    gsap.to(sectionRef.current, {
      backgroundPosition: "50% 30%",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  // Variantes para animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -10 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 12,
      },
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: { type: "spring", stiffness: 400 },
    },
  };

  // Fragmentos rotos para decoración
  const fragments = [
    { size: "w-8 h-8", top: "10%", left: "15%" },
    { size: "w-10 h-10", top: "20%", right: "20%" },
    { size: "w-6 h-6", bottom: "30%", left: "10%" },
    { size: "w-12 h-12", bottom: "15%", right: "15%" },
    { size: "w-7 h-7", top: "60%", left: "70%" },
  ];

  // Tarjetas de valores
  const values = [
    {
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <path d="M7.5 13.5l3-3 3 3" />
          <path d="M16.5 6.5l-3 3-3-3" />
        </svg>
      ),
      title: "Diseño Creativo",
      desc: "Soluciones únicas y personalizadas",
    },
    {
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2l3 6 6 1-4 4 1 6-5-3-5 3 1-6-4-4 6-1z" />
        </svg>
      ),
      title: "Calidad Premium",
      desc: "Materiales de primera y acabados impecables",
    },
    {
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="M12 6v6l4 2" />
        </svg>
      ),
      title: "Entrega Rápida",
      desc: "Sin sacrificar calidad ni detalle",
    },
    {
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      ),
      title: "Pasión",
      desc: "Hecho con amor y dedicación",
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full px-6 py-20 md:py-32 overflow-hidden bg-gradient-to-br from-gray-50 to-white"
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

      {/* Textura de fondo sutil (líneas rotas) */}
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
            className={`floating-fragment absolute ${fragment.size} opacity-40`}
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
      <motion.div
        className="max-w-6xl mx-auto relative z-10"
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        {/* Título con efecto de fragmento */}
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <motion.h2
            className="text-4xl md:text-5xl  mb-4"
            style={{
              background: "linear-gradient(to right, #FF2A6D, #6D8EFB)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            whileHover={{ scale: 1.02 }}
          >
            SOBRE NOSOTROS
          </motion.h2>
          <motion.div
            className="w-24 h-1 mx-auto rounded-full"
            style={{ background: "linear-gradient(to right, #FF2A6D, #6D8EFB)" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          />
        </motion.div>

        {/* Texto y tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div variants={itemVariants}>
            <motion.p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed text-justify">
              En <span style={{ color: "#FF2A6D" }}>GOGO'Z</span>, nos especializamos en crear
              detalles personalizados que hacen de cada momento algo único y especial. Nuestro equipo de diseñadores y artesanos
              trabaja con pasión para ofrecer productos que reflejen tu estilo y personalidad.
            </motion.p>
            <motion.p className="text-lg md:text-xl text-gray-700 leading-relaxed text-justify">
              Desde diseños exclusivos hasta producción cuidadosa, nos aseguramos de que cada pieza sea perfecta.
              Utilizamos materiales premium y técnicas artesanales para garantizar belleza y durabilidad.
            </motion.p>
          </motion.div>

          {/* Tarjetas de valores con estilo rockero */}
          <motion.div
            className="grid grid-cols-2 gap-4"
            variants={itemVariants}
            transition={{ delay: 0.4 }}
          >
            {values.map((item, i) => (
              <motion.div
                key={i}
                className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all"
                style={{ borderTop: "3px solid", borderTopColor: "#FF2A6D" }}
                whileHover={{ y: -5, boxShadow: "0 10px 20px -5px rgba(179, 107, 227, 0.2)" }}
                variants={itemVariants}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <motion.div className="text-purple-600 mb-3" variants={iconVariants}>
                  {item.icon}
                </motion.div>
                <h3 className=" text-gray-800 mb-1">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
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
            className="w-10 h-10"
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
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </motion.svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
