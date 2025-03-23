
import { ArrowRight, Plane, MapPin, Luggage, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import PageLayout from '@/components/PageLayout';
import HomeSearch from '@/components/HomeSearch';

const Index = () => {
  const features = [
    {
      title: 'Airport Maps',
      description: 'Interactive maps of major Indian airports with detailed terminal layouts',
      icon: Plane,
      color: 'bg-blue-100 text-blue-600',
      link: '/airports'
    },
    {
      title: 'Indoor Navigation',
      description: 'Turn-by-turn directions to navigate terminals, gates, and facilities',
      icon: MapPin,
      color: 'bg-amber-100 text-amber-600',
      link: '/navigation'
    },
    {
      title: 'Luggage Tracking',
      description: 'Real-time tracking of your checked baggage from check-in to arrival',
      icon: Luggage,
      color: 'bg-green-100 text-green-600',
      link: '/luggage'
    },
    {
      title: 'Smart Search',
      description: 'Find gates, restaurants, shops, and services within the airport',
      icon: Search,
      color: 'bg-purple-100 text-purple-600',
      link: '/navigation'
    }
  ];

  return (
    <PageLayout className="flex flex-col">
      <section className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4 py-16 md:py-24">
        <div className="w-16 h-16 rounded-full bg-app-blue/10 flex items-center justify-center mb-8 animate-float">
          <Plane className="text-app-blue w-8 h-8" />
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl leading-tight mb-6 animate-slide-down">
          Navigate Indian Airports with Ease
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 animate-slide-up">
          Real-time indoor navigation, luggage tracking, and optimized routing for a seamless travel experience
        </p>
        
        <HomeSearch />
        
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Link 
            to="/airports"
            className="flex items-center px-6 py-3 bg-app-blue text-white rounded-lg font-medium shadow-md hover:bg-app-indigo transition-colors duration-300 animate-slide-up"
          >
            Explore Airports <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
          
          <Link 
            to="/navigation"
            className="flex items-center px-6 py-3 bg-white border border-muted rounded-lg font-medium hover:bg-muted/20 transition-colors duration-300 animate-slide-up"
          >
            Try Navigation <MapPin className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </section>
      
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Core Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 staggered-fade-in">
            {features.map((feature, index) => (
              <Link 
                key={index}
                to={feature.link}
                className="relative overflow-hidden p-6 rounded-xl border bg-card hover:shadow-md transition-all duration-300 group"
              >
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center mb-4",
                  feature.color
                )}>
                  <feature.icon size={24} />
                </div>
                
                <h3 className="text-xl font-semibold mb-2 group-hover:text-app-blue transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground mb-4">
                  {feature.description}
                </p>
                
                <div className="flex items-center text-app-blue font-medium">
                  Explore <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-app-terminal/50 rounded-xl">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Supported Airports
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {['DEL', 'BOM', 'BLR', 'MAA', 'CCU', 'HYD'].map((code) => (
              <div key={code} className="px-4 py-2 rounded-lg bg-white border shadow-sm">
                <span className="font-semibold">{code}</span>
              </div>
            ))}
          </div>
          
          <Link 
            to="/airports"
            className="inline-flex items-center text-app-blue font-medium hover:underline"
          >
            View all supported airports <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>
      </section>
    </PageLayout>
  );
};

export default Index;
