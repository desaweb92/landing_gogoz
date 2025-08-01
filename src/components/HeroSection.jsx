import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Logo from "../assets/images/logo-gogoz.png";

// Registrar el plugin de GSAP
gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const heroRef = useRef(null);
  const controls = useAnimation();
  const floatingElements = useRef([]);
  const textControls = useAnimation();
  const videoRef = useRef(null);

  // Efecto de animación inicial con GSAP
  useEffect(() => {
    // Animación del logo
    gsap.from(".hero-logo", {
      scale: 0.5,
      opacity: 0,
      duration: 1.5,
      ease: "elastic.out(1, 0.5)",
      delay: 0.3
    });

    // Animación escalonada del texto
    gsap.to(".hero-text", {
      y: 0,
      opacity: 1,
      stagger: 0.2,
      duration: 1,
      delay: 0.8,
      ease: "power3.out"
    });

    // Animación de elementos flotantes
    floatingElements.current.forEach((el, index) => {
      gsap.to(el, {
        y: index % 2 === 0 ? -30 : 30,
        duration: 3 + index,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

    // Efecto de parallax para el video
    gsap.to(videoRef.current, {
      y: 100,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // Animación de brillo intermitente
    const blinkInterval = setInterval(() => {
      controls.start({
        opacity: [0.8, 1, 0.8],
        transition: { duration: 2, ease: "easeInOut" }
      });
    }, 5000);

    return () => clearInterval(blinkInterval);
  }, []);

  // Variantes para animación de texto
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2 + 0.8,
        duration: 0.8,
        ease: "easeOut"
      }
    })
  };

  // Elementos flotantes con posiciones aleatorias
  const floatingShapes = [
    { color: "bg-pink-400", size: "w-16 h-16", left: "20%", top: "15%" },
    { color: "bg-purple-400", size: "w-12 h-12", right: "25%", top: "40%" },
    { color: "bg-blue-400", size: "w-20 h-20", left: "10%", bottom: "20%" },
    { color: "bg-indigo-400", size: "w-14 h-14", right: "15%", bottom: "30%" }
  ];

  return (
    <section
      ref={heroRef}
      className="relative h-screen overflow-hidden bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-600"
    >
      {/* Video de fondo con overlay */}
      <motion.div
        animate={controls}
        className="absolute inset-0 overflow-hidden"
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        >
          <source src="/videos/promo-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-blue-900/20" />
      </motion.div>

      {/* Elementos decorativos flotantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingShapes.map((shape, i) => (
          <motion.div
            key={i}
            ref={el => floatingElements.current[i] = el}
            className={`${shape.color} ${shape.size} rounded-full absolute opacity-20 blur-xl`}
            style={{
              left: shape.left,
              right: shape.right,
              top: shape.top,
              bottom: shape.bottom
            }}
            initial={{ y: i % 2 === 0 ? -50 : 50 }}
          />
        ))}
      </div>

      {/* Líneas decorativas animadas */}
      <svg className="absolute w-full h-full pointer-events-none">
        <motion.path
          d="M 100 200 Q 150 150, 200 200 T 300 200"
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1 }}
        />
        <motion.path
          d="M 50 400 Q 100 350, 150 400 T 250 400"
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1.5 }}
        />
      </svg>

      {/* Contenido principal */}
      <div className="relative h-full flex flex-col justify-center items-center z-10 px-4">
        {/* Logo con animación */}
        <motion.div
          className="hero-logo mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 10 }}
        >
          <img
            src={Logo}
            alt="GOGO'Z Logo"
            className="w-64 md:w-80 h-auto drop-shadow-xl"
          />
        </motion.div>

        {/* Texto con animación escalonada */}
        <div className="text-center space-y-6">
          <motion.h1
            className="hero-text text-5xl md:text-7xl font-bold text-white font-cherry-bomb-one drop-shadow-lg"
            custom={0}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            Detalles Personalizados
          </motion.h1>
          <motion.p
            className="hero-text text-2xl md:text-3xl text-white/90 font-estonia max-w-2xl mx-auto"
            custom={1}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            Haz que cada momento sea especial con GOGO'Z
          </motion.p>
          <motion.div
            className="hero-text"
            custom={2}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 5px 15px rgba(255, 255, 255, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 px-8 py-3 bg-white text-purple-700 rounded-full font-medium text-lg shadow-lg hover:bg-purple-100 transition-colors"
            >
              Descubre Más
            </motion.button>
          </motion.div>
        </div>

        {/* Indicador de scroll */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
