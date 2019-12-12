import React, { Component } from 'react'
import './index.css'
import { Carousel } from 'antd';

class CarouselComp extends Component {
  render() {
    return (
      <Carousel autoplay>
        <div>
          <h3>FOTO 1</h3>
        </div>
        <div>
          <h3>FOTO 2</h3>
        </div>
        <div>
          <h3>FOTO 3</h3>
        </div>
        <div>
          <h3>FOTO 4</h3>
        </div>
      </Carousel> 
    )
  }
}

export default CarouselComp