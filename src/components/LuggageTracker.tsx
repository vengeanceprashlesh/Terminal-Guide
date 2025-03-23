
import { Luggage, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface LuggageItem {
  id: string;
  tagNumber: string;
  flightNumber: string;
  status: 'checked-in' | 'in-transit' | 'arrived' | 'delayed' | 'missing';
  lastUpdated: string;
  estimatedArrival?: string;
  location?: string;
}

interface LuggageTrackerProps {
  items: LuggageItem[];
  className?: string;
}

const LuggageTracker = ({ items, className }: LuggageTrackerProps) => {
  const getStatusInfo = (status: LuggageItem['status']) => {
    switch (status) {
      case 'checked-in':
        return {
          label: 'Checked In',
          color: 'text-blue-600',
          bg: 'bg-blue-100',
          icon: Clock
        };
      case 'in-transit':
        return {
          label: 'In Transit',
          color: 'text-amber-600',
          bg: 'bg-amber-100',
          icon: Luggage
        };
      case 'arrived':
        return {
          label: 'Arrived',
          color: 'text-green-600',
          bg: 'bg-green-100',
          icon: CheckCircle
        };
      case 'delayed':
        return {
          label: 'Delayed',
          color: 'text-orange-600',
          bg: 'bg-orange-100',
          icon: Clock
        };
      case 'missing':
        return {
          label: 'Missing',
          color: 'text-red-600',
          bg: 'bg-red-100',
          icon: AlertCircle
        };
      default:
        return {
          label: 'Unknown',
          color: 'text-gray-600',
          bg: 'bg-gray-100',
          icon: Luggage
        };
    }
  };
  
  return (
    <div className={cn("space-y-4", className)}>
      {items.map((item) => {
        const statusInfo = getStatusInfo(item.status);
        
        return (
          <div key={item.id} className="luggage-tag group animate-slide-up">
            <div 
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full",
                statusInfo.bg,
                statusInfo.color
              )}
            >
              <statusInfo.icon size={20} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold">Bag #{item.tagNumber}</h3>
                    <span className={cn(
                      "text-xs px-2 py-0.5 rounded-full",
                      statusInfo.bg,
                      statusInfo.color
                    )}>
                      {statusInfo.label}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Flight: {item.flightNumber}
                  </p>
                </div>
                
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">
                    Last updated: {item.lastUpdated}
                  </p>
                  {item.estimatedArrival && (
                    <p className="text-xs font-medium">
                      ETA: {item.estimatedArrival}
                    </p>
                  )}
                </div>
              </div>
              
              {item.location && (
                <div className="mt-2 text-sm">
                  <span className="font-medium">Location:</span> {item.location}
                </div>
              )}
            </div>
          </div>
        );
      })}
      
      {items.length === 0 && (
        <div className="flex flex-col items-center justify-center p-8 border rounded-lg bg-muted/20">
          <Luggage className="w-12 h-12 text-muted mb-3" />
          <h3 className="text-lg font-medium text-foreground">No Luggage Found</h3>
          <p className="text-sm text-muted-foreground mt-1">
            You don't have any luggage being tracked at the moment
          </p>
        </div>
      )}
    </div>
  );
};

export default LuggageTracker;
