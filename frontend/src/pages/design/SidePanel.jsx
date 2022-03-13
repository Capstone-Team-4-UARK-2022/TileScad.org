import React, { createRef, useState } from "react";
import { Button, styled, Typography, Card } from "@mui/material";
import { uploadDesign } from "../../APIService";
import TileTypeCard from "./TileTypeCard";

import COLORS from "./Colors";

const ColorButton = styled(Button)(({ theme }) => ({
  color: COLORS.WHITE,
  backgroundColor: COLORS.BLUE,
  "&:hover": {
    backgroundColor: COLORS.PINK,
  },
}));

export default ({
  gridData,
  tileTypes,
  setTileTypes,
  activeTileType,
  setActiveTileType,
}) => {
  const hiddenForm = createRef();
  const filenameInput = createRef();
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 10,
        }}
      >
        <ColorButton
          style={{ width: 150 }}
          onClick={() => {
            uploadDesign(gridData).then((filename) => {
              console.log(filename);
              filenameInput.current.setAttribute("value", filename);
              hiddenForm.current.submit();
            });
          }}
        >
          Generate
        </ColorButton>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "scroll",
        }}
      >
        {tileTypes.map((tileType, i) => {
          return (
            <div style={{ padding: 10, width: "100%" }}>
              <TileTypeCard
                tileType={tileType}
                onClick={() => {
                  if (activeTileType != i) {
                    setActiveTileType(i);
                  } else {
                    setActiveTileType(null);
                  }
                }}
                selected={activeTileType == i}
                onChange={(newValues) => {
                  console.log("on change", newValues);
                  console.log(
                    tileTypes.map((oldTileType, j) => {
                      if (i == j) {
                        return newValues;
                      } else {
                        return oldTileType;
                      }
                    })
                  );
                  setTileTypes(
                    tileTypes.map((oldTileType, j) => {
                      if (i == j) {
                        return newValues;
                      } else {
                        return oldTileType;
                      }
                    })
                  );
                }}
              />
            </div>
          );
        })}
      </div>
      {/* hidden form so user can download scadnano file */}
      <form ref={hiddenForm} action="/api/download-file" method="POST">
        <input ref={filenameInput} type="hidden" name="filename" value="null" />
      </form>
    </div>
  );
};
