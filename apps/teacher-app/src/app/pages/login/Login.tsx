import { BookOpen, FacebookLogo, GoogleLogo } from 'phosphor-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../components/common/GlobalContext';
import { translate } from '../../components/common/translate/translate';

const Login = () => {
  const { language } = useGlobalContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Giả lập đăng nhập thành công
    if (username && password) {
      navigate('/'); // Điều hướng về trang chủ sau khi đăng nhập
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          'url(https://placehold.co/1200x800?text=Background+Image)',
      }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600 flex items-center">
            <BookOpen size={32} /> E-Learning
          </h1>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div className="form-control">
            <input
              type="text"
              placeholder="Email..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <input
              type="password"
              placeholder={translate('PASSWORD')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          <button onClick={handleLogin} className="btn btn-primary w-full">
            {translate('LOGIN')}
          </button>
        </div>

        {/* Divider */}
        <div className="divider my-6">{language == 'vi' ? 'Hoặc' : 'Or'}</div>

        {/* Social Login Buttons */}
        <div className="space-y-3">
          <button className="btn btn-outline w-full flex items-center justify-center">
            <GoogleLogo size={24} weight="bold" />
            {translate('LOGIN_WITH_GOOGLE')}
          </button>
          <button className="btn btn-outline w-full flex items-center justify-center">
            <FacebookLogo size={24} weight="bold" />
            {translate('LOGIN_WITH_FACEBOOK')}
          </button>
        </div>

        {/* Register Link */}
        <div className="text-center mt-4">
          <p>
            {language == 'vi'
              ? 'Bạn chưa có tài khoản'
              : "Don't have an account"}
            ?{' '}
            <Link to="/register" className="text-blue-600 hover:underline">
              {language == 'vi' ? 'Đăng ký ngay' : 'Sign up now'}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
