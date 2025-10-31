'use client';

import { useState } from 'react';
import { ChevronDown, ExternalLink } from 'lucide-react';

interface Variable {
  name: string;
  definition: string;
  unit: string;
}

interface DataSource {
  source: string;
  reference: string;
  url: string | null;
}

interface MethodologyData {
  id: string;
  title: string;
  formula: string;
  variables: Variable[];
  assumptions: string[];
  dataSources: DataSource[];
  errorRange: string;
  applicableScenarios: string[];
  limitations: string[];
}

interface MethodologySectionProps {
  methodology: MethodologyData;
}

export function MethodologySection({ methodology }: MethodologySectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-4 p-6 text-left transition-colors hover:bg-gray-50"
      >
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-900">{methodology.title}</h2>
          <p className="mt-1 text-sm text-gray-600">Accuracy: {methodology.errorRange}</p>
        </div>
        <ChevronDown
          className={`h-6 w-6 flex-shrink-0 text-primary-600 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-gray-200 p-6 space-y-6">
            {/* Formula */}
            <div>
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-700">
                Core Formula
              </h3>
              <div className="rounded-lg bg-gray-50 p-4 font-mono text-sm text-gray-900">
                {methodology.formula}
              </div>
            </div>

            {/* Variables */}
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-700">
                Variable Definitions
              </h3>
              <div className="space-y-2">
                {methodology.variables.map((variable, idx) => (
                  <div key={idx} className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                    <div className="mb-1 font-semibold text-gray-900">{variable.name}</div>
                    <div className="text-sm text-gray-700">{variable.definition}</div>
                    <div className="mt-1 text-xs text-gray-500">Unit: {variable.unit}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Assumptions */}
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-700">
                Key Assumptions
              </h3>
              <ul className="space-y-2">
                {methodology.assumptions.map((assumption, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="mt-1 text-primary-600">•</span>
                    <span>{assumption}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Data Sources */}
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-700">
                Data Sources & References
              </h3>
              <div className="space-y-2">
                {methodology.dataSources.map((source, idx) => (
                  <div key={idx} className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                    <div className="mb-1 font-semibold text-gray-900">{source.source}</div>
                    <div className="text-sm text-gray-700">{source.reference}</div>
                    {source.url && (
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-flex items-center gap-1 text-xs text-primary-600 hover:text-primary-700"
                      >
                        Visit Source
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Applicable Scenarios */}
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-700">
                Applicable Scenarios
              </h3>
              <ul className="grid gap-2 sm:grid-cols-2">
                {methodology.applicableScenarios.map((scenario, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="mt-1 text-green-600">✓</span>
                    <span>{scenario}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Limitations */}
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-700">
                Limitations & Exclusions
              </h3>
              <ul className="space-y-2">
                {methodology.limitations.map((limitation, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="mt-1 text-orange-600">⚠</span>
                    <span>{limitation}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

