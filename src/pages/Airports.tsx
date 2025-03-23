
import { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import AirportCard, { AirportData } from '@/components/AirportCard';
import { SearchIcon, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data for airports
const mockAirports: AirportData[] = [
  {
    id: 'del',
    code: 'DEL',
    name: 'Indira Gandhi International Airport',
    city: 'Delhi',
    image: 'https://images.unsplash.com/photo-1596465631094-1a2a5fa878f6?q=80&w=1000&auto=format&fit=crop',
    terminals: 3,
    congestion: 'High',
    featured: true
  },
  {
    id: 'bom',
    code: 'BOM',
    name: 'Chhatrapati Shivaji International Airport',
    city: 'Mumbai',
    image: 'https://images.unsplash.com/photo-1583997052103-b4a1cb974cc3?q=80&w=1000&auto=format&fit=crop',
    terminals: 2,
    congestion: 'High',
    featured: true
  },
  {
    id: 'blr',
    code: 'BLR',
    name: 'Kempegowda International Airport',
    city: 'Bangalore',
    image: 'https://images.unsplash.com/photo-1596451190630-186aff535ed2?q=80&w=1000&auto=format&fit=crop',
    terminals: 2,
    congestion: 'Moderate'
  },
  {
    id: 'maa',
    code: 'MAA',
    name: 'Chennai International Airport',
    city: 'Chennai',
    image: 'https://images.unsplash.com/photo-1517400508447-f8dd518b86db?q=80&w=1000&auto=format&fit=crop',
    terminals: 2,
    congestion: 'Moderate'
  },
  {
    id: 'ccu',
    code: 'CCU',
    name: 'Netaji Subhas Chandra Bose International Airport',
    city: 'Kolkata',
    image: 'https://images.unsplash.com/photo-1554747718-4b9b9f4f442a?q=80&w=1000&auto=format&fit=crop',
    terminals: 2,
    congestion: 'Low'
  },
  {
    id: 'hyd',
    code: 'HYD',
    name: 'Rajiv Gandhi International Airport',
    city: 'Hyderabad',
    image: 'https://images.unsplash.com/photo-1621886292650-520f76c747d6?q=80&w=1000&auto=format&fit=crop',
    terminals: 1,
    congestion: 'Low'
  }
];

const Airports = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'featured' | 'high' | 'moderate' | 'low'>('all');
  
  const filteredAirports = mockAirports
    .filter(airport => 
      airport.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      airport.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      airport.city.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(airport => {
      if (filter === 'all') return true;
      if (filter === 'featured') return airport.featured;
      if (filter === 'high') return airport.congestion === 'High';
      if (filter === 'moderate') return airport.congestion === 'Moderate';
      if (filter === 'low') return airport.congestion === 'Low';
      return true;
    });
  
  return (
    <PageLayout>
      <div className="max-w-6xl mx-auto animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Indian Airports</h1>
          
          <div className="flex items-center gap-3">
            <div className={cn(
              "relative overflow-hidden",
              "backdrop-blur-sm border rounded-lg",
              "bg-white/70 hover:bg-white/80 transition-all"
            )}>
              <div className="flex items-center px-3 py-2">
                <SearchIcon className="w-4 h-4 mr-2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search airports..."
                  className="flex-1 bg-transparent border-0 outline-none text-foreground placeholder:text-muted-foreground text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="relative">
              <select
                className="appearance-none bg-white/70 backdrop-blur-sm border rounded-lg px-3 py-2 pr-8 text-sm outline-none"
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
              >
                <option value="all">All airports</option>
                <option value="featured">Featured</option>
                <option value="high">High congestion</option>
                <option value="moderate">Moderate congestion</option>
                <option value="low">Low congestion</option>
              </select>
              <Filter className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAirports.length > 0 ? (
            filteredAirports.map(airport => (
              <AirportCard key={airport.id} airport={airport} />
            ))
          ) : (
            <div className="col-span-3 py-16 text-center">
              <h3 className="text-xl font-medium mb-2">No airports found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default Airports;
