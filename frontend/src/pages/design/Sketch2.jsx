import React, { createRef } from "react";
import Sketch from "react-p5";
import { uploadDesign } from "../../APIService";

let dim = 800;
let num = 32;
let tiles = [];

class Tile {
  constructor(x, y, s) {
    this.x = x;
    this.y = y;
    this.s = s;
    this.isClicked = false;
  }

  draw(p5) {
    p5.stroke(10);
    p5.fill(this.isClicked ? 10 : 230);
    p5.rectMode(p5.CENTER);
    p5.square(this.x, this.y, this.s);
  }

  clicked() {
    this.isClicked = !this.isClicked;
  }
}

export default (props) => {
  const numTiles = 16;
  const tileSize = 50;
  const hiddenForm = createRef();
  const filenameInput = createRef();

  let tiles = []; // tiles[numTiles][numTiles] grid

  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    const dim = numTiles * tileSize;
    p5.createCanvas(dim, dim).parent(canvasParentRef);

    // console.log(p5.mouseX);
    // console.log(p5.mouseY);

    for (let y = tileSize / 2; y < p5.height; y += tileSize) {
      let tileRow = [];
      for (let x = tileSize / 2; x < p5.width; x += tileSize) {
        tileRow.push(new Tile(x, y, tileSize));
      }
      tiles.push(tileRow);
    }
  };

  const draw = (p5) => {
    p5.background(255);
    for (let i = 0; i < tiles.length; i++) {
      for (let j = 0; j < tiles[0].length; j++) {
        tiles[i][j].draw(p5);
      }
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
    console.log("mousePressed", event.mouseX, event.mouseY);
    const x = Math.floor(event.mouseX / tileSize);
    const y = Math.floor(event.mouseY / tileSize);
    console.log("x, y", x, y);

    if (x >= 0 && x < numTiles && y >= 0 && y < numTiles) {
      tiles[y][x].clicked();
    }
  };

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

//   return (
//     <Sketch
//       setup={setup}
//       draw={draw}
//       mousePressed={mousePressed}
//       mouseDragged={mouseDragged}
//     />

  return (
    <div class="row">
      <div class="col">
        <Sketch setup={setup} draw={draw} mousePressed={mousePressed} />
      </div>
      <div class="col">
        <button
          onClick={() => {
            uploadDesign(tiles.map((t) => t.map((x) => x.isClicked))).then(
              (filename) => {
                console.log(filename);
                filenameInput.current.setAttribute("value", filename);
                hiddenForm.current.submit();
              }
            );
          }}
          type="button"
          class="btn btn-primary"
        >
          Upload data
        </button>
        {/* hidden form so user can download scadnano file */}
        <form ref={hiddenForm} action="/api/download-file" method="POST">
          <input
            ref={filenameInput}
            type="hidden"
            name="filename"
            value="null"
          />
        </form>
      </div>
    </div>
  );
};
