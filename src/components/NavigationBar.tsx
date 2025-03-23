
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Plane, MapPin, Luggage, Settings, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Airports', path: '/airports', icon: Plane },
    { name: 'Navigation', path: '/navigation', icon: MapPin },
    { name: 'Luggage', path: '/luggage', icon: Luggage },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];
  
  const toggle = () => setIsOpen(!isOpen);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <>
      {isMobile && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <button
            onClick={toggle}
            className="flex items-center justify-center w-16 h-16 rounded-full bg-app-blue text-white shadow-xl transition-all hover:bg-app-indigo"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      )}
      
      <nav 
        className={cn(
          "fixed z-40 transition-all duration-300 ease-in-out",
          isMobile 
            ? isOpen 
              ? "bottom-24 left-1/2 transform -translate-x-1/2 glass-panel rounded-2xl shadow-xl w-11/12 mx-auto py-4 opacity-100" 
              : "bottom-24 left-1/2 transform -translate-x-1/2 opacity-0 pointer-events-none"
            : "left-0 top-0 h-full w-20 border-r border-border py-6 bg-background shadow-sm"
        )}
      >
        <div className={cn(
          "flex",
          isMobile ? "flex-row justify-around" : "flex-col items-center gap-8"
        )}>
          {!isMobile && (
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-8">
              <Plane className="text-primary w-6 h-6" />
            </div>
          )}
          
          {navItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path}
              className={cn(
                isMobile 
                  ? "flex flex-col items-center justify-center p-3 rounded-lg transition-all" 
                  : "flex flex-col items-center justify-center p-3 rounded-lg transition-all w-14 h-14",
                isActive(item.path) 
                  ? "text-app-blue" 
                  : "text-muted-foreground hover:text-foreground"
              )}
              onClick={isMobile ? toggle : undefined}
            >
              <item.icon 
                className={cn(
                  "w-5 h-5 mb-1",
                  isActive(item.path) && "animate-pulse-subtle"
                )} 
              />
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};

export default NavigationBar;
