import React, { useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const controls = useAnimation();

  React.useEffect(() => {
    if (isInView) {
      controls.start("visible");
      
      // Animación de elementos flotantes con GSAP
      gsap.utils.toArray(".contact-bubble").forEach((bubble, i) => {
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

  const formItemVariants = {
    hover: {
      scale: 1.02,
      transition: { type: "spring", stiffness: 400 }
    }
  };

  return (
    <section 
      id="contact"
      ref={sectionRef}
      className="relative px-6 py-20 md:py-28 overflow-hidden bg-white"
    >
      {/* Elementos decorativos flotantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className={`contact-bubble absolute rounded-full opacity-20 blur-lg ${
              i % 3 === 0 ? 'bg-purple-300 w-16 h-16' : 
              i % 2 === 0 ? 'bg-blue-300 w-14 h-14' : 'bg-pink-300 w-12 h-12'
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
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-purple-600 font-cherry-bomb-one mb-4"
          >
            Contáctanos
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-pink-400 mx-auto rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          />
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mt-4"
          >
            ¿Tienes alguna pregunta o deseas un presupuesto personalizado? ¡Escríbenos!
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formulario */}
          <motion.div
            variants={itemVariants}
            className="bg-white/90 backdrop-blur-sm p-8 md:p-10 rounded-2xl shadow-lg border border-gray-100"
          >
            <motion.form
              className="space-y-6"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {[
                { label: "Nombre", type: "text", placeholder: "Tu nombre completo" },
                { label: "Correo Electrónico", type: "email", placeholder: "tuemail@ejemplo.com" },
                { label: "Teléfono", type: "tel", placeholder: "Tu número de teléfono" },
                { label: "Mensaje", type: "textarea", placeholder: "Cuéntanos sobre tu proyecto..." }
              ].map((field, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover="hover"
                >
                  <label className="block text-gray-700 font-medium mb-2">
                    {field.label}
                  </label>
                  {field.type === 'textarea' ? (
                    <motion.textarea
                      variants={formItemVariants}
                      className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder={field.placeholder}
                      rows="5"
                      required
                    />
                  ) : (
                    <motion.input
                      variants={formItemVariants}
                      type={field.type}
                      className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder={field.placeholder}
                      required
                    />
                  )}
                </motion.div>
              ))}

              <motion.button
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 5px 15px rgba(156, 39, 176, 0.3)"
                }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium text-lg shadow-md hover:shadow-lg transition-all"
              >
                Enviar Mensaje
              </motion.button>
            </motion.form>
          </motion.div>

          {/* Información de contacto */}
          <motion.div
            variants={itemVariants}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-purple-100 to-blue-100 p-8 md:p-10 rounded-2xl shadow-lg border border-white"
          >
            <motion.h3
              className="text-2xl md:text-3xl font-bold text-purple-700 mb-6 font-cherry-bomb-one"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              Información de Contacto
            </motion.h3>

            <div className="space-y-6">
              {[
                {
                  icon: (
                    <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                  title: "Dirección",
                  content: "Calle Creativa 123, Barrio Innovador, Ciudad"
                },
                {
                  icon: (
                    <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  ),
                  title: "Teléfono",
                  content: "+1 (234) 567-890"
                },
                {
                  icon: (
                    <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                  title: "Email",
                  content: "hola@gogoz.com"
                },
                {
                  icon: (
                    <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  title: "Horario",
                  content: "Lunes a Viernes: 9am - 6pm"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <motion.div 
                    className="p-2 bg-white rounded-full shadow-sm"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                  >
                    {item.icon}
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-purple-600">{item.title}</h4>
                    <p className="text-gray-600">{item.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="mt-8 pt-6 border-t border-purple-200"
            >
              <h4 className="font-semibold text-purple-600 mb-3">Síguenos en redes</h4>
              <div className="flex gap-4">
                {['facebook', 'instagram', 'twitter', 'whatsapp'].map((social, i) => (
                  <motion.a
                    key={social}
                    href="#"
                    className="p-2 bg-white rounded-full shadow-sm"
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 + i * 0.1 }}
                  >
                    <div className="w-6 h-6 bg-purple-500 rounded-full" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;