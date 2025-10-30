/**
 * English translations for frontend (public-facing pages)
 * lasercalcpro.com - Frontend Language
 */

export const en = {
  // Navigation
  nav: {
    home: 'Home',
    calculators: 'Calculators',
    blog: 'Blog',
    about: 'About',
    contact: 'Contact',
  },

  // Hero Section
  hero: {
    title: 'Professional Manufacturing Cost Calculators',
    subtitle:
      'Free, accurate cost estimation tools for laser cutting, CNC machining, and equipment ROI analysis. Trusted by manufacturers worldwide.',
    cta: {
      primary: 'Start Calculating',
      secondary: 'Learn More',
    },
  },

  // Features
  features: {
    title: 'Why Choose LaserCalc Pro?',
    free: {
      title: '100% Free',
      description: 'No hidden fees, no credit card required. All calculators are completely free.',
    },
    accurate: {
      title: 'Industry Accurate',
      description: 'Based on real manufacturing data and industry-standard formulas.',
    },
    instant: {
      title: 'Instant Results',
      description: 'Get detailed cost breakdown in seconds with real-time calculations.',
    },
    professional: {
      title: 'Professional Reports',
      description: 'Export detailed PDF reports with cost breakdowns and recommendations.',
    },
  },

  // Calculators Common
  calculator: {
    calculate: 'Calculate',
    reset: 'Reset',
    clear: 'Clear',
    exportPdf: 'Export PDF Report',
    saveHistory: 'Save to History',
    loading: 'Calculating...',
    error: 'Please check your inputs',
    success: 'Calculation complete',
    result: 'Result',
    breakdown: 'Cost Breakdown',
  },

  // Laser Cutting Calculator
  laserCutting: {
    title: 'Laser Cutting Cost Calculator',
    description: 'Calculate precise costs for your laser cutting projects',
    meta: {
      title: 'Laser Cutting Cost Calculator - Free & Accurate | LaserCalc Pro',
      description:
        'Calculate laser cutting costs instantly. Free tool for estimating material, labor, energy, and equipment costs for metal cutting projects.',
    },
    fields: {
      materialType: 'Material Type',
      thickness: 'Thickness (mm)',
      cuttingLength: 'Cutting Length (mm)',
      laserPower: 'Laser Power (kW)',
      electricityRate: 'Electricity Rate ($/kWh)',
      laborRate: 'Labor Rate ($/hour)',
      materialPrice: 'Material Price ($/kg)',
      gasConsumption: 'Gas Consumption (m³/hour)',
      gasPrice: 'Gas Price ($/m³)',
    },
    materials: {
      stainless_steel: 'Stainless Steel 304',
      aluminum: 'Aluminum',
      copper: 'Copper',
      mild_steel: 'Mild Steel',
    },
    results: {
      title: 'Cost Analysis',
      materialCost: 'Material Cost',
      powerCost: 'Power Cost',
      laborCost: 'Labor Cost',
      gasCost: 'Assist Gas Cost',
      depreciation: 'Equipment Depreciation',
      totalCost: 'Total Cost',
      suggestedPrice: 'Suggested Retail Price',
      profitMargin: 'Profit Margin',
      cuttingTime: 'Estimated Cutting Time',
      efficiency: 'Cost Efficiency',
    },
  },

  // CNC Machining Calculator
  cncMachining: {
    title: 'CNC Machining Cost Estimator',
    description: 'Estimate costs for CNC machining projects with batch pricing',
    fields: {
      partLength: 'Part Length (mm)',
      partWidth: 'Part Width (mm)',
      partHeight: 'Part Height (mm)',
      materialType: 'Material Type',
      machiningTime: 'Machining Time (hours)',
      setupTime: 'Setup Time (hours)',
      batchSize: 'Batch Size',
      toolCost: 'Tool Cost ($)',
      toolLife: 'Tool Life (parts)',
    },
    results: {
      machineCost: 'Machine Cost',
      setupCost: 'Setup Cost',
      materialCost: 'Material Cost',
      toolingCost: 'Tooling Cost',
      overhead: 'Overhead (15%)',
      totalPerPart: 'Total Cost Per Part',
      totalBatch: 'Total Batch Cost',
    },
  },

  // ROI Calculator
  roi: {
    title: 'Equipment ROI Calculator',
    description: 'Evaluate investment returns for laser cutting and CNC equipment',
    fields: {
      equipmentCost: 'Equipment Cost ($)',
      monthlyProduction: 'Monthly Production (parts)',
      pricePerUnit: 'Price Per Unit ($)',
      monthlyOperatingCost: 'Monthly Operating Cost ($)',
      financingRate: 'Financing Rate (%)',
    },
    results: {
      paybackPeriod: 'Payback Period',
      fiveYearProfit: '5-Year Cumulative Profit',
      npv: 'Net Present Value (NPV)',
      irr: 'Internal Rate of Return (IRR)',
      months: 'months',
      years: 'years',
    },
  },

  // Footer
  footer: {
    description: 'Professional cost calculation tools for the manufacturing industry',
    sections: {
      tools: 'Tools',
      resources: 'Resources',
      company: 'Company',
      legal: 'Legal',
    },
    links: {
      laserCutting: 'Laser Cutting Calculator',
      cncMachining: 'CNC Machining Estimator',
      roiCalculator: 'ROI Calculator',
      blog: 'Blog',
      tutorials: 'Tutorials',
      about: 'About Us',
      contact: 'Contact',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      disclaimer: 'Disclaimer',
    },
    copyright: '© 2025 LaserCalc Pro. All rights reserved.',
    disclaimer: 'All calculations are estimates. Actual costs may vary based on specific conditions.',
  },

  // Contact Page
  contact: {
    title: 'Contact Us',
    description: 'Have questions? Get in touch with our team',
    form: {
      name: 'Your Name',
      email: 'Email Address',
      subject: 'Subject',
      message: 'Message',
      submit: 'Send Message',
      sending: 'Sending...',
      success: 'Message sent successfully! We\'ll get back to you soon.',
      error: 'Failed to send message. Please try again.',
    },
  },

  // Common UI
  common: {
    loading: 'Loading...',
    error: 'An error occurred',
    tryAgain: 'Try Again',
    goHome: 'Go Home',
    readMore: 'Read More',
    learnMore: 'Learn More',
    getStarted: 'Get Started',
    viewAll: 'View All',
  },
} as const;

export type EnglishTexts = typeof en;


