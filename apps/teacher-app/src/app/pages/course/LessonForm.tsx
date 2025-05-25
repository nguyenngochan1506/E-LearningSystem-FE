import React, { useState, useRef, useEffect } from 'react';
import { Plus, ArrowLeft, BookOpen, FileText, FloppyDisk , X } from 'phosphor-react';
import { Lesson } from './types';
interface LessonFormProps {
  onBack: () => void;
  onSubmit: (lesson: Lesson) => void;
  initialLesson?: Lesson;
}

export function LessonForm({ onBack, onSubmit, initialLesson }: LessonFormProps) {
  const [title, setTitle] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const videoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialLesson) {
      setTitle(initialLesson.title);
      setVideoPreview(initialLesson.videoUrl || null);
      setContent(initialLesson.content);
    }
  }, [initialLesson]);

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      const previewUrl = URL.createObjectURL(file);
      setVideoPreview(previewUrl);
    }
  };

  const removeVideo = () => {
    setVideoFile(null);
    setVideoPreview(null);
    if (videoInputRef.current) {
      videoInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      onSubmit({ 
        title, 
        videoUrl: videoFile ? URL.createObjectURL(videoFile) : videoPreview || '', 
        content 
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleBack = () => {
    if (title || videoFile || content) {
      const confirmBack = window.confirm('⚠️ Thông tin bài học chưa được lưu, bạn có chắc muốn quay lại?');
      if (!confirmBack) return;
    }
    onBack();
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <button 
        onClick={handleBack} 
        className="text-indigo-600 hover:text-indigo-800 font-medium mb-4 flex items-center gap-1 transition"
      >
        <ArrowLeft size={18} />
        Quay lại
      </button>
      
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Plus className="text-emerald-600" size={24} />
        {initialLesson ? 'Chỉnh sửa bài học' : 'Thêm bài học mới'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-5">
          {/* Lesson Title */}
          <div className="relative">
            <label htmlFor="lessonTitle" className="block text-sm font-medium text-gray-700 mb-1">
              Tiêu đề bài học <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="lessonTitle"
                type="text"
                placeholder="Nhập tiêu đề bài học"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                required
              />
              <BookOpen className="absolute left-3 top-3.5 text-gray-400" size={18} />
            </div>
          </div>

          {/* Video Upload */}
          <div>
            <label htmlFor="video" className="block text-sm font-medium text-gray-700 mb-1">
              Video bài giảng
            </label>
            <div className="space-y-3">
              {videoPreview ? (
                <div className="relative">
                  <div className="w-full h-48 sm:h-64 md:h-80 bg-black rounded-lg flex items-center justify-center">
                    <video src={videoPreview} controls className="max-h-full max-w-full" />
                  </div>
                  <button
                    type="button"
                    onClick={removeVideo}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-400 transition">
                    <div className="flex flex-col items-center justify-center gap-2">
                    <video className="text-gray-400" width={48} height={48} />
                    <p className="text-sm text-gray-500">Kéo thả video vào đây hoặc click để chọn</p>
                    <input
                      id="video"
                      type="file"
                      ref={videoInputRef}
                      onChange={handleVideoUpload}
                      accept="video/mp4,video/mov,video/avi"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => videoInputRef.current?.click()}
                      className="mt-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-4 py-2 rounded-md text-sm font-medium transition"
                    >
                      Chọn video
                    </button>
                    </div>
                </div>
              )}
              <p className="text-xs text-gray-500">Định dạng hỗ trợ: MP4, MOV, AVI. Kích thước tối đa: 100MB</p>
            </div>
          </div>

          {/* Lesson Content */}
          <div>
            <label htmlFor="lessonContent" className="block text-sm font-medium text-gray-700 mb-1">
              Nội dung bài học
            </label>
            <div className="relative">
              <textarea
                id="lessonContent"
                placeholder="Nội dung chi tiết bài học..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
              <FileText className="absolute left-3 top-3.5 text-gray-400" size={18} />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70"
        >
          <FloppyDisk  size={18} />
          {isSubmitting ? 'Đang lưu...' : 'Lưu bài học'}
        </button>
      </form>
    </div>
  );}