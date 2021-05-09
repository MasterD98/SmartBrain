import React from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';

const app=new Clarifai.App({
  apiKey:'f6ad3025415b476296a334ace3fd67de'
});

const particlesOptions = {
  //customize this to your liking
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 300 
      }
    }
  }
}

class App extends React.Component{
  constructor(){
    super();
    this.state={
      input: '',
      imageURL: '',
    }
  }
  onInputChange=(event)=>{
    this.setState({input: event.target.value})
  }
  onButtonSubmit=()=>{
    this.setState({imageURL: this.state.input})
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL,this.state.input ).then(
    function(response){
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box)
    },
    function(err){

    }
    );
  }
  render(){
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}/>
        <Navigation/>
        <Logo/>
        <Rank/>
        <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition imageURL={this.state.imageURL}/>
      </div>
    );
  }  
}

export default App;
