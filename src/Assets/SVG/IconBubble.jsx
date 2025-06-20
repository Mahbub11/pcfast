import * as React from "react";

function IconBubble(props) {
  return (
    <svg
      fill={props.fill}
      stroke={props.stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      height={props.height}
      width={props.width}
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <path d="M9 16 A3 3 0 0 1 6 19 A3 3 0 0 1 3 16 A3 3 0 0 1 9 16 z" />
      <path d="M18 19 A2 2 0 0 1 16 21 A2 2 0 0 1 14 19 A2 2 0 0 1 18 19 z" />
      <path d="M19 7.5 A4.5 4.5 0 0 1 14.5 12 A4.5 4.5 0 0 1 10 7.5 A4.5 4.5 0 0 1 19 7.5 z" />
    </svg>
  );
}

export default IconBubble;