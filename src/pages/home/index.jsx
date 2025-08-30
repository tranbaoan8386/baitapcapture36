import React, { useState } from "react";
import CarouselMovie from "./components/CarouselMovie";
import ListMovie from "./components/ListMovie";
import Section from "../../HOC/Section";
import { useMediaQuery } from "react-responsive";

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
      <Section titleSection="🎬 Danh sách phim">
        <div className="container mx-auto px-4">
          {/* Tabs */}
          <div className="flex justify-center mb-6">
            <button
              onClick={() => setActiveTab("nowShowing")}
              className={`px-6 py-2 font-semibold rounded-l-lg ${
                activeTab === "nowShowing"
                  ? "bg-red-600 text-white"
                  : "bg-white text-gray-700 border"
              }`}
            >
              🎥 Đang chiếu
            </button>
            <button
              onClick={() => setActiveTab("comingSoon")}
              className={`px-6 py-2 font-semibold rounded-r-lg ${
                activeTab === "comingSoon"
                  ? "bg-red-600 text-white"
                  : "bg-white text-gray-700 border"
              }`}
            >
              🚀 Sắp chiếu
            </button>
          </div>

          {/* Danh sách phim */}
          {activeTab === "nowShowing" ? (
            <ListMovie category="nowShowing" />
          ) : (
            <ListMovie category="comingSoon" />
          )}
        </div>
      </Section>
    </div>
  );
};

export default HomePage;
