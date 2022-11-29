import React from 'react';
import Location from './components/Location.js';
import Weather from './components/Weather.js';
import Movie from './components/Movie.js';
import Map from './components/Map';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiData: '',
      searchCity: '',
      display_name: '',
      lat: '',
      lon: '',
      zoom: 12,
      isError: false,
      errorMessage: '',
      weatherData: '',
      movieData: ''
    }
  }

  handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(`search: ${this.state.searchCity}`);
      
      // API data
      let key = process.env.REACT_APP_LOCATIONIQ_API_KEY;
      let location = `https://us1.locationiq.com/v1/search?key=${key}&q=${this.state.searchCity}&format=json`;
      
      let locationData = await axios.get(location);

      //save data to state
      console.log('location data:', locationData.data[0]);
      this.setState({
        apiData: locationData.data[0],
        display_name: locationData.data[0].display_name,
        lat: locationData.data[0].lat,
        lon: locationData.data[0].lon,
        isError: false
      },this.handleAPI);

    } catch (error) {
      this.setState({
        errorMessage: error.message,
        isError: true
      });
    }
  }

  handleWeather = async () => {
    try{  
      let weatherURL = `${process.env.REACT_APP_SERVER}/weather?lat=${this.state.lat}&lon=${this.state.lon}`;
      
      let weatherData = await axios.get(weatherURL);
      console.log(weatherData);
      this.setState({
        weatherData: weatherData.data
      });
    } catch(error) {
      this.setState({
        errorMessage: error.message,
        isError: true
      });
    };
  };

  handleAPI = () => {
    this.handleWeather();
    this.handleMovie();
  };

  handleMovie = async () => {
    try{  
      let movieURL = `${process.env.REACT_APP_SERVER}/movie?search=${this.state.searchCity}`;
      
      let movieData = await axios.get(movieURL);
      console.log(movieData);
      this.setState({
        movieData: movieData.data
      });
    } catch(error) {
      this.setState({
        errorMessage: error.message,
        isError: true
      });
    };
  };

  handleCityInput = (e) => {
    console.log(this.state.searchCity);
    this.setState ({
      searchCity: e.target.value
    });
  };

render() {
  console.log(this.state.weatherData);
  return (
  <>
    <Form onSubmit={this.handleSubmit}>
      <Form.Label htmlFor="cityInput">
        <Form.Control id="cityInput" placeholder="Enter City" size="sm" onChange={this.handleCityInput}/>
      </Form.Label>
      <Button className='exploreButton' type="submit" variant="primary">Explore!</Button>
    </Form>
    <Location
      isError={this.state.isError}
      errorMessage={this.state.errorMessage}
      display_name={this.state.display_name}
      latitude={this.state.lat}
      longitude={this.state.lon}/>
    <Map
      city_name={this.state.display_name}
      lat={this.state.lat}
      lon={this.state.lon}
      zoom={this.state.zoom}/>
    { this.state.weatherData && <Weather
      weather={this.state.weatherData}
      city={this.state.searchCity}/>}
      {this.state.movieData && <Movie 
      movies={this.state.movieData}
      city={this.state.searchCity}/>}
  </>
  );
};
};

export default App;
