import * as React from 'react';

function SvgAccepted(props) {
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
          '.accepted_svg__st8{fill:none;stroke:#005eb8;stroke-width:4;stroke-miterlimit:10}'
        }
      </style>
      <g id="accepted_svg__Layer_1">
        <path
          className="accepted_svg__st8"
          d="M168 206.5H72c-6.6 0-12-5.4-12-12v-126c0-6.6 5.4-12 12-12h96c6.6 0 12 5.4 12 12v126c0 6.6-5.4 12-12 12z"
        />
        <path
          className="accepted_svg__st8"
          d="M130.5 78.5h-21c-6.6 0-12-5.4-12-12v-21c0-6.6 5.4-12 12-12h21c6.6 0 12 5.4 12 12v21c0 6.6-5.4 12-12 12z"
        />
        <path
          fill="none"
          stroke="#005eb8"
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          d="M86.6 148l11.2 15.3 54.8-66"
        />
      </g>
    </svg>
  );
}

export default SvgAccepted;
