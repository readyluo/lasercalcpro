'use client';

import { useState } from 'react';
import { Download, Share2, Mail, Link as LinkIcon, Check, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { PDFGenerator, downloadPDF } from '@/lib/pdf/generator';
import { trackPDFExport } from '@/lib/utils/analytics';

interface ShareExportButtonsProps {
  title: string;
  calculationType: string;
  inputData: Record<string, any>;
  results: Record<string, any>;
  chartDataUrl?: string;
  recommendations?: string[];
}

export function ShareExportButtons({
  title,
  calculationType,
  inputData,
  results,
  chartDataUrl,
  recommendations,
}: ShareExportButtonsProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareLink, setShareLink] = useState('');
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  // PDF Export
  const handleExportPDF = async () => {
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

      trackPDFExport(calculationType);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  // Generate Share Link
  const handleGenerateLink = async () => {
    setIsGeneratingLink(true);
    try {
      const response = await fetch('/api/share/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toolType: calculationType,
          calculationData: { inputData, results, chartDataUrl, recommendations },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate share link');
      }

      const data = await response.json();
      const fullUrl = `${window.location.origin}/shared/${data.shortCode}`;
      setShareLink(fullUrl);
    } catch (error) {
      console.error('Error generating share link:', error);
      alert('Failed to generate share link. Please try again.');
    } finally {
      setIsGeneratingLink(false);
    }
  };

  // Copy Link to Clipboard
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (error) {
      console.error('Error copying link:', error);
      alert('Failed to copy link. Please try manually.');
    }
  };

  // Send via Email
  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSendingEmail(true);

    try {
      const response = await fetch('/api/share/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          title,
          calculationType,
          inputData,
          results,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      setEmailSent(true);
      setTimeout(() => {
        setEmailSent(false);
        setShowEmailForm(false);
        setEmail('');
      }, 3000);
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email. Please try again or export PDF manually.');
    } finally {
      setIsSendingEmail(false);
    }
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {/* PDF Export Button */}
        <Button
          onClick={handleExportPDF}
          variant="primary"
          leftIcon={isExporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
          disabled={isExporting}
        >
          {isExporting ? 'Generating...' : 'Export PDF'}
        </Button>

        {/* Share Button */}
        <Button
          onClick={() => setShowShareModal(true)}
          variant="outline"
          leftIcon={<Share2 className="h-4 w-4" />}
        >
          Share
        </Button>

        {/* Email Button */}
        <Button
          onClick={() => setShowEmailForm(true)}
          variant="outline"
          leftIcon={<Mail className="h-4 w-4" />}
        >
          Email
        </Button>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Share Calculation</h3>
              <button
                onClick={() => {
                  setShowShareModal(false);
                  setShareLink('');
                  setLinkCopied(false);
                }}
                className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {!shareLink ? (
              <div className="text-center">
                <p className="mb-6 text-gray-600">
                  Generate a shareable link that expires in 30 days
                </p>
                <Button
                  onClick={handleGenerateLink}
                  variant="primary"
                  leftIcon={isGeneratingLink ? <Loader2 className="h-5 w-5 animate-spin" /> : <LinkIcon className="h-5 w-5" />}
                  disabled={isGeneratingLink}
                  className="w-full"
                >
                  {isGeneratingLink ? 'Generating Link...' : 'Generate Share Link'}
                </Button>
              </div>
            ) : (
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Shareable Link
                </label>
                <div className="mb-4 flex gap-2">
                  <input
                    type="text"
                    value={shareLink}
                    readOnly
                    className="flex-1 rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-900"
                  />
                  <Button
                    onClick={handleCopyLink}
                    variant="outline"
                    leftIcon={linkCopied ? <Check className="h-4 w-4 text-green-600" /> : <LinkIcon className="h-4 w-4" />}
                  >
                    {linkCopied ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  This link will expire in 30 days and is read-only
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Email Modal */}
      {showEmailForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Email Report</h3>
              <button
                onClick={() => {
                  setShowEmailForm(false);
                  setEmail('');
                  setEmailSent(false);
                }}
                className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {!emailSent ? (
              <form onSubmit={handleSendEmail}>
                <div className="mb-4">
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  />
                </div>
                <p className="mb-4 text-sm text-gray-600">
                  We'll send you a PDF report with all calculation details
                </p>
                <Button
                  type="submit"
                  variant="primary"
                  leftIcon={isSendingEmail ? <Loader2 className="h-5 w-5 animate-spin" /> : <Mail className="h-5 w-5" />}
                  disabled={isSendingEmail || !email}
                  className="w-full"
                >
                  {isSendingEmail ? 'Sending...' : 'Send Email'}
                </Button>
              </form>
            ) : (
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <Check className="h-10 w-10 text-green-600" />
                </div>
                <h4 className="mb-2 text-lg font-semibold text-gray-900">Email Sent!</h4>
                <p className="text-gray-600">
                  Check your inbox for the calculation report
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

