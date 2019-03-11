import React, { Component } from 'react';
import * as ml5 from 'ml5';
import './App.css';
import { Modal, Button, Spin } from 'antd';
import ItemRow from './components/ItemRow/ItemRow';

class App extends Component {
  video = React.createRef();

  state = {
    completed: false,
    result :null,
    loaded: false,
    prob: null,
    visible: false,
    keywords:[],
    list: {
      water_bottle:{
        title: 'Water',
        keyword:'water_bottle',
        description:'14 gallons for each person in your household',
        found: false
      },
      can_opener:{
        title:'Canned food',
        keyword:'can_opener',
        description:'Get aroung 42 cans for per person in your household',
        found: false
      },
      rubber_eraser: {
        title:'Batteries',
        keyword:'rubber_eraser',
        description: 'For your electronics',
        found: false
      },
      banana: {
        title: 'Banana (for testing purpose)',
        keyword: 'banana',
        description: 'For testing purposes',
        found: false
      }
    }
  }

  loop = (classifier) => {
    classifier.predict()
      .then(results => {
        if (results[0].probability > 0.45){
          this.setState({result: results[0].className.replace(" ","_").split(",")[0], prob: results[0].probability});
        }
        
        this.loop(classifier) // Call again to create a loop
      })
  }

  

  componentDidMount(){

  const constraints = {
      advanced: [{
          facingMode: "environment"
      }]
  };
    navigator.mediaDevices.getUserMedia({ video: constraints }).then(stream => {
      if (this.video.current) {
        this.video.current.srcObject = stream;
        this.video.current.play();
      }
  
      ml5.imageClassifier("MobileNet", this.video.current)
         .then(classifier => {
           this.setState({loaded: true});
           this.loop(classifier);
          });
    });

    let tempKeyArray = [];

    for (let key in this.state.list){
      tempKeyArray.push(this.state.list[key].keyword);
    }

    this.setState({keywords: [...tempKeyArray]}, () => console.log(this.state.keywords));

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

  checkResultsHandler () {
    var found = this.state.keywords.find(element => {
      return element  == this.state.result;
    });

    if (found) {
      console.log("Found:", found);
      let currentList = this.state.list;
      let updatedList = {
        ...currentList,
        [found]:{
          ...currentList[found],
          found: true
        }
      }

      let currentKeywords = Array.from(this.state.keywords);
      let index = currentKeywords.indexOf(found);
      currentKeywords.splice(index, 1);
      
      this.setState({list: updatedList, keywords: currentKeywords}, () => {
        this.checkCompleteHandler();
      });
      
    }
  }

  checkCompleteHandler () {
    let formIsValid = true;
    
        for (let inputIdentifier in this.state.list) {
            formIsValid = this.state.list[inputIdentifier].found && formIsValid;
        }

        console.log('formIsValid:', formIsValid);
        // return formIsValid;
        if (formIsValid) {
          this.setState({completed: true})
        }
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      completed: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      completed: false,
    });
  }

  render() {

    let list = <p>This place for list</p>;

    const listElementArray = [];
    for (let key in this.state.list) {
      listElementArray.push({
        id: key,
        config: this.state.list[key]
      });
    }

    list = listElementArray.map( item => {
      return (
        <ItemRow
          key={item.id} 
          title={item.config.title}
          description={item.config.description} 
          found={item.config.found}/>
      );
    });

    let isComplete = false;

    if (this.state.loaded) {
      isComplete = this.checkResultsHandler();
      if (isComplete){
        this.setState({completed: true})
      }
    }

    return (
      <div>        
        <video ref={ this.video } 
                  id="video" 
                  width="400" 
                  height="220" 
                  autoPlay
                />

        <div>
          {this.state.completed ? <p>DONE!!!</p> : null}
          <Modal
            title="Basic Modal"
            visible={this.state.completed}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
          {this.state.result ? this.state.result + ',' + this.state.prob : <Spin tip="Loading..."/>}
        </div>

        {list}
        
      </div>
    );
  }
}


export default App;
