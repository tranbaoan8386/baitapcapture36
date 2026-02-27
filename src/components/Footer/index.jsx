import useResponsive from "../../hook/useResponsive";

const FooterPage = () => {
  const { isDesktop, isTablet, isMobile } = useResponsive();

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white  ">
      <div className="container mx-auto px-6 py-14 grid gap-10 md:grid-cols-3">
        {/* Cột 1 */}
        <div>
          <h2 className="text-2xl font-extrabold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-4 cursor-pointer tracking-wide">
            BC85 MOVIE
          </h2>

          <p className="text-gray-400 leading-relaxed">
            Nền tảng xem phim trực tuyến chất lượng cao. Trải nghiệm điện ảnh
            mọi lúc, mọi nơi.
          </p>
        </div>

        {/* Cột 2 */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">
            Liên kết nhanh
          </h3>

          <ul className="space-y-3 text-gray-400">
            {["Trang chủ", "Phim đang chiếu", "Phim sắp chiếu", "Liên hệ"].map(
              (item, index) => (
                <li
                  key={index}
                  className="cursor-pointer transition-all duration-300 hover:text-orange-500 hover:translate-x-1"
                >
                  {item}
                </li>
              ),
            )}
          </ul>
        </div>

        {/* Cột 3 */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Liên hệ</h3>

          <ul className="space-y-3 text-gray-400">
            <li>Email: tranbaoan@gmail.com</li>
            <li>Điện thoại: 0123-456-789</li>
            <li>Địa chỉ: Tp. HCM, Việt Nam</li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <p className="text-center text-gray-500 text-sm py-6">
          © {new Date().getFullYear()} BA MOVIE. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default FooterPage;
