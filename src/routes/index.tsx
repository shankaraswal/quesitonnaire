import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from 'react-router-dom';

import Layout from '../components/layout/Layout';
import { ModuleBreakPage, QuestionWrapper, StartTestWrapper } from '../pages';
import ProtectedRoute from './ProtectedRoute';
export const routeConfig = {
  path: '/',
  element: <Layout />,
  name: '',
  secure: false,
  navpart: false,
  children: [
    {
      path: '/',
      element: <StartTestWrapper />,
      name: 'Select Test',
      secure: false,
      fullscreen: true,
      navpart: false,
    },
    {
      path: '/questionnaire',
      element: <QuestionWrapper />,
      name: 'QuestionWrapper',
      secure: true,
      fullscreen: true,
      navpart: false,
    },
    {
      path: '/break',
      element: <ModuleBreakPage />,
      name: 'Module Break',
      secure: true,
      fullscreen: true,
      navpart: false,
    },
    {
      path: '*',
      element: <Navigate to="/" replace />,
      name: '',
      secure: false,
      fullscreen: true,
      navpart: false,
    },
  ],
};

// Create routes dynamically
export const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path={routeConfig.path} element={<Layout />}>
      {routeConfig.children.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={
            route.secure ? (
              <ProtectedRoute>{route.element}</ProtectedRoute>
            ) : (
              route.element
            )
          }
        />
      ))}
      {/* Fallback route for undefined paths */}
      <Route path="*" element={<StartTestWrapper />} />
    </Route>
  )
);
