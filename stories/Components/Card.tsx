import React from "react";

const CardStyles = {
  alignItems: "center",
  backgroundColor: "tomato",
  color: "white",
  display: "flex",
  fontSize: "2em",
  height: "200px",
  justifyContent: "center",
  marginBottom: "1em",
  width: "500px",
};

interface IProps {
  blue?: boolean;
}

const Card: React.FC<IProps> = ({ children, blue = false }) => {
  return <div style={{ ...CardStyles, backgroundColor: blue ? "steelblue" : "tomato" }}>{children}</div>;
};

export { Card };
