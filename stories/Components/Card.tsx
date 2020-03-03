import React, { RefObject } from "react";

const CardStyles = {
  alignItems: "center",
  backgroundColor: "tomato",
  color: "white",
  display: "flex",
  fontSize: "2em",
  height: "200px",
  justifyContent: "center",
  marginBottom: "1em",
  width: "500px"
};

interface IProps {
  blue?: boolean;
  ref?: RefObject<HTMLDivElement>;
}

const Card: React.FC<IProps> = React.forwardRef(
  ({ children, blue = false}, ref) => {
    return (
      <div
        style={{
          ...CardStyles,
          backgroundColor: blue ? "steelblue" : "tomato",
        }}
        ref={ref}
      >
        {children}
      </div>
    );
  },
);

export { Card };
