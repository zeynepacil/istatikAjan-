import React from 'react';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  className, 
  isLoading, 
  variant = 'primary', 
  disabled,
  ...props 
}) => {
  const variants = {
    primary: "bg-academic-600 hover:bg-academic-800 text-white shadow-sm",
    secondary: "bg-slate-800 hover:bg-slate-900 text-white shadow-sm",
    outline: "border border-slate-300 bg-transparent hover:bg-slate-50 text-slate-700",
    ghost: "bg-transparent hover:bg-slate-100 text-slate-700"
  };

  return (
    <button 
      className={cn(
        "inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-academic-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </button>
  );
};