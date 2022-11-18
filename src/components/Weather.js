import React from 'react';

class Weather extends React.Component {
  render() {
    return(
      <>
        <h3>3 Day Weather Forecast:</h3>

        {this.props.weatherForecasts.map((day) => 
          <>
          <p>date: {day.date}</p>
          <p>description: {day.description}</p>
          </>
        )}
      </>
    )
  }
}

export default Weather;