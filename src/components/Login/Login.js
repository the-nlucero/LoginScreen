import React, { useState, useEffect, useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../store/auth-context';
import Input from '../UI/Input/Input';

//Groups Together Email Entered Values And Validation
function emailReducer(state, action) {
  if(action.type === 'USER_INPUT'){
    
    return {
      value: action.val, 
      isValid: action.val.includes('@') }
  }

  if(action.type === 'INPUT_BLUR')
  {
    return {
      value: state.value, 
      isValid: state.value.includes('@') }
  }
  
    return {
      value: '', 
      isValid: false}
};

//Groups Together Password Entered Values And Validation
function passwordReducer(state, action) {
  if(action.type === 'USER_INPUT'){
    
    return {
      value: action.val, 
      isValid: action.val.trim().length > 6 }
  }

  if(action.type === 'INPUT_BLUR')
  {
    return {
      value: state.value, 
      isValid: state.value.trim().length > 6 }
  }
  
    return {
      value: '', 
      isValid: false}
};

const Login = (props) => {

  const [formIsValid, setFormIsValid] = useState(false);

  //Initialize Reducers
  const [emailState, dispatchEmail] = useReducer(emailReducer, {value: '', isValid: null});
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value: '', isValid: null});

  const ctx = useContext(AuthContext);

  useEffect(() => {
    console.log('Timer is Running');

    return () => {
      console.log('User Finished Typing');
    } 
  }, []);

  //Allows program to STOP updating once validity is met
  const {isValid: emailIsValid} = emailState;
  const {isValid: passwordIsValid} = passwordState;


   //Used to not overload network with constant HTTP requests
  useEffect(() => {
    const timer = setTimeout(() => {
    
      console.log('Checking For Validity!');
    
    //Checks Validity
    setFormIsValid( emailIsValid && passwordIsValid);
    }, 850);
    
    //Clears and Restarts Timer when User types again
    //Runs BEFORE the FIRST Side Effect
    return () => {
      console.log('User Started Typing');
      clearTimeout(timer);

    }; 

  }, [emailIsValid, passwordIsValid])

  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'USER_INPUT', val: event.target.value});
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: 'USER_INPUT', val: event.target.value});
  };

  const validateEmailHandler = () => {
  dispatchEmail({type: 'INPUT_BLUR'})
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: 'INPUT_BLUR'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    ctx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input 
          id='email' 
          label='E-Mail' 
          type='email' 
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
          /> 
        <Input 
          id='password' 
          label='Password' 
          type='password' 
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        /> 
        <div className={classes.actions}>
          <Button 
            type="submit" 
            className={classes.btn} 
            disabled={!formIsValid}
          >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
