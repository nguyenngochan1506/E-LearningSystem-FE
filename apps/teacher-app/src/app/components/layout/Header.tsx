import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../common/GlobalContext';
import { LanguageFlag, LanguageList } from '../../types/LanguageType';
import { translate } from '../common/translate/translate';
import SideBar from './SideBar';
import {  MagnifyingGlass, UserCircle, CaretCircleDown, CaretCircleUp, House, Books, BookOpen, BookBookmark, NotePencil  } from 'phosphor-react';

const Header = () => {
  const { language, changeLanguage, isLogin, setIsLogin } = useGlobalContext();
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
 const handleLogout = () => {
    setIsLogin(false);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('user');
    navigate('/login');
  };
  return (
    <header className="bg-blue-900 text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-3">

        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
              <img src="./logo.png" alt="logo" className="h-12 w-auto" />
              <span className="text-xl font-bold hidden sm:block">E-Learning</span>
            </Link>
           <div >
          <SideBar />
        </div>
          {/* Logo và navigation chính */}
          <div className="flex items-center gap-8">
            

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              <Link to="/" 
                className="flex items-center gap-1 hover:text-blue-200 transition-colors px-2 py-1 rounded"
              >
                <House size={20} />
                {translate('HOME_PAGE')}
              </Link>
              
              <Link to="/course/create_course" 
                className="flex items-center gap-1 hover:text-blue-200 transition-colors px-2 py-1 rounded"
              >
                <Books size={20} />
                Tạo khóa học
              </Link>
              <Link to="/course/manage_courses" 
                className="flex items-center gap-1 hover:text-blue-200 transition-colors px-2 py-1 rounded"
              >
                <BookOpen  size={20} />
                Quản lý khóa học
              </Link>
              <Link to="/course/course:id/assignment" 
                className="flex items-center gap-1 hover:text-blue-200 transition-colors px-2 py-1 rounded"
              >
                <BookBookmark  size={20} />
                Giao bài tập
              </Link>
              <Link to="/grading" 
                className="flex items-center gap-1 hover:text-blue-200 transition-colors px-2 py-1 rounded"
              >
                <NotePencil   size={20} />
                Chấm điểm
              </Link>
            </nav>
            
          </div>

          {/* User Controls */}
          <div className="flex items-center gap-4">
            {/* Search Bar - Desktop */}
            <div className="relative hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  className="w-48 lg:w-64 pl-10 pr-4 py-2 rounded-full border-none focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800"
                  placeholder={translate('SEARCH')}
                />
                <MagnifyingGlass size={20} className="absolute left-3 top-2.5 text-gray-500" />
              </div>
            </div>

            {/* Login Button */}
            {isLogin 
            ?<div className="dropdown dropdown-center">
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
                <div className="text-black" onClick={handleLogout}>
                  {translate('LOGOUT')}
                </div>
              </li>
            </ul>
          </div>
              :<Link 
              to="/login" 
              className="hidden sm:flex items-center gap-2 bg-white text-blue-900 hover:bg-blue-100 px-4 py-2 rounded-full font-medium transition-colors shadow-sm"
            >
              <UserCircle size={20} />
              {translate('LOGIN')}
            </Link>
          }

            {/* Language Selector */}
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost p-0">
                <img 
                  src={LanguageFlag[language]} 
                  className="w-10 h-10 rounded-full border-2 border-white shadow" 
                  alt="language" 
                />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-white rounded-box z-[1] w-40 p-2 shadow-lg"
              >
                {LanguageList.map((item) => (
                  <li
                    key={item.code}
                    onClick={() => {
                      changeLanguage(item.code);
                    }}
                    className="hover:bg-blue-50 rounded-md"
                  >
                    <div className="flex items-center gap-2 px-3 py-2">
                      <img src={item.flag} className="w-6 h-6 rounded-full" alt="icon" />
                      <span className="text-gray-800">{item.name}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 space-y-3">
            {/* Search Bar - Mobile */}
            <div className="relative">
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 rounded-full border-none focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800"
                placeholder={translate('SEARCH')}
              />
              <MagnifyingGlass size={20} className="absolute left-3 top-2.5 text-gray-500" />
            </div>

            <Link 
              to="/" 
              className="block px-4 py-2 hover:bg-blue-800 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {translate('HOME_PAGE')}
            </Link>
            
            <Link 
              to="/my-courses" 
              className="block px-4 py-2 hover:bg-blue-800 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Khóa học của tôi
            </Link>
            
            <div className="px-4 py-2">
              <button 
                className="w-full flex justify-between items-center"
                onClick={() => setIsLibraryOpen(!isLibraryOpen)}
              >
                <span>{translate('LIBRARY')}</span>
                {isLibraryOpen ? <CaretCircleUp  size={16} /> : <CaretCircleDown  size={16} />}
              </button>
              
              {isLibraryOpen && (
                <div className="mt-2 ml-4 space-y-2">
                  <Link 
                    to="/exams/ongoing" 
                    className="block px-3 py-2 bg-blue-800 hover:bg-blue-700 rounded-lg transition-colors text-sm"
                    onClick={() => {
                      setIsLibraryOpen(false);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Bài kiểm tra đang diễn ra
                  </Link>
                  <Link 
                    to="/exams/results" 
                    className="block px-3 py-2 bg-blue-800 hover:bg-blue-700 rounded-lg transition-colors text-sm"
                    onClick={() => {
                      setIsLibraryOpen(false);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Kết quả bài kiểm tra
                  </Link>
                </div>
              )}
            </div>
            
            <Link 
              to="/forum" 
              className="block px-4 py-2 hover:bg-blue-800 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {translate('FORUM')}
            </Link>
            
            <Link 
              to="/login" 
              className="block mt-4 text-center bg-white text-blue-900 hover:bg-blue-100 px-4 py-2 rounded-full font-medium transition-colors shadow-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {translate('LOGIN')}
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};export default Header;