import { Link } from 'react-router-dom';

const Slider = () => {
  return (
    <div className="carousel w-full">
      <div id="slide1" className="carousel-item relative w-full">
        <img
          src="https://placehold.co/1200x400?text=Hero+Image+1"
          className="w-full"
          alt="slide 1"
        />
        <div className="hero-overlay bg-opacity-60 absolute inset-0"></div>
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide4" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide2" className="btn btn-circle">
            ❯
          </a>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Học mọi lúc, mọi nơi</h1>
            <p className="mb-5">
              Tham gia các khóa học trực tuyến chất lượng cao để nâng cao kỹ
              năng của bạn!
            </p>
            <Link to="/courses" className="btn btn-primary">
              Khám phá ngay
            </Link>
          </div>
        </div>
      </div>
      <div id="slide2" className="carousel-item relative w-full">
        <img
          src="https://placehold.co/1200x400?text=Hero+Image+2"
          className="w-full"
          alt="slide 2"
        />
        <div className="hero-overlay bg-opacity-60 absolute inset-0"></div>
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide1" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide3" className="btn btn-circle">
            ❯
          </a>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Khóa học đa dạng</h1>
            <p className="mb-5">
              Khám phá hàng trăm khóa học từ cơ bản đến nâng cao!
            </p>
            <Link to="/courses" className="btn btn-primary">
              Khám phá ngay
            </Link>
          </div>
        </div>
      </div>
      <div id="slide3" className="carousel-item relative w-full">
        <img
          src="https://placehold.co/1200x400?text=Hero+Image+3"
          className="w-full"
          alt="slide 3"
        />
        <div className="hero-overlay bg-opacity-60 absolute inset-0"></div>
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide2" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide4" className="btn btn-circle">
            ❯
          </a>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Học mọi lúc, mọi nơi</h1>
            <p className="mb-5">
              Tham gia các khóa học trực tuyến chất lượng cao để nâng cao kỹ
              năng của bạn!
            </p>
            <Link to="/courses" className="btn btn-primary">
              Khám phá ngay
            </Link>
          </div>
        </div>
      </div>
      <div id="slide4" className="carousel-item relative w-full">
        <img
          src="https://placehold.co/1200x400?text=Hero+Image+4"
          className="w-full"
          alt="slide 4"
        />
        <div className="hero-overlay bg-opacity-60 absolute inset-0"></div>
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide3" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide1" className="btn btn-circle">
            ❯
          </a>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Học cùng cộng đồng</h1>
            <p className="mb-5">
              Kết nối với hàng ngàn học viên trên toàn thế giới!
            </p>
            <Link to="/courses" className="btn btn-primary">
              Khám phá ngay
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
