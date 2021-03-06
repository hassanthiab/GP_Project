import React from "react";
import { Button } from "@material-ui/core";

let ButtonP = (props) => {
  return (
    <Button
      id={props.id}
      onClick={props.onClick}
      style={{
      
        maxWidth: "110px",
        maxHeight: "40px",
        minWidth: "110px",
        minHeight: "40px",
      }}
      variant="contained"
    >
      {props.placeholder}
    </Button>
  );
};

export default ButtonP;
