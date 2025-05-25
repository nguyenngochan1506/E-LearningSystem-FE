import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Envelope, SpinnerGap } from 'phosphor-react';
import { sendEmailForgotPassword } from '../../components/common/apis/auth';

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>('');
  const [isSent, setIsSent] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (!email) {
      setError('Vui lòng nhập email');
      return;
    }

    try {
      const data = await sendEmailForgotPassword(email);
      if (data) {
        setIsSent(true);
        setError('');
        setTimeout(() => {
          setIsSent(false);
          alert('Mã xác nhận đã được gửi đến email của bạn');
        }, 2000);
      }
      // setIsSent(true);
      // setError('');
      // // Giả lập gửi OTP
      // await new Promise((resolve) => setTimeout(resolve, 1500));
      // setIsSent(true);
      // navigate('/verify-otp', { state: { email } });
    } catch (err) {
      setError(err.message || 'Đã xảy ra lỗi khi gửi mã xác nhận');
      setIsSent(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
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
            Quên mật khẩu
          </h1>
        </div>

        <p className="text-center text-gray-600 mb-6 text-sm">
          Nhập email để nhận mã xác nhận
        </p>

        {/* Form */}
        <div className="space-y-5">
          <div className="relative">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                placeholder="Nhập email đã đăng ký"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-gray-50"
                disabled={isSent}
              />
              <Envelope
                className="absolute left-3 top-3.5 text-gray-400"
                size={18}
              />
            </div>
          </div>

          {/* Thông báo lỗi hoặc thành công */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {isSent && !error && (
            <p className="text-green-600 text-sm text-center">
              Mã xác nhận đã được gửi đến {email}
            </p>
          )}

          {/* Nút Gửi mã xác nhận */}
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70"
            onClick={handleSendOtp}
            disabled={isSent}
          >
            {isSent ? (
              <>
                <SpinnerGap className="animate-spin" size={18} />
                Đang gửi...
              </>
            ) : (
              'Gửi mã xác nhận'
            )}
          </button>

          {/* Nút Quay lại đăng nhập */}
          <button
            type="button"
            onClick={handleBackToLogin}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            <ArrowLeft size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;
