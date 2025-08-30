import NavBarDesktopTablet from "./NavBarDesktopTablet";
import NavBarMobile from "./NavBarMobile";
import useResponsive from "../../hook/useResponsive";

const HeaderPage = () => {
  const { isDesktop, isTablet, isMobile } = useResponsive();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="text-orange-500 text-2xl font-extrabold cursor-pointer">
          BC85 MOVIE
        </div>

        {/* Nav */}
        {isDesktop && <NavBarDesktopTablet />}
        {isTablet && <NavBarDesktopTablet />}
        {isMobile && <NavBarMobile />}
      </div>
    </header>
  );
};

export default HeaderPage;
