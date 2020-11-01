import React from 'react';
import Files from '../pages/Files';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import PersonalArea from '../pages/PersonalArea';
import Signup from '../pages/Signup';

const routes = {
  '/': () => <Home />,
  '/login': () => <Login />,
  '/signup': () => <Signup />,
  '/files': () => <Files />,
  '/personal-area': () => <PersonalArea />,
  '*': () => <NotFound />,
};

export default routes;
