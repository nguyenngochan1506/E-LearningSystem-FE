import { House, List, Shield, User } from 'phosphor-react';
import { useGlobalContext } from '../common/GlobalContext';
import { Link } from 'react-router-dom';
import { translate } from '../common/translate/translate';

const SideBar = () => {
  const { language } = useGlobalContext();
  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer" className="btn btn-ghost drawer-button">
          <List size={42} className="pointer" />
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 text-lg">
          {/* Sidebar content here */}
          <li>
            <Link to="/">
              <House size={32} /> {translate('HOME')}
            </Link>
          </li>
          <li>
            <Link to="/users">
              <User size={32} /> {translate('USERS')}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
