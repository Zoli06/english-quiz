import { gql, useLazyQuery } from '@apollo/client';
import React from 'react';
import { Input, Button, Artboard } from 'react-daisyui';

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

  const [login] = useLazyQuery<GetTokenQueryType>(GET_TOKEN_QUERY, {
    onCompleted: (data) => {
      if (!data.getToken) {
        alert('Invalid credentials');
        return;
      }
      localStorage.setItem('token', data!.getToken);
      window.location.href = '/admin';
    },
  });

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <Artboard className='max-w-3xl relative p-4'>
        <Button
          onClick={() => {
            window.location.href = '/';
          }}
          className='absolute top-4 left-4'
        >
          Home
        </Button>
        <h1 className='text-3xl'>Admin Login</h1>
        <Input
          type='text'
          placeholder='Username'
          onChange={(e) => setUsername(e.target.value)}
          className='mt-4'
        />
        <Input
          type='password'
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
          className='mt-4'
        />
        <Button
          onClick={() => {
            login({ variables: { username, password } });
          }}
          className='mt-4'
          color='primary'
        >
          Login
        </Button>
      </Artboard>
    </div>
  );
};
