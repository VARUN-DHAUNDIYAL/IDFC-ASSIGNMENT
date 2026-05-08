import { useState, type ReactNode } from 'react';
import { Info } from 'lucide-react';

interface TooltipEngineProps {
  content: string;
  children?: ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  size?: 'sm' | 'md';
}

export function InfoTooltip({ content, side = 'top', size = 'sm' }: { content: string; side?: 'top' | 'bottom' | 'left' | 'right'; size?: 'sm' | 'md' }) {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent',
    left: 'left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent',
    right: 'right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent',
  };

  return (
    <div
      className="relative inline-flex items-center"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <Info
        className={`text-gray-600 hover:text-gray-400 transition-colors cursor-help flex-shrink-0 ${size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'}`}
      />
      {isVisible && (
        <div
          className={`absolute z-[100] ${positionClasses[side]} w-72 px-4 py-3 tooltip-glass rounded-lg shadow-2xl animate-fadeIn`}
        >
          <p className="text-xs text-gray-300 leading-relaxed">{content}</p>
          <div
            className={`absolute w-2 h-2 border-4 border-[rgba(26,26,26,0.95)] ${arrowClasses[side]}`}
          />
        </div>
      )}
    </div>
  );
}

export default function TooltipEngine({ content, children, side = 'top' }: TooltipEngineProps) {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div
      className="relative inline-flex items-center"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className={`absolute z-[100] ${positionClasses[side]} w-64 px-3 py-2 tooltip-glass rounded-lg shadow-xl animate-fadeIn`}
        >
          <p className="text-xs text-gray-400 leading-relaxed">{content}</p>
        </div>
      )}
    </div>
  );
}
