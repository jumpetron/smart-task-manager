// src/app/api/gemini/route.ts
import { generateSubtasks } from '@/lib/gemini';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { taskTitle, taskDescription } = await request.json();
    
    if (!taskTitle) {
      return NextResponse.json(
        { error: 'Task title is required' },
        { status: 400 }
      );
    }

    const subtasks = await generateSubtasks(taskTitle, taskDescription);
    return NextResponse.json({ subtasks });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate subtasks' },
      { status: 500 }
    );
  }
}