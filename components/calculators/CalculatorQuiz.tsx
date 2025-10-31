'use client';

import { useState } from 'react';
import { ChevronRight, ChevronLeft, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

type Answer = {
  text: string;
  value: string;
};

type Question = {
  id: number;
  question: string;
  answers: Answer[];
};

const questions: Question[] = [
  {
    id: 1,
    question: 'What is your primary goal?',
    answers: [
      { text: 'Quote a job for a customer', value: 'quote' },
      { text: 'Evaluate equipment purchase', value: 'purchase' },
      { text: 'Analyze operating costs', value: 'analysis' },
      { text: 'Optimize material usage', value: 'optimize' }
    ]
  },
  {
    id: 2,
    question: 'What type of manufacturing process?',
    answers: [
      { text: 'Laser cutting (sheet metal)', value: 'laser' },
      { text: 'CNC machining (milling, turning)', value: 'cnc' },
      { text: 'Welding or assembly', value: 'welding' },
      { text: 'Multiple processes', value: 'multiple' },
      { text: 'Not process-specific', value: 'general' }
    ]
  },
  {
    id: 3,
    question: 'What is your experience level?',
    answers: [
      { text: 'Beginner - Need simple estimates', value: 'beginner' },
      { text: 'Intermediate - Familiar with basics', value: 'intermediate' },
      { text: 'Expert - Need detailed analysis', value: 'expert' }
    ]
  },
  {
    id: 4,
    question: 'How quickly do you need results?',
    answers: [
      { text: 'Immediate - Quick ballpark estimate', value: 'quick' },
      { text: 'Standard - Detailed accurate calculation', value: 'standard' },
      { text: 'Comprehensive - Full analysis with PDF report', value: 'comprehensive' }
    ]
  }
];

type Recommendation = {
  title: string;
  href: string;
  description: string;
  confidence: number;
  reason: string;
};

function getRecommendations(answers: Record<number, string>): Recommendation[] {
  const goal = answers[1];
  const process = answers[2];
  const experience = answers[3];
  const speed = answers[4];

  const recommendations: Recommendation[] = [];

  // Logic for recommendations based on answers
  if (goal === 'quote' && process === 'laser') {
    recommendations.push({
      title: 'Laser Cutting Calculator',
      href: '/calculators/laser-cutting',
      description: 'Complete cost calculation with material, energy, labor, and gas costs',
      confidence: 95,
      reason: 'Perfect match for laser cutting quotes with detailed breakdowns'
    });
    recommendations.push({
      title: 'Material Utilization Calculator',
      href: '/calculators/material-utilization',
      description: 'Optimize sheet layout to reduce waste',
      confidence: 75,
      reason: 'Helps improve profitability by reducing material waste'
    });
  } else if (goal === 'quote' && process === 'cnc') {
    recommendations.push({
      title: 'CNC Machining Calculator',
      href: '/calculators/cnc-machining',
      description: 'Project costing for milling, turning, and multi-axis operations',
      confidence: 95,
      reason: 'Designed specifically for CNC job quoting with batch pricing'
    });
  } else if (goal === 'purchase') {
    recommendations.push({
      title: 'Equipment ROI Calculator',
      href: '/calculators/roi',
      description: 'Investment analysis with payback period, NPV, and IRR',
      confidence: 95,
      reason: 'Essential tool for equipment purchase justification'
    });
    recommendations.push({
      title: 'Energy Cost Calculator',
      href: '/calculators/energy',
      description: 'Factor in operating costs for accurate ROI',
      confidence: 80,
      reason: 'Important for complete lifecycle cost analysis'
    });
  } else if (goal === 'analysis' && process === 'general') {
    recommendations.push({
      title: 'Energy Cost Calculator',
      href: '/calculators/energy',
      description: 'Analyze power consumption and identify savings',
      confidence: 90,
      reason: 'Best for general cost analysis and efficiency improvements'
    });
    recommendations.push({
      title: 'Overhead Allocator',
      href: '/calculators/cost-center/overhead-allocator',
      description: 'Understand indirect cost distribution',
      confidence: 75,
      reason: 'Helps identify hidden costs and optimization opportunities'
    });
  } else if (goal === 'optimize') {
    recommendations.push({
      title: 'Material Utilization Calculator',
      href: '/calculators/material-utilization',
      description: 'Maximize sheet usage and minimize waste',
      confidence: 95,
      reason: 'Specifically designed for material optimization'
    });
  } else if (process === 'multiple') {
    recommendations.push({
      title: 'Use Multiple Calculators',
      href: '/calculators',
      description: 'Combine laser cutting, welding, and finishing calculators',
      confidence: 85,
      reason: 'Complex projects benefit from using multiple specialized tools'
    });
  } else if (speed === 'quick') {
    recommendations.push({
      title: 'Quick Tools Collection',
      href: '/calculators/quick',
      description: 'Fast estimates for hourly rates, pierce time, and pricing',
      confidence: 90,
      reason: 'Optimized for speed when you need quick ballpark numbers'
    });
  } else {
    // Default recommendations
    recommendations.push({
      title: 'Laser Cutting Calculator',
      href: '/calculators/laser-cutting',
      description: 'Most popular tool for sheet metal fabrication',
      confidence: 85,
      reason: 'Great starting point for most manufacturing cost analysis'
    });
    recommendations.push({
      title: 'Browse All Calculators',
      href: '/calculators',
      description: 'Explore our full collection of cost calculators',
      confidence: 70,
      reason: 'See all available tools to find the perfect match'
    });
  }

  return recommendations.sort((a, b) => b.confidence - a.confidence);
}

export function CalculatorQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (questionId: number, value: string) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  const currentQuestionData = questions[currentQuestion];
  const selectedAnswer = answers[currentQuestionData?.id];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const recommendations = showResults ? getRecommendations(answers) : [];

  if (showResults) {
    return (
      <div className="rounded-xl border-2 border-primary-200 bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h3 className="mb-2 text-2xl font-bold text-gray-900">
            Your Personalized Recommendations
          </h3>
          <p className="text-gray-600">
            Based on your answers, here are the best calculators for your needs
          </p>
        </div>

        <div className="space-y-4">
          {recommendations.map((rec, idx) => (
            <div
              key={idx}
              className="rounded-lg border-2 border-gray-200 bg-gray-50 p-6 transition-all hover:border-primary-300 hover:bg-white hover:shadow-md"
            >
              <div className="mb-3 flex items-start justify-between gap-4">
                <div>
                  <h4 className="mb-1 text-xl font-bold text-gray-900">
                    {idx === 0 && (
                      <span className="mr-2 inline-block rounded-full bg-primary-600 px-3 py-1 text-sm font-semibold text-white">
                        Best Match
                      </span>
                    )}
                    {rec.title}
                  </h4>
                  <div className="mb-2 flex items-center gap-2">
                    <div className="h-2 w-32 overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-full bg-primary-600 transition-all"
                        style={{ width: `${rec.confidence}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-700">
                      {rec.confidence}% match
                    </span>
                  </div>
                </div>
              </div>
              <p className="mb-3 text-gray-700">{rec.description}</p>
              <p className="mb-4 text-sm italic text-gray-600">
                Why: {rec.reason}
              </p>
              <Link
                href={rec.href}
                className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white transition-all hover:bg-primary-700 hover:shadow-lg"
              >
                Use This Calculator
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={handleRestart}
            className="text-primary-600 hover:text-primary-700 font-semibold transition-colors"
          >
            ← Start Over
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border-2 border-primary-200 bg-white p-8 shadow-lg">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-sm text-gray-600">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full bg-primary-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h3 className="mb-6 text-2xl font-bold text-gray-900">
          {currentQuestionData.question}
        </h3>
        <div className="space-y-3">
          {currentQuestionData.answers.map((answer) => (
            <button
              key={answer.value}
              onClick={() => handleAnswer(currentQuestionData.id, answer.value)}
              className={`w-full rounded-lg border-2 p-4 text-left transition-all ${
                selectedAnswer === answer.value
                  ? 'border-primary-600 bg-primary-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-primary-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`font-medium ${
                  selectedAnswer === answer.value ? 'text-primary-700' : 'text-gray-900'
                }`}>
                  {answer.text}
                </span>
                {selectedAnswer === answer.value && (
                  <CheckCircle className="h-6 w-6 text-primary-600" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className={`flex items-center gap-2 rounded-lg px-6 py-3 font-semibold transition-all ${
            currentQuestion === 0
              ? 'cursor-not-allowed text-gray-400'
              : 'text-primary-600 hover:bg-primary-50'
          }`}
        >
          <ChevronLeft className="h-5 w-5" />
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={!selectedAnswer}
          className={`flex items-center gap-2 rounded-lg px-6 py-3 font-semibold transition-all ${
            !selectedAnswer
              ? 'cursor-not-allowed bg-gray-300 text-gray-500'
              : 'bg-primary-600 text-white hover:bg-primary-700 hover:shadow-lg'
          }`}
        >
          {currentQuestion === questions.length - 1 ? 'Get Recommendations' : 'Next'}
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

