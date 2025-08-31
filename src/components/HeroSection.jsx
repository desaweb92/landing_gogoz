import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Logo from "../assets/images/logo-gogoz.png";

// Registrar el plugin de GSAP
gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const heroRef = useRef(null);
  const controls = useAnimation();
  const floatingElements = useRef([]);
  const videoRef = useRef(null);

  // Efecto de animación inicial con GSAP
  useEffect(() => {
    // Animación del logo
    gsap.from(".hero-logo", {
      scale: 0.5,
      opacity: 0,
      duration: 1.5,
      ease: "elastic.out(1, 0.5)",
      delay: 0.3,
    });

    // Animación escalonada del texto
    gsap.to(".hero-text", {
      y: 0,
      opacity: 1,
      stagger: 0.2,
      duration: 1,
      delay: 0.8,
      ease: "power3.out",
    });

    // Animación de fragmentos rotos (efecto "glitch" sutil)
    floatingElements.current.forEach((el, index) => {
      gsap.to(el, {
        y: index % 2 === 0 ? -25 : 25,
        x: index % 3 === 0 ? 10 : -10,
        rotation: (index * 5) % 15 - 7,
        duration: 2 + index,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    // Efecto de parallax para el video
    gsap.to(videoRef.current, {
      y: 50,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Animación de brillo intermitente (efecto neón)
    const blinkInterval = setInterval(() => {
      controls.start({
        textShadow: [
          "0 0 5px rgba(255, 42, 109, 0.5), 0 0 10px rgba(109, 142, 251, 0.5)",
          "0 0 10px rgba(255, 42, 109, 0.8), 0 0 15px rgba(109, 142, 251, 0.8)",
          "0 0 5px rgba(255, 42, 109, 0.5), 0 0 10px rgba(109, 142, 251, 0.5)",
        ],
        transition: { duration: 1.5, ease: "easeInOut" },
      });
    }, 3000);

    return () => clearInterval(blinkInterval);
  }, []);

  // Variantes para animación de texto
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2 + 0.8,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  };

  // Fragmentos rotos (inspirados en el logo)
  const brokenFragments = [
    {
      shape: (
        <svg className="w-full h-full" viewBox="0 0 20 20" fill="none">
          <path
            d="M3 3 L12 7 L7 15 L3 3 Z"
            fill="url(#fragment-gradient)"
            stroke="white"
            strokeWidth="0.3"
          />
        </svg>
      ),
      size: "w-10 h-10",
      left: "15%",
      top: "20%",
    },
    {
      shape: (
        <svg className="w-full h-full" viewBox="0 0 20 20" fill="none">
          <path
            d="M18 3 L10 10 L18 17 L18 3 Z"
            fill="url(#fragment-gradient)"
            stroke="white"
            strokeWidth="0.3"
          />
        </svg>
      ),
      size: "w-12 h-12",
      right: "20%",
      top: "30%",
    },
    {
      shape: (
        <svg className="w-full h-full" viewBox="0 0 20 20" fill="none">
          <path
            d="M5 5 L15 2 L10 12 L5 5 Z"
            fill="url(#fragment-gradient)"
            stroke="white"
            strokeWidth="0.3"
          />
        </svg>
      ),
      size: "w-8 h-8",
      left: "10%",
      bottom: "25%",
    },
    {
      shape: (
        <svg className="w-full h-full" viewBox="0 0 20 20" fill="none">
          <path
            d="M2 18 L10 10 L18 18 L2 18 Z"
            fill="url(#fragment-gradient)"
            stroke="white"
            strokeWidth="0.3"
          />
        </svg>
      ),
      size: "w-14 h-14",
      right: "10%",
      bottom: "15%",
    },
  ];

  return (
    <section
      ref={heroRef}
      className="relative h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-white"
    >
      {/* Definición del degradado para los fragmentos (rosa y azul) */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <linearGradient id="fragment-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF2A6D" />
            <stop offset="100%" stopColor="#6D8EFB" />
          </linearGradient>
        </defs>
      </svg>

      {/* Video de fondo con overlay claro y textura "rota" */}
      <motion.div animate={controls} className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-15"
        >
          <source src="/videos/promo-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-white/90" />
        {/* Textura sutil de líneas rotas (como grietas) */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                45deg,
                transparent,
                transparent 2px,
                rgba(0, 0, 0, 0.03) 2px,
                rgba(0, 0, 0, 0.03) 4px
              ),
              repeating-linear-gradient(
                -45deg,
                transparent,
                transparent 3px,
                rgba(0, 0, 0, 0.03) 3px,
                rgba(0, 0, 0, 0.03) 6px
              )
            `,
          }}
        />
      </motion.div>

      {/* Fragmentos rotos flotantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {brokenFragments.map((fragment, i) => (
          <motion.div
            key={i}
            ref={(el) => (floatingElements.current[i] = el)}
            className={`absolute ${fragment.size} opacity-60`}
            style={{
              left: fragment.left,
              right: fragment.right,
              top: fragment.top,
              bottom: fragment.bottom,
            }}
            initial={{ y: i % 2 === 0 ? -60 : 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 + i * 0.2, duration: 1.2 }}
          >
            {fragment.shape}
          </motion.div>
        ))}
      </div>

      {/* Líneas afiladas animadas (como rayos o grietas) */}
      <svg className="absolute w-full h-full pointer-events-none">
        {/* Rayo en diagonal (como en el logo) */}
        <motion.path
          d="M 100 150 L 150 100 L 180 130 L 220 90 L 250 120"
          stroke="url(#fragment-gradient)"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, delay: 1 }}
        />
        {/* Línea quebrada (efecto glitch) */}
        <motion.path
          d="M 50 300 L 80 280 L 110 310 L 140 290 L 170 320"
          stroke="rgba(109, 142, 251, 0.7)"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="3, 2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1.3 }}
        />
      </svg>

      {/* Contenido principal */}
      <div className="relative h-full flex flex-col justify-center items-center z-10 px-4">
        {/* Logo con borde fragmentado */}
        <motion.div
          className="hero-logo mb-6 p-2 border-2 border-[#FF2A6D] rounded-lg shadow-md bg-white"
          style={{
            clipPath: "polygon(5% 5%, 95% 5%, 98% 20%, 90% 90%, 20% 80%, 5% 60%)",
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 10 }}
        >
        </motion.div>

        {/* Texto con degradado y efecto neón */}
        <div className="text-center space-y-4">
          <motion.h1
            className="hero-text text-4xl md:text-6xl font-bold"
            style={{
              background: "linear-gradient(to right, #FF2A6D, #6D8EFB)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            custom={0}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            DISEÑOS QUE ROMPEN MOLDES
          </motion.h1>
          <motion.p
            className="hero-text text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto"
            custom={1}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            Sublimación con estilo único y actitud rebelde
          </motion.p>
          <motion.div custom={2} initial="hidden" animate="visible" variants={textVariants}>
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(255, 42, 109, 0.4)",
                background: "linear-gradient(to right, #FF2A6D, #6D8EFB)",
              }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 px-8 py-3 bg-gradient-to-r from-[#FF2A6D] to-[#6D8EFB] text-white rounded-full font-medium text-lg shadow-lg transition-all"
            >
              ¡QUERO VER!
            </motion.button>
          </motion.div>
        </div>
      </div> 

      {/* Indicador de scroll (estrella rota como en el logo) */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, 15, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 3 L14 9 L19 10 L15 14 L16 19 L12 16 L8 19 L9 14 L5 10 L10 9 Z"
            fill="url(#fragment-gradient)"
            stroke="white"
            strokeWidth="0.5"
          />
        </svg>
      </motion.div>
    </section>
  );
};

export default HeroSection;
