import React, { useEffect, useState } from 'react';
import './MovieList.css';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [sortRule, setSortRule] = useState({
    key: '',
    titleOrder: '',
    yearOrder: '',
  });

  const toggleTitleOrder = () =>
    setSortRule({
      key: 'title',
      titleOrder: sortRule.titleOrder === 'asc' ? 'dsc' : 'asc',
    });

  const toggleYearOrder = () =>
    setSortRule({
      key: 'year',
      yearOrder: sortRule.yearOrder === 'asc' ? 'dsc' : 'asc',
    });

  const sort = () => {
    const { key, titleOrder, yearOrder } = sortRule;
    if (key === 'title') {
      const newMovies = [...movies].sort((a, b) =>
        titleOrder === 'asc'
          ? a.Title.charCodeAt(0) - b.Title.charCodeAt(0)
          : b.Title.charCodeAt(0) - a.Title.charCodeAt(0),
      );
      setMovies(newMovies);
    }
    if (key === 'year') {
      const newMovies = [...movies].sort((a, b) =>
        yearOrder === 'asc' ? a.Year - b.Year : b.Year - a.Year,
      );
      setMovies(newMovies);
    }
  };

  useEffect(() => {
    fetch('https://www.omdbapi.com/?apikey=a567cf6c&s=love&type=movie')
      .then(res => res.json())
      .then(res => setMovies(res.Search))
      .catch();
  }, []);

  useEffect(() => sort(), [sortRule]);

  return (
    <div>
      <div className="flex table-header">
        <div>Poster</div>
        <div onClick={toggleTitleOrder}>
          Title
          <span className="arrow-up" />
          <span className="arrow-down" />
        </div>
        <div onClick={toggleYearOrder}>
          Year
          <span className="arrow-up" />
          <span className="arrow-down" />
        </div>
      </div>
      {movies.map((mov, i) => (
        <div className="flex row" key={i}>
          <div>
            <img src={mov.Poster} className="poster" />
          </div>
          <div>{mov.Title}</div>
          <div>{mov.Year}</div>
        </div>
      ))}
    </div>
  );
}

export default MovieList;
