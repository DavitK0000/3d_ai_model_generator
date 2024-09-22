// src/app/api/upload/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
    try {
        const body = await request.json() // Get the FormData from the request
        const response = await axios.post(
            'https://api.tripo3d.ai/v2/openapi/task',
            body,
            {
                headers: {
                    'Authorization': 'Bearer tsk_yAJCkGuJyM40QZoo2VwoeoggZHyluEc1tVdzOkRzAO0',
                    'Content-Type' : 'application/json'
                },
            }
        );

        return NextResponse.json(response.data, { status: response.status });
    } catch (error) {
        console.log(error)
        const axiosError = error as { response?: { status: number; data: any } };
        return NextResponse.json(axiosError.response?.data || { message: 'Internal Server Error' }, {
            status: axiosError.response?.status || 500,
        });
    }
}
