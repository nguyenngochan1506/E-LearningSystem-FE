
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
      // TODO: Gửi request thực tới backend sau khi tích hợp
      // await axios.post('/api/auth/forgot-password', { email });

      setIsSent(true);
      setTimeout(() => {
        navigate('/verify-otp', { state: { email } }); // chuyển sang trang nhập OTP
      }, 1500);
    } catch (err) {
      setError('Email không tồn tại trong hệ thống.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">
          Quên mật khẩu
        </h2>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Nhập email đã đăng ký"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            className="btn btn-primary w-full"
            onClick={handleSendOtp}
            disabled={isSent}
          >
            {isSent ? 'Đang gửi...' : 'Gửi mã xác nhận'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
