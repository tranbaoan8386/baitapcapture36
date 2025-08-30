import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { movieService } from "../../service/movieService";

const MovieDetailPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [showtimes, setShowtimes] = useState(null);
  const [activeTab, setActiveTab] = useState("info");
  const [selectedDate, setSelectedDate] = useState(null);

  // Lấy thông tin phim
  const fetchMovieDetail = async () => {
    try {
      const res = await movieService.getMovieDetail(movieId);
      setMovie(res.data.content);
      console.log("Movie:", res.data.content);
    } catch (err) {
      console.log("Movie detail error:", err);
    }
  };

  // Lấy lịch chiếu phim
  const fetchMovieShowtimes = async () => {
    try {
      const res = await movieService.getMovieShowtimes(movieId);
      setShowtimes(res.data.content);
      console.log("Showtimes:", res.data.content);
    } catch (err) {
      console.log("Showtimes error:", err);
    }
  };

  useEffect(() => {
    if (movieId) {
      fetchMovieDetail();
      fetchMovieShowtimes();
    }
  }, [movieId]);

  if (!movie) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        Đang tải thông tin phim...
      </div>
    );
  }

  // Lấy tất cả ngày chiếu từ toàn bộ hệ thống rạp
  const getAllDates = (heThongRapChieu) => {
    const dates = new Set();
    heThongRapChieu.forEach((system) => {
      system.cumRapChieu.forEach((cluster) => {
        cluster.lichChieuPhim.forEach((showtime) => {
          const date = new Date(showtime.ngayChieuGioChieu).toLocaleDateString(
            "vi-VN"
          );
          dates.add(date);
        });
      });
    });
    return Array.from(dates);
  };

  // ==== Handlers ====
  const handleSelectDate = (date) => {
    setSelectedDate(date);
  };

  const handleSelectShowtime = (maLichChieu) => {
    navigate(`/booking/${maLichChieu}`);
  };

  return (
    <div className="relative min-h-screen">
      {/* Background mờ */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-md opacity-30"
        style={{ backgroundImage: `url(${movie.hinhAnh})` }}
      ></div>

      <div className="relative container mx-auto px-6 py-10 z-10">
        {/* Header phim */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          <div className="md:col-span-1">
            <img
              src={movie.hinhAnh}
              alt={movie.tenPhim}
              className="w-full rounded-xl shadow-lg"
            />
          </div>

          <div className="md:col-span-2 text-black">
            <h1 className="text-4xl font-bold mb-4">{movie.tenPhim}</h1>
            <p className="text-lg mb-2">
              Ngày khởi chiếu:{" "}
              <span className="font-semibold">
                {new Date(movie.ngayKhoiChieu).toLocaleDateString("vi-VN")}
              </span>
            </p>
            <p className="text-lg mb-4">
              Thời lượng:{" "}
              <span className="font-semibold">
                {movie.thoiLuong || "120"} phút
              </span>
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">{movie.moTa}</p>
            <div className="flex gap-4">
              <button
                onClick={() => setActiveTab("showtimes")}
                className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700 transition"
              >
                Mua Vé
              </button>
              {movie.trailer && (
                <a
                  href={movie.trailer}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow hover:bg-gray-300 transition"
                >
                  Xem Trailer
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-12">
          <div className="flex border-b border-gray-600">
            <button
              onClick={() => setActiveTab("info")}
              className={`px-6 py-3 font-semibold ${
                activeTab === "info"
                  ? "border-b-4 border-red-600 text-red-600"
                  : "text-gray-400"
              }`}
            >
              Thông Tin
            </button>
            <button
              onClick={() => setActiveTab("showtimes")}
              className={`px-6 py-3 font-semibold ${
                activeTab === "showtimes"
                  ? "border-b-4 border-red-600 text-red-600"
                  : "text-gray-400"
              }`}
            >
              Lịch Chiếu
            </button>
          </div>

          {/* Nội dung tab */}
          <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
            {activeTab === "info" ? (
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                  Giới thiệu phim
                </h2>
                <p className="text-gray-700 leading-relaxed">{movie.moTa}</p>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                  Lịch chiếu
                </h2>
                {showtimes?.heThongRapChieu?.length > 0 ? (
                  <div className="space-y-8">
                    {/* Nút chọn ngày nằm trên */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {getAllDates(showtimes.heThongRapChieu).map((date) => (
                        <button
                          key={date}
                          onClick={() => handleSelectDate(date)}
                          className={`px-4 py-2 rounded-lg shadow transition ${
                            selectedDate === date
                              ? "bg-red-600 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-red-100"
                          }`}
                        >
                          {date}
                        </button>
                      ))}
                    </div>

                    {/* Hiển thị hệ thống rạp */}
                    {showtimes.heThongRapChieu.map((cinemaSystem) => (
                      <div
                        key={cinemaSystem.maHeThongRap}
                        className="border-b pb-6"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <img
                            src={cinemaSystem.logo}
                            alt={cinemaSystem.tenHeThongRap}
                            className="w-12 h-12 object-contain rounded-full shadow"
                          />
                          <h3 className="text-xl font-semibold text-red-600">
                            {cinemaSystem.tenHeThongRap}
                          </h3>
                        </div>

                        {/* Cụm rạp */}
                        {cinemaSystem.cumRapChieu.map((cluster) => (
                          <div key={cluster.maCumRap} className="mb-6 pl-4">
                            <p className="font-semibold text-gray-700 mb-2">
                              {cluster.tenCumRap}
                            </p>

                            {/* Lọc theo ngày đã chọn */}
                            {selectedDate && (
                              <div className="flex flex-wrap gap-3">
                                {cluster.lichChieuPhim
                                  .filter(
                                    (showtime) =>
                                      new Date(
                                        showtime.ngayChieuGioChieu
                                      ).toLocaleDateString("vi-VN") ===
                                      selectedDate
                                  )
                                  .map((showtime) => {
                                    const time = new Date(
                                      showtime.ngayChieuGioChieu
                                    ).toLocaleTimeString("vi-VN", {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    });
                                    return (
                                      <button
                                        key={showtime.maLichChieu}
                                        onClick={() =>
                                          handleSelectShowtime(
                                            showtime.maLichChieu
                                          )
                                        }
                                        className="px-4 py-2 bg-gray-100 rounded-lg shadow hover:bg-red-100 transition text-sm"
                                      >
                                        {time}
                                      </button>
                                    );
                                  })}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">
                    Hiện chưa có lịch chiếu cho phim này.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
