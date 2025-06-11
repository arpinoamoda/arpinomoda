import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

const sectionVariants = cva('block', {
  variants: {
    variant: {
      default: 'min-h-screen w-full flex justify-center items-center pt-[60px]',
    },
    size: {
      default: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <section
        className={cn(sectionVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </section>
    );
  },
);
Section.displayName = 'Section';

const SectionInner = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <div
        className="w-full p-8 text-center"
        {...props}
      >
        {children}
      </div>
    );
  },
);
Section.displayName = 'Section';

export { Section, SectionInner, sectionVariants };
