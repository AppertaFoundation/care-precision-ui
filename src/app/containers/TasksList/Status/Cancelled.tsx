import * as React from 'react';

function SvgCancelled(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 240 240"
      width="2em"
      height="2em"
      {...props}
    >
      <path
        d="M42.7 148.5C50 136.2 64 112.6 73.9 95.9l36.8-62.1c4.2-7.1 14.5-7.1 18.8 0L225 195.1c4.3 7.2-.9 16.4-9.4 16.4H24.4c-8.4 0-13.7-9.1-9.4-16.4h0c8-13.4 20.4-34.3 27.7-46.6z"
        fill="none"
        stroke="#005eb8"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
      />
      <path
        d="M124.4 161.7h-8.5L114 82.3h12.1l-1.7 79.4zM114 174.4h12.1V187H114v-12.6z"
        fill="#005eb8"
      />
    </svg>
  );
}

export default SvgCancelled;
