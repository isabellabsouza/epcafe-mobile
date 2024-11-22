import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ToastContextProps {
    isVisible: boolean;
    showToast: () => void;
    hideToast: () => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [isVisible, setIsVisible] = useState(false);

    const showToast = () => setIsVisible(true);
    const hideToast = () => setIsVisible(false);

    return (
        <ToastContext.Provider value={{ isVisible, showToast, hideToast }}>
            {children}
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast deve ser usado dentro de um ToastProvider');
    }
    return context;
}
