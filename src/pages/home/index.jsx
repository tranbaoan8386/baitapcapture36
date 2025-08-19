import React from "react";
import CarouselMovie from "./components/CarouselMovie";
import ListMovie from "./components/ListMovie";
// import Section from "../../HOC/Section";
import { useMediaQuery } from "react-responsive";

const HomePage = () => {
  const isDesktop = useMediaQuery({
    minWidth: 1024,
  });

  const isTablet = useMediaQuery({
    minWidth: 640,
    maxWidth: 1023,
  });

  const isMobile = useMediaQuery({
    maxWidth: 639,
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Carousel - Banner phim */}
      <div className="mb-8">
        <CarouselMovie />
      </div>

      {/* Danh sách phim */}
      <Section titleSection="🎬 Danh sách phim đang chiếu">
        <div className="container mx-auto px-4">
          <ListMovie />
        </div>
      </Section>

      {isMobile && <div className="h-20 bg-black"></div>}
      {isTablet && <div className="bg-red-600 h-20 "></div>}
      {isDesktop && <div className="bg-yellow-400 h-20 "></div>}
    </div>
  );
};

export default HomePage;
