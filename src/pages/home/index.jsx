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
    <div className="bg-gray-50 min-h-screen">
      {/* Carousel - Banner phim */}
      <div className="mb-8">
        <CarouselMovie />
      </div>

      {/* Tabs phim */}
      <Section titleSection="Danh sách phim">
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
