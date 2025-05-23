import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../common/GlobalContext';
import { LanguageFlag, LanguageList } from '../../types/LanguageType';
import { translate } from '../common/translate/translate';
import SideBar from './SideBar';
import { UserCircle } from 'phosphor-react';

const Header = () => {
  const { language, changeLanguage, isLogin, setIsLogin } = useGlobalContext();
  const navigate = useNavigate();
  const handleLogout = () => {
    setIsLogin(false);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <header className="bg-blue-900 text-white p-2 flex items-center justify-between sticky top-0 z-50 text-lg px-8">
      <div className="flex items-center space-x-4">
        {/* <Link to="/" className="flex items-center">
          <img src="./logo.png" alt="logo" width={'60px'} />
        </Link> */}
        <div>
          <SideBar />
        </div>
      </div>
      <div className="flex items-center space-x-2 text-black">
        {isLogin ? (
          <div className="dropdown dropdown-center">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost m-1 text-white rounded-full"
            >
              <UserCircle size={32} />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
            >
              <li>
                <div className="" onClick={handleLogout}>
                  {translate('LOGOUT')}
                </div>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary text-lg">
            {translate('LOGIN')}
          </Link>
        )}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <img src={LanguageFlag[language]} width={'48px'} alt="icon" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-24 p-2 shadow"
          >
            {LanguageList.map((item) => (
              <li
                key={item.code}
                onClick={() => {
                  changeLanguage(item.code);
                }}
              >
                <div>
                  <img src={item.flag} width={'24px'} alt="icon" />
                  {item.code}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
