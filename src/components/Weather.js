import React from 'react';

class Weather extends React.Component {
  render() {
    return(
      <>
        <h3>3 Day Weather Forecast:</h3>

        {this.props.weatherForecasts.map((day, idx) => 
          <div key={`movie-${idx}`}>
          <p>date: {day.date}</p>
          <p>description: {day.description}</p>
          </div>
        )}
      </>
    )
  }
}

export default Weather;