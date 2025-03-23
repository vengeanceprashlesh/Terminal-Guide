
import { useState, useEffect } from 'react';
import { Bell, Languages, Moon, AlertCircle, Accessibility, Smartphone, ToggleLeft, Share2 } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';

// Create a language service to handle translations and preferences
const languageConfig = {
  english: {
    name: 'English',
    label: 'English',
    dir: 'ltr',
    translations: {
      appPreferences: 'App Preferences',
      customize: 'Customize how the app works for you',
      notifications: 'Notifications',
      notificationsDesc: 'Receive updates about flight changes and baggage status',
      darkMode: 'Dark Mode',
      darkModeDesc: 'Use dark theme for the application interface',
      accessibilityMode: 'Accessibility Mode',
      accessibilityDesc: 'Enable features for visual and motor impairments',
      offlineMaps: 'Offline Maps',
      offlineMapsDesc: 'Download maps for use without internet connection',
      languageSettings: 'Language Settings',
      selectLanguage: 'Select your preferred language',
      displayLanguage: 'Display Language',
      dataUsage: 'Data Usage',
      dataUsageControl: 'Control how the app uses your data connection',
      dataUsageMode: 'Data Usage Mode',
      low: 'Low',
      normal: 'Normal',
      high: 'High',
      lowDesc: 'Minimal data usage but lower map quality',
      normalDesc: 'Balanced data usage and map quality',
      highDesc: 'High quality maps with increased data usage',
      about: 'About',
      aboutInfo: 'Information about the application',
      version: 'Version',
      build: 'Build',
      platform: 'Platform',
      shareApp: 'Share App',
      helpSupport: 'Help & Support'
    }
  },
  hindi: {
    name: 'हिन्दी',
    label: 'हिन्दी (Hindi)',
    dir: 'ltr',
    translations: {
      appPreferences: 'ऐप प्राथमिकताएं',
      customize: 'अनुकूलित करें कि ऐप आपके लिए कैसे काम करता है',
      notifications: 'सूचनाएं',
      notificationsDesc: 'उड़ान परिवर्तन और सामान की स्थिति के बारे में अपडेट प्राप्त करें',
      darkMode: 'डार्क मोड',
      darkModeDesc: 'एप्लिकेशन इंटरफ़ेस के लिए डार्क थीम का उपयोग करें',
      accessibilityMode: 'एक्सेसिबिलिटी मोड',
      accessibilityDesc: 'दृश्य और मोटर दोषों के लिए सुविधाएं सक्षम करें',
      offlineMaps: 'ऑफलाइन नक्शे',
      offlineMapsDesc: 'इंटरनेट कनेक्शन के बिना उपयोग के लिए नक्शे डाउनलोड करें',
      languageSettings: 'भाषा सेटिंग्स',
      selectLanguage: 'अपनी पसंदीदा भाषा चुनें',
      displayLanguage: 'प्रदर्शन भाषा',
      dataUsage: 'डेटा उपयोग',
      dataUsageControl: 'नियंत्रित करें कि ऐप आपके डेटा कनेक्शन का उपयोग कैसे करता है',
      dataUsageMode: 'डेटा उपयोग मोड',
      low: 'कम',
      normal: 'सामान्य',
      high: 'उच्च',
      lowDesc: 'न्यूनतम डेटा उपयोग लेकिन कम नक्शा गुणवत्ता',
      normalDesc: 'संतुलित डेटा उपयोग और नक्शा गुणवत्ता',
      highDesc: 'उच्च गुणवत्ता वाले नक्शे बढ़े हुए डेटा उपयोग के साथ',
      about: 'के बारे में',
      aboutInfo: 'एप्लिकेशन के बारे में जानकारी',
      version: 'संस्करण',
      build: 'बिल्ड',
      platform: 'प्लेटफॉर्म',
      shareApp: 'ऐप शेयर करें',
      helpSupport: 'सहायता और समर्थन'
    }
  },
  tamil: {
    name: 'தமிழ்',
    label: 'தமிழ் (Tamil)',
    dir: 'ltr',
    translations: {
      appPreferences: 'பயன்பாட்டு விருப்பங்கள்',
      customize: 'பயன்பாடு உங்களுக்காக எப்படி செயல்படுகிறது என்பதை தனிப்பயனாக்கவும்',
      notifications: 'அறிவிப்புகள்',
      notificationsDesc: 'விமான மாற்றங்கள் மற்றும் பொருட்கள் நிலை பற்றிய புதுப்பிப்புகளைப் பெறுங்கள்',
      darkMode: 'இருண்ட பயன்முறை',
      darkModeDesc: 'பயன்பாட்டு இடைமுகத்திற்கு இருண்ட தீம் பயன்படுத்தவும்',
      accessibilityMode: 'அணுகல் முறை',
      accessibilityDesc: 'காட்சி மற்றும் மோட்டார் குறைபாடுகளுக்கான அம்சங்களை இயக்கவும்',
      offlineMaps: 'ஆஃப்லைன் வரைபடங்கள்',
      offlineMapsDesc: 'இணைய இணைப்பு இல்லாமல் பயன்படுத்த வரைபடங்களைப் பதிவிறக்கவும்',
      languageSettings: 'மொழி அமைப்புகள்',
      selectLanguage: 'உங்களுக்கு விருப்பமான மொழியைத் தேர்ந்தெடுக்கவும்',
      displayLanguage: 'காட்சி மொழி',
      dataUsage: 'தரவு பயன்பாடு',
      dataUsageControl: 'பயன்பாடு உங்கள் தரவு இணைப்பை எவ்வாறு பயன்படுத்துகிறது என்பதைக் கட்டுப்படுத்தவும்',
      dataUsageMode: 'தரவு பயன்பாட்டு முறை',
      low: 'குறைவான',
      normal: 'இயல்பான',
      high: 'அதிகமான',
      lowDesc: 'குறைந்தபட்ச தரவு பயன்பாடு ஆனால் குறைவான வரைபட தரம்',
      normalDesc: 'சமநிலையான தரவு பயன்பாடு மற்றும் வரைபட தரம்',
      highDesc: 'அதிகரித்த தரவு பயன்பாட்டுடன் உயர் தர வரைபடங்கள்',
      about: 'பற்றி',
      aboutInfo: 'பயன்பாடு பற்றிய தகவல்',
      version: 'பதிப்பு',
      build: 'கட்டமைப்பு',
      platform: 'தளம்',
      shareApp: 'பயன்பாட்டை பகிரவும்',
      helpSupport: 'உதவி & ஆதரவு'
    }
  },
  bengali: {
    name: 'বাংলা',
    label: 'বাংলা (Bengali)',
    dir: 'ltr',
    translations: {
      appPreferences: 'অ্যাপ পছন্দসমূহ',
      customize: 'অ্যাপটি আপনার জন্য কীভাবে কাজ করে তা কাস্টমাইজ করুন',
      notifications: 'বিজ্ঞপ্তি',
      notificationsDesc: 'ফ্লাইট পরিবর্তন এবং ব্যাগেজ স্ট্যাটাস সম্পর্কে আপডেট পান',
      darkMode: 'ডার্ক মোড',
      darkModeDesc: 'অ্যাপ্লিকেশন ইন্টারফেসের জন্য ডার্ক থিম ব্যবহার করুন',
      accessibilityMode: 'অ্যাক্সেসিবিলিটি মোড',
      accessibilityDesc: 'ভিজ্যুয়াল এবং মোটর প্রতিবন্ধকতার জন্য বৈশিষ্ট্য সক্ষম করুন',
      offlineMaps: 'অফলাইন মানচিত্র',
      offlineMapsDesc: 'ইন্টারনেট সংযোগ ছাড়া ব্যবহারের জন্য মানচিত্র ডাউনলোড করুন',
      languageSettings: 'ভাষা সেটিংস',
      selectLanguage: 'আপনার পছন্দের ভাষা নির্বাচন করুন',
      displayLanguage: 'প্রদর্শন ভাষা',
      dataUsage: 'ডেটা ব্যবহার',
      dataUsageControl: 'অ্যাপ কীভাবে আপনার ডেটা সংযোগ ব্যবহার করে তা নিয়ন্ত্রণ করুন',
      dataUsageMode: 'ডেটা ব্যবহার মোড',
      low: 'কম',
      normal: 'সাধারণ',
      high: 'উচ্চ',
      lowDesc: 'সর্বনিম্ন ডেটা ব্যবহার কিন্তু কম মানচিত্র মান',
      normalDesc: 'ভারসাম্যপূর্ণ ডেটা ব্যবহার এবং মানচিত্র মান',
      highDesc: 'বর্ধিত ডেটা ব্যবহারের সাথে উচ্চ মানের মানচিত্র',
      about: 'সম্পর্কে',
      aboutInfo: 'অ্যাপ্লিকেশন সম্পর্কে তথ্য',
      version: 'সংস্করণ',
      build: 'বিল্ড',
      platform: 'প্ল্যাটফর্ম',
      shareApp: 'অ্যাপ শেয়ার করুন',
      helpSupport: 'সাহায্য ও সমর্থন'
    }
  },
  malayalam: {
    name: 'മലയാളം',
    label: 'മലയാളം (Malayalam)',
    dir: 'ltr',
    translations: {
      appPreferences: 'ആപ്പ് മുൻഗണനകൾ',
      customize: 'ആപ്പ് നിങ്ങൾക്കായി എങ്ങനെ പ്രവർത്തിക്കുന്നുവെന്ന് ഇഷ്ടാനുസൃതമാക്കുക',
      notifications: 'അറിയിപ്പുകൾ',
      notificationsDesc: 'ഫ്ലൈറ്റ് മാറ്റങ്ങളെക്കുറിച്ചും ബാഗേജ് നിലയെക്കുറിച്ചും അപ്ഡേറ്റുകൾ സ്വീകരിക്കുക',
      darkMode: 'ഡാർക്ക് മോഡ്',
      darkModeDesc: 'ആപ്ലിക്കേഷൻ ഇന്റർഫേസിനായി ഡാർക്ക് തീം ഉപയോഗിക്കുക',
      accessibilityMode: 'ആക്സസിബിലിറ്റി മോഡ്',
      accessibilityDesc: 'കാഴ്ച, മോട്ടോർ വൈകല്യങ്ങൾക്കായുള്ള സവിശേഷതകൾ പ്രാപ്തമാക്കുക',
      offlineMaps: 'ഓഫ്ലൈൻ മാപ്പുകൾ',
      offlineMapsDesc: 'ഇന്റർനെറ്റ് കണക്ഷൻ ഇല്ലാതെ ഉപയോഗിക്കാൻ മാപ്പുകൾ ഡൗൺലോഡ് ചെയ്യുക',
      languageSettings: 'ഭാഷാ ക്രമീകരണങ്ങൾ',
      selectLanguage: 'നിങ്ങളുടെ ഇഷ്ടപ്പെട്ട ഭാഷ തിരഞ്ഞെടുക്കുക',
      displayLanguage: 'ഡിസ്പ്ലേ ഭാഷ',
      dataUsage: 'ഡാറ്റ ഉപയോഗം',
      dataUsageControl: 'ആപ്പ് നിങ്ങളുടെ ഡാറ്റ കണക്ഷൻ എങ്ങനെ ഉപയോഗിക്കുന്നുവെന്ന് നിയന്ത്രിക്കുക',
      dataUsageMode: 'ഡാറ്റ ഉപയോഗ മോഡ്',
      low: 'കുറഞ്ഞ',
      normal: 'സാധാരണ',
      high: 'ഉയർന്ന',
      lowDesc: 'കുറഞ്ഞ ഡാറ്റ ഉപയോഗം പക്ഷേ മാപ്പ് ഗുണനിലവാരം കുറവ്',
      normalDesc: 'സന്തുലിതമായ ഡാറ്റ ഉപയോഗവും മാപ്പ് ഗുണനിലവാരവും',
      highDesc: 'വർദ്ധിത ഡാറ്റ ഉപയോഗത്തോടെ ഉയർന്ന നിലവാരമുള്ള മാപ്പുകൾ',
      about: 'ആപ്പിനെക്കുറിച്ച്',
      aboutInfo: 'ആപ്ലിക്കേഷനെക്കുറിച്ചുള്ള വിവരങ്ങൾ',
      version: 'പതിപ്പ്',
      build: 'ബിൽഡ്',
      platform: 'പ്ലാറ്റ്ഫോം',
      shareApp: 'ആപ്പ് പങ്കിടുക',
      helpSupport: 'സഹായവും പിന്തുണയും'
    }
  },
  telugu: {
    name: 'తెలుగు',
    label: 'తెలుగు (Telugu)',
    dir: 'ltr',
    translations: {
      appPreferences: 'యాప్ ప్రాధాన్యతలు',
      customize: 'యాప్ మీ కోసం ఎలా పనిచేస్తుందో అనుకూలీకరించండి',
      notifications: 'నోటిఫికేషన్లు',
      notificationsDesc: 'విమాన మార్పులు మరియు సామాను స్థితి గురించి నవీకరణలను పొందండి',
      darkMode: 'డార్క్ మోడ్',
      darkModeDesc: 'అప్లికేషన్ ఇంటర్ఫేస్ కోసం డార్క్ థీమ్ ఉపయోగించండి',
      accessibilityMode: 'యాక్సెసిబిలిటీ మోడ్',
      accessibilityDesc: 'విజువల్ మరియు మోటర్ లోపాలకు లక్షణాలను ప్రారంభించండి',
      offlineMaps: 'ఆఫ్లైన్ మ్యాప్స్',
      offlineMapsDesc: 'ఇంటర్నెట్ కనెక్షన్ లేకుండా ఉపయోగించడానికి మ్యాప్‌లను డౌన్‌లోడ్ చేయండి',
      languageSettings: 'భాషా సెట్టింగ్‌లు',
      selectLanguage: 'మీకు ఇష్టమైన భాషను ఎంచుకోండి',
      displayLanguage: 'డిస్ప్లే భాష',
      dataUsage: 'డేటా వాడకం',
      dataUsageControl: 'యాప్ మీ డేటా కనెక్షన్‌ను ఎలా ఉపయోగిస్తుందో నియంత్రించండి',
      dataUsageMode: 'డేటా వాడకం మోడ్',
      low: 'తక్కువ',
      normal: 'సాధారణ',
      high: 'అధిక',
      lowDesc: 'కనీస డేటా వాడకం కానీ తక్కువ మ్యాప్ నాణ్యత',
      normalDesc: 'బ్యాలెన్స్డ్ డేటా వాడకం మరియు మ్యాప్ నాణ్యత',
      highDesc: 'పెరిగిన డేటా వినియోగంతో అధిక నాణ్యత మ్యాప్‌లు',
      about: 'గురించి',
      aboutInfo: 'అప్లికేషన్ గురించి సమాచారం',
      version: 'వెర్షన్',
      build: 'బిల్డ్',
      platform: 'ప్లాట్‌ఫార్మ్',
      shareApp: 'యాప్‌ను షేర్ చేయండి',
      helpSupport: 'సహాయం & మద్దతు'
    }
  }
};

