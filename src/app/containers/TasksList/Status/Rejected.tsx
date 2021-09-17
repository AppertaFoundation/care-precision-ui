import * as React from 'react';

function SvgRejected(props) {
  return (
    <svg
      id="rejected_svg__Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      x={0}
      y={0}
      viewBox="0 0 240 240"
      xmlSpace="preserve"
      width="2em"
      height="2em"
      {...props}
    >
      <style>
        {
          '.rejected_svg__st0{fill:none;stroke:#005eb8;stroke-width:4;stroke-linecap:round;stroke-linejoin:round}'
        }
      </style>
      <circle className="rejected_svg__st0" cx={120.1} cy={120.3} r={104.4} />
      <path
        className="rejected_svg__st0"
        d="M57.1 87.5l103.3 93.4c-33 22-77.6 13.1-99.6-19.8-14.6-22.1-16.1-50.3-3.7-73.6zM168.7 67.9c24.4 22.1 30.7 57.9 15.2 86.9L80.6 61.5c27.3-18.3 63.6-15.7 88.1 6.4z"
      />
    </svg>
  );
}

export default SvgRejected;
