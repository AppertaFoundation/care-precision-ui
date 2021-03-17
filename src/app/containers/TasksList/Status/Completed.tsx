import * as React from 'react';

function SvgCompleted(props) {
  return (
    <svg
      id="completed_svg__Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 240 240"
      width="2em"
      height="2em"
      {...props}
    >
      <defs>
        <style>
          {
            '.completed_svg__cls-1{fill:none;stroke:#005eb8;stroke-linecap:round;stroke-linejoin:round;stroke-width:4px}'
          }
        </style>
      </defs>
      <path
        className="completed_svg__cls-1"
        d="M73.14 147.65l16.28 22.18 79.97-96.25"
      />
      <circle
        className="completed_svg__cls-1"
        cx={121.26}
        cy={120.46}
        r={82.5}
      />
    </svg>
  );
}

export default SvgCompleted;
