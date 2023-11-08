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

function App() {
  const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/quiz/:quizId', element: <Quiz /> },
    { path: '/result/:attemptId', element: <Attempt /> },
    { path: '/admin', element: <Admin /> },
    { path: '/admin/login', element: <AdminLogin /> },
    { path: '*', element: <Home /> },
  ]);

  return (
    <Theme dataTheme='dark'>
      <div className='p-4'>
        <RouterProvider router={router} />
      </div>
    </Theme>
  );
}

export default App;
