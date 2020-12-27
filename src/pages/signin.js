import React, { useEffect} from 'react';
import UserForm from '../components/UserForm';
import { useMutation, useApolloClient, gql } from '@apollo/client';

const SIGNIN_USER = gql`
    mutation signIn($email: String, $password: String!) {
    signIn(email: $email, password: $password)
 }
`;

const SignIn = props=>{
    useEffect(()=>{
        document.title = 'Sign In - Notedly';
    });
    const client = useApolloClient();
    const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
        onCompleted: data=>{
            // Store token
            localStorage.setItem('token', data.signIn);
            // update local cache
            client.writeData({ data: { isLoggedIn: true } });
            // redirect the user to the homepage
            props.history.push('/');
        }
    });
    return(
        <React.Fragment>
            <UserForm action={signIn} formType="signIn" />
            {loading && <p>Loading...</p>}
            {error && <p>Error signing in!</p>}
        </React.Fragment>
    );
};
export default SignIn