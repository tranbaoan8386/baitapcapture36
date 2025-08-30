import useResponsive from "../../hook/useResponsive";

const FooterPage = () => {
  const { isDesktop, isTablet, isMobile } = useResponsive();

  return (
    <footer className="bg-gray-900 text-white shadow-inner mt-10">
      <div className="container mx-auto px-6 py-8 grid gap-6 md:grid-cols-3">
        {/* Cột 1: Logo & giới thiệu */}
        <div>
          <h2 className="text-orange-500 text-2xl font-extrabold mb-3 cursor-pointer">
            BC85 MOVIE
          </h2>
          <p className="text-sm text-gray-400">
            Nền tảng xem phim trực tuyến chất lượng cao. Trải nghiệm điện ảnh
            mọi lúc, mọi nơi.
          </p>
        </div>

        {/* Cột 2: Link nhanh */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Liên kết nhanh</h3>
          <ul className="space-y-2 text-gray-400">
            <li className="hover:text-orange-500 cursor-pointer">Trang chủ</li>
            <li className="hover:text-orange-500 cursor-pointer">
              Phim đang chiếu
            </li>
            <li className="hover:text-orange-500 cursor-pointer">
              Phim sắp chiếu
            </li>
            <li className="hover:text-orange-500 cursor-pointer">Liên hệ</li>
          </ul>
        </div>

        {/* Cột 3: Thông tin liên hệ */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Liên hệ</h3>
          <ul className="space-y-2 text-gray-400">
            <li>Email: support@bc85movie.com</li>
            <li>Điện thoại: 0123-456-789</li>
            <li>Địa chỉ: Hà Nội, Việt Nam</li>
          </ul>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="border-t border-gray-700 mt-6">
        <p className="text-center text-gray-500 text-sm py-4">
          © {new Date().getFullYear()} BC85 MOVIE. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default FooterPage;
