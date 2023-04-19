import React, { useState, useEffect } from 'react';
import MovieList from './components/MovieList';
import Filter from './components/Filter';
import NewMovieForm from './components/NewMovieForm';

import './App.css';

// movies list


const films = [
  {
    id: 1,
    title: 'Buzz Lightyear',
    description:
      'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
    posterURL: "https://d1lxrd8xkfqt44.cloudfront.net/wp-content/uploads/2017/04/07135227/hr_tht64070_a.jpg",
    rating: 10,
    status: 'Released'
  },
  {
    id: 2,
    title: 'Luck',
    description:
      'A pragmatic paleontologist visiting an almost complete theme park is tasked with protecting a couple of kids after a power failure causes the park\'s cloned dinosaurs to run loose.',
    posterURL: 'https://th.bing.com/th/id/OIP.JBEShY9_Dij4orrX-UXWqgHaK9?pid=ImgDet&rs=1',
    rating: 8.9,
    status: 'Released'
  },
  {
    id: 3,
    title: 'Unicorn Wars',
    description:
      'Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire\'s world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.',
    posterURL: 'https://www.catsuka.com/interf/icons4/unicornwars_affichefr.jpg',
    rating: 15.7,
    status: 'Released'
  }
]

const App = () => {
  const [movies, setMovies] = useState(films);
  const [titleFilter, setTitleFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');

  useEffect(() => {
    const storedMovies = JSON.parse(localStorage.getItem('movies'));
    if (storedMovies) {
      setMovies(storedMovies);
    }
  }, []);

  const handleAddMovie = (movie) => {
    setMovies([...movies, movie]);
    localStorage.setItem('movies', JSON.stringify([...movies, movie]));
  };

  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(movies));
  }, [movies]);

  return (
    <div className="app">
     
      <div className="center_position">
        <Filter
        onFilter={({ title, rating }) => {
          setTitleFilter(title);
          setRatingFilter(rating);
        }}
      />
      </div>
      <MovieList
        movies={movies.filter((movie) => {
          return (
            movie.title.toLowerCase().includes(titleFilter.toLowerCase()) &&
            movie.rating >= ratingFilter
            );
          })}
      />
          < NewMovieForm onAddMovie={handleAddMovie} />
    </div>
  );
};

export default App;

