import React, { Component } from 'react';
import * as ml5 from 'ml5';
import './App.css';
import { Modal, Button, Spin } from 'antd';

class App extends Component {
  video = React.createRef();

  state = {
    result :null,
    prob: null,
    visible: false
  }

  loop = (classifier) => {
    classifier.predict()
      .then(results => {
        this.setState({result: results[0].className, prob: results[0].probability});
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

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  render() {

    

    return (
      <div>        
        <video ref={ this.video } 
                  id="video" 
                  width="640" 
                  height="480" 
                  autoPlay
                />

        <div>
          <p>{this.state.result ? this.state.result + ',' + this.state.prob : <Spin tip="Loading..."/>}</p>
        </div>
        
      </div>
    );
  }
}


export default App;
