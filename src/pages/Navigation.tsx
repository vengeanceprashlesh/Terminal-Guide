
import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MapPin, X, Search, ChevronDown, ChevronUp, CornerDownRight, Clock, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import PageLayout from '@/components/PageLayout';
import TerminalMap from '@/components/TerminalMap';
import { toast } from '@/components/ui/use-toast';

interface Location {
  id: string;
  name: string;
  type: 'gate' | 'security' | 'restaurant' | 'restroom' | 'shop' | 'baggage' | 'entrance' | 'exit';
  level: number;
  x: number;
  y: number;
}

interface Terminal {
  id: string;
  name: string;
  level: number;
}

interface Path {
  from: string;
  to: string;
  points: { x: number; y: number }[];
  distance: number;
  estimatedTime: number;
}

// Terminal 1 Locations
const terminal1Locations: Location[] = [
  {
    id: 'entrance-1',
    name: 'Main Entrance',
    type: 'entrance',
    level: 0,
    x: 10,
    y: 45
  },
  {
    id: 'security-1',
    name: 'Security Checkpoint',
    type: 'security',
    level: 1,
    x: 15,
    y: 35
  },
  {
    id: 'gate-b1',
    name: 'Gate B1',
    type: 'gate',
    level: 1,
    x: 35,
    y: 20
  },
  {
    id: 'gate-b2',
    name: 'Gate B2',
    type: 'gate',
    level: 1,
    x: 45,
    y: 18
  },
  {
    id: 'gate-b3',
    name: 'Gate B3',
    type: 'gate',
    level: 1,
    x: 55,
    y: 18
  },
  {
    id: 'gate-b4',
    name: 'Gate B4',
    type: 'gate',
    level: 1,
    x: 65,
    y: 18
  },
  {
    id: 'restaurant-1',
    name: 'Food Court',
    type: 'restaurant',
    level: 1,
    x: 25,
    y: 25
  },
  {
    id: 'restaurant-2',
    name: 'Starbucks',
    type: 'restaurant',
    level: 1,
    x: 50,
    y: 30
  },
  {
    id: 'restaurant-3',
    name: 'Delhi Street Food',
    type: 'restaurant',
    level: 1,
    x: 75,
    y: 35
  },
  {
    id: 'shop-1',
    name: 'Duty Free Shop',
    type: 'shop',
    level: 1,
    x: 20,
    y: 30
  },
  {
    id: 'shop-2',
    name: 'Travel Essentials',
    type: 'shop',
    level: 1,
    x: 40,
    y: 35
  },
  {
    id: 'shop-3',
    name: 'Indian Souvenirs',
    type: 'shop',
    level: 1,
    x: 60,
    y: 40
  },
  {
    id: 'restroom-1',
    name: 'Restroom North',
    type: 'restroom',
    level: 1,
    x: 30,
    y: 28
  },
  {
    id: 'restroom-2',
    name: 'Restroom South',
    type: 'restroom',
    level: 1,
    x: 70,
    y: 32
  },
  {
    id: 'baggage-claim',
    name: 'Baggage Claim',
    type: 'baggage',
    level: 0,
    x: 35,
    y: 80
  },
  {
    id: 'exit-1',
    name: 'Main Exit',
    type: 'exit',
    level: 0,
    x: 90,
    y: 45
  }
];

