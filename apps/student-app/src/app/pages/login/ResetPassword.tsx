import { Envelope } from 'phosphor-react';
import { use, useState } from 'react';
import { Eye, EyeSlash } from 'phosphor-react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { resetPassword } from '../../components/common/apis/auth'; // Adjust the import path as needed
const ResetPassword = () => {
  const [isSent, setIsSent] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [retypePassword, setRetypePassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showRetypePassword, setShowRetypePassword] = useState<boolean>(false);
  const { navigate } = useNavigate();
  //get resetKey from URL
  const [searchParams] = useSearchParams();
  const secretKey = searchParams.get('secretKey');

  const handleValidateRetypePassword = (e) => {
    if (password !== retypePassword) {
      setError('Mật khẩu nhập lại không khớp');
      setRetypePassword(e.target.value);
      return false;
    }
    setError('');
    return true;
  };
  const handleResetPassword = async () => {
    if (!password || !retypePassword) {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    if (!secretKey) {
      alert('Secret key is required');
      return;
    }
    console.log('secretKey', secretKey);
    console.log('password', password);
    console.log('retypePassword', retypePassword);
    const data = await resetPassword(secretKey, password);

    if (data.status === 200) {
      setIsSent(true);
      setError('');
      alert('Đặt lại mật khẩu thành công');
      setTimeout(() => {
        setIsSent(false);
        navigate('/login');
      }, 2000);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-blue-200 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <img
            src="../../../../public/logo.png"
            alt="E-Learning Logo"
            className="h-28 mb-2"
          />
          <h1 className="text-2xl font-semibold text-gray-700">
            Tạo lại mật khẩu
          </h1>
        </div>

        <p className="text-center text-gray-600 mb-6 text-sm">
          Nhập lại mật khẩu mới của bạn
        </p>

        {/* Form */}
        <div className="space-y-5">
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Mặt khẩu mới
            </label>
            <div className="relative">
              <input
                id="password"
                type="password"
                placeholder="Nhập mật khẩu mới"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-gray-50"
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
              </span>
            </div>

            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nhập lại mật khẩu
            </label>
            <div className="relative">
              <input
                id="retypePassword"
                value={retypePassword}
                type="password"
                onChange={(e) => {
                  handleValidateRetypePassword(e);
                }}
                placeholder="Nhap lại mật khẩu"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-gray-50"
                disabled={isSent}
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
              </span>
            </div>
            <div className="w-full text-center">
              <button
                className="btn btn-primary mt-8"
                onClick={() => handleResetPassword()}
              >
                Tạo
              </button>
            </div>
          </div>

          {/* Thông báo lỗi hoặc thành công */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* Nút Gửi mã xác nhận */}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
