import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const prisma = new PrismaClient();

    const lessons = await prisma.lesson.findMany({
      include: {
        category: true,
      },
      orderBy: {
        orderNumber: 'asc',
      },
    });

    const categories = await prisma.lessonCategory.findMany({
      orderBy: {
        orderNumber: 'asc',
      },
    });

    const formattedLessons = lessons.map((lesson) => ({
      id: lesson.id,
      title: lesson.title,
      description: lesson.description,
      duration: lesson.duration,
      orderNumber: lesson.orderNumber,
      category: lesson.category.name,
      categoryId: lesson.categoryId,
    }));

    const formattedCategories = categories.map((cat) => cat.name);

    return NextResponse.json({
      lessons: formattedLessons,
      categories: formattedCategories,
    });
  } catch (error) {
    console.error('Error fetching lessons:', error);
    return NextResponse.json(
      { message: 'Failed to fetch lessons' },
      { status: 500 }
    );
  }
}
