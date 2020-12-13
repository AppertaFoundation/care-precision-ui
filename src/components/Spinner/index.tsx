import React, { useEffect, useState } from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import Grid from '@material-ui/core/Grid';

const Spinner = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShow(true);
    }, 1000);
    return () => {
      clearTimeout(timer1);
    };
  }, []);
  return show ? (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={3}>
        <Loader
          type="Oval"
          color="#515F9C"
          height={100}
          width={100}
          timeout={3000} // 3 secs
        />
      </Grid>
    </Grid>
  ) : (
    <div />
  );
};
export default Spinner;
