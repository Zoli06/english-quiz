import { gql, useLazyQuery, useQuery } from '@apollo/client';
import React from 'react';

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
      }
    }
  );

  return (
    <div>
      <h1>Admin Login</h1>
      <input
        type='text'
        placeholder='Username'
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type='password'
        placeholder='Password'
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => getToken()}>Login</button>
    </div>
  );
};
