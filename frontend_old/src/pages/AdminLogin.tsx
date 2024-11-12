import { gql, useLazyQuery } from '@apollo/client';
import React from 'react';
import { Input, Button, Artboard, Form } from 'react-daisyui';
import { useNavigate } from 'react-router-dom';

const GET_TOKEN_QUERY = gql`
  query GetToken($username: String!, $password: String!) {
    getToken(username: $username, password: $password)
  }
`;

type GetTokenQueryType = {
  getToken: string;
};

export const AdminLogin = () => {
  const navigate = useNavigate();

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [login] = useLazyQuery<GetTokenQueryType>(GET_TOKEN_QUERY, {
    onCompleted: (data) => {
      if (!data.getToken) {
        alert('Invalid credentials');
        return;
      }
      localStorage.setItem('token', data!.getToken);
      alert('Logged in');
      navigate('/admin');
    },
  });

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <Artboard className='max-w-3xl relative p-4'>
        <Form
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            login({ variables: { username, password } });
          }}
        >
          <Button
            type='button'
            onClick={() => {
              alert('Logged in as guest');
              navigate('/');
            }}
            className='absolute top-4 left-4'
          >
            Home
          </Button>
          <div className='flex flex-row justify-between items-center h-12'>
          <h1 className='text-3xl w-full text-center'>Admin Login</h1>
            <Button
              type='button'
              onClick={() => {
                alert('Logged in as guest');
                navigate('/');
              }}
              className='absolute top-4 left-4'
            >
              Home
            </Button>
          </div>
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
          <Button type='submit' className='mt-4' color='primary'>
            Login
          </Button>
        </Form>
      </Artboard>
    </div>
  );
};
