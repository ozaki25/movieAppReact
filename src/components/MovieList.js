import React, { useEffect, useState } from 'react';
import './MovieList.css';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [titleOrder, setTitleOrder] = useState('');
  const [yearOrder, setYearOrder] = useState('');
  const [sortKey, setSortKey] = useState('');

  const toggleTitleOrder = () => {
    setTitleOrder(titleOrder === 'asc' ? 'dsc' : 'asc');
    setSortKey('title');
  };

  const toggleYearOrder = () => {
    setYearOrder(yearOrder === 'asc' ? 'dsc' : 'asc');
    setSortKey('year');
  };

  const sort = () => {
    if (sortKey === 'title') {
      const newMovies = [...movies].sort((a, b) =>
        titleOrder === 'asc'
          ? a.Title.charCodeAt(0) - b.Title.charCodeAt(0)
          : b.Title.charCodeAt(0) - a.Title.charCodeAt(0),
      );
      setMovies(newMovies);
    }
    if (sortKey === 'year') {
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

  useEffect(() => sort(), [sortKey, titleOrder, yearOrder]);

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
