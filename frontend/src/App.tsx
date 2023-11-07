import React from 'react';
import './App.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Theme } from 'react-daisyui';
import { Admin } from './pages/Admin';
import { AdminLogin } from './pages/AdminLogin';
import { Home } from './pages/Home';
import { Quiz } from './pages/Quiz';
import { Attempt } from './pages/Attempt';
import { gql, useQuery } from '@apollo/client';

const GET_TOKEN_QUERY = gql`
  query GetToken($username: String!, $password: String!) {
    getToken(username: $username, password: $password)
  }
`;

type GetTokenQueryType = {
  getToken: string;
};

function App() {
  const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/quiz/:quizId', element: <Quiz /> },
    { path: '/result/:attemptId', element: <Attempt /> },
    { path: '/admin', element: <Admin /> },
    { path: '/admin/login', element: <AdminLogin /> },
    { path: '*', element: <Home /> },
  ]);

  const username = 'admin';
  const password = 'admin';

  const { loading, error, data } = useQuery<GetTokenQueryType>(
    GET_TOKEN_QUERY,
    {
      variables: { username, password },
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  localStorage.setItem('token', data!.getToken);

  return (
    <Theme dataTheme='dark'>
      <div className='p-4'>
        <RouterProvider router={router} />
      </div>
    </Theme>
  );
}

export default App;
