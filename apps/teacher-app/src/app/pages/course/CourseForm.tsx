import { useState, useEffect, useRef } from 'react';
import { Plus, BookOpen, Money, List, FileText, FloppyDisk, Upload, X } from 'phosphor-react';
import { Course } from './types';

interface CourseFormProps {
  course: Course;
  onCourseChange: (course: Course) => void;
  onAddLessonClick: () => void;
}

export default function CourseForm({ course, onCourseChange, onAddLessonClick }: CourseFormProps) {
  const [localCourse, setLocalCourse] = useState(course);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const handleChange = (field: keyof Course, value: any) => {
    setLocalCourse((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      
      // You would typically upload the file to your server here
      // and then set the returned URL to localCourse.image
      // For now, we'll just store the file object
      handleChange('image', file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    handleChange('image', '');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Here you would actually upload the files to your server
      // and get the URLs before saving the course
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API call
      onCourseChange(localCourse);
      console.log('Submit course data:', localCourse);
      alert('✅ Thông tin khóa học đã được lưu thành công');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <BookOpen className="text-indigo-600" size={28} />
        {course.title ? course.title : 'Tạo khóa học mới'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-5">
          {/* Course Title */}
          <div className="relative">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Tên khóa học <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="title"
                type="text"
                placeholder="Nhập tên khóa học"
                value={localCourse.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                required
              />
              <BookOpen className="absolute left-3 top-3.5 text-gray-400" size={18} />
            </div>
          </div>

          {/* Course Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Mô tả khóa học
            </label>
            <div className="relative">
              <textarea
                id="description"
                placeholder="Mô tả chi tiết về khóa học..."
                value={localCourse.description}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={4}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
              <FileText className="absolute left-3 top-3.5 text-gray-400" size={18} />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
              Ảnh đại diện
            </label>
            <div className="space-y-3">
              {imagePreview ? (
                <div className="relative">
                  <img 
                    src={imagePreview} 
                    alt="Course preview" 
                    className="w-full h-48 object-cover rounded-lg border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-400 transition">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Upload className="text-gray-400" size={24} />
                    <p className="text-sm text-gray-500">Kéo thả ảnh vào đây hoặc click để chọn</p>
                    <input
                      id="image"
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="mt-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-4 py-2 rounded-md text-sm font-medium transition"
                    >
                      Chọn ảnh
                    </button>
                  </div>
                </div>
              )}
              <p className="text-xs text-gray-500">Định dạng hỗ trợ: JPG, PNG, GIF. Kích thước tối đa: 5MB</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Price */}
            <div className="relative">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Giá khóa học (VND)
              </label>
              <div className="relative">
                <input
                  id="price"
                  type="number"
                  placeholder="0"
                  value={localCourse.price || ''}
                  onChange={(e) => handleChange('price', parseFloat(e.target.value) || 0)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                />
                <Money className="absolute left-3 top-3.5 text-gray-400" size={18} />
              </div>
            </div>

            {/* Category */}
            <div className="relative">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Danh mục
              </label>
              <div className="relative">
                <input
                  id="category"
                  type="text"
                  placeholder="Ví dụ: Lập trình, Thiết kế..."
                  value={localCourse.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                />
                <List className="absolute left-3 top-3.5 text-gray-400" size={18} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70"
          >
            <FloppyDisk size={18} />
            {isSubmitting ? 'Đang lưu...' : 'Lưu khóa học'}
          </button>

          <button
            type="button"
            onClick={onAddLessonClick}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            Thêm bài học
          </button>
        </div>
      </form>

      {localCourse.lessons.length > 0 && (
        <div className="mt-8 border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <List size={20} />
            Danh sách bài học ({localCourse.lessons.length})
          </h3>
          <ul className="space-y-2">
            {localCourse.lessons.map((lesson, idx) => (
              <li key={idx} className="bg-gray-50 hover:bg-gray-100 p-3 rounded-lg border border-gray-200 transition">
                <div className="flex items-center gap-3">
                  <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium">
                    {idx + 1}
                  </span>
                  <span className="font-medium text-gray-800">{lesson.title}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );}