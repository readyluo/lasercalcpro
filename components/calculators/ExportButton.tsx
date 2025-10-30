'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Download } from 'lucide-react';
import { PDFGenerator, downloadPDF } from '@/lib/pdf/generator';
import { trackPDFExport } from '@/lib/utils/analytics';

interface ExportButtonProps {
  title: string;
  calculationType: string;
  inputData: Record<string, any>;
  results: Record<string, any>;
  chartDataUrl?: string;
  recommendations?: string[];
}

export function ExportButton({
  title,
  calculationType,
  inputData,
  results,
  chartDataUrl,
  recommendations,
}: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);

    try {
      const generator = new PDFGenerator();
      const pdfBlob = generator.generate({
        title,
        calculationType,
        inputData,
        results,
        chartDataUrl,
        recommendations,
      });

      const filename = `${calculationType.toLowerCase().replace(/\s+/g, '-')}-report-${Date.now()}.pdf`;
      downloadPDF(pdfBlob, filename);

      // Track export event
      trackPDFExport(calculationType);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      onClick={handleExport}
      variant="outline"
      leftIcon={<Download className="h-4 w-4" />}
      isLoading={isExporting}
      disabled={isExporting}
    >
      {isExporting ? 'Generating PDF...' : 'Export PDF Report'}
    </Button>
  );
}









