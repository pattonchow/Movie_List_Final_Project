import React, { useState, useEffect } from "react";
import "../styles.css";
import Pagination from "./Pagination";
import MovieList from "./MovieList";
import { CATEGORIES } from "../helpers/constants";
import { fetchMoviesByCategory } from "../api/api";

export default function Home() {
  //note: [],not {}
  const [currentCategory, setCurrentCategory] = useState(
    CATEGORIES.POPULAR.value
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(999);
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    fetchMoviesByCategory(currentCategory, currentPage).then((data) => {
      setMovieList(data.results);
      setTotalPage(data.total_pages);
    });
  }, [currentCategory, currentPage]);

  const handleCategoryChange = (categoryName) => {
    setCurrentCategory(categoryName);
  };

  //注意写箭头函数的格式
  const handlePrevClick = () => {
    if (currentPage === 1) {
      return;
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage === totalPage) {
      return;
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        onPrevClick={handlePrevClick}
        onNextClick={handleNextClick}
        category={currentCategory}
        onChange={handleCategoryChange}
      />
      <MovieList movieList={movieList} />
    </div>
  );
}
