const Footer = () => {
  return (
    <footer className="bg-white text-gray-600 p-4 text-center">
      <div className="flex justify-center space-x-8 mb-4">
        <div>
          <h3 className="font-bold">Ứng dụng</h3>
          <p className="text-gray-500">Nền tảng học tập trực tuyến</p>
        </div>
        <div>
          <h3 className="font-bold">Liên kết nhân</h3>
          <p>Về chúng tôi</p>
          <p>Blog</p>
        </div>
        <div>
          <h3 className="font-bold">Hỗ trợ</h3>
          <p>FAQ</p>
          <p>Liên hệ</p>
        </div>
        <div>
          <h3 className="font-bold">MXH</h3>
          <div className="flex space-x-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.732 0 1.325-.593 1.325-1.324V1.325C24 .593 23.407 0 22.675 0z" />
              </svg>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 9.71 0 12 0 12s0 2.29.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 14.29 24 12 24 12s0-2.29-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <p className="text-sm">© 2024 Ứng dụng</p>
    </footer>
  );
};

export default Footer;
