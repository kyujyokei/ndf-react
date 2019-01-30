import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import sketch from './sketch';
import P5Wrapper from 'react-p5-wrapper';



class App extends Component {
  componentDidMount(){

  }
  render() {
    return (
      <div className="App">

        <P5Wrapper sketch={sketch} />
      </div>
    );
  }
}

export default App;
