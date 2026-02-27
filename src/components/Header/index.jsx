import NavBarDesktopTablet from "./NavBarDesktopTablet";
import NavBarMobile from "./NavBarMobile";
import useResponsive from "../../hook/useResponsive";

const HeaderPage = () => {
  const { isDesktop, isTablet, isMobile } = useResponsive();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-200">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="text-2xl font-extrabold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent cursor-pointer tracking-wide">
          BA MOVIE
        </div>

        {/* Nav */}
        {(isDesktop || isTablet) && <NavBarDesktopTablet />}
        {isMobile && <NavBarMobile />}
      </div>
    </header>
  );
};

export default HeaderPage;
