
import { ReactNode } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

type PageLayoutProps = {
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
  noPadding?: boolean;
};

const PageLayout = ({ 
  children, 
  className,
  fullWidth = false,
  noPadding = false
}: PageLayoutProps) => {
  const isMobile = useIsMobile();
  
  return (
    <main className={cn(
      "min-h-screen w-full transition-all duration-300",
      isMobile ? "pb-24" : "ml-20",
      !noPadding && "p-6 md:p-8",
      !fullWidth && "max-w-screen-2xl mx-auto",
      className
    )}>
      <div className="animate-fade-in">
        {children}
      </div>
    </main>
  );
};

export default PageLayout;
