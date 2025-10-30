'use client';

import type { NestingLayout } from '@/lib/calculators/material-utilization';

interface NestingVisualizationProps {
  sheetLength: number;
  sheetWidth: number;
  layout: NestingLayout;
}

export function NestingVisualization({
  sheetLength,
  sheetWidth,
  layout,
}: NestingVisualizationProps) {
  // Calculate scale to fit visualization in container
  const maxWidth = 600;
  const maxHeight = 400;
  const scaleX = maxWidth / sheetLength;
  const scaleY = maxHeight / sheetWidth;
  const scale = Math.min(scaleX, scaleY);

  const viewWidth = sheetLength * scale;
  const viewHeight = sheetWidth * scale;

  return (
    <div className="overflow-auto rounded-lg border bg-gray-50 p-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h4 className="font-semibold text-gray-900">Nesting Layout Visualization</h4>
          <p className="text-sm text-gray-600">
            Sheet: {sheetLength}mm × {sheetWidth}mm | {layout.partsPerSheet} parts per sheet
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded border-2 border-primary-600 bg-primary-100"></div>
            <span>Parts</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded border-2 border-gray-400 bg-gray-100"></div>
            <span>Waste</span>
          </div>
        </div>
      </div>

      <svg
        width={viewWidth}
        height={viewHeight}
        viewBox={`0 0 ${viewWidth} ${viewHeight}`}
        className="mx-auto"
      >
        {/* Sheet outline */}
        <rect
          x={0}
          y={0}
          width={viewWidth}
          height={viewHeight}
          fill="#f3f4f6"
          stroke="#9ca3af"
          strokeWidth={2}
        />

        {/* Grid lines for reference */}
        <defs>
          <pattern
            id="grid"
            width={100 * scale}
            height={100 * scale}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${100 * scale} 0 L 0 0 0 ${100 * scale}`}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth={1}
            />
          </pattern>
        </defs>
        <rect x={0} y={0} width={viewWidth} height={viewHeight} fill="url(#grid)" />

        {/* Parts */}
        {layout.parts.map((part, index) => (
          <g key={index}>
            <rect
              x={part.x * scale}
              y={part.y * scale}
              width={part.width * scale}
              height={part.height * scale}
              fill="#dbeafe"
              stroke="#2563eb"
              strokeWidth={2}
              className="transition-all hover:fill-blue-200"
            />
            <text
              x={(part.x + part.width / 2) * scale}
              y={(part.y + part.height / 2) * scale}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={Math.max(10, 12 * scale)}
              fill="#1e40af"
              fontWeight="600"
            >
              {index + 1}
            </text>
            {part.rotated && (
              <text
                x={(part.x + part.width / 2) * scale}
                y={(part.y + part.height / 2 + 15) * scale}
                textAnchor="middle"
                fontSize={Math.max(8, 10 * scale)}
                fill="#1e40af"
              >
                ↻
              </text>
            )}
          </g>
        ))}

        {/* Dimensions */}
        <g>
          {/* Length dimension */}
          <line
            x1={0}
            y1={viewHeight + 20}
            x2={viewWidth}
            y2={viewHeight + 20}
            stroke="#374151"
            strokeWidth={1}
          />
          <line
            x1={0}
            y1={viewHeight + 15}
            x2={0}
            y2={viewHeight + 25}
            stroke="#374151"
            strokeWidth={1}
          />
          <line
            x1={viewWidth}
            y1={viewHeight + 15}
            x2={viewWidth}
            y2={viewHeight + 25}
            stroke="#374151"
            strokeWidth={1}
          />
          <text
            x={viewWidth / 2}
            y={viewHeight + 35}
            textAnchor="middle"
            fontSize={12}
            fill="#374151"
          >
            {sheetLength}mm
          </text>

          {/* Width dimension */}
          <line
            x1={viewWidth + 20}
            y1={0}
            x2={viewWidth + 20}
            y2={viewHeight}
            stroke="#374151"
            strokeWidth={1}
          />
          <line
            x1={viewWidth + 15}
            y1={0}
            x2={viewWidth + 25}
            y2={0}
            stroke="#374151"
            strokeWidth={1}
          />
          <line
            x1={viewWidth + 15}
            y1={viewHeight}
            x2={viewWidth + 25}
            y2={viewHeight}
            stroke="#374151"
            strokeWidth={1}
          />
          <text
            x={viewWidth + 35}
            y={viewHeight / 2}
            textAnchor="middle"
            fontSize={12}
            fill="#374151"
            transform={`rotate(90 ${viewWidth + 35} ${viewHeight / 2})`}
          >
            {sheetWidth}mm
          </text>
        </g>
      </svg>

      {/* Statistics */}
      <div className="mt-4 grid grid-cols-3 gap-4 rounded-lg bg-white p-4 text-center">
        <div>
          <p className="text-sm text-gray-600">Parts</p>
          <p className="text-2xl font-bold text-primary-600">{layout.partsPerSheet}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Layout</p>
          <p className="text-2xl font-bold text-gray-900">
            {layout.cols} × {layout.rows}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Orientation</p>
          <p className="text-2xl font-bold text-gray-900">
            {layout.rotated ? '↻ 90°' : '→ 0°'}
          </p>
        </div>
      </div>
    </div>
  );
}









