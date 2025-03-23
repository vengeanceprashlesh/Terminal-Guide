
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface Terminal {
  id: string;
  name: string;
  level: number;
}

interface Location {
  id: string;
  name: string;
  type: 'gate' | 'restaurant' | 'restroom' | 'shop' | 'security' | 'baggage' | 'entrance' | 'exit';
  level: number;
  x: number;
  y: number;
}

interface Path {
  from: string;
  to: string;
  points: { x: number; y: number }[];
}

interface TerminalMapProps {
  terminal: Terminal;
  locations: Location[];
  path?: Path;
  className?: string;
  currentLocation?: string;
  destination?: string;
  showAnimation?: boolean;
}

const TerminalMap = ({
  terminal,
  locations,
  path,
  className,
  currentLocation,
  destination,
  showAnimation = false
}: TerminalMapProps) => {
  const [currentPoint, setCurrentPoint] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  // Count facilities by type
  const facilityCounts = {
    gate: locations.filter(loc => loc.type === 'gate').length,
    restaurant: locations.filter(loc => loc.type === 'restaurant').length,
    shop: locations.filter(loc => loc.type === 'shop').length,
    restroom: locations.filter(loc => loc.type === 'restroom').length,
  };

  useEffect(() => {
    if (showAnimation && path && path.points.length > 0) {
      setIsAnimating(true);
      const interval = setInterval(() => {
        setCurrentPoint(prev => {
          if (prev < path.points.length - 1) {
            return prev + 1;
          } else {
            clearInterval(interval);
            setIsAnimating(false);
            return prev;
          }
        });
      }, 500);
      
      return () => clearInterval(interval);
    }
  }, [showAnimation, path]);

  const getIconForLocationType = (type: Location['type']) => {
    switch (type) {
      case 'gate':
        return '✈️';
      case 'restaurant':
        return '🍽️';
      case 'restroom':
        return '🚻';
      case 'shop':
        return '🛍️';
      case 'security':
        return '🔒';
      case 'baggage':
        return '🧳';
      case 'entrance':
        return '🚪';
      case 'exit':
        return '🚪';
      default:
        return '📍';
    }
  };

  const getLocationClasses = (location: Location) => {
    let baseClasses = "absolute transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full";
    
    if (location.id === currentLocation) {
      return cn(baseClasses, "bg-app-blue text-white z-20 animate-pulse-subtle");
    }
    
    if (location.id === destination) {
      return cn(baseClasses, "bg-app-indigo text-white z-20 animate-pulse");
    }
    
    return cn(baseClasses, "bg-white border border-gray-200 text-gray-700 hover:border-app-blue hover:bg-app-blue/10 transition-all");
  };

  return (
    <div className={cn("terminal-map relative w-full h-[600px]", className)}>
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        <div className="bg-white px-3 py-1.5 rounded-lg shadow-sm border text-sm font-medium">
          {terminal.name} - Level {terminal.level}
        </div>
        
        <div className="bg-white px-3 py-1.5 rounded-lg shadow-sm border text-xs grid grid-cols-2 gap-x-4 gap-y-1">
          <div className="flex items-center">
            <span className="mr-1">✈️</span> Gates: {facilityCounts.gate}
          </div>
          <div className="flex items-center">
            <span className="mr-1">🍽️</span> Restaurants: {facilityCounts.restaurant}
          </div>
          <div className="flex items-center">
            <span className="mr-1">🛍️</span> Shops: {facilityCounts.shop}
          </div>
          <div className="flex items-center">
            <span className="mr-1">🚻</span> Restrooms: {facilityCounts.restroom}
          </div>
        </div>
      </div>
      
      {/* Airport floor layout - This is a simplified version */}
      <svg width="100%" height="100%" viewBox="0 0 1000 800" className="rounded-xl">
        <rect x="50" y="50" width="900" height="700" rx="20" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="2" />
        
        {/* Main hallways */}
        <rect x="150" y="150" width="700" height="100" rx="10" fill="#E2E8F0" />
        <rect x="150" y="350" width="700" height="100" rx="10" fill="#E2E8F0" />
        <rect x="150" y="550" width="700" height="100" rx="10" fill="#E2E8F0" />
        
        {/* Vertical connections */}
        <rect x="250" y="150" width="50" height="500" rx="10" fill="#E2E8F0" />
        <rect x="500" y="150" width="50" height="500" rx="10" fill="#E2E8F0" />
        <rect x="750" y="150" width="50" height="500" rx="10" fill="#E2E8F0" />
        
        {/* Security area */}
        <rect x="100" y="275" width="150" height="150" rx="10" fill="#FEF9C3" stroke="#FBBF24" strokeWidth="2" strokeDasharray="5,5" />
        <text x="175" y="350" fontSize="12" fill="#B45309" textAnchor="middle">Security</text>
        
        {/* Baggage claim */}
        <rect x="750" y="275" width="150" height="150" rx="10" fill="#DBEAFE" stroke="#60A5FA" strokeWidth="2" strokeDasharray="5,5" />
        <text x="825" y="350" fontSize="12" fill="#1D4ED8" textAnchor="middle">Baggage Claim</text>
        
        {/* Gates area */}
        <rect x="350" y="50" width="300" height="75" rx="10" fill="#D1FAE5" stroke="#34D399" strokeWidth="2" />
        <text x="500" y="87.5" fontSize="12" fill="#047857" textAnchor="middle">Gates</text>
        
        {/* Path visualization */}
        {path && path.points.length > 0 && path.points.map((point, index) => {
          // Skip if it's the last point
          if (index === path.points.length - 1) return null;
          
          const nextPoint = path.points[index + 1];
          const dx = nextPoint.x - point.x;
          const dy = nextPoint.y - point.y;
          const length = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);
          
          const isActive = showAnimation ? index <= currentPoint : true;
          
          return (
            <g key={`path-${index}`}>
              <line 
                x1={`${point.x}%`} 
                y1={`${point.y}%`} 
                x2={`${nextPoint.x}%`} 
                y2={`${nextPoint.y}%`} 
                stroke="#3B82F6" 
                strokeWidth="4" 
                strokeLinecap="round"
                strokeDasharray={isActive ? "none" : "5,5"}
                opacity={isActive ? 1 : 0.5}
              />
              <circle 
                cx={`${point.x}%`} 
                cy={`${point.y}%`} 
                r="4" 
                fill="#3B82F6" 
                opacity={isActive ? 1 : 0.5}
              />
            </g>
          );
        })}
      </svg>
      
      {/* Locations */}
      {locations.map((location) => (
        <div
          key={location.id}
          className={getLocationClasses(location)}
          style={{
            left: `${location.x}%`,
            top: `${location.y}%`,
          }}
          title={location.name}
          onMouseEnter={() => setShowTooltip(location.id)}
          onMouseLeave={() => setShowTooltip(null)}
        >
          <span className="text-sm">{getIconForLocationType(location.type)}</span>
          
          {showTooltip === location.id && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 bg-black bg-opacity-75 text-white text-xs py-1 px-2 rounded pointer-events-none whitespace-nowrap z-30">
              {location.name}
            </div>
          )}
        </div>
      ))}
      
      {/* User current position on the path */}
      {showAnimation && path && isAnimating && currentPoint < path.points.length && (
        <div 
          className="absolute w-6 h-6 bg-app-blue rounded-full shadow-lg z-30 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
          style={{
            left: `${path.points[currentPoint].x}%`,
            top: `${path.points[currentPoint].y}%`,
            transition: 'left 0.5s ease, top 0.5s ease'
          }}
        >
          <div className="w-3 h-3 bg-white rounded-full" />
        </div>
      )}
    </div>
  );
};

export default TerminalMap;
