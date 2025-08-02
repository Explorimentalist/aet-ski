'use client';

// src/app/test-success/page.tsx
import { SuccessStep } from '@/components/SuccessStep';
import { useState } from 'react';

export default function TestSuccessPage() {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    // In a real app, this would navigate back
    console.log('Modal closed');
  };

  const handleGoHome = () => {
    setIsOpen(false);
    // In a real app, this would navigate to home
    console.log('Going home');
  };

  if (!isOpen) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Success Page Test</h1>
          <p className="mb-4">The success page was closed.</p>
          <button 
            onClick={() => setIsOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Show Success Page Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <SuccessStep onClose={handleClose} onGoHome={handleGoHome} />
    </div>
  );
} 