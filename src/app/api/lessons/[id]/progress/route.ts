import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

export const dynamic = 'force-dynamic';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: lessonId } = await params;
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { userId: string };
    const { progress, currentSection, completed } = await request.json();

    const prisma = new PrismaClient();

    // Upsert lesson progress
    const lessonProgress = await prisma.lessonProgress.upsert({
      where: {
        userId_lessonId: {
          userId: decoded.userId,
          lessonId: lessonId,
        },
      },
      update: {
        progress,
        currentSection,
        completed,
        updatedAt: new Date(),
      },
      create: {
        userId: decoded.userId,
        lessonId: lessonId,
        progress,
        currentSection,
        completed,
      },
    });

    return NextResponse.json({ lessonProgress });
  } catch (error) {
    console.error('Error saving progress:', error);
    return NextResponse.json(
      { message: 'Failed to save progress' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: lessonId } = await params;
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { userId: string };

    const prisma = new PrismaClient();

    const lessonProgress = await prisma.lessonProgress.findUnique({
      where: {
        userId_lessonId: {
          userId: decoded.userId,
          lessonId: lessonId,
        },
      },
    });

    return NextResponse.json({ lessonProgress });
  } catch (error) {
    console.error('Error fetching progress:', error);
    return NextResponse.json(
      { message: 'Failed to fetch progress' },
      { status: 500 }
    );
  }
}
