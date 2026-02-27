"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";

const images = [
  "https://cdn2.tuoitre.vn/thumb_w/1200/471584752817336320/2024/8/10/100-2024-1080p-hd-q7ljjnunwqtovkjeiffmtreg7k2-17228436596321407572541-read-only-17232582798341385239489-45-0-1050-1920-crop-17232588361821879867918.jpg",
  "https://snworksceo.imgix.net/ame-egl/71b1929c-0c30-475b-9287-c2adec9fb164.sized-1000x1000.jpeg?w=800&dpr=2&ar=16%3A9&fit=crop&crop=faces",
  "https://cdn2.tuoitre.vn/thumb_w/480/471584752817336320/2025/11/18/faej3kj61920x1080-conan-nangdau-notitle1267712-17634307144031318908548.jpeg",
];

const AUTO_DELAY = 4000;

const CarouselMovie = () => {
  const [active, setActive] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const startX = useRef(null);
  const timerRef = useRef(null);

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % images.length);
  }, []);

  const prev = useCallback(() => {
    setActive((prev) => (prev - 1 + images.length) % images.length);
  }, []);

  /* ================= AUTO ROTATE ================= */
  useEffect(() => {
    if (isHovering) return;

    timerRef.current = setInterval(next, AUTO_DELAY);

    return () => {
      clearInterval(timerRef.current);
    };
  }, [active, isHovering, next]);

  const resetAuto = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, AUTO_DELAY);
  };

  /* ================= DRAG ================= */
  const handleStart = (x) => {
    startX.current = x;
  };

  const handleEnd = (x) => {
    if (startX.current === null) return;

    const diff = startX.current - x;

    if (diff > 60) {
      next();
      resetAuto();
    }

    if (diff < -60) {
      prev();
      resetAuto();
    }

    startX.current = null;
  };

  const getStyle = (index) => {
    if (index === active) return "translate-x-0 scale-100 opacity-100 z-20";

    if (index === (active + 1) % images.length)
      return "translate-x-[35%] scale-95 opacity-50 z-10";

    if (index === (active - 1 + images.length) % images.length)
      return "-translate-x-[35%] scale-95 opacity-50 z-10";

    return "opacity-0 scale-90";
  };

  return (
    <div className="w-full max-w-8xl mx-auto px-4 select-none">
      <div
        className="relative h-[300px] sm:h-[450px] md:h-[600px] lg:h-[700px] flex items-center justify-center overflow-hidden rounded-2xl"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onMouseDown={(e) => handleStart(e.clientX)}
        onMouseUp={(e) => handleEnd(e.clientX)}
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        onTouchEnd={(e) => handleEnd(e.changedTouches[0].clientX)}
      >
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute w-full max-w-7xl transition-all duration-700 ease-[cubic-bezier(.25,.8,.25,1)] ${getStyle(
              index,
            )}`}
          >
            <img
              src={img}
              draggable={false}
              className="w-full h-full object-cover rounded-2xl shadow-2xl"
              alt={`Banner ${index}`}
            />
          </div>
        ))}

        {/* Prev */}
        <button
          onClick={() => {
            prev();
            resetAuto();
          }}
          className="absolute left-4 bg-black/40 hover:bg-black/60 text-white w-10 h-10 rounded-full backdrop-blur flex items-center justify-center transition"
        >
          ‹
        </button>

        {/* Next */}
        <button
          onClick={() => {
            next();
            resetAuto();
          }}
          className="absolute right-4 bg-black/40 hover:bg-black/60 text-white w-10 h-10 rounded-full backdrop-blur flex items-center justify-center transition"
        >
          ›
        </button>
      </div>

      {/* DOTS */}
      <div className="flex justify-center gap-3 mt-5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setActive(i);
              resetAuto();
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              active === i
                ? "w-8 bg-gray-800"
                : "w-3 bg-gray-400 hover:bg-gray-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselMovie;
