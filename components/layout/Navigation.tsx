'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEnglish } from '@/lib/i18n';
import { Menu, X, Calculator, ChevronDown, Zap, TrendingUp, BarChart3, Leaf, Package, DollarSign, Settings, Clock } from 'lucide-react';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCalculatorsOpen, setIsCalculatorsOpen] = useState(false);
  const pathname = usePathname();
  const t = useEnglish();
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toolCategories = [
    {
      category: 'Core Calculators',
      tools: [
        { 
          name: 'Laser Cutting', 
          href: '/calculators/laser-cutting',
          description: 'Complete cutting cost calculation',
          icon: <Zap className="h-5 w-5" />,
          popular: true
        },
        { 
          name: 'CNC Machining', 
          href: '/calculators/cnc-machining',
          description: 'Machining time and costs',
          icon: <Package className="h-5 w-5" />
        },
        { 
          name: 'Material Utilization', 
          href: '/calculators/material-utilization',
          description: 'Optimize material usage',
          icon: <BarChart3 className="h-5 w-5" />
        },
      ]
    },
    {
      category: 'Cost Center',
      tools: [
        { 
          name: 'Hourly Rate Builder', 
          href: '/calculators/cost-center/hourly-rate',
          description: 'Calculate shop hourly rate',
          icon: <DollarSign className="h-5 w-5" />,
          badge: 'New'
        },
        { 
          name: 'Overhead Allocator', 
          href: '/calculators/cost-center/overhead-allocator',
          description: 'Allocate overhead costs',
          icon: <TrendingUp className="h-5 w-5" />,
          badge: 'New'
        },
        { 
          name: 'Setup Estimator', 
          href: '/calculators/cost-center/setup-estimator',
          description: 'Estimate setup & changeover',
          icon: <Clock className="h-5 w-5" />,
          badge: 'New'
        },
        { 
          name: 'More Tools...', 
          href: '/calculators/cost-center',
          description: 'View all cost center tools',
          icon: <Settings className="h-5 w-5" />
        },
      ]
    },
    {
      category: 'Analysis',
      tools: [
        { 
          name: 'Equipment ROI', 
          href: '/calculators/roi',
          description: 'Investment return analysis',
          icon: <TrendingUp className="h-5 w-5" />
        },
        { 
          name: 'Energy Cost', 
          href: '/calculators/energy',
          description: 'Power consumption tracking',
          icon: <Leaf className="h-5 w-5" />
        },
      ]
    }
  ];

  const isActive = (path: string) => pathname === path;

  // Handle delayed close for better UX
  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsCalculatorsOpen(true);
  };

  const handleMouseLeave = () => {
    // Add 150ms delay before closing to allow mouse movement
    closeTimeoutRef.current = setTimeout(() => {
      setIsCalculatorsOpen(false);
    }, 150);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Calculator className="h-7 w-7 text-primary-600" />
            <span className="text-lg font-bold text-gray-900">
              LaserCalc <span className="text-primary-600">Pro</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-1 md:flex">
            <Link
              href="/"
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive('/') ? 'text-primary-600 bg-primary-50' : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
              }`}
            >
              {t.nav.home}
            </Link>

            {/* Calculators Mega Menu */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  pathname.startsWith('/calculators') ? 'text-primary-600 bg-primary-50' : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                {t.nav.calculators}
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isCalculatorsOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega Menu Dropdown */}
              <div
                className={`absolute left-0 top-full pt-2 transition-all duration-200 ${
                  isCalculatorsOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                }`}
              >
                <div className="w-[680px] rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 border border-gray-100">
                  {/* Header */}
                  <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-primary-50 to-blue-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-gray-900">Professional Calculators</h3>
                        <p className="text-xs text-gray-600 mt-0.5">Accurate cost estimation for manufacturing</p>
                      </div>
                      <Link 
                        href="/calculators"
                        className="text-xs text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-primary-100 transition-colors"
                      >
                        View All
                        <ChevronDown className="h-3 w-3 -rotate-90" />
                      </Link>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-6">
                      {toolCategories.map((category, idx) => (
                        <div key={idx}>
                          <h4 className="mb-3 text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                            <span className="h-px flex-1 bg-gray-200"></span>
                            {category.category}
                            <span className="h-px flex-1 bg-gray-200"></span>
                          </h4>
                          <div className="space-y-1">
                            {category.tools.map(tool => (
                              <Link
                                key={tool.href}
                                href={tool.href}
                                className="group flex items-start gap-3 rounded-lg p-3 transition-all hover:bg-gradient-to-r hover:from-primary-50 hover:to-blue-50 hover:shadow-sm"
                              >
                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-md transition-transform group-hover:scale-110 group-hover:shadow-lg">
                                  {tool.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <p className="text-sm font-bold text-gray-900 group-hover:text-primary-700 transition-colors">
                                      {tool.name}
                                    </p>
                                    {tool.popular && (
                                      <span className="inline-flex items-center rounded-full bg-gradient-to-r from-green-400 to-emerald-500 px-2 py-0.5 text-xs font-bold text-white shadow-sm">
                                        🔥 Popular
                                      </span>
                                    )}
                                    {tool.badge && (
                                      <span className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-400 to-blue-500 px-2 py-0.5 text-xs font-bold text-white shadow-sm">
                                        ✨ {tool.badge}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs text-gray-600 leading-relaxed">{tool.description}</p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer CTA */}
                  <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Calculator className="h-4 w-4 text-primary-600" />
                        <span>All calculators are <strong className="text-gray-900">free to use</strong></span>
                      </div>
                      <Link
                        href="/calculators/compare"
                        className="text-xs font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1"
                      >
                        Compare Tools
                        <ChevronDown className="h-3 w-3 -rotate-90" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/guides"
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                pathname.startsWith('/guides') ? 'text-primary-600 bg-primary-50' : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
              }`}
            >
              Guides
            </Link>

            <Link
              href="/blog"
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                pathname.startsWith('/blog') ? 'text-primary-600 bg-primary-50' : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
              }`}
            >
              {t.nav.blog}
            </Link>

            <Link
              href="/about"
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive('/about') ? 'text-primary-600 bg-primary-50' : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
              }`}
            >
              {t.nav.about}
            </Link>

            <Link
              href="/contact"
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive('/contact') ? 'text-primary-600 bg-primary-50' : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
              }`}
            >
              {t.nav.contact}
            </Link>

            <Link
              href="/calculators/laser-cutting"
              className="ml-4 inline-flex items-center gap-1.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:from-primary-700 hover:to-primary-800 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <Calculator className="h-4 w-4" />
              Try Free
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="animate-slide-in border-t py-4 md:hidden">
            <div className="space-y-2">
              <Link
                href="/"
                className={`block rounded-lg px-4 py-2 font-medium transition-colors ${
                  isActive('/') ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {t.nav.home}
              </Link>

              {/* Mobile Calculators */}
              <div>
                <button
                  onClick={() => setIsCalculatorsOpen(!isCalculatorsOpen)}
                  className="flex w-full items-center justify-between rounded-lg px-4 py-2 font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {t.nav.calculators}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      isCalculatorsOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isCalculatorsOpen && (
                  <div className="ml-4 mt-2 space-y-3">
                    {toolCategories.map((category, idx) => (
                      <div key={idx}>
                        <h4 className="px-4 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">{category.category}</h4>
                        <div className="space-y-1">
                          {category.tools.map(tool => (
                            <Link
                              key={tool.href}
                              href={tool.href}
                              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                              onClick={() => setIsOpen(false)}
                            >
                              <span>{tool.name}</span>
                              {tool.badge && (
                                <span className="inline-flex items-center rounded-full bg-blue-100 px-1.5 py-0.5 text-xs font-medium text-blue-800">
                                  {tool.badge}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/guides"
                className={`block rounded-lg px-4 py-2 font-medium transition-colors ${
                  pathname.startsWith('/guides') ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                Guides
              </Link>

              <Link
                href="/blog"
                className={`block rounded-lg px-4 py-2 font-medium transition-colors ${
                  isActive('/blog') ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {t.nav.blog}
              </Link>

              <Link
                href="/about"
                className={`block rounded-lg px-4 py-2 font-medium transition-colors ${
                  isActive('/about') ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {t.nav.about}
              </Link>

              <Link
                href="/contact"
                className={`block rounded-lg px-4 py-2 font-medium transition-colors ${
                  isActive('/contact') ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {t.nav.contact}
              </Link>

              <Link
                href="/calculators/laser-cutting"
                className="btn-primary btn-md mt-4 block w-full rounded-lg text-center"
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
