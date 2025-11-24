import React, { useRef, useEffect } from "react";
import style from "../assets/css/GraduateProfile.module.css";

export const Carousel = ({ images, programNames, onBoxClick }) => {
  const carouselRef = useRef(null);

  useEffect(() => {
    const container = carouselRef.current;
    let scrollAmount = 0;
    const scrollSpeed = 1;
    const animate = () => {
      if (!container) return;
      container.scrollLeft += scrollSpeed;
      scrollAmount += scrollSpeed;

      if (scrollAmount >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
        scrollAmount = 0;
      }
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  // duplicamos el arreglo para efecto infinito
  const doubledImages = [...images, ...images];
  const doubledNames = [...programNames, ...programNames];

  return (
    <div ref={carouselRef} className={style.carouselContainer}>
      {doubledImages.map((img, index) => (
        <div
          key={index}
          className={`${style.carouselBox} ${
            index % 2 === 0 ? style.grayBox : style.darkBox
          }`}
          onClick={() => onBoxClick(index % images.length)} // índice real
        >
          <img
            src={img}
            alt={`Cuadro ${index + 1}`}
            className={style.boxImage}
          />
          <h3 className={style.boxText}>{doubledNames[index]}</h3>
        </div>
      ))}
    </div>
  );
};
