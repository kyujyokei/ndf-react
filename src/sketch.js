// import * as p5 from 'p5'
// import "p5/lib/addons/p5.dom";
import "react-p5-wrapper/node_modules/p5/lib/addons/p5.dom";
import ml5 from 'ml5';

let mobileNet;
let video;
let label='model loading...';

function sketch (p) {
    
  
    p.setup = function () {
        p.createCanvas(1000, 1000);
        //imitialize the webcam stream in a object
        video = p.createCapture(p.VIDEO);
        //hide the webcam stream
        video.hide();

        //initialize the mobilenet object with a callback
        mobileNet= ml5.imageClassifier('MobileNet',video,ModelLoaded);
    };

    p.draw = function () {
        p.image(video,0,0);
        p.textSize(16);
        p.fill(255,140,0);
        p.text(label,10,450);
    };
};

function ModelLoaded()
{
    console.log('Model is ready');
    //predicting the image
    mobileNet.predict(result)
}


//callback function to get the results
function result(err,res)
{
    //check for errors
    if(err)
    {
        //log the error if any
        console.error(err)
    }
    else{
       
        //get the label from the json result
        label = res[0].className;
       
    //predicting the image again
         mobileNet.predict(result)
    }
}


export default sketch;