// src/app/test-motion/page.tsx
// Test page for motion system functionality

import { MotionTest } from '@/components/MotionTest';

export default function TestMotionPage() {
  return (
    <div className="min-h-screen bg-background-primary pt-20">
      <div className="container mx-auto">
        <MotionTest />
      </div>
    </div>
  );
}
