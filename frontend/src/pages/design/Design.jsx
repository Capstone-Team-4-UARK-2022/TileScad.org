import React, { createRef, useState, useRef, useEffect } from "react";
import { Button, styled, Typography, Card } from "@mui/material";
import TileCanvas from "./TileCanvas";
import useMediaQuery from "@mui/material/useMediaQuery";
import COLORS from "./Colors";
import SidePanel from "./SidePanel";

const defaultTileTypes = [
  {
    name: "A",
    color: COLORS.TILE_TYPES.RED,
    domainLength: 6,
  },
  { name: "B", color: COLORS.TILE_TYPES.BLUE, domainLength: 6 },
  { name: "C", color: COLORS.TILE_TYPES.GREEN, domainLength: 6 },
];

defaultTileTypes.forEach((type, i) => {
  type.id = i;
  return type;
});

const defaultGridData = [...Array(16)].map((_, i) => {
  return [
    defaultTileTypes[1].id,
    defaultTileTypes[2].id,

    ...[...Array(14)].map((_, i) => {}),
  ];
});

const defaultActiveTileType = defaultTileTypes[0].id;

const getTileSize = (gridDim) => {
  // want tile canvas to be ~70% screen width
  // console.log("window.innerWidth");
  // console.log(window.innerWidth);

  //  why does this keep increasing??
  // let width = window.innerWidth;

  const width1500 = useMediaQuery("(min-width:1500px)");
  const width1000 = useMediaQuery("(min-width:1000px)");
  const width800 = useMediaQuery("(min-width:800px)");
  const width600 = useMediaQuery("(min-width:600px)");
  const width400 = useMediaQuery("(min-width:400px)");

  let width = 0;

  if (width1500) {
    width = 1500;
  } else if (width1000) {
    width = 1000;
  } else if (width800) {
    width = 800;
  } else if (width600) {
    width = 600;
  } else if (width400) {
    width = 400;
  }

  return Math.min(Math.max(Math.floor((width * 0.4) / gridDim), 50), 100);
};

export default () => {
  const [gridData, setGridData] = useState(defaultGridData);

  // either id (number) or null
  const [activeTileType, setActiveTileType] = useState(defaultActiveTileType);

  const [tileTypes, setTileTypes] = useState(defaultTileTypes);
  const [gridDim, setGridDim] = useState(10);

  const updateGrid = (rowIndex, colIndex) => {
    const newData = gridData.map((row, i) => {
      return row.map((tile, j) => {
        if (i != rowIndex || j != colIndex) {
          return tile;
        } else {
          return activeTileType;
        }
      });
    });
    setGridData(newData);
  };

  // const tileSize = getTileSize();
  const tileSize = getTileSize(gridDim);
  console.log(tileSize, "tileSize");

  return (
    <div>
      <div
        style={{
          // padding: "20px 0px",
          width: "90%",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            padding: 20,
            justifyContent: "center",
          }}
        >
          <Typography variant={"h3"}>Tile Assembly Editor</Typography>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: gridDim * tileSize, padding: 15 }}>
            <TileCanvas
              gridData={gridData}
              width={gridDim}
              height={gridDim}
              tileSize={tileSize}
              tileTypes={tileTypes}
              activeTileType={activeTileType}
              onClick={(row, col) => {
                // console.log("clicked", row, col);
                updateGrid(row, col);
              }}
            />
          </div>
          <div
            style={{
              padding: 15,
              flexGrow: 1,
              minWidth: 250,
              maxWidth: 400,
            }}
          >
            <SidePanel
              gridData={gridData}
              tileTypes={tileTypes}
              setTileTypes={setTileTypes}
              activeTileType={activeTileType}
              setActiveTileType={setActiveTileType}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
