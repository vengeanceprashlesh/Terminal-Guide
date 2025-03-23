import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Plane, Clock, Info, ArrowLeft, Building, Navigation2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import PageLayout from '@/components/PageLayout';

interface Airport {
  id: string;
  name: string;
  code: string;
  city: string;
  country: string;
  terminals: number;
  gates: number;
  description?: string;
}

interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  destination: string;
  departureTime: string;
  status: 'on-time' | 'delayed' | 'boarding' | 'departed' | 'cancelled';
  gate: string;
  terminal: string;
}

interface Location {
  id: string;
  name: string;
  type: 'gate' | 'restaurant' | 'shop' | 'restroom' | 'security' | 'baggage' | 'entrance' | 'exit';
  level: number;
  x: number;
  y: number;
}

const mockAirports: Airport[] = [
  {
    id: 'del',
    name: 'Indira Gandhi International Airport',
    code: 'DEL',
    city: 'Delhi',
    country: 'India',
    terminals: 3,
    gates: 67,
    description: 'The primary international airport serving Delhi and the National Capital Region of India.'
  },
  {
    id: 'bom',
    name: 'Chhatrapati Shivaji Maharaj International Airport',
    code: 'BOM',
    city: 'Mumbai',
    country: 'India',
    terminals: 2,
    gates: 52,
    description: 'The second busiest airport in India, serving the Mumbai Metropolitan Area.'
  }
];

const mockFlights: Flight[] = [
  {
    id: 'f1',
    flightNumber: 'AI-101',
    airline: 'Air India',
    destination: 'Mumbai',
    departureTime: '12:30 PM',
    status: 'boarding',
    gate: 'A12',
    terminal: 'T3'
  },
  {
    id: 'f2',
    flightNumber: 'UK-943',
    airline: 'Vistara',
    destination: 'Bangalore',
    departureTime: '1:45 PM',
    status: 'on-time',
    gate: 'B5',
    terminal: 'T3'
  },
  {
    id: 'f3',
    flightNumber: '6E-178',
    airline: 'IndiGo',
    destination: 'Chennai',
    departureTime: '2:15 PM',
    status: 'delayed',
    gate: 'C8',
    terminal: 'T1'
  },
  {
    id: 'f4',
    flightNumber: 'SG-432',
    airline: 'SpiceJet',
    destination: 'Kolkata',
    departureTime: '3:30 PM',
    status: 'on-time',
    gate: 'D3',
    terminal: 'T3'
  }
];

const locationsList: Location[] = [
  {
    id: 'security-1',
    name: 'Security Checkpoint 1',
    type: 'security',
    level: 1,
    x: 150,
    y: 100
  },
  {
    id: 'gate-a1',
    name: 'Gate A1',
    type: 'gate',
    level: 1,
    x: 250,
    y: 180
  },
  {
    id: 'restaurant-1',
    name: 'Food Court',
    type: 'restaurant',
    level: 1,
    x: 350,
    y: 120
  },
  {
    id: 'restroom-1',
    name: 'Restroom',
    type: 'restroom',
    level: 1,
    x: 200,
    y: 220
  },
  {
    id: 'shop-1',
    name: 'Duty Free Shop',
    type: 'shop',
    level: 1,
    x: 300,
    y: 250
  },
  {
    id: 'baggage-1',
    name: 'Baggage Claim 1',
    type: 'baggage',
    level: 0,
    x: 180,
    y: 320
  },
  {
    id: 'entrance-1',
    name: 'Terminal Entrance',
    type: 'entrance',
    level: 0,
    x: 120,
    y: 380
  }
];

const AirportDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [airport, setAirport] = useState<Airport | null>(null);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [activeTab, setActiveTab] = useState<'info' | 'flights' | 'map'>('info');
  
  useEffect(() => {
    // In a real app, fetch airport data from API
    const foundAirport = mockAirports.find(a => a.id === id);
    setAirport(foundAirport || null);
    
    // Filter flights for this airport
    setFlights(mockFlights);
  }, [id]);
  
  if (!airport) {
    return (
      <PageLayout>
        <div className="flex flex-col items-center justify-center h-[70vh]">
          <Plane className="w-16 h-16 text-muted mb-4" />
          <h2 className="text-2xl font-bold mb-2">Airport Not Found</h2>
          <p className="text-muted-foreground mb-6">
            We couldn't find the airport you're looking for.
          </p>
          <Link 
            to="/airports"
            className="flex items-center px-4 py-2 rounded-lg bg-app-blue text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Airports
          </Link>
        </div>
      </PageLayout>
    );
  }
  
  const getStatusColor = (status: Flight['status']) => {
    switch (status) {
      case 'on-time': return 'text-green-600 bg-green-100';
      case 'boarding': return 'text-blue-600 bg-blue-100';
      case 'delayed': return 'text-amber-600 bg-amber-100';
      case 'departed': return 'text-gray-600 bg-gray-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };
  
  const getStatusLabel = (status: Flight['status']) => {
    switch (status) {
      case 'on-time': return 'On Time';
      case 'boarding': return 'Boarding';
      case 'delayed': return 'Delayed';
      case 'departed': return 'Departed';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };
  
  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link 
                to="/airports"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <span className="text-sm text-muted-foreground">
                {airport.city}, {airport.country}
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">{airport.name}</h1>
            <div className="flex items-center mt-1">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-app-blue/10 mr-2">
                <Plane className="h-4 w-4 text-app-blue" />
              </div>
              <span className="text-lg font-semibold">{airport.code}</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Link
              to={`/navigation?airport=${airport.code.toLowerCase()}`}
              className="flex items-center px-4 py-2 rounded-lg border bg-background hover:bg-muted/20"
            >
              <Navigation2 className="mr-2 h-4 w-4" /> Navigate
            </Link>
            <Link
              to={`/luggage?airport=${airport.code.toLowerCase()}`}
              className="flex items-center px-4 py-2 rounded-lg bg-app-blue text-white"
            >
              <MapPin className="mr-2 h-4 w-4" /> Track Luggage
            </Link>
          </div>
        </div>
        
        <div className="flex border-b mb-6">
          <button
            className={cn(
              "px-4 py-2 font-medium text-sm border-b-2 transition-colors",
              activeTab === 'info' 
                ? "border-app-blue text-app-blue" 
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
            onClick={() => setActiveTab('info')}
          >
            <Info className="inline-block mr-1 h-4 w-4" /> Airport Info
          </button>
          <button
            className={cn(
              "px-4 py-2 font-medium text-sm border-b-2 transition-colors",
              activeTab === 'flights' 
                ? "border-app-blue text-app-blue" 
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
            onClick={() => setActiveTab('flights')}
          >
            <Plane className="inline-block mr-1 h-4 w-4" /> Departures
          </button>
          <button
            className={cn(
              "px-4 py-2 font-medium text-sm border-b-2 transition-colors",
              activeTab === 'map' 
                ? "border-app-blue text-app-blue" 
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
            onClick={() => setActiveTab('map')}
          >
            <MapPin className="inline-block mr-1 h-4 w-4" /> Terminal Map
          </button>
        </div>
        
        {activeTab === 'info' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-xl border p-5">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Building className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium">Terminals</h3>
                    <p className="text-2xl font-bold">{airport.terminals}</p>
                  </div>
                </div>
              </div>
              
              <div className="rounded-xl border p-5">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <Plane className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium">Gates</h3>
                    <p className="text-2xl font-bold">{airport.gates}</p>
                  </div>
                </div>
              </div>
              
              <div className="rounded-xl border p-5">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium">Flights Today</h3>
                    <p className="text-2xl font-bold">{flights.length}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="rounded-xl border p-6">
              <h2 className="text-xl font-semibold mb-4">About {airport.name}</h2>
              <p className="text-muted-foreground">
                {airport.description || 'No description available.'}
              </p>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-medium mb-3">Airport Facilities</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                      Free WiFi throughout the terminal
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                      Currency exchange services
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                      Lounges in all terminals
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                      Medical facilities
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                      Prayer rooms
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Transportation</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                      Metro connection to city center
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                      Taxi services available 24/7
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                      Bus services to major destinations
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                      Car rental services
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                      Parking facilities
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'flights' && (
          <div className="rounded-xl border overflow-hidden">
            <div className="p-4 bg-muted/30 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Departures</h2>
                <div className="text-sm text-muted-foreground">
                  Updated: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
            
            <div className="divide-y">
              {flights.map((flight) => (
                <div key={flight.id} className="p-4 hover:bg-muted/20 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <span className="font-semibold mr-2">{flight.flightNumber}</span>
                        <span className="text-sm text-muted-foreground">{flight.airline}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <Plane className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{flight.destination}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="flex flex-col items-end mr-6">
                        <span className="font-medium">{flight.departureTime}</span>
                        <span className="text-sm text-muted-foreground">
                          Gate {flight.gate}, Terminal {flight.terminal}
                        </span>
                      </div>
                      
                      <span className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        getStatusColor(flight.status)
                      )}>
                        {getStatusLabel(flight.status)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'map' && (
          <div className="rounded-xl border overflow-hidden">
            <div className="p-4 bg-muted/30 border-b">
              <h2 className="text-lg font-semibold">Terminal Map</h2>
            </div>
            
            <div className="p-6">
              <div className="relative w-full h-[400px] bg-muted/20 rounded-lg overflow-hidden border">
                <div className="absolute inset-0 p-4">
                  <div className="text-center text-muted-foreground">
                    Interactive map would be displayed here
                  </div>
                  
                  {/* This would be replaced with an actual map component */}
                  <div className="absolute inset-0">
                    {locationsList.map((location) => (
                      <div 
                        key={location.id}
                        className="absolute w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                        style={{ 
                          left: `${location.x}px`, 
                          top: `${location.y}px`,
                          zIndex: location.level + 10
                        }}
                        title={location.name}
                      >
                        {location.type === 'gate' && <Plane className="h-3 w-3 text-blue-600" />}
                        {location.type === 'restaurant' && <span className="text-amber-600 text-xs">🍽️</span>}
                        {location.type === 'shop' && <span className="text-green-600 text-xs">🛍️</span>}
                        {location.type === 'restroom' && <span className="text-purple-600 text-xs">🚻</span>}
                        {location.type === 'security' && <span className="text-red-600 text-xs">🔒</span>}
                        {location.type === 'baggage' && <span className="text-gray-600 text-xs">🧳</span>}
                        {location.type === 'entrance' && <span className="text-green-600 text-xs">➡️</span>}
                        {location.type === 'exit' && <span className="text-red-600 text-xs">⬅️</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-white shadow-sm flex items-center justify-center mr-2">
                    <Plane className="h-2 w-2 text-blue-600" />
                  </div>
                  <span className="text-sm">Gates</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-white shadow-sm flex items-center justify-center mr-2">
                    <span className="text-amber-600 text-[8px]">🍽️</span>
                  </div>
                  <span className="text-sm">Restaurants</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-white shadow-sm flex items-center justify-center mr-2">
                    <span className="text-green-600 text-[8px]">🛍️</span>
                  </div>
                  <span className="text-sm">Shops</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-white shadow-sm flex items-center justify-center mr-2">
                    <span className="text-purple-600 text-[8px]">🚻</span>
                  </div>
                  <span className="text-sm">Restrooms</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default AirportDetail;
