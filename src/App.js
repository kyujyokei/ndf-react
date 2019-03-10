import React, { Component } from 'react';
import * as ml5 from 'ml5';
import './App.css';
import { Modal, Button, Spin } from 'antd';
import ItemRow from './components/ItemRow/ItemRow';

class App extends Component {
  video = React.createRef();

  state = {
    result :null,
    loaded: false,
    prob: null,
    visible: false,
    keywords:[],
    list: {
      // abaya:{
      //   title: 'Abaya',
      //   keyword: 'abaya',
      //   description: 'For testing purpose only',
      //   found: false
      // },
      water:{
        title: 'Water',
        keyword:'water',
        description:'14 gallons for each person in your household',
        found: false
      },
      food:{
        title:'Canned food',
        keyword:'can',
        description:'',
        found: false
      },
      flashlight:{
        title: 'Flashlight',
        keyword:'flash light',
        description:'',
        found: false
      },
      bandAid:{
        title: 'Band Aid',
        keyword:'band aid',
        description:'',
        found: false
      },
      batteries: {
        title:'Batteries',
        keyword:'bookshop',
        description: '',
        found: false
      }
    }
  }

  loop = (classifier) => {
    classifier.predict()
      .then(results => {
        this.setState({result: results[0].className, prob: results[0].probability});
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

    if (this.state.loaded) {
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
        console.log('curr key:', currentKeywords, found, index)
        currentKeywords.splice(index, 1);
        console.log('updated key:', currentKeywords)
        this.setState({list: updatedList, keywords: currentKeywords});

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
          {this.state.result ? this.state.result + ',' + this.state.prob : <Spin tip="Loading..."/>}
        </div>

        {list}
        
      </div>
    );
  }
}


export default App;
