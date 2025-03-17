import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import image1 from "../assets/images/Cerdito.jpg";
import image2 from "../assets/images/aguacate.jpg";
import image3 from "../assets/images/chiken.jpg";
import image4 from "../assets/images/cow.png";
import image5 from "../assets/images/bear.png";
import image6 from "../assets/images/Gatito.jpg";

const testimonials = [
  {
    text: "¡Los detalles personalizados de GOGO'Z hicieron que mi evento fuera inolvidable!",
    name: "Juan P.",
    icon: image1,
  },
  {
    text: "GOGO'Z transformó mi visión en realidad con sus diseños únicos.",
    name: "María L.",
    icon: image2,
  },
  {
    text: "Cada detalle fue perfecto gracias a GOGO'Z. ¡Altamente recomendado!",
    name: "Luis M.",
    icon: image3,
  },
  {
    text: "El servicio de GOGO'Z es excepcional. ¡Volví a contratarlos para mi próximo evento!",
    name: "Ana G.",
    icon: image4,
  },
  {
    text: "GOGO'Z hizo que mi cumpleaños fuera mágico. ¡Gracias por todo!",
    name: "Carlos R.",
    icon: image5,
  },
  {
    text: "Los productos de GOGO'Z son de alta calidad y muy originales. ¡Me encanta!",
    name: "Laura F.",
    icon: image6,
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((currentIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((currentIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      id="testimonials"
      className="px-8 py-16 bg-gradient-to-b from-pink-200 to-purple-300 text-center"
    >
      {/* Elementos flotantes */}
      <div className="absolute inset-0">
        <motion.div
          className="w-12 h-12 bg-pink-400 rounded-full blur-lg opacity-70"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          style={{ top: "10%", left: "20%" }}
        />
        <motion.div
          className="w-10 h-10 bg-purple-400 rounded-full blur-lg opacity-70"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          style={{ top: "60%", right: "20%" }}
        />
      </div>

      {/* Espirales y curvas */}
      <svg className="absolute w-full h-full pointer-events-none">
        <path
          d="M 50 100 Q 75 120, 100 100 T 150 100"
          stroke="rgba(255, 105, 180, 0.5)"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M 50 200 Q 75 220, 100 200 T 150 200"
          stroke="rgba(138, 43, 226, 0.5)"
          strokeWidth="2"
          fill="none"
        />
      </svg>

      {/* Contenido principal */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl mb-4 text-violet-500 font-cherry-bomb-one"
      >
        Testimonios
      </motion.h2>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto mb-8 p-6 bg-white rounded-lg shadow-lg text-left"
        >
          <img
            src={testimonials[currentIndex].icon}
            alt="Cute Icon"
            className="w-24 h-24 mx-auto mb-4 rounded-full"
          />
          <p className="italic text-lg text-gray-700 font-estonia">
            {testimonials[currentIndex].text}
          </p>
          <p className="mt-4 text-right text-gray-500">- {testimonials[currentIndex].name}</p>
        </motion.div>
      </AnimatePresence>

      {/* Botones de navegación */}
      <div className="flex justify-center space-x-4">
        <button onClick={prevTestimonial} className="p-2 bg-pink-400 text-white rounded-full">
          ◀
        </button>
        <button onClick={nextTestimonial} className="p-2 bg-purple-400 text-white rounded-full">
          ▶
        </button>
      </div>
    </section>
  );
};

export default TestimonialsSection;
