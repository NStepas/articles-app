import { Route, Routes } from 'react-router-dom';

import { PrivateRoute } from './PrivateRoute';
import { SignUp } from '../ui/auth/signUp/SignUp';
import { Login } from '../ui/auth/login/Login';
import { PublicArticle } from '../ui/pages/PublicArticle';

import {
  LOGIN_ROUTE,
  PRIVATE_ROUTE,
  PUBLIC_ROUTE,
  SIGN_UP_ROUTE,
} from '../constants/routes';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path={PUBLIC_ROUTE} element={<PublicArticle />} />
      <Route path={SIGN_UP_ROUTE} element={<SignUp />} />
      <Route path={LOGIN_ROUTE} element={<Login />} />
      <Route path={PRIVATE_ROUTE} element={<PrivateRoute />} />
      <Route path='*' element={<PrivateRoute />} />
    </Routes>
  );
};
