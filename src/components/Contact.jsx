import React, { useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaFacebook, FaInstagram, FaTwitter, FaHeart } from "react-icons/fa";
import { IoMail } from "react-icons/io5";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
   const socialLinks = [
      {
        icon: <FaFacebook className="text-blue-600" size={20} />,
        href: "https://facebook.com",
        bg: "bg-blue-100 hover:bg-blue-200",
      },
      {
        icon: <FaInstagram className="text-pink-600" size={20} />,
        href: "https://instagram.com",
        bg: "bg-pink-100 hover:bg-pink-200",
      },
      {
        icon: <FaTwitter className="text-blue-400" size={20} />,
        href: "https://twitter.com",
        bg: "bg-blue-100 hover:bg-blue-200",
      },
      {
        icon: <IoMail className="text-red-500" size={20} />,
        href: "mailto:contacto@gogoz.com",
        bg: "bg-red-100 hover:bg-red-200",
      },
    ];
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const controls = useAnimation();

  React.useEffect(() => {
    if (isInView) {
      controls.start("visible");

      // Animación de fragmentos rotos con GSAP
      gsap.utils.toArray(".contact-fragment").forEach((fragment, i) => {
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

      // Efecto de "glitch" en el título
      gsap.to(".glitch-title", {
        skewX: 2,
        duration: 0.1,
        repeat: -1,
        yoyo: true,
        ease: "none",
        delay: 0.5,
      });
    }
  }, [isInView, controls]);

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

  const formItemVariants = {
    hover: {
      scale: 1.02,
      transition: { type: "spring", stiffness: 400 },
    },
  };

  // Fragmentos rotos para decoración
  const fragments = [
    { size: "w-8 h-8", top: "10%", left: "15%" },
    { size: "w-10 h-10", top: "70%", left: "10%" },
    { size: "w-12 h-12", top: "30%", right: "20%" },
    { size: "w-6 h-6", bottom: "20%", left: "70%" },
    { size: "w-9 h-9", bottom: "60%", right: "15%" },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative px-6 py-20 md:py-28 overflow-hidden bg-gray-50 text-white"
    >
      {/* Definición del degradado para los fragmentos */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <linearGradient id="fragment-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6D8EFB" />
            <stop offset="100%" stopColor="#FF2A6D" />
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
            className={`contact-fragment absolute ${fragment.size} opacity-50`}
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
      <div className="max-w-6xl mx-auto relative z-10">
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
                  CONTÁCTANOS
                </motion.h2>
                <motion.div
                  className="w-24 h-1 mx-auto rounded-full"
                  style={{ background: "linear-gradient(to right, #FF2A6D, #6D8EFB)" }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                />
          <motion.div
            className="w-32 h-1 mx-auto rounded-full bg-gradient-to-r from-[#6D8EFB] to-[#FF2A6D]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          />
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-black max-w-2xl mx-auto mt-4"
            style={{
              textShadow: "0 0 5px rgba(255, 42, 109, 0.2)",
            }}
          >
            ¿Listo para llevar tu proyecto al siguiente nivel? ¡Escríbenos y hagámoslo realidad!
          </motion.p>
        </motion.div>

        {/* Contenedor principal con diseño de tablero de control */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formulario con estilo de panel de control */}
          <motion.div
            variants={itemVariants}
            className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border-2 border-[#6D8EFB]/30 shadow-lg"
            style={{
              clipPath: "polygon(3% 0%, 97% 0%, 100% 100%, 100% 100%, 5% 100%, 0% 70%)",
            }}
          >
            <motion.h3
              className="text-2xl mb-6 text-center text-white"
              style={{
                textShadow: "0 0 10px rgba(179, 107, 227, 0.5)",
              }}
            >
              ENVÍANOS UN MENSAJE
            </motion.h3>

            <motion.form className="space-y-6">
              {[
                { label: "NOMBRE", type: "text", placeholder: "Tu nombre completo" },
                { label: "CORREO ELECTRÓNICO", type: "email", placeholder: "tuemail@ejemplo.com" },
                { label: "TELÉFONO", type: "tel", placeholder: "Tu número de teléfono" },
                { label: "MENSAJE", type: "textarea", placeholder: "Cuéntanos sobre tu proyecto..." },
              ].map((field, index) => (
                <motion.div key={index} variants={itemVariants} whileHover="hover">
                  <label className="block text-white/80 font-medium mb-2">{field.label}</label>
                  {field.type === "textarea" ? (
                    <motion.textarea
                      variants={formItemVariants}
                      className="w-full px-5 py-3 bg-gray-700/50 rounded-lg border border-[#6D8EFB]/30 focus:outline-none focus:ring-2 focus:ring-[#6D8EFB] focus:border-transparent transition-all text-white"
                      placeholder={field.placeholder}
                      rows="5"
                      required
                    />
                  ) : (
                    <motion.input
                      variants={formItemVariants}
                      type={field.type}
                      className="w-full px-5 py-3 bg-gray-700/50 rounded-lg border border-[#6D8EFB]/30 focus:outline-none focus:ring-2 focus:ring-[#6D8EFB] focus:border-transparent transition-all text-white"
                      placeholder={field.placeholder}
                      required
                    />
                  )}
                </motion.div>
              ))}

              <motion.div className="text-center mt-8">
                <motion.button
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(179, 107, 227, 0.5)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="px-10 py-3 bg-gradient-to-r from-[#6D8EFB] to-[#FF2A6D] text-white rounded-lg text-lg shadow-lg transition-all"
                >
                  ENVIAR MENSAJE
                </motion.button>
              </motion.div>
            </motion.form>
          </motion.div>

          {/* Información de contacto con estilo de tarjeta de vinilo */}
          <motion.div
            variants={itemVariants}
            transition={{ delay: 0.4 }}
            className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border-2 border-[#FF2A6D]/30 shadow-lg"
            style={{
              clipPath: "polygon(5% 0%, 95% 0%, 100% 100%, 100% 100%, 3% 100%, 0% 60%)",
            }}
          >
            <motion.h3
              className="text-2xl  text-center mb-6 text-white"
              style={{
                textShadow: "0 0 10px rgba(255, 42, 109, 0.5)",
              }}
            >
              INFORMACIÓN DE CONTACTO
            </motion.h3>

            <div className="space-y-6">
              {[
                {
                  icon: (
                    <svg className="w-8 h-8 text-[#FF2A6D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                  title: "DIRECCIÓN",
                  content: "Calle Creativa 123, Barrio Innovador, Ciudad",
                },
                {
                  icon: (
                    <svg className="w-8 h-8 text-[#6D8EFB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  ),
                  title: "TELÉFONO",
                  content: "+1 (234) 567-890",
                },
                {
                  icon: (
                    <svg className="w-8 h-8 text-[#FF2A6D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                  title: "EMAIL",
                  content: "hola@gogoz.com",
                },
                {
                  icon: (
                    <svg className="w-8 h-8 text-[#6D8EFB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  title: "HORARIO",
                  content: "Lunes a Viernes: 9am - 6pm",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-gray-700/30 rounded-lg border border-[#FF2A6D]/20"
                >
                  <motion.div className="p-2 bg-gray-700/50 rounded-lg shadow-sm">
                    {item.icon}
                  </motion.div>
                  <div>
                    <h4 className=" text-white" style={{ textShadow: "0 0 5px rgba(179, 107, 227, 0.5)" }}>
                      {item.title}
                    </h4>
                    <p className="text-white/80">{item.content}</p>
                  </div>
                </motion.div>
              ))}

          {/* Redes sociales */}
                  <div className="flex flex-col items-center md:items-end gap-4">
                    <h3 className="text-lg text-white">
                      Síguenos en redes
                    </h3>
                    <div className="flex gap-3">
                      {socialLinks.map((link, index) => (
                        <motion.a
                          key={index}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ y: -4, scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className={`${link.bg} p-3 rounded-full transition-colors`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ 
                            type: "spring",
                            stiffness: 300,
                            delay: index * 0.1
                          }}
                        >
                          {link.icon}
                        </motion.a>
                      ))}
                    </div>
                  </div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
