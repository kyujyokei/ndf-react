import React, { Component } from 'react';
import Webcam from './Webcam';
import * as ml5 from 'ml5';
import './App.css';


class App extends Component {
  video = <video id="video" width="640" height="480" autoplay></video>;

  state = {
    result : null
  }

  loop = (classifier) => {
    classifier.predict()
      .then(results => {
        this.setState({result: results[0].className});
        // probability.innerText = results[0].probability.toFixed(4);
        this.loop(classifier) // Call again to create a loop
      })
  }
  

  componentDidMount(){
    ml5.imageClassifier('MobileNet', this.video)
      .then(classifier => this.loop(classifier))

  }
  render() {

    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        this.video.srcObject = stream;
        this.video.play();
      })

    
  
    return (
      <div className="App">
        {this.video}
        
      
      </div>
    );
  }
}

export default App;
