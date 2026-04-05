import React, { useState, useEffect } from 'react';

// --- STYLING CONSTANTS ---
const COLORS = {
  main: '#8cb2b0', // Updated Main Body Color
  button: '#b28c8e', // Your Dusty Rose
  textWhite: '#ffffff',
};

// --- STABLE CUSTOM SVG ICONS ---
const Icons = {
  Menu: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
  ),
  X: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
  ),
  User: () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  ),
  Users: () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  ),
  Calendar: () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
  ),
  Check: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
  ),
  Mail: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
  ),
  Phone: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
  ),
  MapPin: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
  )
};

// --- SUB-COMPONENTS ---

const PrimaryButton = ({ children, onClick, className = '' }) => (
  <button
    onClick={onClick}
    className={`px-8 py-4 rounded-full font-serif text-xl transition-all duration-500 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 active:scale-95 ${className}`}
    style={{ backgroundColor: COLORS.button, color: COLORS.textWhite }}
  >
    {children}
  </button>
);

const HomeView = ({ navigateTo }) => (
  <div className="animate-fadeIn">
    {/* Hero Section */}
    <div className="relative overflow-hidden min-h-[700px] flex items-center">
       {/* Background Depth Effect */}
       <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
       
       <div className="relative z-10 max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center gap-12 lg:gap-24">
          <div className="w-full md:w-3/5 text-center md:text-left text-white">
            <h1 className="text-6xl md:text-8xl font-serif mb-6 leading-tight drop-shadow-md tracking-tight uppercase" style={{ color: COLORS.button }}>
              DEBBIE THOMSON THERAPY
            </h1>
            <p className="font-subtitle text-3xl mb-8 opacity-90 drop-shadow-sm tracking-[0.2em] uppercase">
              PRIVATE PSYCHOTHERAPIST
            </p>
            
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 shadow-2xl mb-10 transform hover:scale-[1.02] transition-transform duration-500 text-white">
              <h2 className="text-3xl font-serif mb-4">Hello & welcome</h2>
              <p className="text-xl leading-relaxed opacity-95">
                I provide counselling and psychotherapy in Willerby, East Yorkshire. I help people to work through difficulties they are facing in life and to improve their mental health and emotional wellbeing.
              </p>
            </div>
            
            <PrimaryButton onClick={() => navigateTo('contact')}>
              Begin Your Journey
            </PrimaryButton>
          </div>

          <div className="w-full md:w-2/5 flex justify-center">
            <div className="relative animate-float">
              {/* Animated soft glow behind image */}
              <div className="absolute -inset-8 rounded-full opacity-30 blur-3xl animate-pulse" style={{ backgroundColor: COLORS.button }}></div>
              
              <div className="relative w-72 h-72 md:w-[450px] md:h-[450px] rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-8 border-white/30 backdrop-blur-sm rotate-3 hover:rotate-0 transition-all duration-700">
                <img 
                  src="/debbie.webp" 
                  alt="Debbie Thomson - Psychotherapist in Willerby" 
                  className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-700" 
                  onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800'} 
                />
              </div>
            </div>
          </div>
       </div>
    </div>
    
    {/* Key Services Grid */}
    <div className="max-w-6xl mx-auto px-4 py-24">
      <div className="grid md:grid-cols-3 gap-8">
         {[
           { icon: <Icons.User />, title: 'Individual', desc: '1-on-1 therapeutic support tailored to your unique life script.' },
           { icon: <Icons.Users />, title: 'Couples', desc: 'Reconnect and heal using the Imago Relationship model.' },
           { icon: <Icons.Calendar />, title: 'Groups', desc: 'Professional therapy groups for UKCP trainee therapists.' }
         ].map((service, index) => (
           <div key={index} className="p-10 bg-white/5 backdrop-blur-sm rounded-[2.5rem] border border-white/10 text-white text-center hover:bg-white/10 transition-all duration-500 hover:shadow-2xl group">
             <div className="flex justify-center mb-6 group-hover:scale-110 transition-transform duration-500">{service.icon}</div>
             <h3 className="font-serif text-3xl mb-4">{service.title}</h3>
             <p className="opacity-80 leading-relaxed text-lg">{service.desc}</p>
           </div>
         ))}
      </div>
    </div>
  </div>
);

const AboutView = () => (
  <div className="max-w-5xl mx-auto px-4 py-20 animate-fadeIn text-white">
    <h1 className="text-5xl md:text-7xl font-serif text-center mb-20 drop-shadow-md uppercase tracking-tight">About Debbie</h1>
    <div className="flex flex-col md:flex-row gap-16 items-center">
      <div className="w-full md:w-2/5 flex justify-center">
        <div className="w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden shadow-2xl border-8 border-white/20 animate-float">
          <img 
            src="/debbie.webp" 
            alt="Debbie Thomson"
            className="w-full h-full object-cover" 
            onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800'}
          />
        </div>
      </div>
      <div className="w-full md:w-3/5 space-y-8">
        <p className="text-3xl font-subtitle opacity-90 leading-relaxed">My Approach is relational, co-creative and grounded in Transactional Analysis.</p>
        <p className="text-xl leading-relaxed opacity-80">
          I am a UKCP accredited Psychotherapist based in Willerby, East Yorkshire. I help clients navigate deep-seated patterns to find genuine healing and self-awareness.
        </p>
        <div className="p-8 bg-white/10 rounded-3xl border border-white/20 shadow-inner">
           <h4 className="font-serif text-2xl mb-4 uppercase tracking-wide">Professional Standing</h4>
           <ul className="text-lg space-y-3 opacity-90">
             <li className="flex items-center gap-3"><Icons.Check /> UKCP Accredited Level 6</li>
             <li className="flex items-center gap-3"><Icons.Check /> Certified Imago Relationship Therapist</li>
             <li className="flex items-center gap-3"><Icons.Check /> Advanced TA Specialist</li>
           </ul>
        </div>
      </div>
    </div>
  </div>
);

