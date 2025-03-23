
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { MapPin, Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full animate-fade-in">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-app-blue/10 flex items-center justify-center">
              <MapPin className="w-10 h-10 text-app-blue" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center border-4 border-white">
              <span className="text-red-600 text-xl font-bold">?</span>
            </div>
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-center mb-4">Destination Not Found</h1>
        
        <p className="text-center text-muted-foreground mb-8">
          The page you are looking for doesn't exist or has been moved to another location.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-app-blue text-white shadow-sm hover:bg-app-indigo transition-colors"
          >
            <Home className="mr-2 h-5 w-5" /> Return Home
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg border shadow-sm hover:bg-muted/20 transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" /> Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
