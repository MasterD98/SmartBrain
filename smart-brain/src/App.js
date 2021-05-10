import React from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation.js';
import SignIn from './components/SignIn/SignIn.js';
import Register from './components/Register/Register.js';
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
      box:{},
      route: 'signin',
      isSignIn: false
    }
  }
  calculateFaceLocation=(data)=>{
    const clarifaiFace=data.outputs[0].data.regions[0].region_info.bounding_box;
    const image =document.getElementById('inputimage');
    const width =Number(image.width);
    const height=Number(image.height);
    return {
      leftCol:clarifaiFace.left_col*width,
      topRow:clarifaiFace.top_row*height,
      rightCol:width-(clarifaiFace.right_col*width),
      bottomRow:height -(clarifaiFace.bottom_row*height), 
    }
  }
  displayFaceBox=(box)=>{
    this.setState({box:box})
  }

  onInputChange=(event)=>{
    this.setState({input: event.target.value})
  }
  onButtonSubmit=()=>{
    this.setState({imageURL: this.state.input})
    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
    .then( response=> this.displayFaceBox(this.calculateFaceLocation(response))
    .catch(err=> console.log(err)));
  }
  onRouteChange=(route)=>{
    if(route==='signout'){
      this.setState({isSignIn:false})
    }else if (route==='home'){
      this.setState({isSignIn:true})
    }
    this.setState({route:route});
  }
  render(){
    const {isSignIn,imageURL,route,box} = this.state;
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}/>
        <Navigation isSignedIn={isSignIn} onRouteChange={this.onRouteChange}/>
        {route==='home' 
          ?<div>
            <Logo/>
            <Rank/>
            <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition imageURL={imageURL} box={box}/>
          </div>
          : 
            route === 'signin'
            ?<SignIn onRouteChange={this.onRouteChange}/>
            : <Register onRouteChange={this.onRouteChange}/>
        }
      </div>
    );
  }  
}

export default App;