// src/app/test-buttons/page.tsx
'use client';

import { Button } from '@/components/Button';
import { ChevronLeft, ChevronRight, ArrowRight, ArrowLeft } from 'lucide-react';

export default function TestButtonsPage() {
  return (
    <div className="min-h-screen bg-background-primary p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-text-form mb-8">Button Variations Test</h1>
        
        {/* Standard Buttons */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-text-form">Standard Buttons</h2>
          <div className="flex gap-4 flex-wrap">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </section>

        {/* Left Icon Buttons */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-text-form">Left Icon Buttons</h2>
          <div className="flex gap-4 flex-wrap">
            <Button size="left-icon">
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>
            <Button size="left-icon" variant="secondary">
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>
          </div>
        </section>

        {/* Right Icon Buttons */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-text-form">Right Icon Buttons</h2>
          <div className="flex gap-4 flex-wrap">
            <Button size="right-icon">
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button size="right-icon" variant="secondary">
              Continue
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </section>

        {/* Comparison */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-text-form">Padding Comparison</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-text-form">Standard Button (md)</h3>
              <Button size="md">
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
              <p className="text-sm text-text-secondary">
                Padding: 8px 16px (uniform)<br/>
                Gap: 10px
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-text-form">Right Icon Button</h3>
              <Button size="right-icon">
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
              <p className="text-sm text-text-secondary">
                Padding: 8px 10px 8px 16px (asymmetric)<br/>
                Gap: 4px
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 