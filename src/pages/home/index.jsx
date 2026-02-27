import React, { useState } from "react";
import CarouselMovie from "./components/CarouselMovie";
import ListMovie from "./components/ListMovie";
import Section from "../../HOC/Section";
import { useMediaQuery } from "react-responsive";
import News from "./components/News";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("nowShowing"); // nowShowing | comingSoon

  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const isTablet = useMediaQuery({ minWidth: 640, maxWidth: 1023 });
  const isMobile = useMediaQuery({ maxWidth: 639 });

  return (
    <div
      className="relative py-12  "
      style={{
        backgroundImage:
          "url(https://demo1.cybersoft.edu.vn/static/media/backapp.b46ef3a1.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backdropFilter: "blur(5px)",
      }}
    >
      {/* Carousel - Banner phim */}
      <div className="mb-8">
        <CarouselMovie />
      </div>

      {/* Tabs phim */}
      <Section>
        <h2 className="text-3xl md:text-4xl font-bold text-center relative ">
          <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Danh sách phim
          </span>
          <div className="h-1 w-24 bg-orange-500 mx-auto mt-3 rounded-full"></div>
        </h2>
        <div>
          {/* Nội dung */}
          <div className="relative container mx-auto px-4">
            <ListMovie />
          </div>
        </div>
      </Section>
      <div>
        <News></News>
      </div>
    </div>
  );
};

export default HomePage;
