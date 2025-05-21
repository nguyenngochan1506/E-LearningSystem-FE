import { BookOpen, FacebookLogo, GoogleLogo } from 'phosphor-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
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
              placeholder="Mật khẩu..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          <button onClick={handleLogin} className="btn btn-primary w-full">
            Đăng nhập
          </button>
        </div>

        {/* Divider */}
        <div className="divider my-6">HOẶC</div>

        {/* Social Login Buttons */}
        <div className="space-y-3">
          <button className="btn btn-outline w-full flex items-center justify-center">
            <GoogleLogo size={24} weight="bold" />
            Đăng nhập qua Google
          </button>
          <button className="btn btn-outline w-full flex items-center justify-center">
            <FacebookLogo size={24} weight="bold" />
            Đăng nhập qua Facebook
          </button>
        </div>

        {/* Register Link */}
        <div className="text-center mt-4">
          <p>
            Bạn chưa có tài khoản?{' '}
            <Link to="/register" className="text-blue-600 hover:underline">
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
