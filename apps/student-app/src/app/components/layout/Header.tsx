import { Link } from 'react-router-dom';
import { useGlobalContext } from '../common/GlobalContex';
import { LanguageFlag, LanguageList } from '../../types/LanguageType';
import { translate } from '../common/translate/translate';

const Header = () => {
  const { language, changeLanguage } = useGlobalContext();

  return (
    <header className="bg-blue-900 text-white p-2 flex items-center justify-between sticky top-0 z-50 text-lg px-8">
      <div className="flex items-center space-x-4">
        <Link to="/" className="flex items-center">
          <img src="./logo.png" alt="logo" width={'60px'} />
        </Link>
        <nav className="space-x-4 hidden md:flex">
          <Link to="/" className="hover:underline">
            {translate('HOME_PAGE')}
          </Link>
          <Link to="/courses" className="hover:underline">
            {translate('COURSES')}
          </Link>
          <Link to="/library" className="hover:underline">
            {translate('LIBRARY')}
          </Link>
          <Link to="/forum" className="hover:underline">
            {translate('FORUM')}
          </Link>
        </nav>
      </div>
      <div className="flex items-center space-x-2 text-black">
        <div className="relative">
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder={translate('SEARCH')}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
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
