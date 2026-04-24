"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PageContainer } from '@/components/Layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Loading } from '@/components/ui/Loading';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import Link from 'next/link';

interface Lesson {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: number;
  difficulty: string;
  progress?: number;
  completed?: boolean;
}

export default function LessonsPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [progressMap, setProgressMap] = useState<Map<string, { progress: number; completed: boolean }>>(new Map());
  const router = useRouter();

  useEffect(() => {
    const getUserAndLessons = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        // Verify user
        const response = await fetch('/api/auth/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          router.push('/login');
          return;
        }

        const data = await response.json();
        setUser(data.user);

        // Fetch lessons
        const lessonsRes = await fetch('/api/lessons');
        if (lessonsRes.ok) {
          const lessonsData = await lessonsRes.json();
          setLessons(lessonsData.lessons || []);
          setCategories(lessonsData.categories || []);

          // Fetch all lesson progress
          const progressPromises = lessonsData.lessons.map(async (lesson: Lesson) => {
            try {
              const progressRes = await fetch(`/api/lessons/${lesson.id}/progress`, {
                headers: { 'Authorization': `Bearer ${token}` }
              });
              if (progressRes.ok) {
                const progressData = await progressRes.json();
                if (progressData.lessonProgress) {
                  return {
                    lessonId: lesson.id,
                    progress: progressData.lessonProgress.progress,
                    completed: progressData.lessonProgress.completed
                  };
                }
              }
            } catch {
              // Ignore errors for individual lessons
            }
            return null;
          });

          const progressResults = await Promise.all(progressPromises);
          const newProgressMap = new Map();
          progressResults.forEach(result => {
            if (result) {
              newProgressMap.set(result.lessonId, {
                progress: result.progress,
                completed: result.completed
              });
            }
          });
          setProgressMap(newProgressMap);
        }
      } catch {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    getUserAndLessons();
  }, [router]);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  if (loading) {
    return <Loading />;
  }

  const filteredLessons = selectedCategory === 'all'
    ? lessons
    : lessons.filter((lesson: Lesson) => lesson.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '初级';
      case 'intermediate': return '中级';
      case 'advanced': return '高级';
      default: return difficulty;
    }
  };

  return (
    <PageContainer
      title="音乐理论课程"
      description="探索我们全面的音乐理论课程体系。"
      user={user}
      onSignOut={handleSignOut}
    >
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-700 mb-3">课程分类</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === 'all' ? 'primary' : 'outline'}
            onClick={() => setSelectedCategory('all')}
          >
            全部课程
          </Button>
          {Array.from(new Set(categories)).map((category: string) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'primary' : 'outline'}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredLessons.length > 0 ? (
          filteredLessons.map((lesson: Lesson) => {
            const progressData = progressMap.get(lesson.id);
            const progress = progressData?.progress || 0;
            const isCompleted = progressData?.completed || false;

            return (
              <Card key={lesson.id} className="flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(lesson.difficulty)}`}>
                    {getDifficultyText(lesson.difficulty)}
                  </span>
                  {isCompleted && (
                    <span className="text-green-600 text-lg" title="已完成">✓</span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {lesson.title}
                </h3>

                <p className="text-gray-600 mb-4 flex-grow">
                  {lesson.description}
                </p>

                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-500 mb-1">
                    <span>{lesson.duration} 分钟</span>
                    <span>{progress}% 完成</span>
                  </div>
                  <ProgressBar progress={progress} height="sm" showPercentage={false} />
                </div>

                <Link
                  href={`/lessons/${lesson.id}`}
                  className={`w-full text-center py-2 px-4 rounded-lg font-medium transition ${
                    isCompleted
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : progress > 0
                        ? 'bg-amber-600 text-white hover:bg-amber-700'
                        : 'bg-gray-800 text-white hover:bg-gray-900'
                  }`}
                >
                  {isCompleted ? '重新学习' : progress > 0 ? '继续学习' : '开始学习'}
                </Link>
              </Card>
            );
          })
        ) : (
          <div className="md:col-span-3 text-center p-8">
            <p className="text-gray-600">该分类下暂无课程。</p>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
