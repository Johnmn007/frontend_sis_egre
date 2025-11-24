import React, { useState } from "react";
import { Card } from "./Card";
import { Card2 } from "./Card2";
import { Carousel } from "./Carousel"; // ✅ corregido nombre
import { Logo } from "./Logo";
import style from "../assets/css/GraduateProfile.module.css";

const GraduateProfile = () => {
  const [flipped, setFlipped] = useState(false);
  const [flipped2, setFlipped2] = useState(false); // Para el segundo card
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);

  const images = [
    "/img/Administracion_empresas.jpg",
    "/img/Administracion_operaciones_turisticas.jpg",
    "/img/Asistencia_Administrativa.jpg",
    "/img/Contabilidad.jpg",
    "/img/Construccion_Civil.jpg",
    "/img/Desarrollo_Sistemas.jpg",
    "/img/Electricidad_Industrial.jpg",
    "/img/Tecnica_Enfermeria.jpg",
    "/img/Manejo_Forestal.jpg",
    "/img/Mecattronica_Automotriz.jpg",
    "/img/Produccion_Agropecuario.jpg",
  ];

  const programNames = [
    "Administración de Empresas",
    "Administración de Operaciones Turísticas",
    "Asistencia Administrativa",
    "Contabilidad",
    "Construccion Civil",
    "Desarrollo de Sistemas de Información",
    "Electricidad Industrial",
    "Enfermería Técnica",
    "Manejo Forestal",
    "Mecatrónica Automotriz",
    "Producción Agropecuaria",
  ];

  const programProfiles = [
    "El Egresado de Administración de Empresas del Instituto de Educación Superior Tecnológico Público Suiza; cuenta con habilidades profesionales y técnicas para la asistencia en el intercambio de información, supervisión de las diversas áreas de la empresa y de la gestión empresarial con liderazgo profesional, contribuyendo al desarrollo económico, cultural y social del país.Así mismo destaca por establecer comunicación asertiva en el entorno empresarial utiliza efectivamente herramientas informáticas que le permite optimizar los procesos orientados a la toma de decisiones, se comunica en idioma extranjero en el ámbito empresarial, capaz de generar emprendimiento de negocio a partir de la identificación de nuevas oportunidades, innovando nuevos procesos en diversas áreas de desempeño, bajo el enfoque del trabajo colaborativo y la interculturalidad",
    "El Profesional Técnico en Administración de Operaciones Turísticas, está capacitado para definir y diseñar el producto turístico, contratar a los prestadores del servicio, asimismo gestiona y controla el proceso de ventas y la operación del servicio prestado de acuerdo al público objetivo, la oferta y la demanda, teniendo en cuenta las políticas de la empresa y las normativas vigentes. Asimismo, se comunica de manera empática y afectiva, en el idioma materno y en inglés, utiliza herramientas e instrumentos tecnológicos, aplica principios éticos y de sostenibilidad ambiental, se integra al entorno laboral, además tiene capacidad para emprender su propio negocio, considerando el trabajo en equipo y la interculturalidad en los espacios donde se desenvuelve.",
    "El egresada(o) del programa de estudios de Asistencia Administrativa, es apta(o) para  programar, organizar, controlar y administrar actividades/eventos y documentos administrativos según políticas y procedimientos de la entidad en cumplimiento de la normativa establecida y programada, en cuanto a recursos documentarios, logísticos y humanos haciendo uso del idioma de manera clara precisa, coherente en forma oral y escrita utilizando las herramientas informáticas con respeto y justica, contribuyendo  a una convivencia democrática, evaluando situaciones complejas para evaluar posibles soluciones incluyendo los impactos ambientales, nuevas oportunidades de proyectos y negocios respondiendo a una necesidad del sector productivo, educativo de responsabilidad social y desempeñándose de manera colaborativa e intercultural.",
    "El egresado del Programa de Estudios de Contabilidad; está capacitado para brindar apoyo operativo y asistencia en las actividades de procesos contables, analizar e interpretar las operaciones económicas y financieras de las entidades públicas y privadas en el marco del sistema de contabilidad y la legislación vigente.Se comunica de manera afectiva y efectiva, utiliza las tecnologías de información y del idioma ingles como soporte de sus actividades profesionales, analiza y plantea situaciones para resolver problemas de manera activa con ética profesional, con capacidad de innovación y emprendimiento respetando el cuidado del medio ambiente. Desempeñándose de manera colaborativa e interculturalidad.",
    "El profesional técnico del programa de estudios Construcción Civil realiza la supervisión de la información topográfica, elabora planos, replanteos y modelamientos, administra información, recursos y actividades del proyecto y ejecución de la obra de construcción, controla la ejecución de la obra, dirige las labores de los grupos de trabajo, Implementa sistemas de gestión de calidad, seguridad, salud y protección de medio ambiente, cumpliendo con lo establecido en el Reglamento Nacional de Edificaciones y la normatividad vigente.Se comunica de manera afectiva y efectiva, utiliza las tecnologías de información y del idioma ingles como soporte de sus actividades profesionales, analiza y plantea situaciones para resolver problemas de manera activa con ética profesional, con capacidad de innovación y emprendimiento, conviviendo en armonía con el medio ambiente. Desempeñándose de manera colaborativa e interculturalidad.",
    "El egresado del Programa de Estudios de Profesional Técnico en Desarrollo de sistemas de información, es una persona competente en el desarrollo e implementación de sistemas de información y propone soluciones a problemas que surjan de la dinámica empresariales utilizando las tecnologías informáticas.Elabora la estructura de un sistema de información en diferentes plataformas de despliegue de aplicaciones, para cualquier nivel operativo, táctico y estratégico de una organización  aplicando metodologías y técnicas relacionadas con el proceso de desarrollo de sistemas que incluyen las etapas de análisis, diseño, desarrollo, pruebas, implementación y mantenimiento de software buscando optimizar los recursos informáticos de la organización en cuanto se refieren a hardware y software, considerando además que su implementación debe estar bajo el diseño y construcción de redes de cableado estructurado y redes inalámbricas aplicados a distintos sistemas operativos.Aplica herramientas informáticas, comunicándose de manera asertiva, dominio del idioma ingles para la interpretación de los instructivos, valorando el medio ambiente, innovación tecnológica y niveles de emprendimiento, desempeñándose de manera colaborativo e interculturalidad.",
    "El egresado del programa de estudios de Electricidad Industrial está en la capacidad de reparar, instalar y montar máquinas eléctricas dinámicas y estáticas, redes eléctricas aéreas, subterráneas y sub estaciones, diseñar e implementar sistemas de automatización mediante controladores lógicos programables (PLCs), en las instalaciones eléctricas industriales.Integrándose de manera colaborativa al equipo de trabajo de su entorno laboral con una visión innovadora, emprendedora, respeto a la conservación del medio ambiente y práctica de la ética, desempeñándose de manera colaborativa e interculturalidad.",
    "El egresado del programa de estudios de enfermería Técnica reúne las capacidades para integrarse al equipo de salud, para realizar acciones de promoción y prevención de salud integral al individuo, familia y comunidad, tomando en cuenta el enfoque intercultural, asimismo realiza intervenciones educativas de acuerdo a las necesidades del individuo, familia y comunidad, por etapas de vida, contribuyendo a generar cambios de conductas favorables en salud. Además, se desempeña usando una comunicación efectiva y afectiva, hace uso del idioma inglés en los ámbitos en donde se desempeña; maneja adecuadamente las herramientas informáticas, incorporándose a sus funciones con principios de la ética, protección del ambiente, considerando el trabajo colaborativo y la interculturalidad.",
    "El Profesional Técnico en Manejo Forestal, está capacitado para desarrollar procesos de plantaciones forestales, recolecta la información del bosque natural teniendo en cuenta el inventario o censo forestal, asimismo controla la construcción   y mantenimiento de caminos forestales, patios y trozas e infraestructura complementaria para dar sostenimiento a los bosques y sus recursos afines, según plan general de manejo forestal. Controla la ejecución del aprovechamiento/cosecha, teniendo en cuenta el plan operativo y la normatividad vigente.  Se comunica de manera asertiva, utiliza las tecnologías de la información, maneja idioma inglés, para interpretar y comunicar instrucciones que faciliten su actividad profesional; identifica oportunidades de negocios forestales. Se desempeña de manera colaborativa, analiza y plantea situaciones para resolver problemas relacionados a su ámbito laboral, bajo principios éticos y teniendo respeto por la interculturalidad.",
    "El profesional técnico en Mecatrónica Automotriz está capacitado para reconocer, analizar, evaluar, diagnosticar, organizar, supervisar y tomar las acciones correctivas necesarias para mantener operativas las unidades móviles livianas, semipesados y pesadas. Realiza el mantenimiento programado de los vehículos automotores convencionales y con asistencia electrónica, además repara los sistemas de transmisión de fuerza, suspensión, dirección y frenos automotrices. Realiza la conversión, reparación y configuración de los motores de combustión interna, utilizando programas para diagnosticar y reparar fallas electrónicas según los más altos estándares de calidad nacional e internacional.Aplica herramientas informáticas, comunicándose de manera asertiva, dominio del idioma ingles para la interpretación de los manuales, valorando el medio ambiente, innovación tecnológica y niveles de emprendimiento, desempeñándose de manera colaborativo e interculturalidad",
    "El egresado del programa de estudios de Producción Agropecuaria es competente en gestionar procesos de producción agrícola y pecuaria, aplicando técnicas agroecológicas y buenas prácticas agropecuarias, para obtener productos de calidad destinados a la comercialización y/o transformación, asimismo supervisa procesos de prevención y control de plagas/enfermedades agrícolas y pecuario además realiza el aprovechamiento primario de productos y subproductos agropecuarios, aplicando normas técnicas vigentes y procedimientos establecidos. Además, gestiona los procedimientos administrativos y comerciales de la producción agropecuaria.Se comunica de manera afectiva y efectiva, utiliza las tecnologías de información y del idioma ingles como soporte de sus actividades profesionales, analiza y plantea situaciones para resolver problemas de manera activa con ética profesional, con capacidad de innovación y emprendimiento respetando el cuidado del medio ambiente. Desempeñándose de manera colaborativa e interculturalidad.",
  ];

  return (
    <div className={style.pageContainer}>
      <div className={style.logoContainer}>
        <Logo />
      </div>

      <div>
        <Card flipped={flipped} setFlipped={setFlipped} />
        <Card2 flipped2={flipped2} setFlipped2={setFlipped2} />
      </div>



      {/* Carrusel */}
      <div>
        <center>
          <Carousel
            images={images}
            programNames={programNames}
            onBoxClick={(index) => {
              setSelectedProgram(index);
              setIsModalOpen(true);
            }}
          />
        </center>
      </div>


      {/* Modal */}
      {isModalOpen && (
        <div className={style.modalOverlay}>
          <div className={style.modalContent}>
            <button
              onClick={() => setIsModalOpen(false)}
              className={style.closeButton}
            >
              ✖
            </button>
            {selectedProgram !== null && (
              <>
                <h2>{programNames[selectedProgram]}</h2>
                <p>{programProfiles[selectedProgram]}</p>
                <img
                  src={images[selectedProgram]}
                  alt={programNames[selectedProgram]}
                  style={{
                    width: "200px",
                    borderRadius: "10px",
                    marginTop: "10px",
                  }}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GraduateProfile;
