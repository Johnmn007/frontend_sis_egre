import style from "../assets/css/Home.module.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

const Home = () => {
  const brands = [
    { logo: "./img/Administracion_empresas.jpg", name: "Administración de Empresas" },
    { logo: "./img/Administracion_operaciones_turisticas.jpg", name: "Administración de Operaciones Turísticas" },
    { logo: "/img/Asistencia_Administrativa.jpg", name: "Asistencia Administrativa" },
    { logo: "/img/Construccion_Civil.jpg", name: "Construcción Civil" },
    { logo: "/img/Contabilidad.jpg", name: "Contabilidad" },
    { logo: "/img/Desarrollo_Sistemas.jpg", name: "Desarrollo de Sistemas de Información" },
    { logo: "/img/Electricidad_Industrial.jpg", name: "Electricidad Industrial" },
    { logo: "/img/Tecnica_Enfermeria.jpg", name: "Enfermería Técnica" },
    { logo: "/img/Manejo_Forestal.jpg", name: "Manejo Forestal" },
    { logo: "/img/Mecattronica_Automotriz.jpg", name: "Mecatrónica Automotriz" },
    { logo: "/img/Produccion_Agropecuaria.jpg", name: "Producción Agropecuaria" }
  ];

  function InfiniteSlider() {
    return (
     <div
  className="w-full min-h-screen flex flex-col justify-center items-center bg-cover bg-center"
  style={{ backgroundImage: "url('/img/Logo-suiza.png')" }}   // ✅ desde public/img
      >

        <div className="w-full text-center py-4 mb-4 bg-blue-900 bg-opacity-75">
          <h1
            className="text-3xl font-bold text-white"
            style={{ fontFamily: "Raleway, sans-serif" }}
          >
            SISTEMA DE CONTROL DE EGRESADOS Y TITULADOS
          </h1>
        </div>

        {/* Logo desde public/img */}
        <img
          src="/img/Logo-suiza.png"
          alt="Logo I.E.S.T. Suiza"
          className="w-1/4 mb-6 animate-rotate"
        />

        {/* Carrusel */}
        <div className="w-full max-w-6xl mx-auto overflow-hidden">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={50}
            slidesPerView={4}
            loop={true}
            autoplay={{ delay: 0, disableOnInteraction: false }}
            speed={4000}
            allowTouchMove={false}
            className="rounded-lg"
            style={{ transitionTimingFunction: "linear" }}
          >
            {brands.concat(brands).map((brand, index) => (
              <SwiperSlide key={index}>
                <div className="w-72 h-72 flex flex-col items-center justify-center bg-white border rounded-lg shadow-lg p-4 text-center">
                  <img src={brand.logo} alt={brand.name} className="w-40 h-40 object-contain" />
                  <p className="mt-2 text-lg font-semibold text-gray-700 text-center">
                    {brand.name}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <footer className="text-center text-sm text-white py-4 bg-blue-900 w-full">
          I.E.S.T. SUIZA Todos los derechos reservados 2025
        </footer>

        <style jsx>{`
          @keyframes rotar {
            from {
              transform: rotateY(0deg);
            }
            to {
              transform: rotateY(360deg);
            }
          }
          .animate-rotate {
            animation: rotar 5s linear infinite;
          }
        `}</style>
      </div>
    );
  }

  return <InfiniteSlider />;
};

export default Home;
