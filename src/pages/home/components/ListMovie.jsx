import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setListMovieAction } from "../../../stores/movie";
import { movieService } from "../../../service/movieService";
import { useNavigate } from "react-router-dom";

const ListMovie = () => {
  const dispatch = useDispatch();
  const listMovie = useSelector((state) => state.movieSlice.listMovie);
  const navigate = useNavigate();

  const fetchListMovies = async () => {
    try {
      const responseListMovies = await movieService.getListMovies();
      dispatch(setListMovieAction(responseListMovies.data.content));
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    fetchListMovies();
  }, []);

  const handleRedirectMovieDetailPage = (movieId) => {
    navigate(`/detail/${movieId}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6">
      {listMovie.map((movie, index) => (
        <div
          key={index}
          className="relative group rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-2xl transition duration-300 cursor-pointer"
          onClick={() => handleRedirectMovieDetailPage(movie.maPhim)}
        >
          {/* Poster phim */}
          <img
            src={movie.hinhAnh}
            alt={movie.tenPhim}
            className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Overlay khi hover */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button
              className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition"
              onClick={(e) => {
                e.stopPropagation();
                handleRedirectMovieDetailPage(movie.maPhim);
              }}
            >
              🎟️ Mua Vé
            </button>
          </div>

          {/* Tiêu đề phim */}
          <div className="p-3 text-center">
            <h3 className="text-lg font-bold text-gray-800 truncate">
              {movie.tenPhim}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListMovie;
