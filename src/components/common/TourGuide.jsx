import React, { useState, useEffect } from 'react';
import { X, ChevronRight, Check } from 'lucide-react';
import { Button } from '../ui/Button';

// Simple Tour Steps
const steps = [
    {
        title: "Welcome to Business Nexus",
        content: "Your all-in-one platform for connecting entrepreneurs and investors.",
        target: "body"
    },
    {
        title: "Sidebar Navigation",
        content: "Access all your tools here: Dashboard, Messages, Documents, and your new Wallet.",
        target: "nav"
    },
    {
        title: "Video Calling",
        content: "Connect instantly with partners using our new Video Call feature.",
        target: "a[href='/video-call']"
    },
    {
        title: "Financial Wallet",
        content: "Manage your investments and funds securely in the Wallet section.",
        target: "a[href='/wallet']"
    }
];

export const TourGuide = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        // Show tour on first visit (simulated by session storage)
        const hasSeenTour = sessionStorage.getItem('hasSeenTour');
        if (!hasSeenTour) {
            // Small delay to allow render
            setTimeout(() => setIsOpen(true), 1000);
        }
    }, []);

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            handleClose();
        }
    };

    const handleClose = () => {
        setIsOpen(false);
        sessionStorage.setItem('hasSeenTour', 'true');
    };

    if (!isOpen) return null;

    const step = steps[currentStep];

    return (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
            {/* Backdrop mock - we won't do full highlighting as it's complex, just a central modal for simplicity or bottom right */}
            <div className="absolute inset-0 bg-black/20 pointer-events-auto" onClick={handleClose} />

            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm pointer-events-auto relative animate-in fade-in zoom-in duration-300 mx-4">
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="mb-6">
                    <span className="inline-block px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-bold mb-3">
                        Tour Step {currentStep + 1}/{steps.length}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.content}</p>
                </div>

                <div className="flex justify-between items-center">
                    <div className="flex gap-1">
                        {steps.map((_, idx) => (
                            <div
                                key={idx}
                                className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentStep ? 'w-6 bg-primary-600' : 'w-1.5 bg-gray-200'
                                    }`}
                            />
                        ))}
                    </div>
                    <Button
                        variant="primary"
                        onClick={handleNext}
                        rightIcon={currentStep === steps.length - 1 ? <Check size={18} /> : <ChevronRight size={18} />}
                    >
                        {currentStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                </div>
            </div>
        </div>
    );
};
