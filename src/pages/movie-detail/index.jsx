import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { movieService } from "../../service/movieService";

const MovieDetailPage = () => {
  const { movieId } = useParams();
  console.log("movieId: ", movieId);

  const fetchMovieDetail = async () => {
    try {
      const responseMovieDetail = await movieService.getMovieDetail(movieId);
      console.log("responseMovieDetail: ", responseMovieDetail);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    fetchMovieDetail();
  }, []);
  return <div>MovieDetailPage</div>;
};

export default MovieDetailPage;