const Settings = () => {
  const [language, setLanguage] = useState('english');
  const [translations, setTranslations] = useState(languageConfig.english.translations);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [accessibilityMode, setAccessibilityMode] = useState(false);
  const [offlineMode, setOfflineMode] = useState(false);
  const [dataUsage, setDataUsage] = useState('normal');
  
  // Set the languages supported
  const languages = [
    { value: 'english', label: 'English' },
    { value: 'hindi', label: 'हिन्दी (Hindi)' },
    { value: 'tamil', label: 'தமிழ் (Tamil)' },
    { value: 'bengali', label: 'বাংলা (Bengali)' },
    { value: 'malayalam', label: 'മലയാളം (Malayalam)' },
    { value: 'telugu', label: 'తెలుగు (Telugu)' },
  ];
  
  // Apply language change
  useEffect(() => {
    if (languageConfig[language]) {
      setTranslations(languageConfig[language].translations);
      // Set document direction based on language
      document.documentElement.dir = languageConfig[language].dir;
      
      // Show notification about language change
      toast({
        title: "Language Changed",
        description: `Display language changed to ${languageConfig[language].name}`,
        duration: 3000,
      });
    }
  }, [language]);
  
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
            <h2 className="text-xl font-semibold mb-1">{translations.appPreferences}</h2>
            <p className="text-muted-foreground text-sm">
              {translations.customize}
            </p>
          </div>
          
          <div className="p-6">
            <SettingToggle
              label={translations.notifications}
              description={translations.notificationsDesc}
              icon={Bell}
              enabled={notifications}
              onChange={setNotifications}
            />
            
            <SettingToggle
              label={translations.darkMode}
              description={translations.darkModeDesc}
              icon={Moon}
              enabled={darkMode}
              onChange={setDarkMode}
            />
            
            <SettingToggle
              label={translations.accessibilityMode}
              description={translations.accessibilityDesc}
              icon={Accessibility}
              enabled={accessibilityMode}
              onChange={setAccessibilityMode}
            />
            
            <SettingToggle
              label={translations.offlineMaps}
              description={translations.offlineMapsDesc}
              icon={Smartphone}
              enabled={offlineMode}
              onChange={setOfflineMode}
            />
          </div>
        </div>
        
        <div className="rounded-xl border bg-card overflow-hidden mb-8">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold mb-1">{translations.languageSettings}</h2>
            <p className="text-muted-foreground text-sm">
              {translations.selectLanguage}
            </p>
          </div>
          
          <div className="p-6">
            <div className="flex mb-4">
              <div className="w-10 h-10 rounded-full bg-app-blue/10 flex items-center justify-center mr-4">
                <Languages size={20} className="text-app-blue" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium mb-2">{translations.displayLanguage}</h3>
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
            <h2 className="text-xl font-semibold mb-1">{translations.dataUsage}</h2>
            <p className="text-muted-foreground text-sm">
              {translations.dataUsageControl}
            </p>
          </div>
          
          <div className="p-6">
            <div className="flex mb-4">
              <div className="w-10 h-10 rounded-full bg-app-blue/10 flex items-center justify-center mr-4">
                <ToggleLeft size={20} className="text-app-blue" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium mb-2">{translations.dataUsageMode}</h3>
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
                      {mode === 'low' && translations.low}
                      {mode === 'normal' && translations.normal}
                      {mode === 'high' && translations.high}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {dataUsage === 'low' && translations.lowDesc}
                  {dataUsage === 'normal' && translations.normalDesc}
                  {dataUsage === 'high' && translations.highDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="rounded-xl border bg-card overflow-hidden mb-8">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold mb-1">{translations.about}</h2>
            <p className="text-muted-foreground text-sm">
              {translations.aboutInfo}
            </p>
          </div>
          
          <div className="p-6">
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-muted-foreground">{translations.version}</span>
              <span>1.0.0</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-muted-foreground">{translations.build}</span>
              <span>2023.10.15</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-muted-foreground">{translations.platform}</span>
              <span>Web</span>
            </div>
            
            <div className="flex justify-between mt-6">
              <button className="flex items-center px-4 py-2 rounded-lg border hover:bg-muted/20">
                <Share2 className="mr-2 h-4 w-4" /> {translations.shareApp}
              </button>
              <button className="flex items-center px-4 py-2 rounded-lg border hover:bg-muted/20">
                <AlertCircle className="mr-2 h-4 w-4" /> {translations.helpSupport}
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Settings;
