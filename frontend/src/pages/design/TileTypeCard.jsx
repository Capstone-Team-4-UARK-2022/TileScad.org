import React from "react";
import { Box, Card, Typography } from "@mui/material";
import EditableField from "./EditableField";

// const PaddedBox = ({ children }) => {
//   return <Box style={{ padding: "15px 0px" }}>{children}</Box>;
// };

import ColorPicker from "material-ui-color-picker";

// export default ({ title, labels, values, onChange }) => {
export default ({ tileType, onChange, onClick, selected = false }) => {
  const { name, domainLength, color } = tileType || {};
  // values must be primitives
  // labels is {key: label}
  // values is {key: value}

  //   if (!values) return null;

  return tileType ? (
    //   overflow visible so color picker works
    <Card
      style={{
        width: "100%",
        padding: "20px 0px",
        overflow: "visible",
        border: selected ? "1px solid blue" : undefined,
      }}
      onClick={onClick}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <EditableField
          label={"Name"}
          value={name}
          onChange={(newValue) => {
            onChange({ ...tileType, name: newValue });
          }}
        />
        <EditableField
          label={"Domain Length"}
          value={domainLength}
          onChange={(newValue) => {
            onChange({ ...tileType, domainLength: newValue });
          }}
        />
        <EditableField
          label={"Color"}
          value={color}
          onChange={(newValue) => {
            onChange({ ...tileType, color: newValue });
          }}
        />
        {/* <ColorPicker
          name={"Color"}
          defaultValue={color}
          // value={this.state.color} - for controlled component
          onChange={(newValue) => {
            if (!newValue) return;
            console.log(newValue);
            onChange({ ...tileType, color: newValue });
          }}
        /> */}
      </div>
    </Card>
  ) : (
    ""
  );
};
