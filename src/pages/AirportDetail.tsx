import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Plane, Clock, Info, ArrowLeft, Building, Navigation2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import PageLayout from '@/components/PageLayout';
import TerminalMap from '@/components/TerminalMap';

interface Airport {
  id: string;
  name: string;
  code: string;
  city: string;
  country: string;
  terminals: number;
  gates: number;
  restaurants: number;
  shops: number;
  restrooms: number;
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
    restaurants: 24,
    shops: 42,
    restrooms: 36,
    description: 'The primary international airport serving Delhi and the National Capital Region of India. Terminal 3 is one of the largest terminals in the world, with an area of over 5 million square feet.'
  },
  {
    id: 'bom',
    name: 'Chhatrapati Shivaji Maharaj International Airport',
    code: 'BOM',
    city: 'Mumbai',
    country: 'India',
    terminals: 2,
    gates: 52,
    restaurants: 18,
    shops: 35,
    restrooms: 28,
    description: 'The second busiest airport in India, serving the Mumbai Metropolitan Area. Terminal 2 is known for its art installations and modern architecture.'
  },
  {
    id: 'blr',
    name: 'Kempegowda International Airport',
    code: 'BLR',
    city: 'Bengaluru',
    country: 'India',
    terminals: 2,
    gates: 48,
    restaurants: 16,
    shops: 32,
    restrooms: 24,
    description: 'Bengaluru\'s international airport connects to over 82 destinations across India and the world, making it a key gateway to South India.'
  },
  {
    id: 'hyd',
    name: 'Rajiv Gandhi International Airport',
    code: 'HYD',
    city: 'Hyderabad',
    country: 'India',
    terminals: 1,
    gates: 38,
    restaurants: 14,
    shops: 26,
    restrooms: 20,
    description: 'A modern greenfield airport that serves Hyderabad and Telangana. It features a unique single integrated terminal for both domestic and international passengers.'
  },
  {
    id: 'maa',
    name: 'Chennai International Airport',
    code: 'MAA',
    city: 'Chennai',
    country: 'India',
    terminals: 2,
    gates: 42,
    restaurants: 12,
    shops: 24,
    restrooms: 18,
    description: 'The main gateway to South India, Chennai International Airport handles flights to over 50 destinations around the world.'
  },
  {
    id: 'ccu',
    name: 'Netaji Subhas Chandra Bose International Airport',
    code: 'CCU',
    city: 'Kolkata',
    country: 'India',
    terminals: 2,
    gates: 32,
    restaurants: 10,
    shops: 18,
    restrooms: 14,
    description: 'The largest airport in Eastern India, serving as a major hub for flights to Northeast India and Southeast Asia.'
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

const terminalMapsData: Record<string, {
  terminal: { id: string; name: string; level: number; };
  locations: Location[];
}> = {
  del: {
    terminal: { id: 'del-t3', name: 'Terminal 3', level: 1 },
    locations: [
      { id: 'security-1', name: 'Security Checkpoint 1', type: 'security', level: 1, x: 15, y: 30 },
      { id: 'security-2', name: 'Security Checkpoint 2', type: 'security', level: 1, x: 15, y: 70 },
      { id: 'gate-a1', name: 'Gate A1', type: 'gate', level: 1, x: 25, y: 18 },
      { id: 'gate-a2', name: 'Gate A2', type: 'gate', level: 1, x: 30, y: 18 },
      { id: 'gate-a3', name: 'Gate A3', type: 'gate', level: 1, x: 35, y: 18 },
      { id: 'gate-b1', name: 'Gate B1', type: 'gate', level: 1, x: 40, y: 18 },
      { id: 'gate-b2', name: 'Gate B2', type: 'gate', level: 1, x: 45, y: 18 },
      { id: 'rest-1', name: 'Food Court', type: 'restaurant', level: 1, x: 50, y: 50 },
      { id: 'rest-2', name: 'Cafe Coffee Day', type: 'restaurant', level: 1, x: 60, y: 25 },
      { id: 'rest-3', name: 'Subway', type: 'restaurant', level: 1, x: 70, y: 70 },
      { id: 'rest-4', name: 'Punjab Grill', type: 'restaurant', level: 1, x: 75, y: 30 },
      { id: 'shop-1', name: 'Duty Free Shop', type: 'shop', level: 1, x: 30, y: 40 },
      { id: 'shop-2', name: 'WH Smith', type: 'shop', level: 1, x: 40, y: 60 },
      { id: 'shop-3', name: 'Forest Essentials', type: 'shop', level: 1, x: 50, y: 75 },
      { id: 'shop-4', name: 'Hidesign', type: 'shop', level: 1, x: 65, y: 45 },
      { id: 'restroom-1', name: 'Restroom North', type: 'restroom', level: 1, x: 20, y: 35 },
      { id: 'restroom-2', name: 'Restroom Central', type: 'restroom', level: 1, x: 50, y: 30 },
      { id: 'restroom-3', name: 'Restroom South', type: 'restroom', level: 1, x: 80, y: 65 },
      { id: 'baggage-1', name: 'Baggage Claim 1', type: 'baggage', level: 0, x: 18, y: 80 },
      { id: 'baggage-2', name: 'Baggage Claim 2', type: 'baggage', level: 0, x: 28, y: 80 },
      { id: 'entrance-1', name: 'Terminal Entrance', type: 'entrance', level: 0, x: 12, y: 50 },
      { id: 'exit-1', name: 'Terminal Exit', type: 'exit', level: 0, x: 88, y: 50 }
    ]
  },
  bom: {
    terminal: { id: 'bom-t2', name: 'Terminal 2', level: 1 },
    locations: [
      { id: 'security-1', name: 'Security Checkpoint 1', type: 'security', level: 1, x: 20, y: 35 },
      { id: 'gate-c1', name: 'Gate C1', type: 'gate', level: 1, x: 30, y: 20 },
      { id: 'gate-c2', name: 'Gate C2', type: 'gate', level: 1, x: 35, y: 20 },
      { id: 'gate-c3', name: 'Gate C3', type: 'gate', level: 1, x: 40, y: 20 },
      { id: 'gate-d1', name: 'Gate D1', type: 'gate', level: 1, x: 50, y: 20 },
      { id: 'rest-1', name: 'Starbucks', type: 'restaurant', level: 1, x: 45, y: 45 },
      { id: 'rest-2', name: 'KFC', type: 'restaurant', level: 1, x: 55, y: 35 },
      { id: 'rest-3', name: 'Mumbai Bistro', type: 'restaurant', level: 1, x: 65, y: 60 },
      { id: 'shop-1', name: 'Duty Free', type: 'shop', level: 1, x: 35, y: 45 },
      { id: 'shop-2', name: 'Shoppers Stop', type: 'shop', level: 1, x: 60, y: 40 },
      { id: 'restroom-1', name: 'Restroom East', type: 'restroom', level: 1, x: 25, y: 50 },
      { id: 'restroom-2', name: 'Restroom West', type: 'restroom', level: 1, x: 70, y: 50 },
      { id: 'baggage-1', name: 'Baggage Claim', type: 'baggage', level: 0, x: 25, y: 75 },
      { id: 'entrance-1', name: 'Entrance', type: 'entrance', level: 0, x: 15, y: 50 },
      { id: 'exit-1', name: 'Exit', type: 'exit', level: 0, x: 85, y: 50 }
    ]
  },
  blr: {
    terminal: { id: 'blr-t1', name: 'Terminal 1', level: 1 },
    locations: [
      { id: 'security-1', name: 'Security Checkpoint', type: 'security', level: 1, x: 20, y: 40 },
      { id: 'gate-a1', name: 'Gate A1', type: 'gate', level: 1, x: 35, y: 15 },
      { id: 'gate-a2', name: 'Gate A2', type: 'gate', level: 1, x: 40, y: 15 },
      { id: 'gate-a3', name: 'Gate A3', type: 'gate', level: 1, x: 45, y: 15 },
      { id: 'gate-a4', name: 'Gate A4', type: 'gate', level: 1, x: 50, y: 15 },
      { id: 'rest-1', name: 'Tiffin Express', type: 'restaurant', level: 1, x: 45, y: 40 },
      { id: 'rest-2', name: 'Costa Coffee', type: 'restaurant', level: 1, x: 55, y: 35 },
      { id: 'shop-1', name: 'Crossword', type: 'shop', level: 1, x: 35, y: 50 },
      { id: 'shop-2', name: 'FabIndia', type: 'shop', level: 1, x: 60, y: 45 },
      { id: 'restroom-1', name: 'Restroom', type: 'restroom', level: 1, x: 30, y: 60 },
      { id: 'restroom-2', name: 'Restroom', type: 'restroom', level: 1, x: 65, y: 60 },
      { id: 'baggage-1', name: 'Baggage Claim', type: 'baggage', level: 0, x: 30, y: 80 },
      { id: 'entrance-1', name: 'Entrance', type: 'entrance', level: 0, x: 15, y: 50 },
      { id: 'exit-1', name: 'Exit', type: 'exit', level: 0, x: 85, y: 50 }
    ]
  },
  hyd: {
    terminal: { id: 'hyd-t1', name: 'Terminal', level: 1 },
    locations: [
      { id: 'security-1', name: 'Security Checkpoint', type: 'security', level: 1, x: 25, y: 35 },
      { id: 'gate-a1', name: 'Gate A1', type: 'gate', level: 1, x: 35, y: 20 },
      { id: 'gate-a2', name: 'Gate A2', type: 'gate', level: 1, x: 40, y: 20 },
      { id: 'gate-a3', name: 'Gate A3', type: 'gate', level: 1, x: 45, y: 20 },
      { id: 'rest-1', name: 'Paradise Biryani', type: 'restaurant', level: 1, x: 50, y: 40 },
      { id: 'rest-2', name: 'Barista', type: 'restaurant', level: 1, x: 60, y: 45 },
      { id: 'shop-1', name: 'Hyderabad Pearls', type: 'shop', level: 1, x: 40, y: 50 },
      { id: 'shop-2', name: 'Forest Essentials', type: 'shop', level: 1, x: 55, y: 55 },
      { id: 'restroom-1', name: 'Restroom', type: 'restroom', level: 1, x: 35, y: 60 },
      { id: 'restroom-2', name: 'Restroom', type: 'restroom', level: 1, x: 65, y: 60 },
      { id: 'baggage-1', name: 'Baggage Claim', type: 'baggage', level: 0, x: 40, y: 80 },
      { id: 'entrance-1', name: 'Entrance', type: 'entrance', level: 0, x: 20, y: 50 },
      { id: 'exit-1', name: 'Exit', type: 'exit', level: 0, x: 80, y: 50 }
    ]
  },
  maa: {
    terminal: { id: 'maa-t1', name: 'Terminal 1', level: 1 },
    locations: [
      { id: 'security-1', name: 'Security Checkpoint', type: 'security', level: 1, x: 20, y: 35 },
      { id: 'gate-a1', name: 'Gate A1', type: 'gate', level: 1, x: 30, y: 20 },
      { id: 'gate-a2', name: 'Gate A2', type: 'gate', level: 1, x: 35, y: 20 },
      { id: 'gate-a3', name: 'Gate A3', type: 'gate', level: 1, x: 40, y: 20 },
      { id: 'rest-1', name: 'Madras Cafe', type: 'restaurant', level: 1, x: 45, y: 40 },
      { id: 'rest-2', name: 'Domino\'s Pizza', type: 'restaurant', level: 1, x: 55, y: 45 },
      { id: 'shop-1', name: 'Chennai Silks', type: 'shop', level: 1, x: 35, y: 50 },
      { id: 'shop-2', name: 'Landmark', type: 'shop', level: 1, x: 60, y: 50 },
      { id: 'restroom-1', name: 'Restroom', type: 'restroom', level: 1, x: 30, y: 60 },
      { id: 'restroom-2', name: 'Restroom', type: 'restroom', level: 1, x: 65, y: 60 },
      { id: 'baggage-1', name: 'Baggage Claim', type: 'baggage', level: 0, x: 40, y: 80 },
      { id: 'entrance-1', name: 'Entrance', type: 'entrance', level: 0, x: 15, y: 50 },
      { id: 'exit-1', name: 'Exit', type: 'exit', level: 0, x: 85, y: 50 }
    ]
  },
  ccu: {
    terminal: { id: 'ccu-t2', name: 'Terminal 2', level: 1 },
    locations: [
      { id: 'security-1', name: 'Security Checkpoint', type: 'security', level: 1, x: 25, y: 35 },
      { id: 'gate-a1', name: 'Gate A1', type: 'gate', level: 1, x: 35, y: 20 },
      { id: 'gate-a2', name: 'Gate A2', type: 'gate', level: 1, x: 40, y: 20 },
      { id: 'gate-a3', name: 'Gate A3', type: 'gate', level: 1, x: 45, y: 20 },
      { id: 'rest-1', name: 'Bengali Cuisine', type: 'restaurant', level: 1, x: 50, y: 45 },
      { id: 'rest-2', name: 'Cafe Coffee Day', type: 'restaurant', level: 1, x: 60, y: 50 },
      { id: 'shop-1', name: 'Kolkata Handicrafts', type: 'shop', level: 1, x: 40, y: 55 },
      { id: 'shop-2', name: 'WH Smith', type: 'shop', level: 1, x: 55, y: 60 },
      { id: 'restroom-1', name: 'Restroom', type: 'restroom', level: 1, x: 35, y: 65 },
      { id: 'restroom-2', name: 'Restroom', type: 'restroom', level: 1, x: 65, y: 65 },
      { id: 'baggage-1', name: 'Baggage Claim', type: 'baggage', level: 0, x: 45, y: 80 },
      { id: 'entrance-1', name: 'Entrance', type: 'entrance', level: 0, x: 20, y: 50 },
      { id: 'exit-1', name: 'Exit', type: 'exit', level: 0, x: 80, y: 50 }
    ]
  }
};

const AirportDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [airport, setAirport] = useState<Airport | null>(null);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [activeTab, setActiveTab] = useState<'info' | 'flights' | 'map'>('info');
  const [terminalMapData, setTerminalMapData] = useState<{terminal: {id: string; name: string; level: number}; locations: Location[]} | null>(null);
  
  useEffect(() => {
    const foundAirport = mockAirports.find(a => a.id === id);
    setAirport(foundAirport || null);
    
    setFlights(mockFlights);
    
    if (id && terminalMapsData[id]) {
      setTerminalMapData(terminalMapsData[id]);
    }
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
                      {airport.restaurants} Restaurants & Cafes
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                      {airport.shops} Retail Shops
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                      {airport.restrooms} Restrooms
                    </li>
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
              {terminalMapData ? (
                <TerminalMap 
                  terminal={terminalMapData.terminal} 
                  locations={terminalMapData.locations} 
                  className="border rounded-lg overflow-hidden"
                />
              ) : (
                <div className="text-center text-muted-foreground py-12">
                  Terminal map not available for this airport
                </div>
              )}
              
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-white shadow-sm flex items-center justify-center mr-2">
                    <span className="text-[8px]">✈️</span>
                  </div>
                  <span className="text-sm">Gates</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-white shadow-sm flex items-center justify-center mr-2">
                    <span className="text-[8px]">🍽️</span>
                  </div>
                  <span className="text-sm">Restaurants</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-white shadow-sm flex items-center justify-center mr-2">
                    <span className="text-[8px]">🛍️</span>
                  </div>
                  <span className="text-sm">Shops</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-white shadow-sm flex items-center justify-center mr-2">
                    <span className="text-[8px]">🚻</span>
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
