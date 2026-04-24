import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const prisma = new PrismaClient();

    const lesson = await prisma.lesson.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    if (!lesson) {
      return NextResponse.json(
        { message: 'Lesson not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      lesson: {
        id: lesson.id,
        title: lesson.title,
        description: lesson.description,
        duration: lesson.duration,
        orderNumber: lesson.orderNumber,
        category: lesson.category.name,
        content: lesson.content,
      },
    });
  } catch (error) {
    console.error('Error fetching lesson:', error);
    return NextResponse.json(
      { message: 'Failed to fetch lesson' },
      { status: 500 }
    );
  }
}
