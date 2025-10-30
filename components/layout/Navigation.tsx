'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEnglish } from '@/lib/i18n';
import { Menu, X, Calculator, ChevronDown } from 'lucide-react';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCalculatorsOpen, setIsCalculatorsOpen] = useState(false);
  const pathname = usePathname();
  const t = useEnglish();

  const tools = [
    { name: 'Laser Cutting Calculator', href: '/calculators/laser-cutting' },
    { name: 'CNC Machining Estimator', href: '/calculators/cnc-machining' },
    { name: 'ROI Calculator', href: '/calculators/roi' },
    { name: 'Energy Cost Calculator', href: '/calculators/energy' },
    { name: 'Material Utilization', href: '/calculators/material-utilization' },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Calculator className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900">
              LaserCalc <span className="text-primary-600">Pro</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            <Link
              href="/"
              className={`font-medium transition-colors hover:text-primary-600 ${
                isActive('/') ? 'text-primary-600' : 'text-gray-700'
              }`}
            >
              {t.nav.home}
            </Link>

            {/* Calculators Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsCalculatorsOpen(true)}
              onMouseLeave={() => setIsCalculatorsOpen(false)}
            >
              <button
                className={`flex items-center font-medium transition-colors hover:text-primary-600 ${
                  pathname.startsWith('/calculators') ? 'text-primary-600' : 'text-gray-700'
                }`}
              >
                {t.nav.calculators}
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>

              {/* Dropdown Menu */}
              {isCalculatorsOpen && (
                <div className="absolute left-0 mt-2 w-72 animate-fade-in rounded-lg bg-white py-2 shadow-xl">
                  {tools.map(tool => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className="block px-4 py-3 text-sm text-gray-700 transition-colors hover:bg-primary-50 hover:text-primary-600"
                    >
                      {tool.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/blog"
              className={`font-medium transition-colors hover:text-primary-600 ${
                isActive('/blog') ? 'text-primary-600' : 'text-gray-700'
              }`}
            >
              {t.nav.blog}
            </Link>

            <Link
              href="/about"
              className={`font-medium transition-colors hover:text-primary-600 ${
                isActive('/about') ? 'text-primary-600' : 'text-gray-700'
              }`}
            >
              {t.nav.about}
            </Link>

            <Link
              href="/contact"
              className={`font-medium transition-colors hover:text-primary-600 ${
                isActive('/contact') ? 'text-primary-600' : 'text-gray-700'
              }`}
            >
              {t.nav.contact}
            </Link>

            <Link
              href="/calculators/laser-cutting"
              className="btn-primary btn-sm rounded-lg px-4 py-2"
            >
              Get Started
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
                  <div className="ml-4 mt-2 space-y-1">
                    {tools.map(tool => (
                      <Link
                        key={tool.href}
                        href={tool.href}
                        className="block rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-primary-50 hover:text-primary-600"
                        onClick={() => setIsOpen(false)}
                      >
                        {tool.name}
                      </Link>
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


