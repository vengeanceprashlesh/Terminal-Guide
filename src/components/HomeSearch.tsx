
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plane, MapPin, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchOption {
  id: string;
  type: 'airport' | 'terminal' | 'location';
  name: string;
  subtitle: string;
}

const mockOptions: SearchOption[] = [
  { id: 'del', type: 'airport', name: 'Indira Gandhi International Airport', subtitle: 'Delhi (DEL)' },
  { id: 'bom', type: 'airport', name: 'Chhatrapati Shivaji International Airport', subtitle: 'Mumbai (BOM)' },
  { id: 'blr', type: 'airport', name: 'Kempegowda International Airport', subtitle: 'Bangalore (BLR)' },
  { id: 'del-t3', type: 'terminal', name: 'Terminal 3', subtitle: 'Delhi Airport (DEL)' },
  { id: 'bom-t2', type: 'terminal', name: 'Terminal 2', subtitle: 'Mumbai Airport (BOM)' },
  { id: 'del-foodcourt', type: 'location', name: 'International Food Court', subtitle: 'Delhi T3, Level 3' },
];

const HomeSearch = () => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  
  const filteredOptions = query 
    ? mockOptions.filter(option => 
        option.name.toLowerCase().includes(query.toLowerCase()) || 
        option.subtitle.toLowerCase().includes(query.toLowerCase())
      )
    : [];
  
  const handleOptionSelect = (option: SearchOption) => {
    switch (option.type) {
      case 'airport':
        navigate(`/airports/${option.id}`);
        break;
      case 'terminal':
        const [airportId, terminalId] = option.id.split('-');
        navigate(`/airports/${airportId}?terminal=${terminalId}`);
        break;
      case 'location':
        navigate(`/navigation?destination=${option.id}`);
        break;
      default:
        break;
    }
    
    setQuery('');
    setIsFocused(false);
  };
  
  const getIconForType = (type: SearchOption['type']) => {
    switch (type) {
      case 'airport':
        return Plane;
      case 'terminal':
        return Plane;
      case 'location':
        return MapPin;
      default:
        return Search;
    }
  };
  
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className={cn(
        "relative overflow-hidden transition-all duration-300",
        "backdrop-blur-sm border rounded-xl shadow-sm",
        isFocused ? "bg-white/90 ring-2 ring-app-blue/30" : "bg-white/70 hover:bg-white/80"
      )}>
        <div className="flex items-center px-4 py-3">
          <Search className={cn(
            "w-5 h-5 mr-3 transition-colors",
            isFocused ? "text-app-blue" : "text-muted-foreground"
          )} />
          <input
            type="text"
            placeholder="Search for airports, terminals, gates, or facilities..."
            className="flex-1 bg-transparent border-0 outline-none text-foreground placeholder:text-muted-foreground"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          />
        </div>
        
        {isFocused && (
          <div className="border-t overflow-hidden">
            {filteredOptions.length > 0 ? (
              <ul className="py-2 max-h-[300px] overflow-y-auto">
                {filteredOptions.map((option) => {
                  const Icon = getIconForType(option.type);
                  
                  return (
                    <li 
                      key={option.id}
                      className="px-4 py-2.5 hover:bg-muted/50 cursor-pointer transition-colors flex items-center"
                      onClick={() => handleOptionSelect(option)}
                    >
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center mr-3",
                        option.type === 'airport' ? "bg-blue-100 text-blue-600" :
                        option.type === 'terminal' ? "bg-amber-100 text-amber-600" :
                        "bg-green-100 text-green-600"
                      )}>
                        <Icon size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-foreground">{option.name}</div>
                        <div className="text-xs text-muted-foreground">{option.subtitle}</div>
                      </div>
                      <ArrowRight size={16} className="text-muted-foreground" />
                    </li>
                  );
                })}
              </ul>
            ) : query ? (
              <div className="py-8 text-center">
                <p className="text-muted-foreground">No results found for "{query}"</p>
              </div>
            ) : (
              <ul className="py-2">
                <li className="px-4 py-2 text-muted-foreground text-sm">
                  Start typing to search for airports and facilities...
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeSearch;
