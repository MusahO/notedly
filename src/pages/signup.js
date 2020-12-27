import React, {useEffect, useState} from 'react'
import Button from '../components/Button';
import UserForm from '../components/UserForm';

import styled from 'styled-components';
import { useMutation, useApolloClient, gql } from '@apollo/client';

const Wrapper = styled.div`
    border: 1px solid #f5f4f0;
    max-width: 500px;
    padding: 1em;
    margin: 0 auto;
`;
const Form = styled.form`
    label,
    input {
    display: block;
    line-height: 2em;
 }

 input {
    width: 100%;
    margin-bottom: 1em;
    }
   `;

   const SIGNUP_USER = gql`
        mutation signUp($email: String!, $username: String!, $password: String!) {
        signUp(email: $email, username: $username, password: $password)
    }
  `;
  

const SignUp = props =>{
    // set the default state of the form
    const [values, setValues] = useState();

    // update the state when a user types in the form
    const onChange = event=>{
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    useEffect(
        ()=>{document.title='Sign Up - Notedly'}
    );

    const client = useApolloClient(); //Apollo Client

    //add the mutation hook
    const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
        onCompleted: data => {
            // store the JWT in localStorage
            localStorage.setItem("token", data.signUp);
            // update the local cache
            client.writeData({ data: { isLoggedIn: true } });
            // redirect user to homepage
            props.history.push('/')
    }
   });
    return(
        <React.Fragment>
            <UserForm action={signUp} formType="signup"/>
            {loading && <p>loading...</p>}
            {error && <p>Error creating Account!</p>}
        </React.Fragment>
    );
};
export default SignUp