// components/LoadingScreen.tsx

import React from 'react';

interface LoadingScreenProps {
    loadingPercentage: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ loadingPercentage }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
            <div className="flex flex-col items-center">
                {/* Loading Animation (you can replace this with your own) */}
                <div className="loader mb-4"></div>
                <div className="text-white text-2xl">
                    Loading... {loadingPercentage}%
                </div>
            </div>

            <style jsx>{`
                .loader {
                    border: 8px solid rgba(255, 255, 255, 0.3);
                    border-left-color: #ffffff;
                    border-radius: 50%;
                    width: 64px;
                    height: 64px;
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    to {
                        transform: rotate(360deg);
                    }
                }`
            }</style>
        </div>
    );
};

export default LoadingScreen;
