// import * as p5 from 'p5'
// import "p5/lib/addons/p5.dom";
import "react-p5-wrapper/node_modules/p5/lib/addons/p5.dom";

export default function sketch (p) {
    let mobileNet;
    let video;
    let label='model loading...';
    let block;
  
    p.setup = function () {
        p.createCanvas(1000, 1000);
        //imitialize the webcam stream in a object
        video = p.createCapture(p.VIDEO);
        //hide the webcam stream
        video.hide();
    };
  
    p.draw = function () {
        p.image(video,0,0);
    };
};