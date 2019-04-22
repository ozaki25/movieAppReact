import React, { useEffect, useState } from 'react';
import './MovieList.css';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [titleOrder, setTitleOrder] = useState('');
  const [yearOrder, setYearOrder] = useState('');

  const toggleTitleOrder = () =>
    setTitleOrder(titleOrder === 'asc' ? 'dsc' : 'asc');

  const toggleYearOrder = () =>
    setYearOrder(yearOrder === 'asc' ? 'dsc' : 'asc');

  const sort = para => {
    if (para === 'name') {
      const newMovies = [...movies].sort((a, b) =>
        titleOrder === 'asc'
          ? b.Title.charCodeAt(0) - a.Title.charCodeAt(0)
          : a.Title.charCodeAt(0) - b.Title.charCodeAt(0),
      );
      setMovies(newMovies);
    }
    if (para === 'year') {
      const newMovies = [...movies].sort((a, b) =>
        yearOrder === 'asc' ? b.Year - a.Year : a.Year - b.Year,
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

  useEffect(
    () => {
      if (titleOrder) sort('name');
    },
    [titleOrder],
  );

  useEffect(
    () => {
      if (yearOrder) sort('year');
    },
    [yearOrder],
  );

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
