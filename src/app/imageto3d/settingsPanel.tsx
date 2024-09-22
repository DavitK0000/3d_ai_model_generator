'use client'

import { UploadIcon, InfoIcon } from 'lucide-react'; // Adjust this according to your icon library
import { useState } from 'react';
import FileUpload from '@/components/FileUpload';
import ComboBox from '@/components/ui/combobox';
import { Button } from '@/components/ui/button';

// The SettingsPanel Component
const SettingsPanel = () => {
    const [selectedModel, setSelectedModel] = useState('');
    const items = [{
        value: "meshyai",
        label: "Meshy"
    },
    {
        value: "tripo3d",
        label: "Tripo3D"
    }];

    const handleModelChange = (value) => {
        setSelectedModel(value);
    };

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
                    <ComboBox items={items} placeholder="Choose an option" />
                </div>

                {/* File Upload */}
                <FileUpload
                    allowedTypes={['image/jpeg', 'image/png', 'image/jpg']}
                    maxSize={5 * 1024 * 1024} // 5MB
                    multiple={false}
                />

                {/* Add the button above the bottom div */}
                <Button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 mt-auto">
                    Generate Now
                </Button>

                {/* Bottom div fixed at the bottom */}
                <div style={{ textAlign: 'center', marginTop: "auto", fontSize: "14px", fontWeight: "bold" }}>
                    Estimated: 20 Sec | 35
                </div>
            </div>
        </div >
    );
};

export default SettingsPanel;
