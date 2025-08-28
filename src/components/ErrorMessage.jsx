import React from "react";

const ErrorMessage = ({ title, message, hint, variant = "error", children }) => {
    const isError = variant === "error";
    const base = 
        isError
            ? "bg-red-50 border-l-4 border-red-400 text-red-800"
            : "bg-main-dark/10 border-l-4 border-accent-light text-main-dark";
    return (
        <div className={`${base} p-6 rounded-r-xl text-center`} role="alert">
            {children}
            {title && <strong className="font-bold text-xl block mb-2">{title}</strong>}
            {message && <span className="block text-lg">{message}</span>}
            {hint && 
            <p className={`text-sm mt-3 ${isError ? "text-red-700" : "text-main-dark"}`}>
                {hint}
            </p>}
        </div>
    );
};

export default ErrorMessage;