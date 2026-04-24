"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { PageContainer } from '@/components/Layout/PageContainer';
import { Loading } from '@/components/ui/Loading';
import { Card } from '@/components/ui/Card';
import { StatsCard } from '@/components/ui/StatsCard';
import { ProgressBar } from '@/components/ui/ProgressBar';
import LessonCard from '@/components/LessonCard';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const response = await fetch('/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          router.push('/login');
          return;
        }

        const data = await response.json();
        setUser(data.user);
      } catch {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [router]);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  if (loading) {
    return <Loading />;
  }

  const progressStats = {
    lessonsCompleted: 3,
    totalLessons: 10,
    streakDays: 5,
    lastActivity: '2 天前'
  };

  const recentActivities = [
    { id: 1, type: '课程完成', name: '音符基础知识', date: '昨天' },
    { id: 2, type: '测验通过', name: '大调音阶识别', date: '3 天前' },
    { id: 3, type: '开始课程', name: '和弦进行理解', date: '5 天前' }
  ];

  return (
    <PageContainer
      title="欢迎回来，学习者！"
      description="继续您中断的音乐理论之旅。"
      user={user}
      onSignOut={handleSignOut}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="已完成课程"
          value={`${progressStats.lessonsCompleted}/${progressStats.totalLessons}`}
        />

        <StatsCard
          title="连续学习"
          value={`${progressStats.streakDays} 天`}
        />

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">学习进度</h3>
          <ProgressBar
            progress={(progressStats.lessonsCompleted / progressStats.totalLessons) * 100}
          />
        </div>

        <StatsCard
          title="最近活动"
          value={progressStats.lastActivity}
        />
      </div>

      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">继续学习</h3>
          <Link href="/lessons" className="text-amber-700 hover:text-amber-600 font-medium">
            查看所有课程
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <LessonCard lesson={{
            id: '1',
            title: '音乐记谱法简介',
            description: '学习读写音乐记谱法的基础知识',
            duration: 15
          }} />
        </div>
      </div>

      <div className="mb-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">最近活动</h3>

        <Card>
          <div className="divide-y divide-gray-200">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-amber-700">{activity.type}</span>
                    <h4 className="text-lg font-semibold text-gray-800">{activity.name}</h4>
                  </div>
                  <span className="text-sm text-gray-500">{activity.date}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-6">快速访问工具</h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              href: "/tools/ear-training",
              icon: <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>,
              title: "听力训练",
              description: "练习通过听觉识别音符、音程和和弦。"
            },
            {
              href: "/tools/metronome",
              icon: <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>,
              title: "节拍器",
              description: "使用可调节的节拍器工具保持节奏。"
            },
            {
              href: "/tools/chord-finder",
              icon: <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>,
              title: "和弦查找器",
              description: "发现和弦结构和排列方式。"
            },
            {
              href: "/tools/scale-explorer",
              icon: <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a2.5 2.5 0 015 0v6a2.5 2.5 0 010 5v6a2.5 2.5 0 11-5 0v-6a2.5 2.5 0 010-5z" />
              </svg>,
              title: "音阶探索",
              description: "学习和探索不同的音乐音阶。"
            },
          ].map((tool, index) => (
            <Link
              key={index}
              href={tool.href}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 mb-4">
                {tool.icon}
              </div>
              <h4 className="text-lg font-semibold text-gray-800">{tool.title}</h4>
              <p className="text-gray-600 mt-2">{tool.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