// Terminal 2 Locations
const terminal2Locations: Location[] = [
  {
    id: 'entrance-t2',
    name: 'Terminal 2 Entrance',
    type: 'entrance',
    level: 0,
    x: 8,
    y: 45
  },
  {
    id: 'security-t2',
    name: 'Security Checkpoint',
    type: 'security',
    level: 1,
    x: 18,
    y: 38
  },
  {
    id: 'gate-c1',
    name: 'Gate C1',
    type: 'gate',
    level: 1,
    x: 30,
    y: 22
  },
  {
    id: 'gate-c2',
    name: 'Gate C2',
    type: 'gate',
    level: 1,
    x: 40,
    y: 20
  },
  {
    id: 'gate-c3',
    name: 'Gate C3',
    type: 'gate',
    level: 1,
    x: 50,
    y: 20
  },
  {
    id: 'gate-c4',
    name: 'Gate C4',
    type: 'gate',
    level: 1,
    x: 60,
    y: 20
  },
  {
    id: 'gate-c5',
    name: 'Gate C5',
    type: 'gate',
    level: 1,
    x: 70,
    y: 22
  },
  {
    id: 'restaurant-t2-1',
    name: 'Café Coffee Day',
    type: 'restaurant',
    level: 1,
    x: 28,
    y: 28
  },
  {
    id: 'restaurant-t2-2',
    name: 'Subway',
    type: 'restaurant',
    level: 1,
    x: 45,
    y: 32
  },
  {
    id: 'restaurant-t2-3',
    name: 'Mumbai Express',
    type: 'restaurant',
    level: 1,
    x: 65,
    y: 35
  },
  {
    id: 'shop-t2-1',
    name: 'Luxury Boutique',
    type: 'shop',
    level: 1,
    x: 23,
    y: 35
  },
  {
    id: 'shop-t2-2',
    name: 'Book Store',
    type: 'shop',
    level: 1,
    x: 55,
    y: 38
  },
  {
    id: 'shop-t2-3',
    name: 'Electronics',
    type: 'shop',
    level: 1,
    x: 75,
    y: 40
  },
  {
    id: 'restroom-t2-1',
    name: 'Restroom East',
    type: 'restroom',
    level: 1,
    x: 32,
    y: 40
  },
  {
    id: 'restroom-t2-2',
    name: 'Restroom West',
    type: 'restroom',
    level: 1,
    x: 68,
    y: 42
  },
  {
    id: 'baggage-t2',
    name: 'Baggage Claim Area',
    type: 'baggage',
    level: 0,
    x: 40,
    y: 78
  },
  {
    id: 'exit-t2',
    name: 'Terminal 2 Exit',
    type: 'exit',
    level: 0,
    x: 92,
    y: 46
  }
];

// Function to calculate distance between two points
const calculateDistance = (p1: {x: number, y: number}, p2: {x: number, y: number}): number => {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
};

// Function to find shortest path (simplified A* algorithm)
const findShortestPath = (
  locations: Location[], 
  startId: string, 
  endId: string
): Path => {
  const start = locations.find(loc => loc.id === startId);
  const end = locations.find(loc => loc.id === endId);
  
  if (!start || !end) {
    // Return empty path if start or end not found
    return {
      from: startId,
      to: endId,
      points: [],
      distance: 0,
      estimatedTime: 0
    };
  }
  
  // Simple direct path with intermediate waypoints
  const points = [];
  points.push({ x: start.x, y: start.y });
  
  // Add waypoints based on type of locations
  if (start.level !== end.level) {
    // Add elevator/stairs waypoint
    points.push({ x: start.x, y: start.y + 10 });
    points.push({ x: end.x - 15, y: end.y - 15 });
  } else {
    // Add waypoints to create a more realistic path
    points.push({ x: start.x + (end.x - start.x) * 0.33, y: start.y + (end.y - start.y) * 0.33 });
    points.push({ x: start.x + (end.x - start.x) * 0.66, y: start.y + (end.y - start.y) * 0.66 });
  }
  
  points.push({ x: end.x, y: end.y });
  
  // Calculate total distance
  let totalDistance = 0;
  for (let i = 0; i < points.length - 1; i++) {
    totalDistance += calculateDistance(points[i], points[i+1]);
  }
  
  // Estimate time (1 unit distance = 5 seconds)
  const estimatedTime = Math.round(totalDistance * 5);
  
  return {
    from: startId,
    to: endId,
    points,
    distance: Math.round(totalDistance),
    estimatedTime
  };
};

