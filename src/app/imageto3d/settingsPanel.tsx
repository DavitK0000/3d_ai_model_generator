'use client'

import { UploadIcon, InfoIcon } from 'lucide-react'; // Adjust this according to your icon library
import { useState } from 'react';
import FileUpload from '@/components/FileUpload';
import ComboBox from '@/components/ui/combobox';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useSelector } from 'react-redux';
import store from '@/app/store/store';
import { RootState } from '@react-three/fiber';
import axios, { AxiosError } from 'axios';

// The SettingsPanel Component
const SettingsPanel = ({ onSubmit }) => {
    const [selectedModel, setSelectedModel] = useState<string>('');
    const [uploadedFiles, setUploadedFiles] = useState<Array<File>>([]);
    const { toast } = useToast();

    const apiKey = useSelector((state: RootState) => state.api.tripoApiKey);
    const clientId = useSelector((state: RootState) => state.api.tripoClientId);

    const items = [{
        value: "meshyai",
        label: "Meshy"
    },
    {
        value: "tripo3d",
        label: "Tripo3D"
    }];

    const handleModelChange = (value: string) => {
        setSelectedModel(value);
    };

    // Callback to handle the uploaded files from the FileUpload component
    const handleFilesChange = (files: Array<File>) => {
        setUploadedFiles(files);
    };

    const generate3DModel = async () => {
        if (uploadedFiles.length < 1) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "You should upload image.",
            })
            return;
        }

        // Get selected model
        if (selectedModel == 'meshyai') {
            // MeshAI Model Generation
        } else if (selectedModel == 'tripo3d') {
            // Tripo3D Model Generation

            // 1. Upload image to the tripo.ai
            const imageFile = uploadedFiles[0];
            const formData = new FormData();
            formData.append("file", imageFile, imageFile.name);

            const settings = {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                },
                body: formData,
            };

            var imageToken = '';

            try {
                const response = await axios.post("/api/upload", formData, {
                    headers: {
                        "Authorization": "Bearer tsk_yAJCkGuJyM40QZoo2VwoeoggZHyluEc1tVdzOkRzAO0",
                        "Content-Type": "multipart/form-data",
                    },
                });
                imageToken = response.data.data.image_token;
            } catch (error) {
                const axiosError = error as AxiosError;
                console.error('Error:', axiosError.response ? axiosError.response.data : axiosError.message);
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: axiosError.message,
                })
                return;
            }

            onSubmit(imageToken); // Call the passed function
        }
        else {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Please select the model...",
            })
            return;
        }
    }

    return (
        <div className={`h-screen bg-gray-800 text-white transition-all duration-300 flex flex-col justify-between`}>
            <div className='p-4' style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                {/* Top Title */}
                <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>Generation Settings</h2>
                <hr style={{ margin: '12px 0' }} />

                {/* Model Selection */}
                <div style={{ marginBottom: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <p style={{ fontSize: '16px' }}>Select AI Model</p>
                        <InfoIcon style={{ cursor: 'pointer' }} /> {/* Info icon on the right */}
                    </div>
                    <ComboBox items={items} placeholder="Choose an option" value={selectedModel} onChange={handleModelChange} />
                </div>

                {/* File Upload */}
                <FileUpload
                    allowedTypes={['image/jpeg', 'image/png', 'image/jpg']}
                    maxSize={5 * 1024 * 1024} // 5MB
                    multiple={false}
                    onFilesChange={handleFilesChange} // Pass the callback to FileUpload component
                />

                <div style={{ textAlign: 'center', marginTop: "auto" }}>
                    {/* Add the button above the bottom div */}
                    <Button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-9 px-4 py-2 w-full mb-8" variant="outline" onClick={() => generate3DModel()}>
                        Generate Now
                    </Button>

                    {/* Bottom div fixed at the bottom */}
                    <div style={{ textAlign: 'center', marginTop: "auto", fontSize: "14px", fontWeight: "bold" }}>
                        Estimated: 20 Sec | 35
                    </div>
                </div>
            </div>
        </div >
    );
};

export default SettingsPanel;
