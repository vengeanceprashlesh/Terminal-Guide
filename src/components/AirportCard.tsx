
import { ChevronRight, Plane, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export interface AirportData {
  id: string;
  code: string;
  name: string;
  city: string;
  image: string;
  terminals: number;
  congestion: 'Low' | 'Moderate' | 'High';
  featured?: boolean;
}

interface AirportCardProps {
  airport: AirportData;
  className?: string;
}

const AirportCard = ({ airport, className }: AirportCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const getCongestionColor = (congestion: string) => {
    switch (congestion) {
      case 'Low': return 'text-green-500';
      case 'Moderate': return 'text-amber-500';
      case 'High': return 'text-red-500';
      default: return 'text-slate-500';
    }
  };
  
  return (
    <Link
      to={`/airports/${airport.id}`}
      className={cn(
        airport.featured ? 'airport-card-featured' : 'airport-card',
        'group',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-app-blue/10 text-app-blue">
              {airport.code}
            </span>
            {airport.featured && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                Featured
              </span>
            )}
          </div>
          <h3 className="text-lg font-semibold text-foreground group-hover:text-app-blue transition-colors">
            {airport.name}
          </h3>
          <p className="text-sm text-muted-foreground">{airport.city}</p>
        </div>
        <div className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
          isHovered ? "bg-app-blue text-white" : "bg-muted text-muted-foreground"
        )}>
          <ChevronRight size={20} className={cn(
            "transition-transform duration-300",
            isHovered && "transform translate-x-0.5"
          )} />
        </div>
      </div>
      
      <div className="h-[130px] overflow-hidden rounded-lg mt-4 mb-4">
        <img 
          src={airport.image} 
          alt={airport.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      
      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center space-x-4">
          <div className="flex flex-col items-center">
            <span className="text-xs text-muted-foreground">Terminals</span>
            <div className="flex items-center mt-1">
              <Plane size={14} className="text-app-light-slate mr-1" />
              <span className="text-sm font-medium">{airport.terminals}</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <span className="text-xs text-muted-foreground">Congestion</span>
            <div className="flex items-center mt-1">
              <Users size={14} className={`mr-1 ${getCongestionColor(airport.congestion)}`} />
              <span className={`text-sm font-medium ${getCongestionColor(airport.congestion)}`}>
                {airport.congestion}
              </span>
            </div>
          </div>
        </div>
        
        <div className={cn(
          "flex items-center justify-center w-8 h-8 rounded-full transition-all",
          "bg-app-blue/10 text-app-blue",
          "transform transition-transform duration-300",
          isHovered && "rotate-45"
        )}>
          <Plane size={16} />
        </div>
      </div>
    </Link>
  );
};

export default AirportCard;
