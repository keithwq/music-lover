"use client";

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PageContainer } from '@/components/Layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Button, LinkButton } from '@/components/ui/Button';
import { Loading } from '@/components/ui/Loading';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { LessonContent } from '@/components/LessonContent';

interface LessonParams {
  params: Promise<{
    id: string;
  }>;
}

export default function LessonPage({ params }: LessonParams) {
  const { id } = use(params);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [lesson, setLesson] = useState<any>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getUserAndLesson = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        // Verify user
        const authResponse = await fetch('/api/auth/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!authResponse.ok) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          router.push('/login');
          return;
        }

        const authData = await authResponse.json();
        setUser(authData.user);

        // Fetch lesson content
        const lessonResponse = await fetch(`/api/lessons/${id}`);
        if (lessonResponse.ok) {
          const lessonData = await lessonResponse.json();
          setLesson(lessonData.lesson);

          // Load saved progress
          const progressResponse = await fetch(`/api/lessons/${id}/progress`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });

          if (progressResponse.ok) {
            const progressData = await progressResponse.json();
            if (progressData.lessonProgress) {
              setCurrentSection(progressData.lessonProgress.currentSection || 0);
              setProgress(progressData.lessonProgress.progress || 0);
              setIsCompleted(progressData.lessonProgress.completed || false);
            } else {
              setCurrentSection(0);
              setProgress(0);
            }
          } else {
            setCurrentSection(0);
            setProgress(0);
          }
        }
      } catch {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    getUserAndLesson();
  }, [router, id]);

  const saveProgress = async (newSection: number, newProgress: number, completed: boolean = false) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    setSaving(true);
    try {
      await fetch(`/api/lessons/${id}/progress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          progress: newProgress,
          currentSection: newSection,
          completed
        })
      });
    } catch (error) {
      console.error('Failed to save progress:', error);
    } finally {
      setSaving(false);
    }
  };

  const updateProgress = async (newSection: number, newProgress: number) => {
    setCurrentSection(newSection);
    setProgress(newProgress);
    await saveProgress(newSection, newProgress, isCompleted);
  };

  const handleNextSection = async () => {
    if (!lesson || !lesson.content) return;

    const totalSections = lesson.content.length || 1;
    const newSection = Math.min(currentSection + 1, totalSections - 1);
    const newProgress = Math.round((newSection / (totalSections - 1)) * 100);

    await updateProgress(newSection, newProgress);
  };

  const handlePreviousSection = async () => {
    if (!lesson) return;

    const newSection = Math.max(currentSection - 1, 0);
    const totalSections = lesson.content?.length || 1;
    const newProgress = Math.round((newSection / (totalSections - 1)) * 100);

    await updateProgress(newSection, newProgress);
  };

  const handleCompleteLesson = async () => {
    const totalSections = lesson.content?.length || 1;
    const finalProgress = 100;

    setSaving(true);
    await saveProgress(currentSection, finalProgress, true);
    setIsCompleted(true);
    setSaving(false);
    setShowCompletionModal(true);
  };

  const handleCloseModal = () => {
    setShowCompletionModal(false);
    router.push('/lessons');
  };

  if (loading) {
    return <Loading />;
  }

  if (!lesson) {
    return (
      <PageContainer
        title="课程未找到"
        description="无法找到您请求的课程。"
        user={user}
        showDashboardLink
      >
        <div className="text-center py-10">
          <p className="text-gray-600 mb-6">
            很抱歉，您要找的课程不存在或已被删除。
          </p>
          <LinkButton href="/lessons">
            返回课程
          </LinkButton>
        </div>
      </PageContainer>
    );
  }

  const currentContent = lesson.content?.[currentSection] || { title: '', body: '课程内容加载中...' };

  return (
    <PageContainer
      title={lesson.title}
      user={user}
      showDashboardLink
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-3">
          <Card>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-gray-600">
                  第 {currentSection + 1} 节，共 {lesson.content?.length || 1} 节
                </p>
                <div className="flex items-center gap-2">
                  {saving && (
                    <span className="text-xs text-gray-400">保存中...</span>
                  )}
                  {isCompleted && (
                    <span className="text-xs text-green-600 font-medium">✓ 已完成</span>
                  )}
                  <p className="text-sm text-gray-600">
                    {progress}% 完成
                  </p>
                </div>
              </div>
              <ProgressBar progress={progress} height="sm" showPercentage={false} />
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              {currentContent.title}
            </h3>

            <div className="text-gray-800 text-lg leading-relaxed mb-8">
              <LessonContent content={currentContent.body} />
            </div>

            <div className="flex justify-between mt-8">
              <Button
                onClick={handlePreviousSection}
                disabled={currentSection === 0}
                variant={currentSection === 0 ? "outline" : "secondary"}
              >
                上一节
              </Button>

              {currentSection < (lesson.content?.length - 1) ? (
                <Button onClick={handleNextSection}>
                  下一节
                </Button>
              ) : (
                <Button onClick={handleCompleteLesson} disabled={isCompleted}>
                  {isCompleted ? '已完成' : '完成课程'}
                </Button>
              )}
            </div>
          </Card>
        </div>

        <div>
          <div className="sticky top-6">
            <Card>
              <h3 className="text-lg font-bold text-gray-800 mb-4">课程大纲</h3>

              <ul className="space-y-2">
                {lesson.content?.map((section: any, index: number) => (
                  <li key={index}>
                    <button
                      className={`w-full text-left px-3 py-2 rounded-lg transition flex items-center gap-2 ${
                        index === currentSection
                          ? 'bg-amber-100 text-amber-800 font-medium'
                          : index < currentSection || isCompleted
                            ? 'text-green-700 hover:bg-green-50'
                            : 'text-gray-600 hover:bg-gray-100'
                      }`}
                      onClick={async () => {
                        const totalSections = lesson.content.length;
                        const newProgress = Math.round((index / (totalSections - 1)) * 100);
                        await updateProgress(index, newProgress);
                      }}
                    >
                      {(index < currentSection || isCompleted) && (
                        <span className="text-green-600 text-xs">✓</span>
                      )}
                      {section.title}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-700 mb-2">
                  {lesson.duration} 分钟课程
                </h4>
                {isCompleted && (
                  <div className="mt-2 p-2 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-700 font-medium">
                      🎉 恭喜！您已完成此课程
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Completion Modal */}
      {showCompletionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              恭喜完成课程！
            </h2>
            <p className="text-gray-600 mb-6">
              您已成功完成「{lesson.title}」课程的学习。继续加油！
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={handleCloseModal}>
                返回课程列表
              </Button>
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
}
