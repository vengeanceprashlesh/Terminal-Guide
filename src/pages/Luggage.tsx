
import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Luggage, Plus, X, QrCode, Plane, ArrowRight, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import PageLayout from '@/components/PageLayout';
import LuggageTracker, { LuggageItem } from '@/components/LuggageTracker';

// Mock luggage data
const mockLuggage: LuggageItem[] = [
  {
    id: 'bag-1',
    tagNumber: 'AB123456',
    flightNumber: 'AI-101',
    status: 'checked-in',
    lastUpdated: '11:25 AM',
    estimatedArrival: '5:45 PM',
    location: 'Delhi Airport - Baggage Processing'
  },
  {
    id: 'bag-2',
    tagNumber: 'CD789012',
    flightNumber: 'AI-101',
    status: 'in-transit',
    lastUpdated: '11:30 AM',
    estimatedArrival: '5:45 PM',
    location: 'In Flight'
  },
  {
    id: 'bag-3',
    tagNumber: 'EF345678',
    flightNumber: 'UK-943',
    status: 'arrived',
    lastUpdated: '10:15 AM',
    location: 'Mumbai Airport - Carousel 4'
  }
];

const Luggage = () => {
  const [searchParams] = useSearchParams();
  const [luggage, setLuggage] = useState(mockLuggage);
  const [isAddingBag, setIsAddingBag] = useState(false);
  const [newTagNumber, setNewTagNumber] = useState('');
  const [newFlightNumber, setNewFlightNumber] = useState('');
  
  const airportCode = searchParams.get('airport')?.toUpperCase() || '';
  
  const handleAddBag = () => {
    if (newTagNumber && newFlightNumber) {
      const newBag: LuggageItem = {
        id: `bag-${luggage.length + 1}`,
        tagNumber: newTagNumber,
        flightNumber: newFlightNumber,
        status: 'checked-in',
        lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        estimatedArrival: '6:30 PM',
        location: 'Processing'
      };
      
      setLuggage([...luggage, newBag]);
      setNewTagNumber('');
      setNewFlightNumber('');
      setIsAddingBag(false);
    }
  };
  
  const handleRemoveBag = (id: string) => {
    setLuggage(luggage.filter(bag => bag.id !== id));
  };
  
  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto animate-fade-in">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Luggage Tracking</h1>
            <p className="text-muted-foreground">
              {airportCode ? `${airportCode} Airport` : 'Track your bags in real-time'}
            </p>
          </div>
          
          <button
            className="flex items-center px-4 py-2 rounded-lg bg-app-blue text-white"
            onClick={() => setIsAddingBag(!isAddingBag)}
          >
            {isAddingBag ? (
              <>
                <X className="mr-2 h-4 w-4" /> Cancel
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" /> Add Bag
              </>
            )}
          </button>
        </div>
        
        {isAddingBag && (
          <div className="mb-8 rounded-xl border p-6 bg-card animate-slide-down">
            <h2 className="text-xl font-semibold mb-4">Add Luggage</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                  Bag Tag Number
                </label>
                <div className="flex">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="e.g., AB123456"
                      className="w-full px-3 py-2 border rounded-l-lg bg-background focus:outline-none focus:ring-2 focus:ring-app-blue/30"
                      value={newTagNumber}
                      onChange={(e) => setNewTagNumber(e.target.value)}
                    />
                  </div>
                  <button 
                    className="px-3 py-2 bg-muted border-y border-r rounded-r-lg"
                    title="Scan QR Code"
                  >
                    <QrCode className="h-5 w-5 text-muted-foreground" />
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                  Flight Number
                </label>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="e.g., AI-101"
                    className="w-full px-3 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-app-blue/30"
                    value={newFlightNumber}
                    onChange={(e) => setNewFlightNumber(e.target.value)}
                  />
                </div>
              </div>
              
              <button
                className="w-full px-4 py-2 bg-app-blue text-white rounded-lg font-medium"
                onClick={handleAddBag}
                disabled={!newTagNumber || !newFlightNumber}
              >
                Add Bag
              </button>
            </div>
          </div>
        )}
        
        {!isAddingBag && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="rounded-lg border p-5 bg-blue-50 border-blue-100">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Luggage className="h-5 w-5 text-app-blue" />
                </div>
                <div className="ml-3">
                  <h3 className="font-medium">Total Bags</h3>
                  <p className="text-2xl font-bold">{luggage.length}</p>
                </div>
              </div>
            </div>
            
            <div className="rounded-lg border p-5 bg-green-50 border-green-100">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Plane className="h-5 w-5 text-green-600" />
                </div>
                <div className="ml-3">
                  <h3 className="font-medium">Arrived</h3>
                  <p className="text-2xl font-bold">
                    {luggage.filter(bag => bag.status === 'arrived').length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="rounded-lg border p-5 bg-amber-50 border-amber-100">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-amber-600" />
                </div>
                <div className="ml-3">
                  <h3 className="font-medium">In Transit</h3>
                  <p className="text-2xl font-bold">
                    {luggage.filter(bag => bag.status === 'in-transit' || bag.status === 'checked-in').length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {luggage.length > 0 ? (
          <div className="rounded-xl border p-6 bg-card">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Your Luggage</h2>
              
              <div className="flex items-center">
                <span className="text-sm text-muted-foreground mr-2">Last updated:</span>
                <span className="text-sm font-medium">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
            
            <LuggageTracker items={luggage} />
          </div>
        ) : (
          <div className="rounded-xl border p-8 bg-card text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
              <Luggage className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No Luggage Found</h2>
            <p className="text-muted-foreground mb-6">
              You haven't added any luggage to track yet.
            </p>
            <button
              className="inline-flex items-center px-4 py-2 rounded-lg bg-app-blue text-white"
              onClick={() => setIsAddingBag(true)}
            >
              <Plus className="mr-2 h-4 w-4" /> Add Your First Bag
            </button>
          </div>
        )}
        
        <div className="mt-8 text-center">
          <h3 className="text-lg font-medium mb-3">Need Help With Your Luggage?</h3>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/airports"
              className="inline-flex items-center px-4 py-2 rounded-lg border bg-background hover:bg-muted/20"
            >
              Find Airport Services <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              to="/navigation?destination=baggage"
              className="inline-flex items-center px-4 py-2 rounded-lg border bg-background hover:bg-muted/20"
            >
              Navigate to Baggage Claim <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Luggage;
