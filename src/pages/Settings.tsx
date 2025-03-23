
import { useState } from 'react';
import { Bell, Languages, Moon, AlertCircle, Accessibility, Smartphone, ToggleLeft, Share2 } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import { cn } from '@/lib/utils';

const Settings = () => {
  const [language, setLanguage] = useState('english');
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [accessibilityMode, setAccessibilityMode] = useState(false);
  const [offlineMode, setOfflineMode] = useState(false);
  const [dataUsage, setDataUsage] = useState('normal');
  
  // Set of languages supported
  const languages = [
    { value: 'english', label: 'English' },
    { value: 'hindi', label: 'हिन्दी (Hindi)' },
    { value: 'tamil', label: 'தமிழ் (Tamil)' },
    { value: 'bengali', label: 'বাংলা (Bengali)' },
    { value: 'malayalam', label: 'മലയാളം (Malayalam)' },
    { value: 'telugu', label: 'తెలుగు (Telugu)' },
  ];
  
  const SettingToggle = ({ 
    label, 
    description, 
    icon: Icon, 
    enabled, 
    onChange 
  }: { 
    label: string;
    description: string;
    icon: React.ElementType;
    enabled: boolean;
    onChange: (value: boolean) => void;
  }) => {
    return (
      <div className="flex items-center justify-between py-4 border-b last:border-b-0">
        <div className="flex">
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center mr-4",
            enabled ? "bg-app-blue/10 text-app-blue" : "bg-muted text-muted-foreground"
          )}>
            <Icon size={20} />
          </div>
          <div>
            <h3 className="font-medium">{label}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        <div 
          className={cn(
            "w-12 h-6 rounded-full p-1 transition-colors cursor-pointer",
            enabled ? "bg-app-blue" : "bg-muted"
          )}
          onClick={() => onChange(!enabled)}
        >
          <div className={cn(
            "w-4 h-4 rounded-full bg-white transition-transform",
            enabled ? "transform translate-x-6" : ""
          )}></div>
        </div>
      </div>
    );
  };
  
  return (
    <PageLayout>
      <div className="max-w-3xl mx-auto animate-fade-in">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Settings</h1>
        
        <div className="rounded-xl border bg-card overflow-hidden mb-8">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold mb-1">App Preferences</h2>
            <p className="text-muted-foreground text-sm">
              Customize how the app works for you
            </p>
          </div>
          
          <div className="p-6">
            <SettingToggle
              label="Notifications"
              description="Receive updates about flight changes and baggage status"
              icon={Bell}
              enabled={notifications}
              onChange={setNotifications}
            />
            
            <SettingToggle
              label="Dark Mode"
              description="Use dark theme for the application interface"
              icon={Moon}
              enabled={darkMode}
              onChange={setDarkMode}
            />
            
            <SettingToggle
              label="Accessibility Mode"
              description="Enable features for visual and motor impairments"
              icon={Accessibility}
              enabled={accessibilityMode}
              onChange={setAccessibilityMode}
            />
            
            <SettingToggle
              label="Offline Maps"
              description="Download maps for use without internet connection"
              icon={Smartphone}
              enabled={offlineMode}
              onChange={setOfflineMode}
            />
          </div>
        </div>
        
        <div className="rounded-xl border bg-card overflow-hidden mb-8">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold mb-1">Language Settings</h2>
            <p className="text-muted-foreground text-sm">
              Select your preferred language
            </p>
          </div>
          
          <div className="p-6">
            <div className="flex mb-4">
              <div className="w-10 h-10 rounded-full bg-app-blue/10 flex items-center justify-center mr-4">
                <Languages size={20} className="text-app-blue" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium mb-2">Display Language</h3>
                <select
                  className="w-full px-3 py-2 border rounded-lg bg-background"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  {languages.map((lang) => (
                    <option key={lang.value} value={lang.value}>
                      {lang.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        
        <div className="rounded-xl border bg-card overflow-hidden mb-8">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold mb-1">Data Usage</h2>
            <p className="text-muted-foreground text-sm">
              Control how the app uses your data connection
            </p>
          </div>
          
          <div className="p-6">
            <div className="flex mb-4">
              <div className="w-10 h-10 rounded-full bg-app-blue/10 flex items-center justify-center mr-4">
                <ToggleLeft size={20} className="text-app-blue" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium mb-2">Data Usage Mode</h3>
                <div className="grid grid-cols-3 gap-2">
                  {['low', 'normal', 'high'].map((mode) => (
                    <button
                      key={mode}
                      className={cn(
                        "py-2 rounded-lg text-sm font-medium",
                        dataUsage === mode 
                          ? "bg-app-blue text-white" 
                          : "bg-muted hover:bg-muted/80"
                      )}
                      onClick={() => setDataUsage(mode)}
                    >
                      {mode.charAt(0).toUpperCase() + mode.slice(1)}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {dataUsage === 'low' && "Minimal data usage but lower map quality"}
                  {dataUsage === 'normal' && "Balanced data usage and map quality"}
                  {dataUsage === 'high' && "High quality maps with increased data usage"}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="rounded-xl border bg-card overflow-hidden mb-8">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold mb-1">About</h2>
            <p className="text-muted-foreground text-sm">
              Information about the application
            </p>
          </div>
          
          <div className="p-6">
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-muted-foreground">Version</span>
              <span>1.0.0</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-muted-foreground">Build</span>
              <span>2023.10.15</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-muted-foreground">Platform</span>
              <span>Web</span>
            </div>
            
            <div className="flex justify-between mt-6">
              <button className="flex items-center px-4 py-2 rounded-lg border hover:bg-muted/20">
                <Share2 className="mr-2 h-4 w-4" /> Share App
              </button>
              <button className="flex items-center px-4 py-2 rounded-lg border hover:bg-muted/20">
                <AlertCircle className="mr-2 h-4 w-4" /> Help & Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Settings;
