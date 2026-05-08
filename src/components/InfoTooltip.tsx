import { useState, useRef, useEffect } from 'react';
import { Info } from 'lucide-react';

interface InfoTooltipProps {
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export default function InfoTooltip({ content, position = 'top', className = '' }: InfoTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setIsVisible(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const posClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  };

  return (
    <div 
      className={`relative inline-flex items-center justify-center align-middle ml-1.5 ${className}`} 
      ref={tooltipRef}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onClick={(e) => {
        e.stopPropagation();
        setIsVisible(!isVisible);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsVisible(!isVisible);
        }
        if (e.key === 'Escape') setIsVisible(false);
      }}
      tabIndex={0}
      role="button"
      aria-label="More information"
      aria-expanded={isVisible}
    >
      <Info className="w-3.5 h-3.5 text-[#9CA3AF] hover:text-[#6B7280] cursor-pointer transition-colors" />

      {isVisible && (
        <div 
          className={`absolute z-[100] w-max max-w-[260px] p-2.5 rounded-lg bg-[rgba(17,24,39,0.94)] text-[#F9FAFB] text-[12px] font-normal tracking-normal text-left leading-relaxed shadow-lg animate-fadeIn ${posClasses[position]}`}
          onClick={(e) => e.stopPropagation()}
        >
          {content}
        </div>
      )}
    </div>
  );
}
