import React, { useState, useMemo } from "react";
import "./styles.css";
import Header from "./component/Header";
import { TABS } from "./helpers/constants";
import Home from "./component/Home";
import Favorite from "./component/Favorite";
import Rated from "./component/Rated";
import { Routes, Route } from "react-router-dom";
import MovieCardDetails from "./component/MovieCardDetails";
import Login from "./component/Login";
import Context from "./context/Context";
import { useNavigate } from "react-router-dom";
import { PostFavoriteData, PostRatedData } from "./api/api";

export default function App() {
  const [currentTab, setCurrentTab] = useState(TABS.HOME);
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isUsernameClicked, setIsUsernameClicked] = useState(false);
  const [favoriteMovieList, setFavoriteMovieList] = useState([]);
  const [ratedMovieList, setRatedMovieList] = useState([]);
  const [activeMovieId, setActiveMovieId] = useState(null);
  const navigate = useNavigate();

  const likedMoviesMap = useMemo(() => {
    return favoriteMovieList.reduce((acc, likedMovie) => {
      acc[likedMovie.id] = likedMovie;
      return acc;
    }, {});
  }, [favoriteMovieList]);

  const ratedMoviesMap = useMemo(() => {
    return ratedMovieList.reduce((acc, ratedMovie) => {
      acc[ratedMovie.id] = ratedMovie;
      return acc;
    }, {});
  }, [ratedMovieList]);

  const handleToggleLike = (movie) => {
    const hasLiked = likedMoviesMap[movie.id];

    if (hasLiked) {
      setFavoriteMovieList(
        favoriteMovieList.filter((likedMovie) => {
          return likedMovie.id !== movie.id;
        })
      );
      PostFavoriteData(movie.id, false, user, handlePostFavoriteFailed);
    } else {
      setFavoriteMovieList([...favoriteMovieList, movie]);
      PostFavoriteData(movie.id, true, user, handlePostFavoriteFailed);
    }
  };

  const handlePostFavoriteFailed = () => {
    alert("Log in to favorite the movie!");
    setFavoriteMovieList([]);
  };

  const handlePostRatedFailed = () => {
    alert("Log in to rate the movie!");
    setRatedMovieList([]);
  };

  const handleRated = (movieDetails, rateScore) => {
    PostRatedData(movieDetails.id, rateScore, user, handlePostRatedFailed);
    setRatedMovieList([...ratedMovieList, movieDetails]);
  };

  const handleUsernameClick = () => {
    setIsUsernameClicked(!isUsernameClicked);
  };
  const handleTabClick = (tabName) => {
    setCurrentTab(tabName);
  };

  const handleMovieTitleClick = (movieId) => {
    setActiveMovieId(movieId);
  };

  const contextValue = {
    currentTab,
    user,
    loggedIn,
    isUsernameClicked,
    activeMovieId,
    likedMoviesMap,
    ratedMoviesMap,
    favoriteMovieList,
    ratedMovieList,
    handleToggleLike,
    handleMovieTitleClick,
    handleRated
  };

  const handleLoginSuccess = (userData, favoriteData, ratedData) => {
    setUser(userData);
    setLoggedIn(!loggedIn);
    //console.log(favoriteData);
    setFavoriteMovieList(favoriteData);
    setRatedMovieList(ratedData);
  };

  const handleLogout = () => {
    setLoggedIn(!loggedIn);
    setIsUsernameClicked(!isUsernameClicked);
    setUser({});
    setRatedMovieList([]);
    setFavoriteMovieList([]);
    navigate("/HOME");
  };

  return (
    <div>
      <Context.Provider value={contextValue}>
        <Header
          activeTab={currentTab}
          onTabClick={handleTabClick}
          handleLogout={handleLogout}
          handleUsernameClick={handleUsernameClick}
        />
        {/* <div>{console.log(ratedMoviesMap)}</div> */}
        <Routes>
          <Route path="/" element={<Home currentTab={currentTab} />} />
          <Route path="/HOME" element={<Home currentTab={currentTab} />} />
          <Route
            path="/FAVORITE"
            element={<Favorite currentTab={currentTab} />}
          />
          <Route path="/RATED" element={<Rated currentTab={currentTab} />} />
          <Route path="/movies/:id" element={<MovieCardDetails />} />
          <Route
            path="/login"
            element={<Login handleLoginSuccess={handleLoginSuccess} />}
          />
        </Routes>
      </Context.Provider>
    </div>
  );
}
