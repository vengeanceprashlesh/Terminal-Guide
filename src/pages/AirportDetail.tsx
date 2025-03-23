
import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, Map, Navigation, Info, Clock, User, Coffee, ChevronRight } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import TerminalMap from '@/components/TerminalMap';
import { cn } from '@/lib/utils';

// Mock data for airport details
const airportData = {
  del: {
    code: 'DEL',
    name: 'Indira Gandhi International Airport',
    city: 'Delhi',
    image: 'https://images.unsplash.com/photo-1596465631094-1a2a5fa878f6?q=80&w=1000&auto=format&fit=crop',
    description: 'Indira Gandhi International Airport is the primary international airport serving Delhi, and the busiest airport in India by passenger traffic and cargo.',
    terminals: [
      {
        id: 't1',
        name: 'Terminal 1',
        level: 1,
        services: ['Domestic Flights', 'Duty Free Shopping', 'Food Court', 'Lounges'],
      },
      {
        id: 't2',
        name: 'Terminal 2',
        level: 1,
        services: ['International Flights', 'Duty Free Shopping', 'Food Court', 'Lounges', 'Premium Services'],
      },
      {
        id: 't3',
        name: 'Terminal 3',
        level: 1,
        services: ['International Flights', 'Domestic Flights', 'Duty Free Shopping', 'Food Court', 'Lounges', 'Premium Services', 'Transit Hotel'],
      }
    ],
    congestion: 'High',
    waitTimes: {
      security: '15-25 min',
      immigration: '20-30 min',
      baggage: '10-15 min'
    },
    stats: {
      flights: '1,250+ daily',
      destinations: '150+',
      passengers: '70M+ annually'
    }
  },
  // Additional airports would be added here
};

