import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MapPin, X, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import PageLayout from '@/components/PageLayout';

interface Location {
  id: string;
  name: string;
  type: 'gate' | 'security' | 'restaurant' | 'restroom' | 'shop' | 'baggage' | 'entrance' | 'exit';
  level: number;
  x: number;
  y: number;
}

const airportLocations: Location[] = [
  {
    id: 'entrance-1',
    name: 'Main Entrance',
    type: 'entrance',
    level: 0,
    x: 50,
    y: 450
  },
  {
    id: 'security-1',
    name: 'Security Checkpoint',
    type: 'security',
    level: 1,
    x: 150,
    y: 350
  },
  {
    id: 'gate-b1',
    name: 'Gate B1',
    type: 'gate',
    level: 1,
    x: 350,
    y: 200
  },
  {
    id: 'gate-b2',
    name: 'Gate B2',
    type: 'gate',
    level: 1,
    x: 450,
    y: 180
  },
  {
    id: 'restaurant-1',
    name: 'Food Court',
    type: 'restaurant',
    level: 1,
    x: 250,
    y: 250
  },
  {
    id: 'shop-1',
    name: 'Duty Free Shop',
    type: 'shop',
    level: 1,
    x: 200,
    y: 300
  },
  {
    id: 'restroom-1',
    name: 'Restroom',
    type: 'restroom',
    level: 1,
    x: 300,
    y: 280
  },
  {
    id: 'baggage-claim',
    name: 'Baggage Claim',
    type: 'baggage',
    level: 0,
    x: 150,
    y: 400
  },
  {
    id: 'exit-1',
    name: 'Exit',
    type: 'exit',
    level: 0,
    x: 100,
    y: 450
  }
];

// Terminal 2 Locations
const terminal2Locations: Location[] = [
  {
    id: 'entrance-t2',
    name: 'Terminal 2 Entrance',
    type: 'entrance',
    level: 0,
    x: 80,
    y: 450
  },
  {
    id: 'security-t2',
    name: 'Security Checkpoint',
    type: 'security',
    level: 1,
    x: 180,
    y: 380
  },
  {
    id: 'gate-c1',
    name: 'Gate C1',
    type: 'gate',
    level: 1,
    x: 380,
    y: 220
  },
  {
    id: 'gate-c2',
    name: 'Gate C2',
    type: 'gate',
    level: 1,
    x: 450,
    y: 200
  },
  {
    id: 'restaurant-t2',
    name: 'Restaurant Zone',
    type: 'restaurant',
    level: 1,
    x: 280,
    y: 280
  },
  {
    id: 'shop-t2',
    name: 'Shopping Area',
    type: 'shop',
    level: 1,
    x: 230,
    y: 330
  },
  {
    id: 'restroom-t2',
    name: 'Restrooms',
    type: 'restroom',
    level: 1,
    x: 320,
    y: 300
  },
  {
    id: 'baggage-t2',
    name: 'Baggage Claim Area',
    type: 'baggage',
    level: 0,
    x: 180,
    y: 420
  },
  {
    id: 'exit-t2',
    name: 'Terminal 2 Exit',
    type: 'exit',
    level: 0,
    x: 130,
    y: 460
  }
];

