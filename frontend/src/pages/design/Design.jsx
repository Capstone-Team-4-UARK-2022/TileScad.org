import React, { useState } from "react";
import Navigation from "../BarNav";
import TileCanvas from "./TileCanvas";

function Design() {
  const [gridData, setGridData] = useState([
    [
      { label: "first", color: "orange" },
      { label: "first", color: "orange" },
    ],
    [null, null],
  ]);

  // const updateGrid = () => {
  //   //
  //   setGridData();
  // };

  const [activeTileType, setActiveTileType] = useState({
    label: "new",
    color: "red",
  });
  return (
    <div className="Design">
      <Navigation />
      <div className="content">
        <div class="container">
          <TileCanvas
            gridData={gridData}
            onClick={(rowIndex, colIndex) => {
              console.log("clicked", rowIndex, colIndex);
              // gridData[row][col] = activeTileType;
              const newData = gridData.map((row, i) => {
                return row.map((tile, j) => {
                  console.log("here", rowIndex, colIndex, i, j, gridData[i][j]);
                  if (i != rowIndex || j != colIndex) {
                    console.log("returning tile");
                    return tile;
                  } else {
                    console.log("setting new");

                    return activeTileType;
                  }
                });
              });
              console.log(gridData);

              console.log(newData);
              setGridData(newData);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Design;
