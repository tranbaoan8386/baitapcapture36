import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setListMovieAction } from "../../../stores/movie";
// import { axiosCustom } from "../../../service/config";
import { movieService } from "../../../service/movieService";

import { Card } from "antd";
import { useNavigate } from "react-router-dom";

const ListMovie = () => {
  const dispatch = useDispatch();

  const listMovie = useSelector((state) => state.movieSlice.listMovie);
  console.log("listMovie: store ", listMovie);

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
    console.log("movieId: ", movieId);
    // di chuyển qua trang chi tiết phim
    navigate(`/detail/${movieId}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-12 mt-3">
      {listMovie.map((movie, index) => {
        return (
          <Card
            onClick={() => {
              handleRedirectMovieDetailPage(movie.maPhim);
            }}
            key={index}
            hoverable
            // style={{ width: 240 }}
            cover={
              <img alt="example" src={movie.hinhAnh} className="!h-[250px]" />
            }
          >
            <h3>{movie.tenPhim}</h3>
          </Card>
        );
      })}
    </div>
  );
};

export default ListMovie;
