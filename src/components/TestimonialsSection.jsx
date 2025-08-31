import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import image1 from "../assets/images/Cerdito.jpg";
import image2 from "../assets/images/aguacate.jpg";
import image3 from "../assets/images/chiken.jpg";
import image4 from "../assets/images/cow.png";
import image5 from "../assets/images/bear.png";
import image6 from "../assets/images/Gatito.jpg";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    text: "¡Los detalles personalizados de GOGO'Z hicieron que mi evento fuera INOLVIDABLE! La atención al detalle y la creatividad superaron todas mis expectativas.",
    name: "Juan P.",
    icon: image1,
    role: "Cliente de Evento"
  },
  {
    text: "GOGO'Z transformó mi visión en realidad con sus diseños únicos. Cada pieza reflejaba exactamente lo que imaginaba y más.",
    name: "María L.",
    icon: image2,
    role: "Cliente Corporativo"
  },
  {
    text: "Cada detalle fue perfecto gracias a GOGO'Z. ¡Altamente recomendado! La calidad de los materiales y la puntualidad en la entrega fueron impecables.",
    name: "Luis M.",
    icon: image3,
    role: "Cliente Recurrente"
  },
  {
    text: "El servicio de GOGO'Z es excepcional. ¡Volví a contratarlos para mi próximo evento! Su capacidad para captar mi estilo es increíble.",
    name: "Ana G.",
    icon: image4,
    role: "Organizadora de Eventos"
  },
  {
    text: "GOGO'Z hizo que mi cumpleaños fuera MÁGICO. ¡Gracias por todo! Las decoraciones y detalles personalizados dejaron a todos sin palabras.",
    name: "Carlos R.",
    icon: image5,
    role: "Cliente Particular"
  },
  {
    text: "Los productos de GOGO'Z son de alta calidad y muy originales. ¡Me encanta! Cada vez que recibo un regalo de ellos, sé que será especial.",
    name: "Laura F.",
    icon: image6,
    role: "Cliente Satisfecha"
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const controls = useAnimation();
  const sectionRef = useRef(null);
  const cassetteRef = useRef(null);

  // Animación de fragmentos rotos con GSAP
  useEffect(() => {
    const fragments = gsap.utils.toArray(".testimonial-fragment");
    fragments.forEach((fragment, i) => {
      gsap.to(fragment, {
        y: i % 2 === 0 ? -25 : 25,
        x: i % 3 === 0 ? -15 : 15,
        rotation: (i * 10) % 20 - 10,
        duration: 4 + i,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    // Efecto de "glitch" en el título
    gsap.to(".glitch-text", {
      skewX: 2,
      duration: 0.1,
      repeat: -1,
      yoyo: true,
      ease: "none",
      delay: 0.5,
    });

    // Animación de scroll
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top center",
      onEnter: () => controls.start("visible"),
    });
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
  };

  // Variantes de animación
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 12,
      },
    },
  };

  const testimonialVariants = {
    initial: {
      opacity: 0,
      scale: 0.8,
      rotate: -5,
    },
    animate: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      rotate: 5,
      transition: {
        duration: 0.3,
      },
    },
  };

  const cassetteVariants = {
    hover: {
      scale: 1.02,
      boxShadow: "0 0 20px rgba(179, 107, 227, 0.6)",
      transition: {
        type: "spring",
        stiffness: 400,
      },
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
      id="testimonials"
      ref={sectionRef}
      className="relative px-6 py-20 md:py-28 overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 text-white"
    >
      {/* Definición del degradado para los fragmentos */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <linearGradient id="fragment-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF2A6D" />
            <stop offset="100%" stopColor="#6D8EFB" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
      </svg>

      {/* Textura de fondo (ruido de vinilo) */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at 10% 10%, rgba(255, 255, 255, 0.03) 0.5px, transparent 0.5px),
            radial-gradient(circle at 90% 90%, rgba(255, 255, 255, 0.03) 0.5px, transparent 0.5px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Fragmentos rotos flotantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {fragments.map((fragment, i) => (
          <motion.div
            key={i}
            className={`testimonial-fragment absolute ${fragment.size} opacity-50`}
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
                filter="url(#glow)"
              />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Contenido principal */}
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2
            variants={titleVariants}
            className="text-4xl md:text-5xl mb-4 glitch-text"
            style={{
              textShadow: "0 0 10px rgba(255, 42, 109, 0.5), 0 0 20px rgba(109, 142, 251, 0.3)",
            }}
          >
            LO QUE DICEN <span className="text-[#FF2A6D]">NUESTROS CLIENTES</span>
          </motion.h2>
          <motion.div
            className="w-32 h-1 mx-auto rounded-full bg-gradient-to-r from-[#FF2A6D] to-[#6D8EFB]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          />
        </motion.div>

        {/* Contenedor del slider con diseño de cassette */}
        <div className="relative">
          <motion.div
            ref={cassetteRef}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border-2 border-[#FF2A6D]/30 shadow-lg"
            variants={cassetteVariants}
            whileHover="hover"
          >
            {/* Ventana del cassette (donde va el testimonio) */}
            <div className="relative h-80 mb-6 bg-gray-900/30 rounded-lg p-6 border-2 border-[#6D8EFB]/30 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  variants={testimonialVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="absolute inset-0 flex flex-col md:flex-row items-center gap-6 p-4"
                >
                  {/* Imagen con efecto polaroid roto */}
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 1 }}
                    className="shrink-0 relative"
                  >
                    <div className="absolute -top-2 -left-2 w-32 h-32 md:w-40 md:h-40 bg-white/10 rounded-lg transform -rotate-3 border-2 border-[#FF2A6D]"></div>
                    <img
                      src={testimonials[currentIndex].icon}
                      alt={testimonials[currentIndex].name}
                      className="relative w-32 h-32 md:w-40 md:h-40 rounded-lg object-cover border-4 border-white/20 shadow-lg"
                    />
                  </motion.div>

                  {/* Texto del testimonio */}
                  <div className="flex-1 bg-gray-900/40 backdrop-blur-sm p-6 rounded-lg border border-[#6D8EFB]/30">
                    <motion.p
                      className="text-lg md:text-xl text-white/90 mb-4 leading-relaxed italic"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      "{testimonials[currentIndex].text}"
                    </motion.p>
                    <div>
                      <p className=" text-[#FF2A6D]">{testimonials[currentIndex].name}</p>
                      <p className="text-sm text-white/70">{testimonials[currentIndex].role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Efecto de "cinta magnética" */}
              <div className="absolute -left-4 top-1/2 w-4 h-20 bg-gradient-to-b from-transparent via-[#FF2A6D]/50 to-transparent rounded-full"></div>
              <div className="absolute -right-4 top-1/2 w-4 h-20 bg-gradient-to-b from-transparent via-[#6D8EFB]/50 to-transparent rounded-full"></div>
            </div>

            {/* Controles del cassette */}
            <div className="flex justify-between items-center mt-6">
              {/* Botones de navegación con estilo de cassette */}
              <div className="flex gap-4">
                <motion.button
                  onClick={prevTestimonial}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-full bg-gray-800 border-2 border-[#FF2A6D] flex items-center justify-center shadow-md"
                  aria-label="Testimonio anterior"
                >
                  <svg className="w-6 h-6 text-[#FF2A6D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>

                <motion.button
                  onClick={nextTestimonial}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-full bg-gray-800 border-2 border-[#6D8EFB] flex items-center justify-center shadow-md"
                  aria-label="Siguiente testimonio"
                >
                  <svg className="w-6 h-6 text-[#6D8EFB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>

              {/* Botón de play/pausa */}
              <motion.button
                onClick={() => setIsPlaying(!isPlaying)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FF2A6D] to-[#6D8EFB] flex items-center justify-center shadow-lg"
                aria-label={isPlaying ? "Pausar" : "Reproducir"}
              >
                {isPlaying ? (
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </motion.button>

              {/* Indicadores de posición */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => goToTestimonial(index)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? "bg-gradient-to-r from-[#FF2A6D] to-[#6D8EFB] w-6"
                        : "bg-gray-600"
                    }`}
                    aria-label={`Ir al testimonio ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
