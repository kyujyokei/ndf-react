import React, { Component } from 'react';
import * as ml5 from 'ml5';
import './App.css';
import Webcam from 'react-webcam';


class App extends Component {
  video = React.createRef();

  state = {
    result :null
  }

  loop = (classifier) => {
    classifier.predict()
      .then(results => {
        this.setState({result: results[0].className});
        // console.log(results[0].className);
        this.loop(classifier) // Call again to create a loop
      })
  }

  componentDidMount(){
    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
      if (this.video.current) {
        this.video.current.srcObject = stream;
        this.video.current.play();
      }
  
      ml5.imageClassifier("MobileNet", this.video.current)
         .then(classifier => this.loop(classifier));
    });

  }
  render() {
  
    return (
      <div className="App">
        <video ref={ this.video } 
             id="video" 
             width="640" 
             height="480" 
             autoPlay
      />
      <p>{this.state.result}</p>
      </div>
    );
  }
}

export default App;
