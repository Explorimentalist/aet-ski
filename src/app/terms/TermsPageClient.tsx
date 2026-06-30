'use client';

import { useState, useEffect, useCallback } from 'react';
import SideNavigation from '@/components/SideNavigation';
import { Button } from '@/components/Button';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { LazyMultiStepForm as MultiStepForm } from '@/components/LazyMultiStepForm';
import { PDFGenerator } from '@/lib/pdfGenerator';
import { Download } from 'lucide-react';
import { BookingFormData } from '@/types';
import type { TermsData } from '@/types/terms';
import { PageWrapper } from '@/motion/PageWrapper';

interface TermsPageClientProps {
  termsData: TermsData;
}

export default function TermsPageClient({ termsData }: TermsPageClientProps) {
  const [navigationItems, setNavigationItems] = useState<Array<{
    id: string;
    number: string;
    title: string;
    isActive?: boolean;
  }>>(() => termsData.sections
    .filter((section) => section.isActive)
    .map((section, index) => ({
      id: section.id,
      number: section.number.toString(),
      title: section.title,
      isActive: index === 0,
  })));
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Scroll spy functionality
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px', // Trigger when section is in the middle of viewport
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setNavigationItems(prev => 
            prev.map(item => ({
              ...item,
              isActive: item.id === sectionId
            }))
          );
        }
      });
    }, observerOptions);

    // Observe all active section elements
    const activeSections = termsData.sections.filter(section => section.isActive);
    activeSections.forEach(section => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, [termsData]);

  const handleSectionClick = (sectionId: string) => {
    setNavigationItems(prev => 
      prev.map(item => ({
        ...item,
        isActive: item.id === sectionId
      }))
    );

    // Scroll to section with proper offset
    const element = document.getElementById(sectionId);
    if (element) {
      // Calculate the offset to account for fixed header and provide better positioning
      const headerHeight = window.innerWidth >= 1024 ? 72 : 56; // Desktop vs mobile header height
      const offset = headerHeight + 100; // Additional offset for better visibility
      
      const elementTop = element.offsetTop - offset;
      
      window.scrollTo({
        top: elementTop,
        behavior: 'smooth'
      });
    }
  };

  const handleDownloadPDF = async () => {
    try {
      setIsDownloading(true);

      // Get only active sections for PDF
      const activeSections = termsData.sections.filter(section => section.isActive);
      
      // Convert to format expected by PDFGenerator
      const pdfSections = activeSections.map(section => ({
        number: section.number.toString(),
        title: section.title,
        content: section.content
      }));
      
      // Generate PDF using optimized method (no DOM manipulation needed)
      await PDFGenerator.generateTermsPDF(pdfSections, {
        filename: 'aet-terms-and-conditions.pdf',
        format: 'a4',
        orientation: 'portrait'
      });
    } catch (error) {
      console.error('PDF generation failed:', error);

      // Show error message to user
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleOpenForm = useCallback(() => {
    setIsFormOpen(true);
  }, []);

  const handleCloseForm = useCallback(() => {
    setIsFormOpen(false);
  }, []);

  const handleFormSubmit = useCallback((data: BookingFormData) => {
    console.log('Form submitted:', data);
    // TODO: Handle form submission (API call, etc.)
    // Don't close modal here - let the success page handle closing
    // The MultiStepForm will show the success page, and user can close it
  }, []);

  // Get active sections for display
  const activeSections = termsData.sections.filter(section => section.isActive);

  return (
    <>
      {/* Fixed Navigation */}
      <Navigation onQuoteClick={handleOpenForm} />

      {/* Main Content with proper spacing for fixed navigation */}
      <PageWrapper className="pt-14 md:pt-[72px] bg-background-primary">
        {/* Header */}
        <div>
          <div className="max-w-7xl mx-auto px-6 py-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-700 leading-tight tracking-tight">
              {termsData.title}
            </h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Side Navigation Container */}
            <div className="col-span-1 lg:col-span-4">
              {/* Side Navigation - Let Tailwind CSS handle sticky behavior */}
              <div className="sticky top-[56px] md:top-[72px] z-10">
                <SideNavigation 
                  items={navigationItems}
                  onItemClick={handleSectionClick}
                />
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-start-7 lg:col-span-6">
              <div className="space-y-12">
                {activeSections.map((section, index) => (
                  <section 
                    key={`${section.number}-${section.id || index}`}
                    id={section.id}
                    className="scroll-mt-32"
                  >
                    <h2 className="text-2xl font-bold text-gray-700 mb-4 leading-relaxed tracking-tight">
                      {section.number}. {section.title}
                    </h2>
                    <div className="prose prose-gray max-w-none">
                      <p className="text-base font-normal text-gray-700 leading-relaxed tracking-tight">
                        {section.content}
                      </p>
                    </div>
                  </section>
                ))}
              </div>

              {/* Download Button */}
              <div className="mt-12 pt-8 flex justify-end">
                <Button
                  onClick={handleDownloadPDF}
                  variant="primary"
                  size="lg"
                  className="inline-flex items-center gap-2"
                  loading={isDownloading}
                >
                  {!isDownloading && <Download className="w-4 h-4" />}
                  {isDownloading ? 'Generating PDF...' : 'Download T&Cs in PDF'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>

      {/* Footer */}
      <Footer onQuoteClick={handleOpenForm} />

      {/* Multi-Step Form Modal */}
      <MultiStepForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
      />
    </>
  );
} 
