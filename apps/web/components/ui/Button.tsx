import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
};

export function Button({ children, variant = 'primary', className = '', ...props }: ButtonProps) {
    const baseStyle = "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold shadow-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variants = {
        primary: "bg-gray-900 text-white hover:bg-gray-800 focus-visible:outline-gray-900",
        secondary: "bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50",
        danger: "bg-red-600 text-white hover:bg-red-500 focus-visible:outline-red-600",
        ghost: "bg-transparent text-gray-700 shadow-none hover:bg-gray-100",
    };

    return (
        <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
            {children}
        </button>
    );
}