// --- MAIN APP COMPONENT ---

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- SEO & SCHEMA INJECTION ---
  useEffect(() => {
    // Meta Data
    document.title = "Debbie Thomson Therapy | Psychotherapist in Willerby, East Yorkshire";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Professional counselling and psychotherapy in Willerby by Debbie Thomson. Specializing in TA, Individual, and Couples therapy.");
    }

    // Schema.org Markup
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "PsychologicalTreatment",
      "name": "Debbie Thomson Therapy",
      "image": "https://debbiethomsontherapy.com/debbie.webp",
      "description": "Counselling and psychotherapy in Willerby, East Yorkshire. UKCP Accredited support for individuals and couples.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Willerby",
        "addressRegion": "East Yorkshire",
        "addressCountry": "UK"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "53.7600",
        "longitude": "-0.4400"
      },
      "url": "https://debbiethomsontherapy.com",
      "telephone": "07883 393590"
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(schemaData);
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const navigateTo = (page) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'associates', label: 'Associates' },
    { id: 'room-rental', label: 'Room Rental' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen font-sans text-white overflow-x-hidden transition-colors duration-700" style={{ backgroundColor: COLORS.main }}>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Kalam:wght@300;400;700&family=Patrick+Hand&display=swap');
        
        body { font-size: 1.1rem; }
        .font-serif { font-family: 'Kalam', cursive !important; }
        .font-sans { font-family: 'Patrick Hand', cursive !important; }
        .font-subtitle { 
          font-family: 'Caveat', cursive !important; 
          font-size: 2.2rem !important; 
          line-height: 1.2 !important;
        }

        .animate-fadeIn { animation: fadeIn 1s ease-out forwards; }
        .animate-float { animation: float 6s ease-in-out infinite; }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(3deg); }
          50% { transform: translateY(-20px) rotate(1deg); }
        }

        /* Scrollbar styling */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: rgba(0,0,0,0.05); }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 10px; }
      `}} />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 shadow-2xl backdrop-blur-xl bg-white/5 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 h-24 flex justify-between items-center text-white">
          <div className="cursor-pointer group flex items-center" onClick={() => navigateTo('home')}>
            <img src="/logo.png" alt="Debbie Thomson Therapy Logo" className="h-14 md:h-16 w-auto" />
          </div>
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <button 
                key={link.id} 
                onClick={() => navigateTo(link.id)} 
                className={`text-sm uppercase tracking-widest font-bold transition-all hover:scale-110 ${currentPage === link.id ? 'border-b-2 border-white pb-1' : 'opacity-60 hover:opacity-100'}`}
              >
                {link.label}
              </button>
            ))}
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 bg-white/10 rounded-xl">
              {isMobileMenuOpen ? <Icons.X /> : <Icons.Menu />}
            </button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#8cb2b0] border-t border-white/10 text-white animate-fadeIn pb-8">
            {navLinks.map((link) => (
              <button 
                key={link.id} 
                onClick={() => navigateTo(link.id)} 
                className="block w-full text-center py-6 border-b border-white/5 uppercase tracking-widest text-lg font-bold"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {currentPage === 'home' && <HomeView navigateTo={navigateTo} />}
        {currentPage === 'about' && <AboutView />}
        
        {/* Simple Page Handler for others */}
        {['services', 'associates', 'room-rental', 'faq', 'contact'].includes(currentPage) && (
          <div className="max-w-4xl mx-auto px-4 py-32 text-center animate-fadeIn text-white">
             <h1 className="text-6xl font-serif mb-8 drop-shadow-md uppercase tracking-tight" style={{ color: COLORS.button }}>{currentPage.replace('-', ' ')}</h1>
             <p className="font-subtitle opacity-80 mb-12">Professional therapeutic services in a calm environment.</p>
             <PrimaryButton onClick={() => navigateTo('home')}>Return to Welcome</PrimaryButton>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 py-20 text-center border-t border-white/10 bg-black/5">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="font-serif text-3xl mb-6 uppercase tracking-widest">Debbie Thomson Therapy</h3>
          <p className="opacity-60 mb-8 max-w-md mx-auto text-lg">Providing a nurturing, safe, and confidential space in the heart of Willerby Square.</p>
          <div className="flex justify-center gap-6 mb-12 opacity-60 font-bold uppercase text-xs tracking-widest">
             <button onClick={() => navigateTo('faq')}>FAQ</button>
             <button onClick={() => navigateTo('contact')}>Contact</button>
             <span>Privacy</span>
          </div>
          <p className="text-xs opacity-40 font-sans tracking-widest uppercase">&copy; {new Date().getFullYear()} Debbie Thomson Therapy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}