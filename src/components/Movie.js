import React from 'react';

class Movie extends React.Component {
  render() {
    return(
      <>
        <h3>Movies:</h3>

        {this.props.movieSuggestions.map((movie, idx) => 
          <div key={`movie-${idx}`}>
            <p>Movie title: {movie.title}</p>
            <p>Movie release date: {movie.releaseDate}</p>
            <p>Movie overview: {movie.overview}</p>
            <img src={movie.posterImg} alt={movie.title} title={movie.title}></img>
          </div>
        )}
      </>
    )
  }
}

export default Movie;