import React, { useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Fiesta from '../assets/images/fiesta.jpg';
import Ancheta from '../assets/images/Ancheta.jpg';
import Desayuno from '../assets/images/Desayuno.jpg';
import Pocillos from '../assets/images/pocillos.jpg';
import Afiche from '../assets/images/Afiche.jpg';
import Personalizada from '../assets/images/Personalizada.jpg';

gsap.registerPlugin(ScrollTrigger);

const ServicesSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const controls = useAnimation();

  const services = [
    {
      title: 'Decoraciones Personalizadas',
      description: 'Transformamos espacios para reflejar tu estilo único con diseños exclusivos.',
      icon: Fiesta,
      color: 'bg-pink-100/80 hover:bg-pink-200/90',
      border: 'border-pink-300'
    },
    {
      title: 'Anchetas',
      description: 'Creamos anchetas memorables llenas de detalles especiales para ocasiones únicas.',
      icon: Ancheta,
      color: 'bg-purple-100/80 hover:bg-purple-200/90',
      border: 'border-purple-300'
    },
    {
      title: 'Desayunos Personalizados',
      description: 'Desayunos gourmet diseñados para hacer cada mañana extraordinaria.',
      icon: Desayuno,
      color: 'bg-violet-100/80 hover:bg-violet-200/90',
      border: 'border-violet-300'
    },
    {
      title: 'Pocillos y Tazas',
      description: 'Piezas únicas que convierten tu momento de café en una experiencia especial.',
      icon: Pocillos,
      color: 'bg-blue-100/80 hover:bg-blue-200/90',
      border: 'border-blue-300'
    },
    {
      title: 'Afiches',
      description: 'Diseños gráficos personalizados que llenan tus espacios de inspiración.',
      icon: Afiche,
      color: 'bg-indigo-100/80 hover:bg-indigo-200/90',
      border: 'border-indigo-300'
    },
    {
      title: 'Diseño Personalizado',
      description: 'Soluciones creativas adaptadas a tus necesidades y preferencias.',
      icon: Personalizada,
      color: 'bg-fuchsia-100/80 hover:bg-fuchsia-200/90',
      border: 'border-fuchsia-300'
    },
  ];

  React.useEffect(() => {
    if (isInView) {
      controls.start("visible");
      
      // Animación de elementos flotantes con GSAP
      gsap.utils.toArray(".floating-bubble").forEach((bubble, i) => {
        gsap.to(bubble, {
          y: i % 2 === 0 ? -15 : 15,
          x: i % 3 === 0 ? -5 : 5,
          duration: 3 + i,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      });
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)"
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      rotate: 2,
      transition: { type: "spring", stiffness: 400 }
    }
  };

  return (
    <section 
      id="services"
      ref={sectionRef}
      className="relative px-6 py-20 md:py-28 overflow-hidden bg-gradient-to-b from-pink-50 to-purple-100"
    >
      {/* Elementos decorativos flotantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`floating-bubble absolute rounded-full opacity-20 blur-lg ${
              i % 3 === 0 ? 'bg-pink-300 w-16 h-16' : 
              i % 2 === 0 ? 'bg-purple-300 w-14 h-14' : 'bg-blue-300 w-12 h-12'
            }`}
            style={{
              top: `${10 + i * 12}%`,
              left: `${5 + i * 10}%`,
              right: i > 2 ? `${5 + (i-3) * 12}%` : 'auto'
            }}
          />
        ))}
      </div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {/* Título */}
          <motion.div 
            className="text-center mb-16"
            variants={itemVariants}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-purple-600 font-cherry-bomb-one mb-4"
              whileHover={{ scale: 1.02 }}
            >
              Nuestros Servicios
            </motion.h2>
            <motion.div 
              className="w-24 h-1 bg-pink-400 mx-auto rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            />
          </motion.div>

          {/* Grid de servicios */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover="hover"
                className={`${service.color} ${service.border} p-6 rounded-2xl shadow-sm border backdrop-blur-sm transition-all duration-300 flex flex-col`}
              >
                <motion.div
                  className="overflow-hidden rounded-xl mb-5"
                  variants={imageVariants}
                >
                  <img
                    src={service.icon}
                    alt={service.title}
                    className="w-full h-48 object-cover rounded-xl"
                  />
                </motion.div>
                <h3 className="text-2xl font-bold text-purple-700 mb-3 font-cherry-bomb-one">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-5 flex-grow">
                  {service.description}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`self-start px-5 py-2 rounded-full text-white font-medium ${
                    index % 3 === 0 ? 'bg-pink-500' : 
                    index % 2 === 0 ? 'bg-purple-500' : 'bg-blue-500'
                  }`}
                >
                  Ver detalles
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Flecha decorativa */}
      <motion.div
        className="flex justify-center mt-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <motion.svg
          className="w-10 h-10 text-purple-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </motion.svg>
      </motion.div>
    </section>
  );
};

export default ServicesSection;