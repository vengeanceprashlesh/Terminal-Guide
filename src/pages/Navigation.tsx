
import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Navigation2, MapPin, Plane, ArrowRight, Users, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import PageLayout from '@/components/PageLayout';
import TerminalMap from '@/components/TerminalMap';

// Mock terminal data
const terminals = {
  't1-del': {
    id: 't1',
    name: 'Terminal 1',
    level: 1,
    airport: 'DEL',
    airportName: 'Indira Gandhi International Airport',
  },
  't3-del': {
    id: 't3',
    name: 'Terminal 3',
    level: 1,
    airport: 'DEL',
    airportName: 'Indira Gandhi International Airport',
  },
  't2-bom': {
    id: 't2',
    name: 'Terminal 2',
    level: 1,
    airport: 'BOM',
    airportName: 'Chhatrapati Shivaji International Airport',
  }
};

// Mock locations for terminal map
const locations = [
  { id: 'entrance', name: 'Main Entrance', type: 'entrance', level: 1, x: 15, y: 50 },
  { id: 'security', name: 'Security Checkpoint', type: 'security', level: 1, x: 17, y: 31 },
  { id: 'gate-1', name: 'Gate A1', type: 'gate', level: 1, x: 40, y: 15 },
  { id: 'gate-2', name: 'Gate A2', type: 'gate', level: 1, x: 50, y: 15 },
  { id: 'gate-3', name: 'Gate A3', type: 'gate', level: 1, x: 60, y: 15 },
  { id: 'rest-1', name: 'Restroom', type: 'restroom', level: 1, x: 40, y: 40 },
  { id: 'food-1', name: 'Food Court', type: 'restaurant', level: 1, x: 60, y: 40 },
  { id: 'shop-1', name: 'Duty Free', type: 'shop', level: 1, x: 75, y: 40 },
  { id: 'baggage', name: 'Baggage Claim', type: 'baggage', level: 1, x: 82, y: 31 },
  { id: 'exit', name: 'Exit', type: 'exit', level: 1, x: 85, y: 50 },
];

const routes = {
  'entrance-to-gate-1': {
    from: 'entrance',
    to: 'gate-1',
    points: [
      { x: 15, y: 50 },
      { x: 15, y: 40 },
      { x: 25, y: 31 },
      { x: 40, y: 31 },
      { x: 40, y: 15 },
    ],
    distance: '350m',
    time: '5 min'
  },
  'entrance-to-gate-2': {
    from: 'entrance',
    to: 'gate-2',
    points: [
      { x: 15, y: 50 },
      { x: 15, y: 40 },
      { x: 25, y: 31 },
      { x: 40, y: 31 },
      { x: 50, y: 31 },
      { x: 50, y: 15 },
    ],
    distance: '400m',
    time: '6 min'
  },
  'entrance-to-food-1': {
    from: 'entrance',
    to: 'food-1',
    points: [
      { x: 15, y: 50 },
      { x: 15, y: 40 },
      { x: 25, y: 31 },
      { x: 40, y: 31 },
      { x: 60, y: 31 },
      { x: 60, y: 40 },
    ],
    distance: '310m',
    time: '4 min'
  },
  'entrance-to-shop-1': {
    from: 'entrance',
    to: 'shop-1',
    points: [
      { x: 15, y: 50 },
      { x: 15, y: 40 },
      { x: 25, y: 31 },
      { x: 60, y: 31 },
      { x: 75, y: 31 },
      { x: 75, y: 40 },
    ],
    distance: '375m',
    time: '5 min'
  },
};

