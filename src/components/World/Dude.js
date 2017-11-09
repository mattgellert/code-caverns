import React from 'react'; 
import {Image} from 'react-konva'; 

class Dude extends React.Component {
  state = {
    image: null,
    x: 500, 
    y: 500
  }

  componentDidMount() {
    const image = new window.Image();
    image.src = 'http://konvajs.github.io/assets/yoda.jpg';
    image.onload = () => {
      this.setState({
        image: image
      });
    };
    
    this.attachKeyListener();
  }

  attachKeyListener = () => {
    document.body.addEventListener('keydown', (e) => {
      e.preventDefault(); 
      switch(e.which) {
        case 37: this.moveLeft(); break; 
        case 38: this.moveUp(); break; 
        case 39: this.moveRight(); break; 
        case 40: this.moveDown(); break; 
        default: break; 
      }
    })
  }

  moveLeft = () => {
    this.setState({
      x: this.state.x - 20
    })
  }

  moveRight = () => {
    this.setState({
      x: this.state.x + 20
    })
  }

  moveUp = () => {
    this.setState({
      y: this.state.y - 20
    })
  }

  moveDown = () => {
    this.setState({
      y: this.state.y + 20
    })
  }

  render() {
    return (
      <Image 
        x={this.state.x}
        y={this.state.y}
        image={this.state.image}
        listening={true}
      />
    )
  }
}; 

export default Dude;