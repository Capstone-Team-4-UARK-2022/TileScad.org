import React from "react";
import createUtilityClassName from "react-bootstrap/esm/createUtilityClasses";
import Sketch from "react-p5";

let dim = 800;
let num = 32;
let tiles = [];

export default (props) => {
  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    p5.createCanvas(dim, dim).parent(canvasParentRef);

    // console.log(p5.mouseX);
    // console.log(p5.mouseY);

    let x = p5.width / num / 2;
    let y = x;
    let s = p5.width / num;
    for (let i = x; i < p5.width; i += s) {
      for (let j = y; j < p5.height; j += s) {
        let t = new Tile(p5, i, j, s);
        tiles.push(t);
      }
    }
  };

  const draw = (p5) => {
    p5.background(255);
    for (let i = 0; i < tiles.length; i++) {
      tiles[i].show();
    }

    // if (p5.mouseIsPressed) {
    //   for (let i = 0; i < tiles.length; i++) {
    //     tiles[i].clicked(p5.mouseX, p5.mouseY);
    //   }
    // }

    // NOTE: Do not use setState in the draw function or in functions that are executed
    // in the draw function...
    // please use normal variables or class properties for these purposes
  };

  const mouseDragged = (event) => {
    console.log(event);
    for (let i = 0; i < tiles.length; i++) {
      tiles[i].clicked(event.mouseX, event.mouseY);
    }
  };

  const mousePressed = (event) => {
    console.log(event);
    for (let i = 0; i < tiles.length; i++) {
      tiles[i].clicked(event.mouseX, event.mouseY);
    }
  };

  class Tile {
    constructor(p5, x, y, s) {
      this.p = p5;
      this.x = x;
      this.y = y;
      this.s = s;
      this.c = 230;
      this.bool = false;
    }

    show() {
      this.p.stroke(10);
      this.p.fill(this.c);
      this.p.rectMode(this.p.CENTER);
      this.p.square(this.x, this.y, this.s);
    }

    clicked(mX, mY) {
      console.log(mX);
      console.log(mY);
      let d = this.p.dist(mX, mY, this.x, this.y);
      console.log(d);
      if (d < this.s / 2) {
        if (this.bool == false) {
          this.c = 10;
          this.bool = true;
        } else {
          this.c = 230;
          this.bool = false;
        }
      }
    }
  }

  return (
    <Sketch
      setup={setup}
      draw={draw}
      mousePressed={mousePressed}
      mouseDragged={mouseDragged}
    />
  );
};
