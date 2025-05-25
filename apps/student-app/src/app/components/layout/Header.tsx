import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../common/GlobalContext';
import { LanguageFlag, LanguageList } from '../../types/LanguageType';
import { translate } from '../common/translate/translate';
import { 
  BookOpen,
  Exam,
  ChartBar,
  MagnifyingGlass,
  UserCircle,
  CaretCircleDown,
  CaretCircleUp,
  House,
  Books,
  ChatsCircle
} from 'phosphor-react';

const Header = () => {
  const { language, changeLanguage } = useGlobalContext();
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-blue-900 text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo và navigation chính */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <img src="./logo.png" alt="logo" className="h-12 w-auto" />
              <span className="text-xl font-bold hidden sm:block">E-Learning</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              <Link 
                to="/" 
                className="flex items-center gap-1 hover:text-blue-200 transition-colors px-2 py-1 rounded"
              >
                <House size={20} />
                {translate('HOME_PAGE')}
              </Link>
              
              <Link 
                to="/my-courses" 
                className="flex items-center gap-1 hover:text-blue-200 transition-colors px-2 py-1 rounded"
              >
                <Books size={20} />
                Khóa học của tôi
              </Link>

              {/* Library Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setIsLibraryOpen(!isLibraryOpen)}
                  className="flex items-center gap-1 hover:text-blue-200 transition-colors px-2 py-1 rounded"
                >
                  <BookOpen size={20} />
                  {translate('LIBRARY')}
                  {isLibraryOpen ? <CaretCircleUp size={16} /> : <CaretCircleDown size={16} />}
                </button>

                {isLibraryOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white text-gray-800 rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
                    <div className="p-2">
                      <Link 
                        to="/exams/ongoing" 
                        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-blue-50 text-gray-800 transition-colors"
                        onClick={() => setIsLibraryOpen(false)}
                      >
                        <Exam size={20} className="text-blue-600" />
                        <div>
                          <p className="font-medium">Bài kiểm tra đang diễn ra</p>
                          <p className="text-xs text-gray-500">Xem các bài kiểm tra bạn đang tham gia</p>
                        </div>
                      </Link>
                      
                      <Link 
                        to="/exams/results" 
                        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-blue-50 text-gray-800 transition-colors"
                        onClick={() => setIsLibraryOpen(false)}
                      >
                        <ChartBar size={20} className="text-green-600" />
                        <div>
                          <p className="font-medium">Kết quả bài kiểm tra</p>
                          <p className="text-xs text-gray-500">Xem điểm và đánh giá các bài đã hoàn thành</p>
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link 
                to="/forum" 
                className="flex items-center gap-1 hover:text-blue-200 transition-colors px-2 py-1 rounded"
              >
                <ChatsCircle size={20} />
                {translate('FORUM')}
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
            <Link 
              to="/login" 
              className="hidden sm:flex items-center gap-2 bg-white text-blue-900 hover:bg-blue-100 px-4 py-2 rounded-full font-medium transition-colors shadow-sm"
            >
              <UserCircle size={20} />
              {translate('LOGIN')}
            </Link>

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