'use client'

import ThreeScene from "@/components/threeScene";
import Sidebar from "@/components/sidebar";
import SettingsPanel from '@/app/imageto3d/settingsPanel'
import { useState } from 'react';
import axios from 'axios';
import LoadingScreen from "@/components/LoadingScreen";
import { useToast } from "@/hooks/use-toast";

export default function Home() {

    const [loading, setLoading] = useState(false);
    const [loadingPercentage, setLoadingPercentage] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();
    const [modelUrl, setModelUrl] = useState<string | null>(null); // State to hold model URL

    const handleImageToModel = async (fileToken: string) => {
        setLoading(true);
        setError(null);
        setLoadingPercentage(0);
        console.log(fileToken);

        try {
            // First API call to initiate the task
            const response = await axios.post('/api/task', JSON.stringify({
                type: 'image_to_model',
                file: {
                    type: 'png',
                    file_token: fileToken,
                },
            }));

            const data = response.data;
            if (data.code !== 0) {
                throw new Error('Failed to initiate task');
            }

            const taskId = data.data.task_id;
            await pollForProgress(taskId);
        } catch (err) {
            // Check if the error is an Axios error
            const errorMessage = axios.isAxiosError(err) && err.response ? err.response.data : 'An error occurred';
            setError(errorMessage);
            setLoading(false);
        }
    };

    // const handleImageToModelTest = async (fileToken: string) => {
    //     setLoading(true);
    //     setError(null);
    //     setLoadingPercentage(0);
    //     setModelUrl(null); // Reset model URL

    //     // Simulate task completion with hardcoded URL
    //     const simulatedModelUrl = 'https://tripo-data.cdn.bcebos.com/tcli_ecf78bb535bd479fb8fd3fbc6324e0f7/20240922/ea23bd76-275c-4c1d-ba53-d9577c3488dc/tripo_draft_ea23bd76-275c-4c1d-ba53-d9577c3488dc.glb?auth_key=1727022205-bKemzfHs-0-e80c9fdd9b14b7da615057a471f4a1c3'; // Hardcoded GLB URL

    //     // Simulate loading process
    //     try {
    //         setLoadingPercentage(0);
    //         const loadingInterval = setInterval(() => {
    //             setLoadingPercentage((prev) => {
    //                 if (prev >= 100) {
    //                     clearInterval(loadingInterval);
    //                     setLoading(false);
    //                     downloadModel('glb', simulatedModelUrl); // Start downloading the model
    //                     return 100;
    //                 }
    //                 return prev + 10; // Increase percentage by 10
    //             });
    //         }, 300); // Simulate loading every 300 ms

    //     } catch (err) {
    //         setLoading(false);
    //         const errorMessage = 'Simulated error during loading'; // Simulated error
    //         setError(errorMessage);
    //         toast({
    //             variant: "destructive",
    //             title: "Error",
    //             description: errorMessage,
    //         });
    //     }
    // };

    const downloadModel = async (type: string, url: string) => {
        try {
            const response = await axios.get(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36'
                },
                responseType: 'blob'
            });
            const blob = new Blob([response.data], { type: type === 'glb' ? 'model/gltf-binary' : 'model/fbx' });
            const modelUrl = URL.createObjectURL(blob); // Create URL for the blob
            console.log(modelUrl);
            setModelUrl(modelUrl); // Set the model URL state
        } catch (err) {
            const errorMessage = axios.isAxiosError(err) && err.response ? err.response.data : 'Error downloading model';
            setError(errorMessage);
            console.log(error);
            toast({
                variant: "destructive",
                title: "Error",
                description: errorMessage,
            });
        }
    };

    const pollForProgress = async (taskId: string) => {
        let isPolling = true;

        const poll = async () => {
            try {
                const response = await axios.get(`/api/polling/${taskId}`, {
                    headers: {
                        'Authorization': 'Bearer tsk_yAJCkGuJyM40QZoo2VwoeoggZHyluEc1tVdzOkRzAO0',
                    }
                });
                const data = response.data;

                // Handle the progress
                if (data.data) {
                    const { progress, status, result } = data.data;
                    setLoadingPercentage(progress);

                    // Check status
                    if (status === 'success') {
                        isPolling = false;
                        setLoading(false);
                        if (result && result.model) {
                            const { type, url } = result.model;
                            await downloadModel(type, url);
                        }
                    } else if (status === 'failed' || status === 'cancelled') {
                        isPolling = false;
                        setError(`Task ${status}`);

                        // Display status toast
                        toast({
                            variant: "destructive",
                            title: "Error",
                            description: `Task ${status}`,
                        });
                    }
                }
            } catch (err) {
                console.log(err);
                isPolling = false;
                const errorMessage = axios.isAxiosError(err) && err.response ? err.response.data : 'Error fetching progress';
                setError(errorMessage);
                setLoading(false);
                // Display error toast
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: errorMessage,
                });
            }
        };

        while (isPolling) {
            await poll(); // Wait for the poll function to complete
            await new Promise(resolve => setTimeout(resolve, 200)); // Wait for at least 200 milliseconds
        }
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>

            <div style={{ width: '250px', backgroundColor: '#f0f0f0' }}>
                <Sidebar></Sidebar>
            </div>
            <div style={{ flex: 1 }}>
                <ThreeScene modelUrl={modelUrl} ></ThreeScene>
            </div>

            {/* Settings Panel */}
            <div style={{ width: '300px', backgroundColor: '#f0f0f0' }}>
                <SettingsPanel onSubmit={handleImageToModel} />
            </div>
            {loading && <LoadingScreen loadingPercentage={loadingPercentage} />}
        </div>
    );
}
