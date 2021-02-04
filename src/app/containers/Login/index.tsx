import React from 'react';
import styled from 'styled-components';
import Logo from './logo.png';
import { OutlinedInput, makeStyles, InputLabel } from '@material-ui/core';
import { Button } from 'components';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { signIn } from 'store/authReducer';

export const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: '#fff',
    margin: 'auto',
    display: 'block',
    maxWidth: '300px',
  },
  focused: {
    color: '#e94e1b',
    margin: 'auto',
    display: 'block',
    maxWidth: '300px',
  },
}));

const Login = () => {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const onSubmit = data => dispatch(signIn(data));
  return (
    <Background>
      <Img src={Logo} alt="Logo" />
      <form id={`login-form`} onSubmit={handleSubmit(onSubmit)}>
        <InputLabel htmlFor="username-input" className={classes.focused}>
          Username
        </InputLabel>
        <OutlinedInput
          className={classes.root}
          label="Login"
          id="username-input"
          type="text"
          name="username"
          inputRef={register}
        />
        <InputLabel htmlFor="password-input" className={classes.focused}>
          Password
        </InputLabel>
        <OutlinedInput
          className={classes.root}
          label="Password"
          name="password"
          inputRef={register}
          type="password"
        />
      </form>

      <CenterWrapper>
        <Button.Secondary
          form="login-form"
          width={300}
          variant="contained"
          color="secondary"
          type="submit"
        >
          SIGN IN
        </Button.Secondary>
      </CenterWrapper>
    </Background>
  );
};
export default Login;
const Background = styled.div`
  /* height: 100vh; */
  background-color: #28365b;
`;
const CenterWrapper = styled.div`
  display: block;
  padding-top: 8px;
  margin: auto;
  width: 300px;
`;
const Img = styled.img`
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  display: block;
  width: 300px;
`;
