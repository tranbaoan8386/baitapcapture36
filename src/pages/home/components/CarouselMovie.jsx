"use client";

import React, { useState, useRef, useEffect } from "react";

const images = [
  "https://collider.com/wp-content/uploads/the-avengers-movie-poster-banners-03.jpg",
  "https://cdn2.tuoitre.vn/thumb_w/1200/471584752817336320/2024/8/10/100-2024-1080p-hd-q7ljjnunwqtovkjeiffmtreg7k2-17228436596321407572541-read-only-17232582798341385239489-45-0-1050-1920-crop-17232588361821879867918.jpg",
  "https://snworksceo.imgix.net/ame-egl/71b1929c-0c30-475b-9287-c2adec9fb164.sized-1000x1000.jpeg?w=800&dpr=2&ar=16%3A9&fit=crop&crop=faces",
  "https://cdn2.tuoitre.vn/thumb_w/480/471584752817336320/2025/11/18/faej3kj61920x1080-conan-nangdau-notitle1267712-17634307144031318908548.jpeg",
];

const CarouselMovie = () => {
  const [active, setActive] = useState(0);
  const startX = useRef(null);
  const timerRef = useRef(null);

  const next = () => setActive((p) => (p + 1) % images.length);
  const prev = () => setActive((p) => (p - 1 + images.length) % images.length);

  /* ===== AUTO ROTATE ===== */
  useEffect(() => {
    timerRef.current = setInterval(next, 4000);
    return () => clearInterval(timerRef.current);
  }, []);

  /* ===== DRAG / SWIPE (MOUSE) ===== */
  const onMouseDown = (e) => {
    startX.current = e.clientX;
  };

  const onMouseUp = (e) => {
    if (startX.current === null) return;
    const diff = startX.current - e.clientX;
    if (diff > 50) next();
    if (diff < -50) prev();
    startX.current = null;
  };

  /* ===== TOUCH (MOBILE) ===== */
  const onTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    if (startX.current === null) return;
    const diff = startX.current - e.changedTouches[0].clientX;
    if (diff > 50) next();
    if (diff < -50) prev();
    startX.current = null;
  };

  const getStyle = (index) => {
    if (index === active) return "scale-100 opacity-100 z-20";
    if (index === (active + 1) % images.length)
      return "translate-x-[40%] scale-95 opacity-60 z-10";
    if (index === (active - 1 + images.length) % images.length)
      return "translate-x-[-40%] scale-95 opacity-60 z-10";
    return "opacity-0 scale-90";
  };

  return (
    <div className="w-full max-w-8xl mx-auto px-4">
      <div
        className="  relative 
                  h-[260px] 
                  sm:h-[360px] 
                  md:h-[500px] 
                  lg:h-[650px] 
                  xl:h-[850px]
                  flex items-center justify-center 
                  overflow-hidden cursor-grab"
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute w-full max-w-7xl  transition-all duration-500 ease-in-out ${getStyle(
              index
            )}`}
          >
            <img
              src={img}
              draggable={false}
              className="w-full aspect-[21/9] object-cover rounded-xl shadow-xl select-none"
              alt={`Banner ${index}`}
            />
          </div>
        ))}
      </div>

      {/* DOTS */}
      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-2 rounded-full transition-all ${
              active === i ? "w-6 bg-gray-500" : "w-2 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselMovie;