// Mock locations for terminal map
const terminalLocations = [
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

// Sample path for navigation demo
const samplePath = {
  from: 'entrance',
  to: 'gate-2',
  points: [
    { x: 15, y: 50 },
    { x: 15, y: 40 },
    { x: 25, y: 31 },
    { x: 40, y: 31 },
    { x: 50, y: 31 },
    { x: 50, y: 15 },
  ]
};

const AirportDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTerminal, setActiveTerminal] = useState(0);
  const [showPathAnimation, setShowPathAnimation] = useState(false);
  
  if (!id || !airportData[id as keyof typeof airportData]) {
    return (
      <PageLayout>
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold mb-4">Airport Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The airport you're looking for doesn't exist or isn't in our database yet.
          </p>
          <Link 
            to="/airports"
            className="inline-flex items-center px-4 py-2 rounded-lg bg-primary text-primary-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Airports
          </Link>
        </div>
      </PageLayout>
    );
  }
  
  const airport = airportData[id as keyof typeof airportData];
  
  return (
    <PageLayout>
      <div className="max-w-6xl mx-auto animate-fade-in">
        <div className="mb-8">
          <Link 
            to="/airports"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> All Airports
          </Link>
        </div>
        
        <div className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
              <div className="rounded-xl overflow-hidden h-64 md:h-80">
                <img 
                  src={airport.image} 
                  alt={airport.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-sm font-semibold px-2 py-0.5 rounded-full bg-app-blue/10 text-app-blue">
                  {airport.code}
                </span>
                <span className="text-sm font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                  {airport.congestion} Congestion
                </span>
              </div>
              
              <h1 className="text-3xl font-bold mb-2">{airport.name}</h1>
              <p className="text-lg text-muted-foreground mb-6">{airport.city}</p>
              
              <p className="text-muted-foreground mb-6">{airport.description}</p>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="rounded-lg border p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Flights</p>
                  <p className="font-semibold">{airport.stats.flights}</p>
                </div>
                <div className="rounded-lg border p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Destinations</p>
                  <p className="font-semibold">{airport.stats.destinations}</p>
                </div>
                <div className="rounded-lg border p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Passengers</p>
                  <p className="font-semibold">{airport.stats.passengers}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Link
                  to={`/navigation?airport=${id}`}
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-app-blue text-white"
                >
                  <Navigation className="mr-2 h-4 w-4" /> Navigate Airport
                </Link>
                <Link
                  to={`/luggage?airport=${id}`}
                  className="inline-flex items-center px-4 py-2 rounded-lg border bg-background hover:bg-muted/20"
                >
                  <Map className="mr-2 h-4 w-4" /> Terminal Maps
                </Link>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="rounded-lg border p-4">
              <div className="flex items-center mb-3">
                <Clock className="h-5 w-5 text-muted-foreground mr-2" />
                <h3 className="font-medium">Wait Times</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Security</span>
                  <span className="text-sm font-medium">{airport.waitTimes.security}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Immigration</span>
                  <span className="text-sm font-medium">{airport.waitTimes.immigration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Baggage Claim</span>
                  <span className="text-sm font-medium">{airport.waitTimes.baggage}</span>
                </div>
              </div>
            </div>
            
            <div className="rounded-lg border p-4">
              <div className="flex items-center mb-3">
                <User className="h-5 w-5 text-muted-foreground mr-2" />
                <h3 className="font-medium">Passenger Services</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center text-sm">
                  <ChevronRight className="h-4 w-4 text-app-blue mr-1" />
                  Baggage Assistance
                </li>
                <li className="flex items-center text-sm">
                  <ChevronRight className="h-4 w-4 text-app-blue mr-1" />
                  Information Desks
                </li>
                <li className="flex items-center text-sm">
                  <ChevronRight className="h-4 w-4 text-app-blue mr-1" />
                  Currency Exchange
                </li>
                <li className="flex items-center text-sm">
                  <ChevronRight className="h-4 w-4 text-app-blue mr-1" />
                  Medical Facilities
                </li>
              </ul>
            </div>
            
            <div className="rounded-lg border p-4">
              <div className="flex items-center mb-3">
                <Coffee className="h-5 w-5 text-muted-foreground mr-2" />
                <h3 className="font-medium">Amenities</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center text-sm">
                  <ChevronRight className="h-4 w-4 text-app-blue mr-1" />
                  Restaurants & Cafés
                </li>
                <li className="flex items-center text-sm">
                  <ChevronRight className="h-4 w-4 text-app-blue mr-1" />
                  Duty Free Shopping
                </li>
                <li className="flex items-center text-sm">
                  <ChevronRight className="h-4 w-4 text-app-blue mr-1" />
                  Lounges
                </li>
                <li className="flex items-center text-sm">
                  <ChevronRight className="h-4 w-4 text-app-blue mr-1" />
                  Free Wi-Fi
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Terminal Map</h2>
              
              <div className="flex space-x-2">
                {airport.terminals.map((terminal, index) => (
                  <button
                    key={terminal.id}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-sm font-medium",
                      activeTerminal === index
                        ? "bg-app-blue text-white"
                        : "bg-muted hover:bg-muted/80"
                    )}
                    onClick={() => setActiveTerminal(index)}
                  >
                    {terminal.name}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-2/3">
                <TerminalMap
                  terminal={airport.terminals[activeTerminal]}
                  locations={terminalLocations}
                  path={samplePath}
                  showAnimation={showPathAnimation}
                />
                
                <div className="mt-4 flex justify-center">
                  <button
                    className="px-4 py-2 bg-app-blue text-white rounded-lg flex items-center"
                    onClick={() => setShowPathAnimation(!showPathAnimation)}
                  >
                    <Navigation className="mr-2 h-4 w-4" />
                    {showPathAnimation ? 'Stop Animation' : 'Simulate Navigation'}
                  </button>
                </div>
              </div>
              
              <div className="lg:w-1/3">
                <div className="rounded-lg border p-4 h-full">
                  <div className="flex items-center mb-4">
                    <Info className="h-5 w-5 text-muted-foreground mr-2" />
                    <h3 className="font-medium">Terminal {airport.terminals[activeTerminal].name.split(' ')[1]} Info</h3>
                  </div>
                  
                  <h4 className="text-sm font-semibold mb-2">Available Services</h4>
                  <ul className="space-y-2 mb-6">
                    {airport.terminals[activeTerminal].services.map((service, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <ChevronRight className="h-4 w-4 text-app-blue mr-1" />
                        {service}
                      </li>
                    ))}
                  </ul>
                  
                  <h4 className="text-sm font-semibold mb-2">Points of Interest</h4>
                  <ul className="space-y-2">
                    {terminalLocations
                      .filter(loc => loc.type !== 'entrance' && loc.type !== 'exit')
                      .slice(0, 5)
                      .map(location => (
                        <li key={location.id} className="flex items-center text-sm">
                          <ChevronRight className="h-4 w-4 text-app-blue mr-1" />
                          {location.name}
                        </li>
                    ))}
                  </ul>
                  
                  <div className="mt-6 pt-4 border-t">
                    <Link 
                      to={`/navigation?airport=${id}&terminal=${airport.terminals[activeTerminal].id}`}
                      className="w-full inline-flex items-center justify-center px-4 py-2 rounded-lg bg-app-blue/10 text-app-blue hover:bg-app-blue/20"
                    >
                      <Navigation className="mr-2 h-4 w-4" /> Start Navigation
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AirportDetail;
