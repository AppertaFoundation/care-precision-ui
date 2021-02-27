import React from 'react';
import { Label, IconButton } from '../IconButton';
import Denwis from './Denwis';

const DenwisIcon = ({ denwis, label = false }) => {
  const color =
    denwis?.value === 0 ? 'grey' : denwis?.value > 4 ? 'red' : 'green';
  return (
    <IconButton onClick={() => console.log('a')}>
      <Denwis stroke={color} value={denwis?.value} trend={denwis?.trend} />
      {label && <Label>DENWIS</Label>}
    </IconButton>
  );
};

export default DenwisIcon;
