import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Weather from './components/weather';
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityData: {},
      city: '',
      errorMsg: '',
      isError: false,
      forecastData: [],
    }
  }

  handleCity = async () => {
    
    let url = `${process.env.REACT_APP_SERVER}/weather?city_name=${this.state.city}&lat=${this.state.cityData.lat}&lon=${this.state.cityData.lon}`;
    
    let cityForecast = await axios.get(url);
    console.log(cityForecast);

    this.setState({
      forecastData: cityForecast.data
    })
  }

  handleSubmitInput = (e) => {
    this.setState({
      city: e.target.value
    });
  }

  handleSubmit = async (e) => {
    try{
      e.preventDefault();
      console.log(this.state.city);

      let cityInfo = await axios.get(`https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`);

      console.log(cityInfo.data[0].lat);

      this.handleCity();

      this.setState({
        cityData: cityInfo.data[0],
      });
    } catch (error) {
      this.setState({
        errorMsg: error.message,
        isError: true,
      });
    }
  }

   
  
  render() {

    let mapURL = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=13`;

    let differentCity = (
        <>
        <img 
          className="modalMap"
          src={mapURL}
          alt={this.state.city.name + 'map'}
        />
        <li>City: {this.state.cityData.display_name}</li>
        <li>Latitude: {this.state.cityData.lat}</li>
        <li>Longitude: {this.state.cityData.lon}</li>
        <Weather weatherForecasts={this.state.forecastData}/>
        </>
      )

    return (
      <>
        <h1>City Explorer</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Type City name
            <input type="text" onChange={this.handleSubmitInput}/>
          </label>
          <Button className='exploreButton' type="submit">Explore!</Button>     
          <ul>
            { this.state.cityData.display_name && differentCity}
          </ul>
           {this.state.isError ? 
            <Alert className="alert" variant="danger">
            <Alert.Heading>Error!</Alert.Heading>
            <p>{this.state.errorMsg}</p>
            </Alert> : <p className="alert"></p>}
        </form>
       
      </>
    );
  }
}

export default App;
