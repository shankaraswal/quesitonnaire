import { Link } from 'react-router-dom';

import { routeConfig } from '../../routes';

const Header = () => {
  const { children } = routeConfig;
  return (
    <header className="mx-auto h-[100px] content-center border-b-2 border-gray-500">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-h1 font-bold tracking-widest">STHIRAHINC.COM</h1>
        <nav>
          <ul className="flex space-x-4">
            {children
              .filter((route) => route.navpart)
              .map((route) => (
                <li key={route.name}>
                  <Link to={route.path} className="hover:underline">
                    {route.name}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
