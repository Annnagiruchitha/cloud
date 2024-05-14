import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useFunc } from './redux/user/helperFunctions';

const OnlyAdminPrivateRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn, isAdmin } = useFunc();

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn && isAdmin ? (
          <Component {...props} />
        ) : (
          <Navigate to="/unauthorized" replace />
        )
      }
    />
  );
};

export default OnlyAdminPrivateRoute;
