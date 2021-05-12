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

const initialState={
  input: '',
      imageURL: '',
      box:{},
      route: 'signin',
      isSignIn: false,
      user:{
        id:'',
        email:'',
        name:'',
        entries:0,
        joined:'',
      }
}
class App extends React.Component{
  constructor(){
    super();
    this.state=initialState;
  }

  loadUser=(data)=>{
    this.setState({user:{
      id: data.id,
      name:data.name,
      email: data.email,
      entries:data.entries,
      joined:data.joined,
    }})
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
      this.state.input
    )
    .then(respones=>{
      if(respones){
        fetch('http://localhost:3000/image',{
          method:'put',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
            id:this.state.user.id,
          })
        })
        .then(respones=>respones.json())
        .then(count=>{
          this.setState(Object.assign(this.state.user,{entries:count}))
        })
        .catch(err=> console.log(err))
      }
      this.displayFaceBox(this.calculateFaceLocation(respones))
    })
    .catch(err=>console.log(err));
  }
  onRouteChange=(route)=>{
    if(route==='signout'){
      this.setState(initialState);
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
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition imageURL={imageURL} box={box}/>
          </div>
          : 
            route === 'signin'
            ?<SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
            : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
        }
      </div>
    );
  }  
}

export default App;
