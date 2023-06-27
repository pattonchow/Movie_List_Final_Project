import React, { useContext } from "react";
import Context from "../context/Context";
import { getImageUrl } from "../helpers/helpers";
import { Link } from "react-router-dom";

export default function MovieCard(props) {
  const contextValue = useContext(Context);
  const movie = props.movie;
  //console.log(movie);
  return (
    <div className="movieCard">
      <img
        className="movieCardImg"
        alt=""
        src={getImageUrl(movie.poster_path)}
      />
      <Link to={`/movies/${movie.id}`}>
        <h4
          className="movieTitle"
          onClick={() => {
            contextValue.handleMovieTitleClick(movie.id);
          }}
        >
          {movie.title}
        </h4>
      </Link>
      <div className="ratingBar">
        <div className="ratingBar-left">
          <i className="ion-android-star icon-star"></i>
          {contextValue.currentTab === "RATED" ? (
            <span className="averageRating">{`${movie.vote_average}/${movie.rating}`}</span>
          ) : (
            <span className="averageRating">{movie.vote_average}</span>
          )}
        </div>
        <div
          className="ratingBar-right"
          onClick={() => contextValue.handleToggleLike(movie)}
        >
          <i
            className={`icon-heart ${
              contextValue.loggedIn
                ? props.liked
                  ? "ion-md-heart"
                  : "ion-md-heart-empty"
                : "icon-heart ion-md-heart-empty"
            }`}
          ></i>
          {/* <i className="ion-ios-heart-outline icon-heart"></i> */}
        </div>
      </div>
    </div>
  );
}
