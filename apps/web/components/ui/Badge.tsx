import React from 'react';

type BadgeProps = {
    children: React.ReactNode;
    variant?: 'default' | 'success' | 'warning' | 'error' | 'neutral';
    className?: string;
};

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
    const variants = {
        default: 'bg-blue-50 text-blue-700 ring-blue-600/20',
        success: 'bg-green-50 text-green-700 ring-green-600/20',
        warning: 'bg-yellow-50 text-yellow-800 ring-yellow-600/20',
        error: 'bg-red-50 text-red-700 ring-red-600/10',
        neutral: 'bg-gray-50 text-gray-600 ring-gray-500/10',
    };

    return (
        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
}
