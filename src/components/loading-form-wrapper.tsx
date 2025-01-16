"use client";

import React, { ReactNode } from 'react';

interface LoadingFormWrapperProps {
    children: ReactNode;
    isLoading: boolean;
}

const LoadingFormWrapper: React.FC<LoadingFormWrapperProps> = ({
    children,
    isLoading
}) => {
    return (
        <div className="relative rounded-lg p-6">
            {/* Animated border overlay */}
            <div
                className={`absolute inset-0 rounded-lg transition-opacity duration-300 ${isLoading ? 'opacity-100' : 'opacity-0'
                    }`}
            >
                <div
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 animate-gradient-x"
                    aria-hidden="true"
                />
                <div
                    className="absolute inset-[2px] rounded-lg bg-white"
                    aria-hidden="true"
                />
            </div>

            {/* Form content */}
            <div
                className={`relative ${isLoading ? 'opacity-75' : 'opacity-100'}`}
                aria-busy={isLoading}
            >
                {children}
            </div>
        </div>
    );
};

export default LoadingFormWrapper;