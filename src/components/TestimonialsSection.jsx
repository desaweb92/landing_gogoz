import React, { useState, useEffect } from "react";
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
    text: "¡Los detalles personalizados de GOGO'Z hicieron que mi evento fuera inolvidable! La atención al detalle y la creatividad superaron todas mis expectativas.",
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
    text: "GOGO'Z hizo que mi cumpleaños fuera mágico. ¡Gracias por todo! Las decoraciones y detalles personalizados dejaron a todos mis invitados sin palabras.",
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
  const [direction, setDirection] = useState(1);
  const controls = useAnimation();
  const sectionRef = React.useRef(null);

  useEffect(() => {
    // Animación de burbujas con GSAP
    const bubbles = gsap.utils.toArray(".testimonial-bubble");
    bubbles.forEach((bubble, i) => {
      gsap.to(bubble, {
        y: i % 2 === 0 ? -15 : 15,
        duration: 3 + i,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

    // Animación de scroll
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top center",
      onEnter: () => controls.start("visible"),
      onLeaveBack: () => controls.start("hidden")
    });
  }, []);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const testimonialVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    exit: (direction) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
      transition: {
        duration: 0.3
      }
    })
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative px-6 py-20 md:py-28 overflow-hidden bg-gradient-to-b from-pink-50 to-purple-100"
    >
      {/* Elementos decorativos flotantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className={`testimonial-bubble absolute rounded-full opacity-20 blur-lg ${
              i % 3 === 0 ? 'bg-pink-300 w-16 h-16' : 
              i % 2 === 0 ? 'bg-purple-300 w-14 h-14' : 'bg-blue-300 w-12 h-12'
            }`}
            style={{
              top: `${10 + i * 15}%`,
              left: `${5 + i * 10}%`,
              right: i > 1 ? `${5 + (i-2) * 15}%` : 'auto'
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2
            variants={titleVariants}
            className="text-4xl md:text-5xl font-bold text-purple-600 font-cherry-bomb-one mb-4"
          >
            Lo que dicen nuestros clientes
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-pink-400 mx-auto rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          />
        </motion.div>

        <div className="relative h-96 mb-6 md:h-80">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={testimonialVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-x-0 top-0 bg-white/80 backdrop-blur-sm p-8 md:p-10 rounded-2xl shadow-sm border border-white max-w-3xl mx-auto"
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="shrink-0"
                >
                  <img
                    src={testimonials[currentIndex].icon}
                    alt={testimonials[currentIndex].name}
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-pink-200 shadow-md"
                  />
                </motion.div>
                <div className="text-left">
                  <motion.p 
                    className="italic text-lg md:text-xl text-gray-700 mb-6 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    "{testimonials[currentIndex].text}"
                  </motion.p>
                  <div>
                    <p className="font-semibold text-purple-600">{testimonials[currentIndex].name}</p>
                    <p className="text-sm text-gray-500">{testimonials[currentIndex].role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controles de navegación */}
        <div className="flex justify-center gap-4 mt-8">
          <motion.button
            onClick={prevTestimonial}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 bg-pink-500 text-white rounded-full shadow-md hover:bg-pink-600 transition-colors"
            aria-label="Testimonio anterior"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
          
          <div className="flex items-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-purple-600' : 'bg-purple-300'
                }`}
                aria-label={`Ir al testimonio ${index + 1}`}
              />
            ))}
          </div>
          
          <motion.button
            onClick={nextTestimonial}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 bg-pink-500 text-white rounded-full shadow-md hover:bg-pink-600 transition-colors"
            aria-label="Siguiente testimonio"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;