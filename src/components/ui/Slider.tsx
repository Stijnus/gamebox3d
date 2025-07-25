import React from 'react';
import { cn } from '../../lib/utils';

interface SliderProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number[];
  onValueChange: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ className, value, onValueChange, min = 0, max = 100, step = 1, disabled, ...props }, ref) => {
    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!disabled) {
        onValueChange([parseFloat(e.target.value)]);
      }
    };

    return (
      <div
        ref={ref}
        className={cn('relative flex w-full touch-none select-none items-center', className)}
        {...props}
      >
        <div className="relative w-full">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value[0] || 0}
            onChange={handleSliderChange}
            disabled={disabled}
            className={cn(
              'w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50',
              'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
              '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md',
              '[&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:shadow-md'
            )}
          />
        </div>
      </div>
    );
  }
);
Slider.displayName = 'Slider';

export { Slider };