'use client'

import { Button } from '@/components/ui/button';
import { useDropzone } from 'react-dropzone';
import { UploadIcon, XIcon } from 'lucide-react'; // Adjust this to match your icon library
import { useCallback, useState } from 'react';

const FileUpload = ({ allowedTypes = ['image/jpeg', 'image/png'], maxSize = 5 * 1024 * 1024, multiple = false, onFilesChange }) => {
    const [files, setFiles] = useState<Array<File>>([]); // Track multiple files
    const [highlight, setHighlight] = useState(false);

    // File drop handler
    const onDrop = useCallback((acceptedFiles: Array<File>) => {
        const mappedFiles = acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        }));
        const newFiles = [...files, ...mappedFiles];
        setFiles(newFiles); // Add new files
        setHighlight(false); // Reset highlight

        // Call parent callback to notify about file changes
        onFilesChange(newFiles);
    }, []);

    // Remove file handler
    const removeFile = (fileName: String) => {
        setFiles((prevFiles) => prevFiles.filter(file => file.name !== fileName));
    };

    // Dropzone hook configuration
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: allowedTypes.join(','),
        maxSize,
        multiple,
        onDragEnter: () => setHighlight(true),
        onDragLeave: () => setHighlight(false),
        onDropAccepted: () => setHighlight(false),
        onDropRejected: () => setHighlight(false),
    });

    return (
        <div>
            {/* Dropzone area */}
            <div
                {...getRootProps()}
                style={{
                    border: highlight ? '2px solid #4A90E2' : '2px dashed #ccc',
                    borderRadius: '8px',
                    padding: '24px',
                    textAlign: 'center',
                    position: 'relative',
                    backgroundColor: highlight ? '#eaf5ff' : '#1F2937',
                    transition: 'border 0.3s ease, background-color 0.3s ease',
                    cursor: 'pointer',
                }}
            >
                <input {...getInputProps()} />

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <UploadIcon size={32} style={{ marginBottom: '12px' }} />
                    <p style={{ fontSize: '16px', fontWeight: 'bold', margin: '4px 0' }}>Upload Image</p>
                    <p style={{ fontSize: '12px', color: '#888' }}>JPG and PNG formats, up to 5MB</p>
                    <Button variant="outline" style={{ marginTop: '12px' }}>Browse File</Button>
                </div>
            </div>

            {/* Display thumbnails if images are uploaded */}
            {files.length > 0 && (
                <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {files.map((file) => (
                        <div key={file.name} style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                            {/* Thumbnail */}
                            <img
                                src={file.preview}
                                alt="Preview"
                                style={{ maxHeight: '150px', borderRadius: '8px', marginRight: '8px' }}
                            />

                            {/* Delete button */}
                            <button
                                onClick={() => removeFile(file.name)}
                                style={{
                                    position: 'absolute',
                                    top: '4px',
                                    right: '4px',
                                    background: 'red',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '24px',
                                    height: '24px',
                                    color: '#fff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                }}
                            >
                                <XIcon size={16} /> {/* Replace with your close icon */}
                            </button>

                            {/* File name */}
                            <p style={{ fontSize: '14px', fontWeight: 'bold', marginLeft: '12px' }}>{file.name}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
export default FileUpload;
