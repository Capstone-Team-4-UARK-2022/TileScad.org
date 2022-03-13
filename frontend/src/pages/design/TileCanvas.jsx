import React from "react";

function Tile({ label, color, onClick }) {
  return (
    <div
      style={{
        width: 50,
        height: 50,
        backgroundColor: color,
      }}
      onClick={onClick}
    >
      {label}
    </div>
  );
}

function TileCanvas({ gridData, onClick }) {
  //gridData [[{ lable, color, }]]
  // onClick = (rowNum, colNum) => {}
  return gridData.map((row, i) => {
    return (
      <div style={{ display: "flex" }}>
        {row.map((tile, j) => {
          const { label = "", color = "white" } = tile || {};
          return (
            <Tile
              label={label}
              color={color}
              onClick={() => {
                onClick(i, j);
              }}
            />
          );
        })}
      </div>
    );
  });
}

export default TileCanvas;
