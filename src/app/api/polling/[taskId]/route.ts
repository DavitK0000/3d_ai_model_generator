// src/app/api/upload/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request, { params }: { params: { taskId: string } }) {
    // Access headers from the incoming request
    const { taskId } = params; // Extract the dynamic taskId from the URL

    const headers = request.headers;

    // Example of getting a specific header
    const authHeader = headers.get('Authorization'); // Get the Authorization header

    // Log the headers or do something with them
    console.log('Request Headers:', Object.fromEntries(headers.entries())); // Convert headers to an object for easier logging

    // Check for a specific header (optional)
    if (!authHeader) {
        return NextResponse.json({ message: 'Authorization header is required' }, { status: 401 });
    }

    try {
        // You could use the Authorization header for an API call, for example
        const response = await axios.get(`https://api.tripo3d.ai/v2/openapi/task/${taskId}`, {
            headers: {
                'Authorization': authHeader, // Forward the Authorization header
            },
        });

        return NextResponse.json(response.data, { status: response.status });
    } catch (error) {
        console.error(error);
        const axiosError = error as { response?: { status: number; data: Object } };
        return NextResponse.json(axiosError.response?.data || { message: 'Internal Server Error' }, {
            status: axiosError.response?.status || 500,
        });
    }
}
