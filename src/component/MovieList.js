import React, { useContext } from "react";
import Context from "../context/Context";
import MovieCard from "./MovieCard";

export default function MovieList(props) {
  const contextValue = useContext(Context);
  const movieList = props.movieList;

  return (
    <div>
      {/* <div>{console.log(movieList)}</div> */}
      {/* <div>{console.log(contextValue.currentTab)}</div> */}
      <div className="grid-container">
        {movieList.map((movie) => {
          // const isLiked = true;
          const isLiked = contextValue.likedMoviesMap[movie.id];
          return <MovieCard key={movie.id} movie={movie} liked={isLiked} />;
        })}
      </div>
    </div>
  );
}

/*
      <MovieCard movieList={props.movieList} />
      <MovieCard />
      <MovieCard />
      <MovieCard />
      <MovieCard />
*/
