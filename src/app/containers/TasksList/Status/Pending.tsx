import * as React from 'react';

function SvgPending(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 240 240"
      width="2em"
      height="2em"
      {...props}
    >
      <style>
        {
          '.pending_svg__st3{fill:none;stroke:#005eb8;stroke-width:4;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10}'
        }
      </style>
      <g id="pending_svg__Layer_1">
        <circle className="pending_svg__st3" cx={120.3} cy={120.7} r={12} />
        <path
          className="pending_svg__st3"
          d="M164.8 84.1l-35 29.4M67.8 95.7l41.4 19.3"
        />
        <circle className="pending_svg__st3" cx={120} cy={120.8} r={90} />
      </g>
      <g id="pending_svg__Layer_2">
        <path
          className="pending_svg__st3"
          d="M120 30.8v12M30.2 120.6h12M120 210.5v-12M209.8 120.6h-12"
        />
      </g>
    </svg>
  );
}

export default SvgPending;
