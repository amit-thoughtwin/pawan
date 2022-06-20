import { BrowserRouter, Routes, Route } from 'react-router-dom';

import React, { useState } from 'react';
import Register from '../component/register/register';
import Login from '../component/login/login';
import Dashboard from '../component/dashboard/Dashboard';
import PrivateRoute from './privaterouting';
import PublicRoutes from './publicrouting';
import Home from '../home/Home';

export default function RouteLink() {
  const [refresh, setRefresh] = useState<Number>(0);

  const item = [
    { path: '/', Component: Login },
    { path: '/register', Component: Register },
  ];

  const item2 = [
    { path: '/dash/:chatID', Component: Dashboard },
    { path: '/home', Component: Home },
  ];

  return (
    <BrowserRouter>
      <Routes>
        {item.map((items: any) => (
          <Route
            path={items.path}
            key={items.path}
            element={(
              <PublicRoutes
                refresh={refresh}
                Component={<items.Component refresh={setRefresh} />}
              />
            )}
          />
        ))}

        {item2.map((itemss: any) => (
          <Route
            path={itemss.path}
            key={itemss.path}
            element={<PrivateRoute Component={itemss.Component} />}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}
