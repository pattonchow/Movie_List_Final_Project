import axios from "axios";

export const API_KEY = "9054d13f576df3907d3d097e7f8076cf";

export const fetchMoviesByCategory = (category, page) => {
  const url = `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&language=en-US&page=${page}`;

  return fetch(url).then((resp) => {
    return resp.json();
  });
};

export const fetchMovieDetails = (movieId) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`;

  return fetch(url).then((resp) => {
    //console.log(resp.json());
    return resp.json();
  });
};

export const PostFavoriteData = async (
  movieId,
  isLiked,
  user,
  handlePostFavoriteFailed
) => {
  const result = await axios
    .post(
      `https://api.themoviedb.org/3/account/${user.accoundId}/favorite?api_key=${API_KEY}&session_id=${user.sessionID}`,
      {
        media_type: "movie",
        media_id: movieId,
        favorite: isLiked
      }
    )
    .then(
      (response) => {
        console.log(response.data.status_message);
      },
      (error) => {
        console.log(error);
        //console.log(handlePostFavoriteFailed);
        handlePostFavoriteFailed();
        // alert("Log in to favorite the movie!");
      }
    );
  return result;
};

export const PostRatedData = async (
  movieId,
  rateScore,
  user,
  handlePostRatedFailed
) => {
  //console.log(movieId, rateScore);
  const result = await axios
    .post(
      `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${API_KEY}&session_id=${user.sessionID}`,
      { value: `${rateScore}` }
    )
    .then(
      (response) => {
        console.log(response.data.status_message);
      },
      (error) => {
        console.log(error);
        // console.log(handlePostRatedFailed);
        handlePostRatedFailed();
      }
    );
  return result;
};
