import React, { Component } from 'react';
import Webcam from "react-webcam";
import * as ml5 from 'ml5';
import './App.css';


class App extends Component {

  state = {
    predictions: null,
    img: null
  }

  classifyImg = () => {
    // Initialize the Image Classifier method with MobileNet
    const classifier = ml5.imageClassifier('MobileNet', modelLoaded);
    // When the model is loaded
    function modelLoaded() {
      console.log('Model Loaded!');
    }
    // Put the image to classify inside a variable
    // const image = document.getElementById('image');
    let image = this.state.img;
    // Make a prediction with a selected image
    classifier.predict(image, 5, function(err, results) {
      // print the result in the console
      console.log(results);
    })
  }

  setRef = webcam => {
    this.webcam = webcam;
  };

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    this.setState({img: imageSrc});
    console.log(this.state.img)
    if (this.state.img) {
      this.classifyImg(this.state.img);
    }
  };
 

  componentDidMount(){
    // this.capture();
    // let imageSrc = this.webcam.getScreenshot();
    // this.setState({img: imageSrc})
    // console.log(this.state.img)
    // this.classifyImg(imageSrc);

  }
  render() {

    const videoConstraints = {
      width: 300,
      height: 300,
      facingMode: "user"
    };

    return (
      <div className="App">
        <Webcam
          audio={false}
          height={300}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          width={300}
          videoConstraints={videoConstraints}
        />
        
        <button onClick={this.capture}>Capture photo</button>
      </div>
    );
  }
}

export default App;
