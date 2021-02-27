import React from 'react';
import TrendArrow from '../TrendArrow';

import { Label, IconButton } from '../IconButton';

const News2Icon: React.FC<{
  news2: {
    value: number;
    clinicalRisk: string | number;
    trend?: string;
  };
  isParametr?: Boolean;
  label?: boolean;
}> = ({ news2, isParametr, label }) => {
  return (
    <IconButton onClick={() => console.log('a')}>
      <News2 news2={news2} isParametr={isParametr} />
      {label && <Label>NEWS2</Label>}
    </IconButton>
  );
};

const News2: React.FC<{
  news2: {
    value: number;
    clinicalRisk: string | number;
    trend?: string;
  };
  isParametr?: Boolean;
}> = ({ news2, isParametr }) => {
  const { value, clinicalRisk, trend } = news2;

  const CIRCLE_COLORS_SCORE = {
    at0060: '#F40013',
    at0059: '#FBC384',
    at0058: '#fbf184',
    at0057: '#2E7D32',
  };

  const CIRCLE_COLORS_PARAMETRS = {
    '3': '#F40013',
    '2': '#FBC384',
    '1': '#fbf184',
    '0': '#2E7D32',
  };
  const parametrFont = value === 3 ? '#fff' : '#000';
  const fill = isParametr
    ? CIRCLE_COLORS_PARAMETRS[clinicalRisk]
    : CIRCLE_COLORS_SCORE[clinicalRisk];
  const fontFill = isParametr
    ? parametrFont
    : clinicalRisk === 'at0060' || clinicalRisk === 'at0057'
    ? '#fff'
    : '#000';

  return (
    <div style={{ flexDirection: 'row' }}>
      <TrendArrow trend={trend || 'same'} />
      <svg width={32} height={32}>
        <circle cx={16} cy={16} r={15} fill={fill} />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          fill={fontFill}
          fontSize={16}
          fontFamily="Arial"
          dy=".3em"
          stroke={fontFill}
        >
          {value}
        </text>
        {'Sorry, your browser does not support inline SVG.'}
      </svg>
    </div>
  );
};

export default News2Icon;