const Navigation = () => {
  const [searchParams] = useSearchParams();
  const [currentTerminal, setCurrentTerminal] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [startLocation, setStartLocation] = useState<string>('entrance');
  const [endLocation, setEndLocation] = useState<string | null>(null);
  const [currentRoute, setCurrentRoute] = useState<any>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  
  // Process query parameters
  useEffect(() => {
    const terminal = searchParams.get('terminal');
    const airport = searchParams.get('airport');
    const destination = searchParams.get('destination');
    
    if (terminal && airport) {
      setCurrentTerminal(`${terminal}-${airport}`);
    } else if (airport) {
      // Default to first terminal if only airport is specified
      const terminalKey = Object.keys(terminals).find(key => key.endsWith(airport.toLowerCase()));
      if (terminalKey) {
        setCurrentTerminal(terminalKey);
      }
    } else {
      // Default terminal
      setCurrentTerminal('t3-del');
    }
    
    if (destination) {
      setEndLocation(destination);
    }
  }, [searchParams]);
  
  // Filter locations based on search term
  const filteredLocations = locations.filter(
    location => location.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleStartNavigation = () => {
    if (startLocation && endLocation) {
      const routeKey = `${startLocation}-to-${endLocation}`;
      // Use a predefined route or generate a fallback one
      const route = routes[routeKey as keyof typeof routes] || {
        from: startLocation,
        to: endLocation,
        points: [
          { x: locations.find(l => l.id === startLocation)?.x || 0, y: locations.find(l => l.id === startLocation)?.y || 0 },
          { x: locations.find(l => l.id === endLocation)?.x || 0, y: locations.find(l => l.id === endLocation)?.y || 0 },
        ],
        distance: '200m',
        time: '3 min'
      };
      
      setCurrentRoute(route);
      setIsNavigating(true);
    }
  };
  
  const handleStopNavigation = () => {
    setIsNavigating(false);
    setCurrentRoute(null);
  };
  
  if (!currentTerminal || !terminals[currentTerminal as keyof typeof terminals]) {
    return (
      <PageLayout>
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold mb-4">Select a Terminal</h1>
          <p className="text-muted-foreground mb-8">
            Please select an airport and terminal to start navigation.
          </p>
          <Link 
            to="/airports"
            className="inline-flex items-center px-4 py-2 rounded-lg bg-primary text-primary-foreground"
          >
            <Plane className="mr-2 h-4 w-4" /> Browse Airports
          </Link>
        </div>
      </PageLayout>
    );
  }
  
  const terminal = terminals[currentTerminal as keyof typeof terminals];
  
  return (
    <PageLayout>
      <div className="max-w-6xl mx-auto animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Airport Navigation</h1>
            <p className="text-muted-foreground">
              {terminal.airportName} - {terminal.name}
            </p>
          </div>
          
          <Link
            to={`/airports/${terminal.airport}`}
            className="inline-flex items-center px-3 py-1.5 text-sm rounded-lg bg-muted hover:bg-muted/80"
          >
            Airport Info <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        {!isNavigating ? (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/3 order-2 lg:order-1">
              <div className="rounded-xl border p-6 bg-card sticky top-6">
                <h2 className="text-xl font-semibold mb-4">Plan Your Route</h2>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Starting Point
                  </label>
                  <select
                    className="w-full border rounded-lg px-3 py-2 bg-background"
                    value={startLocation}
                    onChange={(e) => setStartLocation(e.target.value)}
                  >
                    {locations.map(location => (
                      <option key={location.id} value={location.id}>
                        {location.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Destination
                  </label>
                  <div className={cn(
                    "relative overflow-hidden",
                    "backdrop-blur-sm border rounded-lg",
                    "bg-white/70 hover:bg-white/80 transition-all"
                  )}>
                    <div className="flex items-center px-3 py-2">
                      <Search className="w-4 h-4 mr-2 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Search destinations..."
                        className="flex-1 bg-transparent border-0 outline-none text-foreground placeholder:text-muted-foreground"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  {searchTerm && (
                    <div className="mt-2 max-h-60 overflow-y-auto rounded-lg border bg-card shadow-sm">
                      {filteredLocations.length > 0 ? (
                        filteredLocations.map(location => (
                          <div
                            key={location.id}
                            className="px-3 py-2.5 hover:bg-muted/50 cursor-pointer transition-colors border-b last:border-b-0"
                            onClick={() => {
                              setEndLocation(location.id);
                              setSearchTerm(location.name);
                            }}
                          >
                            <div className="font-medium">{location.name}</div>
                            <div className="text-xs text-muted-foreground">{getLocationType(location.type)}</div>
                          </div>
                        ))
                      ) : (
                        <div className="px-3 py-4 text-center text-muted-foreground">
                          No locations found
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between items-center text-sm text-muted-foreground mb-6">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    Low Congestion
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {getEstimatedTime()}
                  </div>
                </div>
                
                <button
                  className="w-full px-4 py-3 bg-app-blue text-white rounded-lg flex items-center justify-center font-medium"
                  onClick={handleStartNavigation}
                  disabled={!endLocation}
                >
                  <Navigation2 className="mr-2 h-5 w-5" />
                  Start Navigation
                </button>
                
                <div className="mt-6 space-y-2">
                  <h3 className="text-sm font-medium">Popular Destinations</h3>
                  {['gate-1', 'food-1', 'shop-1', 'baggage'].map(id => {
                    const location = locations.find(l => l.id === id);
                    if (!location) return null;
                    
                    return (
                      <div
                        key={id}
                        className="flex items-center justify-between px-3 py-2 rounded-lg border hover:bg-muted/20 cursor-pointer"
                        onClick={() => {
                          setEndLocation(id);
                          setSearchTerm(location.name);
                        }}
                      >
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-3">
                            <MapPin className="w-4 h-4 text-app-blue" />
                          </div>
                          <div>
                            <div className="font-medium text-sm">{location.name}</div>
                            <div className="text-xs text-muted-foreground">{getLocationType(location.type)}</div>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-app-blue" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            
            <div className="lg:w-2/3 order-1 lg:order-2">
              <div className="rounded-xl border overflow-hidden">
                <TerminalMap
                  terminal={terminal}
                  locations={locations}
                  className="h-[600px]"
                  currentLocation={startLocation}
                  destination={endLocation || undefined}
                />
              </div>
              <div className="mt-4 text-center text-sm text-muted-foreground">
                Select a destination and click "Start Navigation" to see the route
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/3">
              <div className="rounded-xl border p-6 bg-card sticky top-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Navigation</h2>
                  <button
                    className="text-sm text-app-blue hover:underline"
                    onClick={handleStopNavigation}
                  >
                    Stop
                  </button>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-app-blue/10 flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-app-blue" />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium">From</div>
                        <div className="text-foreground">
                          {locations.find(l => l.id === currentRoute?.from)?.name || 'Starting Point'}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-px h-10 bg-muted mx-4 my-1"></div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-app-indigo/10 flex items-center justify-center">
                        <Navigation2 className="w-4 h-4 text-app-indigo" />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium">To</div>
                        <div className="text-foreground">
                          {locations.find(l => l.id === currentRoute?.to)?.name || 'Destination'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between p-3 mb-6 rounded-lg bg-muted/30">
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Distance</div>
                    <div className="font-medium">{currentRoute?.distance || '300m'}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Est. Time</div>
                    <div className="font-medium">{currentRoute?.time || '4 min'}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Congestion</div>
                    <div className="font-medium text-green-600">Low</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Turn-by-Turn Directions</h3>
                  
                  <div className="rounded-lg border p-3 bg-muted/20">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-app-blue flex items-center justify-center text-white text-xs">
                        1
                      </div>
                      <div className="ml-3 text-sm">
                        Walk straight from {locations.find(l => l.id === currentRoute?.from)?.name}
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border p-3">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs">
                        2
                      </div>
                      <div className="ml-3 text-sm">
                        Turn right at Security Checkpoint
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border p-3">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs">
                        3
                      </div>
                      <div className="ml-3 text-sm">
                        Continue straight for 150m
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border p-3">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs">
                        4
                      </div>
                      <div className="ml-3 text-sm">
                        {currentRoute?.to === 'gate-1' || currentRoute?.to === 'gate-2' || currentRoute?.to === 'gate-3' 
                          ? 'Turn left and proceed to the gate' 
                          : 'You have arrived at your destination'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-2/3">
              <div className="rounded-xl border overflow-hidden">
                <TerminalMap
                  terminal={terminal}
                  locations={locations}
                  path={currentRoute}
                  currentLocation={currentRoute?.from}
                  destination={currentRoute?.to}
                  showAnimation={true}
                  className="h-[600px]"
                />
              </div>
              <div className="mt-4 text-center text-sm text-muted-foreground">
                Following the highlighted path to your destination
              </div>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

// Helper functions
function getLocationType(type: string): string {
  switch (type) {
    case 'gate': return 'Boarding Gate';
    case 'restaurant': return 'Food & Beverages';
    case 'restroom': return 'Restroom';
    case 'shop': return 'Retail Store';
    case 'security': return 'Security Checkpoint';
    case 'baggage': return 'Baggage Claim';
    case 'entrance': return 'Airport Entrance';
    case 'exit': return 'Airport Exit';
    default: return 'Location';
  }
}

function getEstimatedTime(): string {
  return '4-6 min';
}

export default Navigation;
