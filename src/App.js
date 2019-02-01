import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import sketch from './sketch';
import P5Wrapper from 'react-p5-wrapper';

import {label} from './sketch';

function getCoords(){
  console.log(arguments);
}

class App extends Component {

  componentDidMount(){

  }
  render() {
    return (
      <div className="App">

        <P5Wrapper sketch={sketch} getCoords={getCoords}/>
      </div>
    );
  }
}

export default App;

document.body.onkeyup = function(e){
  if(e.keyCode == 32){
      console.log(label);
  }
}