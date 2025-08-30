import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { movieService } from "../../service/movieService";

const BookingPage = () => {
  const { showtimeId } = useParams(); // Lấy maLichChieu từ URL
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [movieInfo, setMovieInfo] = useState(null);

  // Gọi API lấy danh sách phòng vé
  useEffect(() => {
    const fetchRoomDetail = async () => {
      try {
        const res = await movieService.getRoomDetail(showtimeId);
        setSeats(res.data.content.danhSachGhe);
        setMovieInfo(res.data.content.thongTinPhim);
      } catch (err) {
        console.error("Lỗi load phòng vé:", err);
      }
    };
    fetchRoomDetail();
  }, [showtimeId]);

  //  chọn / bỏ chọn ghế
  const toggleSeat = (seat) => {
    if (seat.daDat) return;
    if (selectedSeats.find((g) => g.maGhe === seat.maGhe)) {
      setSelectedSeats(selectedSeats.filter((g) => g.maGhe !== seat.maGhe));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  // tính tổng tiền
  const total = selectedSeats.reduce((sum, g) => sum + g.giaVe, 0);

  //  đặt vé
  const handleBooking = async () => {
    try {
      const payload = {
        maLichChieu: showtimeId,
        danhSachVe: selectedSeats.map((g) => ({
          maGhe: g.maGhe,
          giaVe: g.giaVe,
        })),
      };
      await movieService.bookTickets(payload);
      alert("Đặt vé thành công!");
      setSelectedSeats([]);
    } catch (err) {
      console.error("Đặt vé lỗi:", err);
      alert("Đặt vé thất bại!");
    }
  };

  return (
    <div className="grid grid-cols-3 gap-6 max-w-6xl mx-auto p-6">
      {/* Vùng chọn ghế */}
      <div className="col-span-2">
        <div className="bg-gray-800 text-white text-center py-2 rounded mb-6">
          Màn Hình
        </div>

        <div className="grid grid-cols-8 gap-3 justify-items-center">
          {seats.map((seat) => {
            const isSelected = selectedSeats.find(
              (g) => g.maGhe === seat.maGhe
            );
            const isVip = seat.loaiGhe === "Vip";

            return (
              <button
                key={seat.maGhe}
                onClick={() => toggleSeat(seat)}
                disabled={seat.daDat}
                className={`w-10 h-10 rounded text-sm font-semibold
          ${seat.daDat ? "bg-red-500 cursor-not-allowed text-white" : ""}
          ${isSelected ? "bg-green-500 text-white" : ""}
          ${
            !seat.daDat && !isSelected
              ? isVip
                ? "bg-yellow-400 hover:bg-yellow-500 text-black"
                : "bg-gray-300 hover:bg-gray-400"
              : ""
          }
        `}
              >
                {seat.tenGhe}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sidebar thông tin phim */}
      <div className="bg-white shadow rounded p-4">
        {movieInfo && (
          <>
            <img
              src={movieInfo.hinhAnh}
              alt={movieInfo.tenPhim}
              className="w-full h-64 object-cover rounded mb-4"
            />
            <h2 className="font-bold text-lg mb-2">{movieInfo.tenPhim}</h2>
            <p>
              <span className="font-semibold">Rạp:</span> {movieInfo.tenCumRap}{" "}
              - {movieInfo.tenRap}
            </p>
            <p>
              <span className="font-semibold">Địa chỉ:</span> {movieInfo.diaChi}
            </p>
            <p>
              <span className="font-semibold">Ngày chiếu:</span>{" "}
              {movieInfo.ngayChieu} - {movieInfo.gioChieu}
            </p>
          </>
        )}

        <div className="border-t mt-4 pt-4">
          <p>
            Ghế đã chọn:{" "}
            <span className="font-semibold">
              {selectedSeats.map((s) => s.tenGhe).join(", ") || "Chưa chọn"}
            </span>
          </p>
          <p>
            Tổng tiền:{" "}
            <span className="font-bold text-red-600">
              {total.toLocaleString()} đ
            </span>
          </p>
          <button
            onClick={handleBooking}
            disabled={selectedSeats.length === 0}
            className="w-full bg-blue-600 text-white py-2 rounded mt-4 hover:bg-blue-700 disabled:bg-gray-400"
          >
            Đặt Vé
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
