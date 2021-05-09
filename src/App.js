import React from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';

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
    }
  }
  onInputChange=(event)=>{
    console.log(event.target.value);
  }
  onButtonSubmit=()=>{
    app.models
    .predict('a403429f2ddf4b49b307e318f00e528b','https://samples.clarifai.com/face-det.jpg' ).then(
    function(response){
        console.log(response)
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
        {
        /*<FaceRecognition/>
    */}
      </div>
    );
  }  
}

export default App;
