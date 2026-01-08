import React from "react";

const NEWS_LIST = [
  {
    id: 1,
    title: "Avengers chính thức trở lại sau 5 năm",
    image: "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee",
    desc: "Marvel xác nhận dự án Avengers mới sẽ ra mắt trong thời gian tới với dàn nhân vật quen thuộc.",
    date: "10/01/2026",
  },
  {
    id: 2,
    title: "Top phim chiếu rạp đáng xem tháng này",
    image: "https://images.unsplash.com/photo-1581905764498-f1b60bae941a",
    desc: "Danh sách những bộ phim bom tấn và tác phẩm điện ảnh không nên bỏ lỡ.",
    date: "08/01/2026",
  },
  {
    id: 3,
    title: "Đạo diễn Nolan hé lộ dự án điện ảnh mới",
    image: "https://images.unsplash.com/photo-1517602302552-471fe67acf66",
    desc: "Christopher Nolan đang chuẩn bị cho một bộ phim hoàn toàn mới sau thành công vang dội.",
    date: "05/01/2026",
  },
  {
    id: 4,
    title: "Phim Việt lập kỷ lục phòng vé đầu năm 2026",
    image: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4",
    desc: "Một bộ phim Việt bất ngờ vượt mốc doanh thu 300 tỷ đồng chỉ sau 2 tuần công chiếu.",
    date: "15/01/2026",
  },
  {
    id: 5,
    title: "Avatar 3 hé lộ hình ảnh đầu tiên gây sốt",
    image: "https://images.unsplash.com/photo-1502139214982-d0ad755818d8",
    desc: "James Cameron chia sẻ những hình ảnh đầu tiên của Avatar 3 với công nghệ hình ảnh đột phá.",
    date: "14/01/2026",
  },
  {
    id: 6,
    title: "Top diễn viên trẻ được săn đón nhất hiện nay",
    image: "https://images.unsplash.com/photo-1517602302552-471fe67acf66",
    desc: "Những gương mặt diễn viên trẻ đang thống trị màn ảnh rộng với loạt vai diễn ấn tượng.",
    date: "12/01/2026",
  },
];

const News = () => {
  return (
    <div className=" min-h-screen text-white">
      {/* 🔥 TIÊU ĐỀ */}
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold mb-2 text-neutral-950 ">Tin Tức</h1>
        <p className="text-gray-400 text-xl">
          Cập nhật những thông tin điện ảnh mới nhất
        </p>
      </div>

      {/*  DANH SÁCH TIN */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {NEWS_LIST.map((item) => (
            <div
              key={item.id}
              className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition cursor-pointer"
            >
              {/* Ảnh */}
              <img
                src={item.image}
                alt={item.title}
                className="h-52 w-full object-cover hover:scale-105 transition-transform duration-500"
              />

              {/* Nội dung */}
              <div className="p-5">
                <p className="text-sm text-gray-400">{item.date}</p>
                <h3 className="text-xl font-semibold mt-1 mb-2 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-3">
                  {item.desc}
                </p>

                <button className="mt-4 text-red-500 font-semibold hover:underline">
                  Đọc thêm →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
