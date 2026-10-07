import React from 'react';
import { Check } from 'lucide-react';

interface Step {
  id: number;
  label: string;
}

interface ProgressBarProps {
  steps: Step[];
  currentStep: number;
  completionPercentage?: number;
  showLinearBar?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  steps,
  currentStep,
  completionPercentage,
  showLinearBar = true,
}) => {
  const activePercentage =
    completionPercentage !== undefined
      ? Math.min(100, Math.max(0, completionPercentage))
      : Math.round(((currentStep - 1) / (steps.length - 1)) * 100);

  return (
    <div className="stepper-container">
      {/* Visual Multi-step Stepper */}
      <div className="stepper-header">
        <div className="stepper-progress-track">
          <div
            className="stepper-progress-fill"
            style={{
              width: `${((currentStep - 1) / Math.max(1, steps.length - 1)) * 100}%`,
            }}
          />
        </div>

        {steps.map((step) => {
          const isCompleted = step.id < currentStep;
          const isActive = step.id === currentStep;

          return (
            <div
              key={step.id}
              className={`step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
            >
              <div className="step-bubble">
                {isCompleted ? <Check size={18} strokeWidth={3} /> : step.id}
              </div>
              <span className="step-label">{step.label}</span>
            </div>
          );
        })}
      </div>

      {/* Actual Form Completion Percentage Indicator */}
      {showLinearBar && (
        <div style={{ marginTop: '1.25rem', padding: '0 0.5rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: 'var(--navy-600)',
              marginBottom: '0.35rem',
            }}
          >
            <span>Required Information Completed</span>
            <span style={{ color: activePercentage === 100 ? 'var(--primary-700)' : 'var(--navy-900)' }}>
              {activePercentage}%
            </span>
          </div>
          <div className="progress-bar-container">
            <div
              className="progress-bar-fill"
              style={{
                width: `${activePercentage}%`,
                backgroundColor: activePercentage === 100 ? '#059669' : undefined,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
