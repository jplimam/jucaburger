"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Star,
  ChefHat,
  Clock,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isChanging, setIsChanging] = useState(false);

  const carouselImages = [
    {
      src: "/burger10.jpg",
      alt: "Hambúrguer Clássico com queijo derretido",
      title: "Clássico Especial",
      description:
        "Blend de carne 180g, queijo cheddar, alface, tomate e molho especial",
    },
    {
      src: "/burger11.jpg",
      alt: "Hambúrguer Gourmet com bacon",
      title: "Bacon Master",
      description:
        "Duplo bacon crocante, queijo suíço, cebola caramelizada e rúcula",
    },
    {
      src: "/burger12.jpg",
      alt: "Hambúrguer Salada",
      title: "Salada Deluxe",
      description: "Hambúrguer artesanal 180g, queijo prato, tomate e pesto",
    },
    {
      src: "/burger4.jpg",
      alt: "Hamburguer Frango",
      title: "Chicken Burger",
      description: "Frango empanado, repolho roxo, maionese caseira e tomate",
    },
    {
      src: "/burger5.jpeg",
      alt: "Hambúrguer Premium",
      title: "Blue Cheese Burger",
      description: "Carne temperada, queijo azul, alface e maionese",
    },
  ];

  const nextSlide = useCallback(() => {
    if (isChanging) return; // Previne múltiplas transições simultâneas

    setIsChanging(true);
    setCurrentSlide((prev) => {
      const nextIndex = (prev + 1) % carouselImages.length;
      return nextIndex;
    });

    // Reset do estado após a transição
    setTimeout(() => {
      setIsChanging(false);
    }, 1000);
  }, [isChanging, carouselImages.length]);

  const prevSlide = useCallback(() => {
    if (isChanging) return; // Previne múltiplas transições simultâneas

    setIsChanging(true);
    setCurrentSlide((prev) => {
      const prevIndex =
        (prev - 1 + carouselImages.length) % carouselImages.length;
      return prevIndex;
    });

    // Reset do estado após a transição
    setTimeout(() => {
      setIsChanging(false);
    }, 1000);
  }, [isChanging, carouselImages.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsLoading(false);
    }, 2500);

    const timerSlide = setInterval(() => {
      if (!isChanging) {
        nextSlide();
      }
    }, 6500);

    return () => {
      clearInterval(timer);
      clearInterval(timerSlide);
    };
  }, [nextSlide, isChanging]);

  // Preload das imagens para evitar flickering
  useEffect(() => {
    const preloadImages = () => {
      carouselImages.forEach((image, index) => {
        const img = new Image();
        img.src = image.src;
        // Prioriza o carregamento das primeiras imagens
        if (index <= 2) {
          img.loading = "eager";
        }
      });
    };

    preloadImages();
  }, []);

  // Pausa o auto-play quando o usuário interage
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Pausa as transições quando a aba não está visível
        setIsChanging(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const features = [
    {
      icon: <ChefHat className="w-5 h-5" />,
      title: "Artesanal",
      description:
        "Cada hambúrguer é preparado na hora com ingredientes frescos",
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Delivery Rápido",
      description: "Entrega expressa em até 30 minutos na sua região",
    },
    {
      icon: <Heart className="w-5 h-5" />,
      title: "Feito com Amor",
      description: "Receitas exclusivas desenvolvidas com paixão",
    },
  ];

  const benefits = [
    "Ingredientes frescos e selecionados diariamente",
    "Pão artesanal assado na casa todos os dias",
    "Carnes nobres grelhadas no ponto perfeito",
    "Delivery gratuito em pedidos acima de R$ 40",
  ];

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br  from-orange-500 via-orange-400 to-yellow-400 flex flex-col items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative inline-block px-16"
        >
          {/* GIF de chama atrás - centralizado */}
          <img
            src="/fire-sticker.gif"
            alt=""
            className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-50 h-50 sm:w-54 sm:h-54 md:w-60 md:h-60 object-cover opacity-70 z-0"
          />
          {/* Logo na frente */}
          <img
            src="/logo-juca.png"
            alt="Burger House - Hambúrgueres Artesanais"
            className="relative z-10 mx-auto h-26 w-auto sm:h-30 md:h-34 lg:h-38 object-contain filter drop-shadow-lg"
          />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br  from-orange-500 via-orange-400 to-yellow-400 text-white overflow-x-hidden relative">
      {/* Animated Background Pattern */}
      <div
        className="absolute inset-0 animate-float opacity-8"
        style={{
          backgroundImage: `url(/burger-icon.svg)`,
          backgroundSize: "20px 20px", // Ícone pequeno
          backgroundRepeat: "repeat",
          backgroundPosition: "25px 25px", // Offset para criar espaçamento
          // Simula padding ao repetir em intervalos maiores
          backgroundAttachment: "local",
        }}
      ></div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-10px) translateX(5px);
          }
          50% {
            transform: translateY(-5px) translateX(-3px);
          }
          75% {
            transform: translateY(-15px) translateX(8px);
          }
        }

        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-8px) translateX(-5px) rotate(1deg);
          }
          66% {
            transform: translateY(-12px) translateX(7px) rotate(-1deg);
          }
        }

        @keyframes pulse-subtle {
          0%,
          100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.15;
          }
        }

        .animate-float {
          animation: float 20s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 30s ease-in-out infinite;
        }

        .animate-pulse-subtle {
          animation: pulse-subtle 8s ease-in-out infinite;
        }
      `}</style>
      {/* Hero Section */}
      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative inline-block px-16"
          >
            {/* GIF de chama atrás - centralizado */}
            <img
              src="/fire-sticker.gif"
              alt=""
              className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-70 h-70 sm:w-74 sm:h-74 md:w-90 md:h-90 object-cover opacity-70 z-0"
            />
            {/* Logo na frente */}
            <img
              src="/logo-juca.png"
              alt="Burger House - Hambúrgueres Artesanais"
              className="relative z-10 mx-auto h-46 w-auto sm:h-50 md:h-54 lg:h-58 object-contain filter drop-shadow-lg"
            />
          </motion.div>

          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Desperte seus sentidos com nossos{" "}
            <span className="bg-gradient-to-r from-red-200 to-yellow-200 bg-clip-text text-transparent">
              hambúrgueres artesanais
            </span>
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-orange-100 mb-8 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Ingredientes frescos, receitas exclusivas e o sabor que você nunca
            vai esquecer. Venha viver uma experiência gastronômica única!
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Button
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r cursor-pointer from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Fazer Pedido
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full bg-green-700 sm:w-auto cursor-pointer border-green-700 text-white hover:bg-white/10 hover:text-black px-8 py-3 rounded-xl"
            >
              Ver Cardápio
            </Button>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            className="flex flex-col sm:flex-row items-center font-medium justify-center gap-4 text-sm text-orange-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="flex items-center gap-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="ml-2">4.9/5 de satisfação</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-orange-200 rounded-full"></div>
            <span>+1000 clientes satisfeitos</span>
          </motion.div>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="px-4 py-8 sm:px-6 sm:py-16 lg:px-8 bg-black/10 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Nossos Hambúrgueres Irresistíveis
            </h2>
            <p className="text-orange-100 font-medium text-base sm:text-lg max-w-2xl mx-auto">
              Cada criação é uma explosão de sabor que vai despertar seus
              sentidos
            </p>
          </motion.div>

          {/* Container com decorações por cima */}
          <div className="relative">
            {/* Decorações que ficam POR CIMA do carrossel */}
            <img
              src="/burger-carrousel.png"
              alt=""
              className="absolute -top-10 -left-10 z-20 h-32 w-32 md:w-56 md:h-56 md:-top-16 md:-left-16 lg:w-72 lg:h-72 lg:-top-24 lg:-left-24 opacity-90"
            />

            <img
              src="/burger-carrousel.png"
              alt=""
              className="absolute -top-10 -right-10  z-20 h-32 w-32 md:w-56 md:h-56 md:-top-16 md:-right-16 lg:w-72 lg:h-72 lg:-top-24 lg:-right-24 opacity-90"
            />

            <div className="relative overflow-hidden rounded-2xl bg-black/20 backdrop-blur-sm border border-white/20">
              <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px]">
                {carouselImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-700 ${
                      index === currentSlide ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                      transform: "translateZ(0)", // Force hardware acceleration
                      backfaceVisibility: "hidden", // Prevent flickering
                      willChange: index === currentSlide ? "opacity" : "auto",
                    }}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                      style={{
                        transform: "translateZ(0)",
                        backfaceVisibility: "hidden",
                      }}
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                    {/* Image Info Overlay */}
                    <div
                      className={`absolute bottom-4 left-4 right-4 mb-4 sm:bottom-6 sm:left-6 sm:right-6 text-white transition-all duration-1000 ease-in-out ${
                        index === currentSlide
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4"
                      }`}
                    >
                      <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2">
                          {image.title}
                        </h3>
                        <p className="text-sm sm:text-base font-medium text-gray-200 leading-relaxed">
                          {image.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute cursor-pointer left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 sm:p-3 rounded-full backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-110"
                aria-label="Slide anterior"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 cursor-pointer sm:right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 sm:p-3 rounded-full backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-110"
                aria-label="Próximo slide"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Dots Indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (!isChanging && index !== currentSlide) {
                        setIsChanging(true);
                        setCurrentSlide(index);
                        setTimeout(() => {
                          setIsChanging(false);
                        }, 1000);
                      }
                    }}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "bg-white scale-125"
                        : "bg-white/50 hover:bg-white/75"
                    }`}
                    aria-label={`Ir para slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Action Button */}
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r cursor-pointer from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Ver Cardápio Completo
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              O que nos torna especiais?
            </h2>
            <p className="text-orange-100 text-base sm:text-lg max-w-2xl mx-auto">
              Cada hambúrguer é uma obra-prima feita com paixão e ingredientes
              selecionados
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="bg-black/20 border-white/20 hover:bg-black/30 transition-all duration-300 h-full backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="p-2 bg-red-600/20 rounded-lg text-red-100 mr-3">
                        {feature.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-white">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-orange-100 text-sm font-medium leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 bg-black/20 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Experiência completa
            </h2>
            <p className="text-orange-100 text-base font-medium sm:text-lg">
              Tudo que você precisa para uma refeição perfeita
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-3 p-4 rounded-xl bg-black/20 border border-white/20 backdrop-blur-sm"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-orange-100 text-sm font-medium sm:text-base">
                  {benefit}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-r from-red-600/20 to-yellow-600/20 border-white/20 backdrop-blur-sm">
              <CardContent className="p-6 sm:p-8 lg:p-12">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl text-white font-bold mb-4">
                  Fome de verdade?
                </h2>
                <p className="text-orange-100 text-base font-medium sm:text-lg mb-8 max-w-2xl mx-auto">
                  Não perca tempo! Faça seu pedido agora e receba em casa o
                  hambúrguer dos seus sonhos.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="w-full cursor-pointer sm:w-auto bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Pedir Delivery
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full bg-green-700 sm:w-auto cursor-pointer border-green-700 text-white hover:bg-white/10 hover:text-black px-8 py-3 rounded-xl"
                  >
                    WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 sm:px-6 lg:px-8 border-t border-white/20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-orange-100 text-sm">
            © 2025 João Pedro Lima. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
