import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

interface PDFOptions {
  title: string;
  calculationType: string;
  inputData: Record<string, any>;
  results: Record<string, any>;
  chartDataUrl?: string; // backward compatibility
  chartDataUrls?: string[]; // preferred: multiple charts
  recommendations?: string[];
}

export class PDFGenerator {
  private doc: jsPDF;
  private pageWidth: number;
  private pageHeight: number;
  private margin: number = 20;
  private currentY: number = 20;

  constructor() {
    this.doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });
    this.pageWidth = this.doc.internal.pageSize.getWidth();
    this.pageHeight = this.doc.internal.pageSize.getHeight();
  }

  /**
   * Generate PDF report
   */
  generate(options: PDFOptions): Blob {
    this.addHeader(options.title);
    this.addMetadata();
    this.addInputSection(options.inputData);
    this.addResultsSection(options.results);
    
    if (options.chartDataUrls && options.chartDataUrls.length > 0) {
      this.addChartsSection(options.chartDataUrls);
    } else if (options.chartDataUrl) {
      this.addChartsSection([options.chartDataUrl]);
    }
    
    if (options.recommendations && options.recommendations.length > 0) {
      this.addRecommendations(options.recommendations);
    }
    
    this.addDisclaimer();
    this.addFooter();

    return this.doc.output('blob');
  }

  /**
   * Add header with logo and title
   */
  private addHeader(title: string) {
    // Add logo placeholder (in production, add actual logo)
    this.doc.setFillColor(37, 99, 235); // Primary blue
    this.doc.rect(this.margin, this.currentY, 40, 10, 'F');
    
    this.doc.setTextColor(255, 255, 255);
    this.doc.setFontSize(12);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('LaserCalc Pro', this.margin + 20, this.currentY + 7, { align: 'center' });

    // Title
    this.doc.setTextColor(0, 0, 0);
    this.doc.setFontSize(18);
    this.doc.text(title, this.pageWidth / 2, this.currentY + 7, { align: 'center' });

    this.currentY += 20;
    this.addLine();
  }

  /**
   * Add metadata (date, report ID)
   */
  private addMetadata() {
    const date = new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    this.doc.setFontSize(10);
    this.doc.setTextColor(100, 100, 100);
    this.doc.text(`Generated: ${date}`, this.margin, this.currentY);
    this.doc.text(`Report ID: ${this.generateReportId()}`, this.pageWidth - this.margin, this.currentY, {
      align: 'right',
    });

    this.currentY += 10;
  }

  /**
   * Add input parameters section
   */
  private addInputSection(data: Record<string, any>) {
    this.addSectionTitle('Input Parameters');

    const tableData = Object.entries(data).map(([key, value]) => [
      this.formatKey(key),
      this.formatValue(value),
    ]);

    autoTable(this.doc, {
      startY: this.currentY,
      head: [['Parameter', 'Value']],
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: [37, 99, 235] },
      margin: { left: this.margin, right: this.margin },
    });

    this.currentY = (this.doc as any).lastAutoTable.finalY + 10;
  }

  /**
   * Add results section
   */
  private addResultsSection(results: Record<string, any>) {
    this.addSectionTitle('Calculation Results');

    const tableData = Object.entries(results).map(([key, value]) => [
      this.formatKey(key),
      this.formatValue(value),
    ]);

    autoTable(this.doc, {
      startY: this.currentY,
      head: [['Result', 'Value']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [37, 99, 235] },
      margin: { left: this.margin, right: this.margin },
      columnStyles: {
        0: { fontStyle: 'bold' },
      },
    });

    this.currentY = (this.doc as any).lastAutoTable.finalY + 10;
  }

  /**
   * Add chart section
   */
  private addChartsSection(chartDataUrls: string[]) {
    this.checkPageBreak(100);
    this.addSectionTitle('Visual Analysis');

    const imgWidth = this.pageWidth - 2 * this.margin;
    const imgHeight = 80;

    chartDataUrls.forEach((url) => {
      this.checkPageBreak(imgHeight + 20);
      try {
        this.doc.addImage(url, 'PNG', this.margin, this.currentY, imgWidth, imgHeight);
        this.currentY += imgHeight + 10;
      } catch (error) {
        console.error('Error adding chart to PDF:', error);
      }
    });
  }

  /**
   * Add recommendations
   */
  private addRecommendations(recommendations: string[]) {
    this.checkPageBreak(40);
    this.addSectionTitle('Recommendations');

    this.doc.setFontSize(10);
    this.doc.setTextColor(0, 0, 0);

    recommendations.forEach((rec, index) => {
      this.checkPageBreak(15);
      const bullet = `${index + 1}. `;
      const lines = this.doc.splitTextToSize(rec, this.pageWidth - 2 * this.margin - 10);
      
      this.doc.text(bullet, this.margin, this.currentY);
      this.doc.text(lines, this.margin + 10, this.currentY);
      
      this.currentY += lines.length * 5 + 3;
    });

    this.currentY += 5;
  }

  /**
   * Add disclaimer
   */
  private addDisclaimer() {
    this.checkPageBreak(30);
    this.addLine();
    
    this.doc.setFontSize(8);
    this.doc.setTextColor(150, 150, 150);
    
    const disclaimer = 
      'DISCLAIMER: This report is generated for informational purposes only. The calculations are based on ' +
      'standard industry formulas and user-provided data. Actual costs may vary depending on specific conditions, ' +
      'equipment efficiency, material quality, and other factors. LaserCalc Pro is not responsible for any ' +
      'business decisions made based on these calculations. Always consult with qualified professionals for ' +
      'critical manufacturing decisions.';

    const lines = this.doc.splitTextToSize(disclaimer, this.pageWidth - 2 * this.margin);
    this.doc.text(lines, this.margin, this.currentY);
    this.currentY += lines.length * 3 + 10;
  }

  /**
   * Add footer
   */
  private addFooter() {
    const footerY = this.pageHeight - 15;
    
    this.doc.setFontSize(8);
    this.doc.setTextColor(100, 100, 100);
    this.doc.text('LaserCalc Pro - Professional Manufacturing Cost Calculators', this.pageWidth / 2, footerY, {
      align: 'center',
    });
    this.doc.text('https://lasercalcpro.com', this.pageWidth / 2, footerY + 4, {
      align: 'center',
    });
  }

  /**
   * Helper: Add section title
   */
  private addSectionTitle(title: string) {
    this.checkPageBreak(15);
    this.doc.setFontSize(14);
    this.doc.setTextColor(37, 99, 235);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(title, this.margin, this.currentY);
    this.currentY += 8;
    this.doc.setFont('helvetica', 'normal');
  }

  /**
   * Helper: Add horizontal line
   */
  private addLine() {
    this.doc.setDrawColor(200, 200, 200);
    this.doc.line(this.margin, this.currentY, this.pageWidth - this.margin, this.currentY);
    this.currentY += 5;
  }

  /**
   * Helper: Check if page break is needed
   */
  private checkPageBreak(requiredSpace: number) {
    if (this.currentY + requiredSpace > this.pageHeight - 30) {
      this.doc.addPage();
      this.currentY = 20;
    }
  }

  /**
   * Helper: Format object key
   */
  private formatKey(key: string): string {
    return key
      .replace(/_/g, ' ')
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  }

  /**
   * Helper: Format value
   */
  private formatValue(value: any): string {
    if (typeof value === 'number') {
      return value.toLocaleString('en-US', { maximumFractionDigits: 2 });
    }
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }
    return String(value);
  }

  /**
   * Helper: Generate report ID
   */
  private generateReportId(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 7);
    return `LC-${timestamp}-${random}`.toUpperCase();
  }
}

/**
 * Export PDF helper function
 */
export function downloadPDF(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}









