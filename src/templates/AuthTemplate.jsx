import React from "react";
import { Outlet } from "react-router-dom";

const AuthTemplate = () => {
  return (
    <div className="relative w-screen h-screen flex justify-center items-center overflow-hidden">
      {/* Background image with blur */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm"
        style={{
          backgroundImage: `url('https://hips.hearstapps.com/hmg-prod/images/bestblack-tv-1617745112.png?crop=1.00xw:1.00xh;0,0&resize=1200:*')`,
        }}
      ></div>

      {/* Content above background */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl px-4 sm:px-6 bg-white bg-opacity-90 rounded-xl shadow-lg backdrop-blur-md">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthTemplate;
