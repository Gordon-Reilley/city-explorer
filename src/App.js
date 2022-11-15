import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      cityData: {},
      city: '',
    }
  }

  handleSubmitInput = (e) => {
    this.setState({
      city: e.target.value
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log(this.state.city);

    let cityInfo = await axios.get(`https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`);

    console.log(cityInfo.data[0].lat);

    this.setState({
    cityData: cityInfo.data[0]
  });
 
  }

   
  
  render() {

    // let differentCity = (
    //     <>
    //     <li>{this.cityData.data[0].display_name}</li>
    //     <li>{this.cityData.data[0].lat}</li>
    //     <li>{this.cityData.data[0].lon}</li>
    //     </>
    //   )
    console.log(this.cityData);

    return (
      <>
        <h1>City Explorer</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Type City name
            <input type="text" onChange={this.handleSubmitInput}/>
          </label>
          <Button type="submit">Explore!</Button>
        </form>
        {/* <ul>
          {differentCity}
        </ul> */}
      </>
    );
  }
}

export default App;
