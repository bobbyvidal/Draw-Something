import React from 'react';
import '../DrawArea.css'
    

export default class DrawArea extends React.Component{
  state = {
    isDrawing: false,
    lastX: 0,
    lastY: 0,
    hue: 1,
    direction: true,
    controlDisplay: "none",
    controlLeft: "100%",
    customColor: false,
    color: "#000000",
    customStroke: false,
    maxWidth: 100,
    minWidth: 5
  }
  //grab the canvas
  canvas = ()=> {
    return document.querySelector("#drawing");
  }

 //returns a drawing context on the canvas, or null if the context identifier is not supported
  ctx = () => {
    return this.canvas().getContext("2d");
  }

  //set the starting point of user cursor
  startDrawCursor = (e) =>{
    this.setState({
      isDrawing: true,
      lastX: e.nativeEvent.offsetX,  
      lastY: e.nativeEvent.offsetY
    })
  }
   
  draw = (e) =>{
    const ctx = this.ctx();
    let hue = this.state.hue;

    //set the color here
    if(this.state.isDrawing){
        if(this.state.color && this.state.customColor) {
          ctx.strokeStyle = this.state.color;
        } else {
          ctx.strokeStyle = `hsl(${this.state.hue}, 100%, 50%)`;
        }
    
      ctx.beginPath();
      ctx.moveTo(this.state.lastX, this.state.lastY);
      ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY); //create a line betwwen coordinates
      ctx.stroke();// display that line created above
      hue ++ 
      if(hue >= 360) {   //limit the color in a range
        hue = 1
      }
      this.setState({   //after starting cursor continue change x and y coordinates 
        hue: hue,
        lastX: e.nativeEvent.offsetX,
        lastY: e.nativeEvent.offsetY
      })
   }
   console.log(this.state.lastX)
  }
   
  stopDraw = () => {
    this.setState({isDrawing: false})
  }

 componentDidMount = () =>{
   const canvas = this.canvas()
   const ctx = this.ctx()
   //set the window size for different clients' browser, make sure it is consistent
   if(this.props.fullscreen === true){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  //set the draw stroke 
    ctx.strokeStyle = "#BADA55";
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = Number(this.state.minWidth)
 } 

 

  render(){
      return(
          <div>
            <canvas onMouseMove = {this.draw} 
                    onMouseDown = {(e)=> this.setState({
                isDrawing: true,
                lastX: e.nativeEvent.offsetX,  
                lastY: e.nativeEvent.offsetY
                 })} 
                onMouseUp = {this.stopDraw} /* currentColor = {this.props.currentColor} */ id="drawing" fullscreen={true}></canvas>
                    </div>
      )
  }
}

/*
  lastX: e.nativeEvent.offsetX,  
  lastY: e.nativeEvent.offsetY
*/