const Navigation = () => {
  const [searchParams] = useSearchParams();
  const [startLocation, setStartLocation] = useState<Location | null>(null);
  const [endLocation, setEndLocation] = useState<Location | null>(null);
  const [path, setPath] = useState<Location[]>([]);
  const [isTerminal1, setIsTerminal1] = useState(true);
  const [isStartDropdownOpen, setIsStartDropdownOpen] = useState(false);
  const [isEndDropdownOpen, setIsEndDropdownOpen] = useState(false);
  const [searchTermStart, setSearchTermStart] = useState('');
  const [searchTermEnd, setSearchTermEnd] = useState('');
  const startDropdownRef = useRef<HTMLDivElement>(null);
  const endDropdownRef = useRef<HTMLDivElement>(null);

  const destinationParam = searchParams.get('destination');

  useEffect(() => {
    if (destinationParam === 'baggage') {
      const baggageClaim = airportLocations.find(loc => loc.type === 'baggage');
      if (baggageClaim) {
        setEndLocation(baggageClaim);
      }
    }
  }, [destinationParam]);

  const toggleTerminal = () => {
    setIsTerminal1(!isTerminal1);
    setStartLocation(null);
    setEndLocation(null);
    setPath([]);
  };

  const locations = isTerminal1 ? airportLocations : terminal2Locations;

  const calculatePath = () => {
    if (startLocation && endLocation) {
      // Mock path calculation
      const calculatedPath = [startLocation, endLocation];
      setPath(calculatedPath);
    }
  };

  const filteredStartLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchTermStart.toLowerCase())
  );

  const filteredEndLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchTermEnd.toLowerCase())
  );

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

    return () => {
      document.removeEventListener("mousedown", handleStartOutsideClick);
      document.removeEventListener("mousedown", handleEndOutsideClick);
    };
  }, [isStartDropdownOpen, isEndDropdownOpen]);

  return (
    <PageLayout>
      <div className="max-w-3xl mx-auto animate-fade-in">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Airport Navigation</h1>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Select Terminal</h2>
          <button
            className="px-4 py-2 rounded-lg bg-app-blue text-white"
            onClick={toggleTerminal}
          >
            {isTerminal1 ? 'Go to Terminal 2' : 'Go to Terminal 1'}
          </button>
        </div>

        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative">
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Start Location
              </label>
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
                <div ref={startDropdownRef} className="absolute left-0 mt-1 w-full rounded-md shadow-lg bg-card z-10 border">
                  <ul className="py-1 text-sm">
                    {filteredStartLocations.length > 0 ? (
                      filteredStartLocations.map((location) => (
                        <li
                          key={location.id}
                          className="px-4 py-2 hover:bg-muted/50 cursor-pointer"
                          onClick={() => {
                            setStartLocation(location);
                            setSearchTermStart(location.name);
                            setIsStartDropdownOpen(false);
                          }}
                        >
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

            <div className="relative">
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
                <div ref={endDropdownRef} className="absolute left-0 mt-1 w-full rounded-md shadow-lg bg-card z-10 border">
                  <ul className="py-1 text-sm">
                    {filteredEndLocations.length > 0 ? (
                      filteredEndLocations.map((location) => (
                        <li
                          key={location.id}
                          className="px-4 py-2 hover:bg-muted/50 cursor-pointer"
                          onClick={() => {
                            setEndLocation(location);
                            setSearchTermEnd(location.name);
                            setIsEndDropdownOpen(false);
                          }}
                        >
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

        {path.length > 0 && (
          <div className="rounded-xl border p-6 bg-card">
            <h2 className="text-xl font-semibold mb-4">
              Navigation Path
            </h2>
            <ul className="space-y-2">
              {path.map((location) => (
                <li key={location.id} className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-blue-500" />
                  <span>{location.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Airport Map Visualization */}
        <div className="mt-8 rounded-xl border p-6 bg-card">
          <h2 className="text-xl font-semibold mb-4">Airport Map</h2>
          <div className="relative w-full h-[500px] bg-gray-100 rounded-md overflow-hidden">
            {locations.map((location) => (
              <div
                key={location.id}
                className="absolute rounded-full bg-blue-500 text-white text-xs font-bold flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors"
                style={{
                  left: `${(location.x / 600) * 100}%`,
                  top: `${(location.y / 500) * 100}%`,
                  width: '30px',
                  height: '30px',
                  transform: 'translate(-50%, -50%)',
                }}
                title={location.name}
              >
                <MapPin className="h-4 w-4" />
              </div>
            ))}
            {/* Path Visualization */}
            {path.length > 1 && (
              <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
                  </marker>
                </defs>
                <path
                  d={path.map((location, index) => {
                    const x = (location.x / 600) * 100;
                    const y = (location.y / 500) * 100;
                    return `${index === 0 ? 'M' : 'L'} ${x}% ${y}%`;
                  }).join(' ')}
                  stroke="rgba(0, 119, 255, 0.75)"
                  strokeWidth="4"
                  fill="none"
                  markerEnd="url(#arrowhead)"
                />
              </svg>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Navigation;
