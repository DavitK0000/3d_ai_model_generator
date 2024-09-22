import { NextResponse } from 'next/server';

export async function GET() {
    // Handle getting all tasks, etc.
    return NextResponse.json({ message: 'List of tasks' });
}
