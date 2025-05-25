import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeSlash } from 'phosphor-react';
import { login } from '../../components/common/apis/auth';
import { useGlobalContext } from '../../components/common/GlobalContext';
const Login = () => {
  const { isLogin, setIsLogin } = useGlobalContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Vui lòng nhập tên đăng nhập và mật khẩu');
      return;
    }
    try {
      const data = await login(email, password);
      if (data) {
        setIsLogin(true);
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('userId', data.userId);

        navigate('/');
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if (isLogin) {
      navigate('/');
    }
  }, [isLogin, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-xl">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <img
            src="../../../../public/logo.png"
            alt="E-Learning Logo"
            className="h-28 mb-2"
          />
          <h1 className="text-2xl font-semibold text-gray-700">Đăng nhập</h1>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Email hoặc tên đăng nhập"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full rounded-lg border border-gray-300 px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
            </span>
          </div>

          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Quên mật khẩu?
            </Link>
          </div>

          <button
            onClick={handleLogin}
            className="bg-green-500 hover:bg-green-600 text-white w-full py-2 rounded-full font-semibold transition duration-200"
          >
            Đăng nhập
          </button>
        </div>

        {/* Divider */}
        <div className="text-center my-4 text-gray-400">
          Hoặc đăng nhập bằng
        </div>

        {/* Social login */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button className="btn btn-outline w-full md:w-[240px] flex items-center justify-center gap-2">
            <img
              src="../../../../public/icons/ic_google.png"
              alt="Google"
              className="w-8 h-8"
            />
            <span>Đăng nhập với Google</span>
          </button>
          <button className="btn btn-outline w-full md:w-[240px] flex items-center justify-center gap-2">
            <img
              src="../../../../public/icons/ic_fb.png"
              alt="Facebook"
              className="w-8 h-8"
            />
            <span>Đăng nhập với Facebook</span>
          </button>
        </div>

        {/* Register */}
        <div className="text-center text-sm text-gray-500 mt-6">
          Chưa có tài khoản?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Đăng ký ngay
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
