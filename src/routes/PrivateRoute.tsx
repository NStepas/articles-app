import { Navigate, Route, Routes } from 'react-router-dom';

import { Articles } from '../ui/pages/Articles';

import { ARTICLE_ROUTE } from '../constants/routes';

export const PrivateRoute = () => {
  return (
    <Routes>
      <Route path={ARTICLE_ROUTE} element={<Articles />} />
      <Route path='*' element={<Navigate to={ARTICLE_ROUTE} />} />
    </Routes>
  );
};
