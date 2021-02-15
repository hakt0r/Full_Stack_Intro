
import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

export const LOGIN = gql`
mutation Login ( $name: String!, $password: String! ){
  loginUser( name:$name, password:$password ){
    id
    token
  }
}`;

const Login = () => {
  const [state,setState] = useState({name:'',password:''});
  const [ login, { data } ] = useMutation(LOGIN);
  if ( data ){
    localStorage.setItem('token',data.loginUser.token);
  }
  return data ? JSON.stringify(data) : <>
    <input value={state.name}     onChange={ e => setState({...state,name:e.target.value})}/>
    <input value={state.password} onChange={ e => setState({...state,password:e.target.value})}/>
    <button onClick={ e => login({variables:state}) }>login</button>
  </>;
};

export default Login;
