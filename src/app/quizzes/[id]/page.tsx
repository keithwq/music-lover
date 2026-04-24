"use client";

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { PageContainer } from '@/components/Layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Loading } from '@/components/ui/Loading';

interface QuizParams {
  params: Promise<{
    id: string;
  }>;
}

export default function QuizPage({ params }: QuizParams) {
  const { id } = use(params);
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

  if (loading) {
    return <Loading />;
  }

  return (
    <PageContainer
      title="测验"
      description={`测验 ID: ${id}`}
      user={user}
      showDashboardLink
    >
      <Card>
        <p className="text-gray-600">测验功能正在开发中...</p>
      </Card>
    </PageContainer>
  );
}
