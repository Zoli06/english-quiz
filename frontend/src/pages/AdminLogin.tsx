import { gql, useLazyQuery } from '@apollo/client';
import React from 'react';
import { Input, Button } from 'react-daisyui';

const GET_TOKEN_QUERY = gql`
  query GetToken($username: String!, $password: String!) {
    getToken(username: $username, password: $password)
  }
`;

type GetTokenQueryType = {
  getToken: string;
};

export const AdminLogin = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [getToken] = useLazyQuery<GetTokenQueryType>(
    GET_TOKEN_QUERY,
    {
      variables: { username, password },
      onCompleted: (data) => {
        localStorage.setItem('token', data!.getToken);
        window.location.href = '/admin';
      }
    }
  );

  return (
    <div>
      <h1>Admin Login</h1>
      <Input
        type='text'
        placeholder='Username'
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type='password'
        placeholder='Password'
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={() => getToken()}>Login</Button>
    </div>
  );
};
