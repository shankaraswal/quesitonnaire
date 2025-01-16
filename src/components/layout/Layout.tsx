import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { matchPath, Outlet, useLocation } from 'react-router-dom';
import { resetQuestionnaire } from 'src/features/questionnaire/questionnaireSlice';
import { twMerge } from 'tailwind-merge';

import { routeConfig } from '../../routes/index';
import Footer from './Footer';
import Header from './Header';

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetQuestionnaire());
    localStorage.removeItem('isLoggedin');
    navigate('/');
  }, []);

  const currentRoute = routeConfig.children.find((route) =>
    matchPath(route.path, location.pathname)
  );

  // If route is undefined, treat it as fullscreen (no Header and Footer)
  const isFullscreen = currentRoute?.fullscreen || currentRoute === undefined;

  return (
    <div className="h-screen">
      {!isFullscreen && <Header />}
      <main
        className={twMerge(
          'mx-auto flex flex-grow items-center justify-center text-center',
          !isFullscreen ? 'min-h-[calc(100vh-200px)]' : 'min-h-[100vh]'
        )}
      >
        <Outlet />
      </main>
      {!isFullscreen && <Footer />}
    </div>
  );
};

export default Layout;
