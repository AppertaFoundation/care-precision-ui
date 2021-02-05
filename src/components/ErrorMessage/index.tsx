import React from 'react';
import { ErrorMessage } from '@hookform/error-message';

import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    color: '#bf1650',
  },
});

//TODO[5]: minimalis amount of ErrorMessage, in some places is
// used  styled component somewhere   is used this component
interface Props {
  name: string;
  errors: Object;
}
const ErrorMsg: React.FC<Props> = ({ name, errors }) => {
  const classes = useStyles();
  return (
    <Box m={1}>
      <ErrorMessage
        name={name}
        errors={errors}
        render={({ message }) => <p className={classes.root}>{message}</p>}
      />
    </Box>
  );
};

export { ErrorMsg };
