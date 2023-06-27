import React, { useContext } from "react";
import Context from "../context/Context";
import MovieList from "./MovieList";

export default function FavoritemovieList() {
  const contextValue = useContext(Context);
  return (
    <div>
      <MovieList movieList={contextValue.ratedMovieList} />
    </div>
  );
}
