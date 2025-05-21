import { Link } from 'react-router-dom';
import { useGlobalContext } from '../common/GlobalContext';
import { LanguageFlag, LanguageList } from '../../types/LanguageType';
import { translate } from '../common/translate/translate';
import SideBar from './SideBar';

const Header = () => {
  const { language, changeLanguage } = useGlobalContext();
  console.log('language', language);

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
        {/* <Link to="/profile" className="bg-gray-300 p-2 rounded-full">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </Link> */}
        <div>
          <Link to="/login" className="btn btn-primary text-lg">
            {translate('LOGIN')}
          </Link>
        </div>
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
