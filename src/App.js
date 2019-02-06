import React, { Component } from 'react';
import * as ml5 from 'ml5';
import './App.css';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';


class App extends Component {
  video = React.createRef();

  state = {
    result :null,
    prob: null
  }

  loop = (classifier) => {
    classifier.predict()
      .then(results => {
        this.setState({result: results[0].className, prob: results[0].probability});
        // console.log(results);
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

    let loading = <CircularProgress color="secondary" />;
  

    return (
      <div className="App">
        <div></div>
        {this.state.result ? null : loading}
        <video ref={ this.video } 
                  id="video" 
                  width="640" 
                  height="480" 
                  autoPlay
                />
      <p>{this.state.result ? this.state.result + ',' + this.state.prob : 'Model Loading...'}</p>
      </div>
    );
  }
}

export default App;
