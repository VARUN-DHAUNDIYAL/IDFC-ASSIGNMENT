import { Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface InfoTooltipProps {
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export default function InfoTooltip({ content, position = 'top', className = '' }: InfoTooltipProps) {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button 
            type="button" 
            className={`inline-flex items-center justify-center align-middle ml-1.5 focus:outline-none ${className}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <Info className="w-3.5 h-3.5 text-[#9CA3AF] hover:text-[#6B7280] transition-colors" />
          </button>
        </TooltipTrigger>
        <TooltipContent 
          side={position} 
          className="z-[100] w-max max-w-[260px] p-2.5 rounded-lg bg-[#111827] text-[#F9FAFB] text-[12px] font-normal tracking-normal text-left leading-relaxed shadow-lg border-0"
          sideOffset={4}
        >
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
