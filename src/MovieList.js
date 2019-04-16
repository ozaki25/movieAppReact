import React, { useEffect, useState } from 'react';
import './MovieList.css';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [titleOrder, setTitleOrder] = useState('asc');
  const [yearOrder, setYearOrder] = useState('asc');

  const sort = para => {
    if (para === 'name') {
      movies.sort((a, b) =>
        titleOrder === 'asc'
          ? a.Title.charCodeAt(0) - b.Title.charCodeAt(0)
          : b.Title.charCodeAt(0) - a.Title.charCodeAt(0),
      );
      setTitleOrder(titleOrder === 'asc' ? 'dsc' : 'asc');
    }
    if (para === 'year') {
      movies.sort((a, b) =>
        yearOrder === 'asc' ? a.Year - b.Year : b.Year - a.Year,
      );
      setYearOrder(yearOrder === 'asc' ? 'dsc' : 'asc');
    }
    setMovies(movies);
  };

  useEffect(() => {
    fetch('https://www.omdbapi.com/?apikey=a567cf6c&s=love&type=movie')
      .then(res => res.json())
      .then(res => {
        setMovies(res.Search);
      })
      .catch();
  }, []);

  return (
    <div>
      <div className="flex table-header">
        <div>Poster</div>
        <div onClick={() => sort('name')}>
          Title
          <span className="arrow-up" />
          <span className="arrow-down" />
        </div>
        <div onClick={() => sort('year')}>
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
