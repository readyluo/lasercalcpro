'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEnglish } from '@/lib/i18n';
import { Menu, X, Calculator, ChevronDown, Zap, TrendingUp, BarChart3, Leaf, Package, DollarSign, Settings, Clock } from 'lucide-react';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCalculatorsOpen, setIsCalculatorsOpen] = useState(false);
  const pathname = usePathname();
  const t = useEnglish();

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

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
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
              onMouseEnter={() => setIsCalculatorsOpen(true)}
              onMouseLeave={() => setIsCalculatorsOpen(false)}
            >
              <button
                className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  pathname.startsWith('/calculators') ? 'text-primary-600 bg-primary-50' : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                {t.nav.calculators}
                <ChevronDown className={`h-4 w-4 transition-transform ${isCalculatorsOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega Menu */}
              {isCalculatorsOpen && (
                <div className="absolute left-0 top-full mt-1 w-[600px] animate-fade-in">
                  <div className="mt-2 rounded-xl bg-white shadow-xl ring-1 ring-black ring-opacity-5">
                    <div className="p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Calculators</h3>
                        <Link 
                          href="/calculators"
                          className="text-xs text-primary-600 hover:text-primary-700 font-medium"
                        >
                          View All →
                        </Link>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {toolCategories.map((category, idx) => (
                          <div key={idx}>
                            <h4 className="mb-2 text-xs font-semibold text-gray-700 uppercase tracking-wider">{category.category}</h4>
                            <div className="space-y-1">
                              {category.tools.map(tool => (
                                <Link
                                  key={tool.href}
                                  href={tool.href}
                                  className="group flex items-start gap-2 rounded-lg p-2 transition-colors hover:bg-gray-50"
                                >
                                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-100">
                                    {tool.icon}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1.5">
                                      <p className="text-sm font-semibold text-gray-900 group-hover:text-primary-600">
                                        {tool.name}
                                      </p>
                                      {tool.popular && (
                                        <span className="inline-flex items-center rounded-full bg-green-100 px-1.5 py-0.5 text-xs font-medium text-green-800">
                                          Popular
                                        </span>
                                      )}
                                      {tool.badge && (
                                        <span className="inline-flex items-center rounded-full bg-blue-100 px-1.5 py-0.5 text-xs font-medium text-blue-800">
                                          {tool.badge}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-xs text-gray-600 mt-0.5">{tool.description}</p>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

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
              className="ml-4 inline-flex items-center gap-1.5 bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
            >
              <Calculator className="h-4 w-4" />
              Try Free
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
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
                className={`block rounded-lg px-4 py-2 font-medium ${
                  isActive('/') ? 'bg-primary-50 text-primary-600' : 'text-gray-700'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {t.nav.home}
              </Link>

              {/* Mobile Calculators */}
              <div>
                <button
                  onClick={() => setIsCalculatorsOpen(!isCalculatorsOpen)}
                  className="flex w-full items-center justify-between rounded-lg px-4 py-2 font-medium text-gray-700"
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
                              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-primary-50 hover:text-primary-600"
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
                href="/blog"
                className={`block rounded-lg px-4 py-2 font-medium ${
                  isActive('/blog') ? 'bg-primary-50 text-primary-600' : 'text-gray-700'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {t.nav.blog}
              </Link>

              <Link
                href="/about"
                className={`block rounded-lg px-4 py-2 font-medium ${
                  isActive('/about') ? 'bg-primary-50 text-primary-600' : 'text-gray-700'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {t.nav.about}
              </Link>

              <Link
                href="/contact"
                className={`block rounded-lg px-4 py-2 font-medium ${
                  isActive('/contact') ? 'bg-primary-50 text-primary-600' : 'text-gray-700'
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









