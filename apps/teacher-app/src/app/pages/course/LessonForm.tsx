import { useState } from 'react';

interface LessonFormProps {
  onBack: () => void;
  onSubmit: (lesson: { title: string; videoUrl: string; content: string }) => void;
}

export default function LessonForm({ onBack, onSubmit }: LessonFormProps) {
  const [title, setTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, videoUrl, content });
  };

  const handleBack = () => {
    if (title || videoUrl || content) {
      const confirmBack = window.confirm('⚠️ Thông tin bài học chưa được lưu, bạn có chắc muốn quay lại?');
      if (!confirmBack) return;
    }
    onBack();
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded shadow">
      <button onClick={handleBack} className="text-blue-600 underline mb-4">← Quay lại</button>
      <h2 className="text-xl font-bold mb-4">Thêm bài học mới</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Tiêu đề bài học"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Link video"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Nội dung bài học"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow"
        >
          Lưu bài học
        </button>
      </form>
    </div>
  );
}
