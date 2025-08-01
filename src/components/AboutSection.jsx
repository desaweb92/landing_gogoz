import React, { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
    // Animación de burbujas con GSAP
    const bubbles = gsap.utils.toArray(".floating-bubble");
    bubbles.forEach((bubble, i) => {
      gsap.to(bubble, {
        y: i % 2 === 0 ? -20 : 20,
        x: i % 3 === 0 ? -5 : 5,
        duration: 3 + i,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

    // Efecto parallax para el fondo
    gsap.to(sectionRef.current, {
      backgroundPosition: "50% 20%",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  }, []);

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
    }
  };

  const iconVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    },
    hover: {
      scale: 1.1,
      rotate: 10,
      transition: { type: "spring", stiffness: 400 }
    }
  };

  return (
    <section 
      id="about"
      ref={sectionRef}
      className="relative w-full px-6 py-20 md:py-32 overflow-hidden bg-gradient-to-br from-pink-50 to-purple-100"
      style={{
        backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9InJnYmEoMjU1LDE5MiwyMDMsMC4xKSIgZmlsbC1vcGFjaXR5PSIwLjIiPjxwYXRoIGQ9Ik0zNiAzNGMwIDIuMjA5LTEuNzkxIDQtNCA0cy00LTEuNzkxLTQtNCAxLjc5MS00IDQtNCA0IDEuNzkxIDQgNHptMCAyNGMwIDIuMjA5LTEuNzkxIDQtNCA0cy00LTEuNzkxLTQtNCAxLjc5MS00IDQtNCA0IDEuNzkxIDQgNHptMjQtMTBjLTIuMjA5IDAtNC0xLjc5MS00LTRzMS43OTEtNCA0LTQgNCAxLjc5MSA0IDQtMS43OTEgNC00IDR6TTAgMzRjMCAyLjIwOSAxLjc5MSA0IDQgNHM0LTEuNzkxIDQtNC0xLjc5MS00LTQtNC00IDEuNzkxLTQgNHoiLz48L2c+PC9nPjwvc3ZnPg==')",
        backgroundSize: "60px 60px"
      }}
    >
      {/* Elementos decorativos flotantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className={`floating-bubble absolute rounded-full opacity-20 blur-md ${i % 3 === 0 ? 'bg-pink-300 w-12 h-12' : i % 2 === 0 ? 'bg-purple-300 w-10 h-10' : 'bg-blue-300 w-8 h-8'}`}
            style={{
              top: `${10 + i * 15}%`,
              left: `${5 + i * 10}%`,
              right: i > 2 ? `${5 + (i-3) * 15}%` : 'auto'
            }}
          />
        ))}
      </div>

      {/* Contenido principal */}
      <motion.div
        className="max-w-6xl mx-auto relative z-10"
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        {/* Título */}
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-purple-600 font-cherry-bomb-one mb-4"
            whileHover={{ scale: 1.02 }}
          >
            Sobre Nosotros
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-pink-400 mx-auto rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          />
        </motion.div>

        {/* Texto y tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center ">
          <motion.div variants={itemVariants}>
            <motion.p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed text-justify">
              En <span className="font-semibold text-purple-600">GOGO'Z</span>, nos especializamos en crear detalles personalizados que hacen de cada momento algo único y especial. Nuestro equipo de diseñadores y artesanos trabaja con pasión para ofrecer productos que reflejan tu estilo.
            </motion.p>
            <motion.p className="text-lg md:text-xl text-gray-700 leading-relaxed text-justify">
              Desde diseños exclusivos hasta producción cuidadosa, nos aseguramos de que cada pieza sea perfecta. Utilizamos materiales premium y técnicas artesanales para garantizar belleza y durabilidad.
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 gap-4"
            variants={itemVariants}
            transition={{ delay: 0.4 }}
          >
            {[
              { icon: "🎨", title: "Diseño Creativo", desc: "Soluciones únicas y personalizadas" },
              { icon: "✨", title: "Calidad", desc: "Materiales premium y acabados perfectos" },
              { icon: "⏱️", title: "Rápido", desc: "Entregas oportunas sin sacrificar calidad" },
              { icon: "💖", title: "Pasión", desc: "Hecho con amor y atención al detalle" }
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-white"
                whileHover={{ y: -5, boxShadow: "0 10px 25px -10px rgba(0,0,0,0.1)" }}
                variants={itemVariants}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <motion.div 
                  className="text-3xl mb-3"
                  variants={iconVariants}
                >
                  {item.icon}
                </motion.div>
                <h3 className="font-semibold text-purple-700 mb-1">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
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
      </motion.div>
    </section>
  );
};

export default AboutSection;