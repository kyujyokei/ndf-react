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

  state = {
    object_label: null
  }

  componentDidMount(){
    this.interval = setInterval(() => this.setState({ object_label: label }), 500);
  }
  render() {
    return (
      <div className="App">
        <p>{this.state.object_label}</p>
        <P5Wrapper sketch={sketch} getCoords={getCoords}/>
      </div>
    );
  }
}

export default App;

// document.body.onkeyup = function(e){
//   if(e.keyCode == 32){
//       console.log(label);
//   }
// }