const Navigation = () => {
  const [searchParams] = useSearchParams();
  const [startLocation, setStartLocation] = useState<Location | null>(null);
  const [endLocation, setEndLocation] = useState<Location | null>(null);
  const [path, setPath] = useState<Path | null>(null);
  const [isTerminal1, setIsTerminal1] = useState(true);
  const [isStartDropdownOpen, setIsStartDropdownOpen] = useState(false);
  const [isEndDropdownOpen, setIsEndDropdownOpen] = useState(false);
  const [searchTermStart, setSearchTermStart] = useState('');
  const [searchTermEnd, setSearchTermEnd] = useState('');
  const [showAnimation, setShowAnimation] = useState(false);
  const [locationTypeFilter, setLocationTypeFilter] = useState<string | null>(null);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  
  const startDropdownRef = useRef<HTMLDivElement>(null);
  const endDropdownRef = useRef<HTMLDivElement>(null);
  const filterDropdownRef = useRef<HTMLDivElement>(null);

  const destinationParam = searchParams.get('destination');

  useEffect(() => {
    if (destinationParam === 'baggage') {
      const locations = isTerminal1 ? terminal1Locations : terminal2Locations;
      const baggageClaim = locations.find(loc => loc.type === 'baggage');
      if (baggageClaim) {
        setEndLocation(baggageClaim);
        setSearchTermEnd(baggageClaim.name);
      }
    }
  }, [destinationParam, isTerminal1]);

  const toggleTerminal = () => {
    setIsTerminal1(!isTerminal1);
    setStartLocation(null);
    setEndLocation(null);
    setPath(null);
    setSearchTermStart('');
    setSearchTermEnd('');
    setShowAnimation(false);
  };

  const locations = isTerminal1 ? terminal1Locations : terminal2Locations;
  const currentTerminal: Terminal = {
    id: isTerminal1 ? 'terminal-1' : 'terminal-2',
    name: isTerminal1 ? 'Terminal 1' : 'Terminal 2',
    level: 1
  };

  const calculatePath = () => {
    if (startLocation && endLocation) {
      // Calculate the shortest path
      const calculatedPath = findShortestPath(locations, startLocation.id, endLocation.id);
      setPath(calculatedPath);
      setShowAnimation(true);
      
      // Show toast with navigation info
      toast({
        title: "Navigation Started",
        description: `Estimated time: ${Math.floor(calculatedPath.estimatedTime / 60)} mins ${calculatedPath.estimatedTime % 60} secs`,
        duration: 5000,
      });
    }
  };

  const getFilteredLocations = (locations: Location[], searchTerm: string, excludeLocation?: Location | null) => {
    return locations.filter(location => {
      const matchesSearch = location.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = !locationTypeFilter || location.type === locationTypeFilter;
      const isNotExcluded = !excludeLocation || location.id !== excludeLocation.id;
      return matchesSearch && matchesType && isNotExcluded;
    });
  };

  const filteredStartLocations = getFilteredLocations(locations, searchTermStart, endLocation);
  const filteredEndLocations = getFilteredLocations(locations, searchTermEnd, startLocation);

  const handleOutsideClick = (ref: React.RefObject<HTMLDivElement>, setIsOpen: (open: boolean) => void, event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleStartOutsideClick = (event: MouseEvent) => {
      handleOutsideClick(startDropdownRef, setIsStartDropdownOpen, event);
    };

    const handleEndOutsideClick = (event: MouseEvent) => {
      handleOutsideClick(endDropdownRef, setIsEndDropdownOpen, event);
    };
    
    const handleFilterOutsideClick = (event: MouseEvent) => {
      handleOutsideClick(filterDropdownRef, setIsFilterDropdownOpen, event);
    };

    if (isStartDropdownOpen) {
      document.addEventListener("mousedown", handleStartOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleStartOutsideClick);
    }

    if (isEndDropdownOpen) {
      document.addEventListener("mousedown", handleEndOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleEndOutsideClick);
    }
    
    if (isFilterDropdownOpen) {
      document.addEventListener("mousedown", handleFilterOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleFilterOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleStartOutsideClick);
      document.removeEventListener("mousedown", handleEndOutsideClick);
      document.removeEventListener("mousedown", handleFilterOutsideClick);
    };
  }, [isStartDropdownOpen, isEndDropdownOpen, isFilterDropdownOpen]);

  const getLocationTypeLabel = (type: string | null) => {
    if (!type) return "All Types";
    switch (type) {
      case 'gate': return "Gates";
      case 'restaurant': return "Restaurants";
      case 'shop': return "Shops";
      case 'restroom': return "Restrooms";
      case 'security': return "Security";
      case 'baggage': return "Baggage";
      case 'entrance': return "Entrance";
      case 'exit': return "Exit";
      default: return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };
  
  const getLocationTypeIcon = (type: string | null) => {
    switch (type) {
      case 'gate': return '✈️';
      case 'restaurant': return '🍽️';
      case 'shop': return '🛍️';
      case 'restroom': return '🚻';
      case 'security': return '🔒';
      case 'baggage': return '🧳';
      case 'entrance': return '➡️';
      case 'exit': return '⬅️';
      default: return '📍';
    }
  };

  return (
    <PageLayout>
      <div className="max-w-3xl mx-auto animate-fade-in">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Airport Navigation</h1>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">{isTerminal1 ? 'Terminal 1' : 'Terminal 2'}</h2>
          <button
            className="px-4 py-2 rounded-lg bg-app-blue text-white"
            onClick={toggleTerminal}
          >
            {isTerminal1 ? 'Go to Terminal 2' : 'Go to Terminal 1'}
          </button>
        </div>

        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-muted-foreground">
                  Start Location
                </label>
                <div className="relative" ref={filterDropdownRef}>
                  <button
                    className="text-xs flex items-center gap-1 text-muted-foreground hover:text-foreground"
                    onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                  >
                    <Filter className="h-3 w-3" /> {getLocationTypeLabel(locationTypeFilter)}
                    {isFilterDropdownOpen ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                  </button>
                  
                  {isFilterDropdownOpen && (
                    <div className="absolute right-0 mt-1 w-40 rounded-md shadow-lg bg-card z-20 border">
                      <ul className="py-1 text-sm">
                        <li
                          className="px-4 py-2 hover:bg-muted/50 cursor-pointer flex items-center"
                          onClick={() => {
                            setLocationTypeFilter(null);
                            setIsFilterDropdownOpen(false);
                          }}
                        >
                          <span className="mr-2">📍</span> All Types
                        </li>
                        {['gate', 'restaurant', 'shop', 'restroom', 'security', 'baggage', 'entrance', 'exit'].map(type => (
                          <li
                            key={type}
                            className="px-4 py-2 hover:bg-muted/50 cursor-pointer flex items-center"
                            onClick={() => {
                              setLocationTypeFilter(type);
                              setIsFilterDropdownOpen(false);
                            }}
                          >
                            <span className="mr-2">{getLocationTypeIcon(type)}</span> {getLocationTypeLabel(type)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search start location..."
                  className="w-full px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-app-blue/30"
                  value={searchTermStart}
                  onChange={(e) => {
                    setSearchTermStart(e.target.value);
                    setIsStartDropdownOpen(true);
                  }}
                  onClick={() => setIsStartDropdownOpen(true)}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              {isStartDropdownOpen && (
                <div ref={startDropdownRef} className="absolute left-0 mt-1 w-full rounded-md shadow-lg bg-card z-10 border max-h-60 overflow-y-auto">
                  <ul className="py-1 text-sm">
                    {filteredStartLocations.length > 0 ? (
                      filteredStartLocations.map((location) => (
                        <li
                          key={location.id}
                          className="px-4 py-2 hover:bg-muted/50 cursor-pointer flex items-center"
                          onClick={() => {
                            setStartLocation(location);
                            setSearchTermStart(location.name);
                            setIsStartDropdownOpen(false);
                          }}
                        >
                          <span className="mr-2">{getLocationTypeIcon(location.type)}</span>
                          {location.name}
                        </li>
                      ))
                    ) : (
                      <li className="px-4 py-2 text-muted-foreground">No locations found</li>
                    )}
                  </ul>
                </div>
              )}
              {startLocation && (
                <div className="flex items-center mt-2">
                  <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{startLocation.name}</span>
                  <button onClick={() => { setStartLocation(null); setSearchTermStart(''); }} className="ml-2 text-red-500 hover:text-red-700">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="relative flex-1">
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                End Location
              </label>
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search end location..."
                  className="w-full px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-app-blue/30"
                  value={searchTermEnd}
                  onChange={(e) => {
                    setSearchTermEnd(e.target.value);
                    setIsEndDropdownOpen(true);
                  }}
                  onClick={() => setIsEndDropdownOpen(true)}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              {isEndDropdownOpen && (
                <div ref={endDropdownRef} className="absolute left-0 mt-1 w-full rounded-md shadow-lg bg-card z-10 border max-h-60 overflow-y-auto">
                  <ul className="py-1 text-sm">
                    {filteredEndLocations.length > 0 ? (
                      filteredEndLocations.map((location) => (
                        <li
                          key={location.id}
                          className="px-4 py-2 hover:bg-muted/50 cursor-pointer flex items-center"
                          onClick={() => {
                            setEndLocation(location);
                            setSearchTermEnd(location.name);
                            setIsEndDropdownOpen(false);
                          }}
                        >
                          <span className="mr-2">{getLocationTypeIcon(location.type)}</span>
                          {location.name}
                        </li>
                      ))
                    ) : (
                      <li className="px-4 py-2 text-muted-foreground">No locations found</li>
                    )}
                  </ul>
                </div>
              )}
              {endLocation && (
                <div className="flex items-center mt-2">
                  <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{endLocation.name}</span>
                  <button onClick={() => { setEndLocation(null); setSearchTermEnd(''); }} className="ml-2 text-red-500 hover:text-red-700">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <button
            className="mt-6 px-4 py-2 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 disabled:bg-green-300"
            onClick={calculatePath}
            disabled={!startLocation || !endLocation}
          >
            Calculate Path
          </button>
        </div>

        {path && path.points.length > 0 && (
          <div className="rounded-xl border p-6 bg-card mb-6">
            <h2 className="text-xl font-semibold mb-4">
              Navigation Path
            </h2>
            
            {startLocation && endLocation && (
              <div className="flex items-center justify-between mb-4 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" /> 
                  Estimated time: {Math.floor(path.estimatedTime / 60)} min {path.estimatedTime % 60} sec
                </div>
                <div className="text-muted-foreground">
                  Distance: {path.distance} units
                </div>
              </div>
            )}
            
            <ul className="space-y-3">
              {startLocation && (
                <li className="flex items-start gap-3">
                  <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mt-1 flex-shrink-0">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Start from {startLocation.name}</p>
                    <p className="text-sm text-muted-foreground">{getLocationTypeLabel(startLocation.type)}, Level {startLocation.level}</p>
                  </div>
                </li>
              )}
              
              {/* Intermediate waypoints */}
              {path.points.length > 2 && (
                <li className="flex items-start gap-3">
                  <div className="bg-gray-400 text-white rounded-full w-6 h-6 flex items-center justify-center mt-1 flex-shrink-0">
                    <CornerDownRight className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">Follow the highlighted path</p>
                    <p className="text-sm text-muted-foreground">
                      {startLocation && endLocation && startLocation.level !== endLocation.level
                        ? "Take the elevator to change levels"
                        : "Continue straight ahead"}
                    </p>
                  </div>
                </li>
              )}
              
              {endLocation && (
                <li className="flex items-start gap-3">
                  <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center mt-1 flex-shrink-0">
                    {path.points.length > 2 ? 3 : 2}
                  </div>
                  <div>
                    <p className="font-medium">Arrive at {endLocation.name}</p>
                    <p className="text-sm text-muted-foreground">{getLocationTypeLabel(endLocation.type)}, Level {endLocation.level}</p>
                  </div>
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Airport Map Visualization */}
        <div className="rounded-xl border overflow-hidden mb-8">
          <div className="p-4 bg-muted/30 border-b">
            <h2 className="text-lg font-semibold">Airport Map</h2>
          </div>
          
          <div className="p-6">
            <TerminalMap
              terminal={currentTerminal}
              locations={locations}
              path={path || undefined}
              currentLocation={startLocation?.id}
              destination={endLocation?.id}
              showAnimation={showAnimation}
              className="border rounded-lg overflow-hidden"
            />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Navigation;
