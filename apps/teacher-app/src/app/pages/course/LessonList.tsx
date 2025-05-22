import { Lesson } from './types';

export function LessonList({ lessons }: { lessons: Lesson[] }) {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-2">Danh sách bài học đã thêm</h3>
      <ul className="list-disc pl-6 space-y-1">
        {lessons.map((l, idx) => <li key={idx}>{l.title}</li>)}
      </ul>
    </div>
  );
}
