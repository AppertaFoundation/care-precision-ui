import React from 'react';
import { SvgIcon, makeStyles } from '@material-ui/core';
import EmojiFlagsTwoToneIcon from '@material-ui/icons/EmojiFlagsTwoTone';
import { ISepsis } from 'types/AssessmentIcons';

const useStyles = makeStyles(() => ({
  amber: { color: '#ffbf00' },
  red: { color: 'red' },
  grey: { color: 'grey' },
  white: { color: '#fff' },
}));

const SepsisIcon: React.FC<ISepsis> = ({ value }) => {
  const classes = useStyles();
  if (value === null) return null;
  return (
    <SvgIcon
      component={EmojiFlagsTwoToneIcon}
      className={classes[value?.value]}
    />
  );
};
export default SepsisIcon;
