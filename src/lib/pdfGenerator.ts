// src/lib/pdfGenerator.ts
import jsPDF from 'jspdf';

interface PDFOptions {
  filename?: string;
  format?: 'a4' | 'letter';
  orientation?: 'portrait' | 'landscape';
}

export class PDFGenerator {
  static async generatePDFFromContent(
    content: string, 
    title: string,
    options: PDFOptions = {}
  ): Promise<void> {
    try {
      const {
        filename = 'document.pdf',
        format = 'a4',
        orientation = 'portrait'
      } = options;

      // Create PDF document
      const pdf = new jsPDF({
        format,
        orientation,
        unit: 'mm'
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      const contentWidth = pageWidth - (margin * 2);
      const lineHeight = 7;

      // Add title
      pdf.setFontSize(18);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(50, 50, 50);
      pdf.text(title, margin, margin + 10);

      // Add content
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(70, 70, 70);

      const lines = pdf.splitTextToSize(content, contentWidth);
      let yPosition = margin + 25;

      for (const line of lines) {
        if (yPosition > pageHeight - margin) {
          pdf.addPage();
          yPosition = margin;
        }
        pdf.text(line, margin, yPosition);
        yPosition += lineHeight;
      }

      // Save the PDF
      pdf.save(filename);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw new Error('Failed to generate PDF');
    }
  }

  // Optimized version for terms sections - this will create lightweight PDFs
  static async generateTermsPDF(
    termsSections: Array<{number: string, title: string, content: string}>,
    options: PDFOptions = {}
  ): Promise<void> {
    try {
      const {
        filename = 'aet-terms-and-conditions.pdf',
        format = 'a4',
        orientation = 'portrait'
      } = options;

      // Create PDF document
      const pdf = new jsPDF({
        format,
        orientation,
        unit: 'mm'
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      const contentWidth = pageWidth - (margin * 2);
      const titleLineHeight = 8;
      const contentLineHeight = 6;

      let yPosition = margin;

      // Add main title
      pdf.setFontSize(20);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(30, 30, 30);
      pdf.text('Terms and Conditions', pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 15;

      // Add each section
      termsSections.forEach((section) => {
        // Check if we need a new page
        if (yPosition > pageHeight - margin - 30) {
          pdf.addPage();
          yPosition = margin;
        }

        // Section title with text wrapping
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(50, 50, 50);
        
        // Split long titles into multiple lines if needed
        const titleText = `${section.number}. ${section.title}`;
        const titleLines = pdf.splitTextToSize(titleText, contentWidth);
        
        // Add each line of the title
        titleLines.forEach((line: string) => {
          if (yPosition > pageHeight - margin - 10) {
            pdf.addPage();
            yPosition = margin;
          }
          pdf.text(line, margin, yPosition);
          yPosition += titleLineHeight;
        });

        // Section content
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(70, 70, 70);

        const lines = pdf.splitTextToSize(section.content, contentWidth);
        
        for (const line of lines) {
          if (yPosition > pageHeight - margin - 10) {
            pdf.addPage();
            yPosition = margin;
          }
          pdf.text(line, margin, yPosition);
          yPosition += contentLineHeight;
        }

        // Add space between sections
        yPosition += 8;
      });

      // Save the PDF
      pdf.save(filename);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw new Error('Failed to generate PDF');
    }
  }
}
