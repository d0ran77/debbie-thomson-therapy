import React, { useState, useEffect } from 'react';

// --- STYLING CONSTANTS ---
const COLORS = {
  main: '#8cb2b0', // Your main body color
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
  ),
  Clock: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
  ),
  Heart: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
  )
};

// --- SUB-COMPONENTS ---

const PrimaryButton = ({ children, onClick, className = '', type = "button" }) => (
  <button
    type={type}
    onClick={onClick}
    className={`px-8 py-4 rounded-full font-serif text-lg md:text-xl transition-all duration-500 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 active:scale-95 ${className}`}
    style={{ backgroundColor: COLORS.button, color: COLORS.textWhite }}
  >
    {children}
  </button>
);

const HomeView = ({ navigateTo }) => (
  <div className="animate-fadeIn px-4">
    <div className="relative overflow-hidden min-h-[600px] md:min-h-[700px] flex items-center">
       <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
       
       <div className="relative z-10 max-w-6xl mx-auto py-12 md:py-20 flex flex-col md:flex-row items-center gap-10 lg:gap-24">
          <div className="w-full md:w-3/5 text-center md:text-left text-white">
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-serif mb-4 md:mb-6 leading-tight drop-shadow-md tracking-tight uppercase" style={{ color: COLORS.button }}>
              DEBBIE THOMSON THERAPY
            </h1>
            <p className="font-subtitle text-2xl sm:text-3xl mb-6 md:mb-8 opacity-90 drop-shadow-sm tracking-[0.1em] md:tracking-[0.2em] uppercase">
              PRIVATE PSYCHOTHERAPIST
            </p>
            
            <div className="bg-white/10 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-white/20 shadow-2xl mb-8 md:mb-10 transform hover:scale-[1.01] transition-transform duration-500 text-white text-left">
              <h2 className="text-2xl sm:text-3xl font-serif mb-4">Hello & welcome</h2>
              <p className="text-lg md:text-xl leading-relaxed opacity-95">
                I provide counselling and psychotherapy in Willerby, East Yorkshire. I help people to work through difficulties they are facing in life and to improve their mental health and emotional wellbeing.
              </p>
            </div>
            
            <PrimaryButton onClick={() => navigateTo('contact')}>
              Begin Your Journey
            </PrimaryButton>
          </div>

          <div className="w-full md:w-2/5 flex justify-center mt-4 md:mt-0">
            <div className="relative animate-float">
              <div className="absolute -inset-6 md:-inset-8 rounded-full opacity-30 blur-3xl animate-pulse" style={{ backgroundColor: COLORS.button }}></div>
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-[450px] md:h-[450px] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-4 md:border-8 border-white/30 backdrop-blur-sm rotate-3 hover:rotate-0 transition-all duration-700">
                <img 
                  src="/debbie.webp" 
                  alt="Debbie Thomson" 
                  className="w-full h-full object-cover scale-110" 
                  onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800'} 
                />
              </div>
            </div>
          </div>
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

const ServicesView = ({ navigateTo }) => (
  <div className="max-w-5xl mx-auto px-4 py-20 animate-fadeIn text-white">
    <h1 className="text-5xl md:text-7xl font-serif text-center mb-16 uppercase tracking-tight">Services</h1>
    <div className="grid md:grid-cols-2 gap-12">
      <div className="bg-white/10 backdrop-blur-md p-10 rounded-3xl border border-white/20 text-center">
        <h2 className="text-3xl font-serif mb-4" style={{ color: COLORS.button }}>Individual Therapy</h2>
        <p className="opacity-80 mb-8">Face-to-face or online sessions focusing on anxiety, depression, and personal scripts.</p>
        <p className="text-3xl font-bold mb-8">£60 / hour</p>
        <PrimaryButton onClick={() => navigateTo('contact')} className="w-full">Enquire</PrimaryButton>
      </div>
      <div className="bg-white/10 backdrop-blur-md p-10 rounded-3xl border border-white/20 text-center">
        <h2 className="text-3xl font-serif mb-4" style={{ color: COLORS.button }}>Couples Therapy</h2>
        <p className="opacity-80 mb-8">Specialised Imago sessions to deepen connection and resolve conflict. Face-to-face only.</p>
        <p className="text-3xl font-bold mb-8">£120 / 90 mins</p>
        <PrimaryButton onClick={() => navigateTo('contact')} className="w-full">Enquire</PrimaryButton>
      </div>
    </div>
  </div>
);

const AssociatesView = ({ navigateTo }) => {
  const [selectedAssociate, setSelectedAssociate] = useState(null);

  const associates = [
    {
      id: 'kim',
      name: "Kim Jones",
      titles: [
        "UKCP Psychotherapist & Clinical Supervisor",
        "RTM Licenced Clinician",
        "Eco Coach/Therapist",
        "Advanced Practitioner of Emotional Freedom Technique"
      ],
      tagline: "Creating more choices and empowering minds leads to positive changes both personally and professionally.",
      about: [
        "I am empathic, approachable, open minded, friendly and professional. In my work I provide therapeutic solutions, build confidence, enable clients to realise their potential, develop awareness of their innate ability to perceive and resolve problems from a different perspective as well as help re-discover the true inner version of themselves.",
        "I work with adults and businesses, with a varied range of social, behavioural, and mental health issues, within local authorities, charities, privately and businesses.",
        "I am passionate about working within a range of areas and clients, ensuring I remain versatile and multi-faceted in my work. My mission is to empower you, to remind you that you are enough, always, and to help you re-discover the true inner you.",
        "I operate judgement free across all services, in a safe, comfortable and a protective environment in which we explore and resolve the things that you want to change.",
        "I adopt principles of empathy, understanding and support as you begin to find the real and authentic you.",
        "Having made an enquiry, we will arrange a convenient time for an initial consultation where I will learn more about you. Together we will outline a flexible schedule, within which we will aim for your goals to be met, we will work together to facilitate positive changes to ensure you get the results that you want."
      ],
      interests: ["Abuse", "Anger management", "Anxiety", "Bullying", "PTSD/CPTSD", "Depression", "Divorce", "Domestic abuse", "Relationships", "Stress", "Trauma"],
      worksWith: "Individual clients, groups, adult and young adults from 18+",
      methods: "Face-to-face, online & eco therapy",
      supervisees: "Yes",
      hours: "Monday 1-7pm; Tuesday/Wednesday/Thursday 8.45am-6.30pm; Friday 8.45am-1pm (Flexible)",
      fees: "Individual: £85/hr; Supervisees: £60/hr; Reduced rates for trainees. Group prices on application.",
      location: "Howden",
      img: "/kim.svg"
    },
    {
      id: 'kiran',
      name: "Kiran Nagra",
      titles: ["TA Psychotherapist", "NCPS Registered"],
      tagline: "A thoughtful and psychologically grounded space for individuals and couples.",
      about: ["My approach is warm, collaborative and reflective. I work in a trauma-informed way, helping you understand how past experiences shape your present emotional responses."],
      interests: ["Anxiety", "Depression", "Self-esteem", "Trauma"],
      worksWith: "Adults 18+",
      methods: "Face-to-face & online",
      supervisees: "No",
      hours: "Contact for availability",
      fees: "£55 / 50 mins",
      location: "Willerby",
      img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-20 animate-fadeIn text-white relative">
      <h1 className="text-5xl md:text-7xl font-serif text-center mb-10 uppercase tracking-tight">Associates</h1>
      
      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md p-8 md:p-12 rounded-[2.5rem] border border-white/20 shadow-2xl mb-16 text-center">
        <h2 className="text-3xl font-serif mb-6" style={{ color: COLORS.button }}>Announcement</h2>
        <p className="text-xl md:text-2xl font-subtitle mb-6 leading-relaxed">
          I am excited to announce the launch of my Associate Therapist Service!
        </p>
        <p className="text-lg opacity-90 mb-0 leading-relaxed">
          If I am full in my caseload, I can recommend other therapists who may be able to work with you and meet your needs.
        </p>
      </div>

      {/* Associate Cards Grid */}
      <div className="grid md:grid-cols-2 gap-12 mb-20">
        {associates.map((associate) => (
          <div 
            key={associate.id} 
            onClick={() => setSelectedAssociate(associate)}
            className="group relative cursor-pointer bg-white/10 backdrop-blur-md p-10 rounded-[3rem] border border-white/20 text-center flex flex-col items-center animate-float hover:scale-[1.03] hover:bg-white/15 transition-all duration-500 shadow-xl"
            style={{ animationDelay: associate.id === 'kim' ? '0s' : '0.5s' }}
          >
            <div className="w-32 h-32 rounded-full mb-8 overflow-hidden border-4 border-white/30 shadow-lg transition-transform group-hover:scale-110 duration-500 bg-white/5">
              <img src={associate.img} className="w-full h-full object-cover" alt={associate.name} />
            </div>
            <h3 className="text-4xl font-serif mb-3" style={{ color: COLORS.button }}>{associate.name}</h3>
            <div className="space-y-1 mb-6">
              {associate.titles.slice(0, 2).map((t, i) => (
                <p key={i} className="text-xs opacity-60 uppercase tracking-widest font-bold">{t}</p>
              ))}
            </div>
            <p className="font-subtitle text-2xl opacity-90 mb-8 leading-snug">"{associate.tagline}"</p>
            <PrimaryButton className="pointer-events-none">View Full Profile</PrimaryButton>
          </div>
        ))}
      </div>

      {/* MODAL / EXPANDED VIEW */}
      {selectedAssociate && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl max-h-[90vh] bg-[#7a9d9b] rounded-[3rem] border border-white/20 shadow-2xl overflow-hidden flex flex-col animate-fadeIn">
            {/* Close Button */}
            <button 
              onClick={() => setSelectedAssociate(null)}
              className="absolute top-6 right-6 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors z-10"
            >
              <Icons.X />
            </button>

            <div className="overflow-y-auto p-8 md:p-16 scrollbar-hide">
              <div className="flex flex-col md:flex-row gap-12 items-start">
                {/* Side Info Column */}
                <div className="w-full md:w-1/3 space-y-8">
                  <div className="w-full aspect-square rounded-[3rem] overflow-hidden border-8 border-white/10 shadow-2xl bg-white/5">
                    <img src={selectedAssociate.img} className="w-full h-full object-cover" alt={selectedAssociate.name} />
                  </div>
                  
                  <div className="space-y-4">
                    <h2 className="text-4xl font-serif" style={{ color: COLORS.button }}>Work with {selectedAssociate.name.split(' ')[0]}</h2>
                    <div className="space-y-2">
                      {selectedAssociate.titles.map((t, i) => (
                        <p key={i} className="text-xs font-bold opacity-70 uppercase tracking-widest leading-tight">{t}</p>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 bg-white/10 rounded-3xl space-y-4 text-sm border border-white/5">
                    <div className="flex items-center gap-3"><Icons.MapPin /> <span><strong>Location:</strong> {selectedAssociate.location}</span></div>
                    <div className="flex items-center gap-3"><Icons.Clock /> <span><strong>Hours:</strong> {selectedAssociate.hours}</span></div>
                    <div className="flex items-center gap-3"><Icons.User /> <span><strong>Works With:</strong> {selectedAssociate.worksWith}</span></div>
                    <div className="flex items-center gap-3"><Icons.Calendar /> <span><strong>Working Methods:</strong> {selectedAssociate.methods}</span></div>
                    <div className="flex items-center gap-3"><Icons.Users /> <span><strong>Supervisees:</strong> {selectedAssociate.supervisees}</span></div>
                    <div className="pt-4 border-t border-white/10">
                      <p className="font-bold text-base mb-2">Fees</p>
                      <p className="opacity-80 leading-relaxed text-xs">{selectedAssociate.fees}</p>
                    </div>
                  </div>

                  <PrimaryButton onClick={() => { navigateTo('contact'); setSelectedAssociate(null); }} className="w-full">Enquire Now</PrimaryButton>
                </div>

                {/* Content Column */}
                <div className="w-full md:w-2/3 space-y-10">
                  <section>
                    <p className="font-subtitle text-3xl md:text-4xl leading-snug" style={{ color: COLORS.button }}>"{selectedAssociate.tagline}"</p>
                  </section>

                  <section className="space-y-6">
                    <h4 className="font-serif text-3xl flex items-center gap-3">About <div className="h-px bg-white/20 flex-grow"></div></h4>
                    {selectedAssociate.about.map((p, i) => (
                      <p key={i} className="text-lg opacity-90 leading-relaxed">{p}</p>
                    ))}
                  </section>

                  <section className="space-y-6">
                    <h4 className="font-serif text-3xl flex items-center gap-3">Areas of Interest <div className="h-px bg-white/20 flex-grow"></div></h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedAssociate.interests.map((interest, i) => (
                        <span key={i} className="px-5 py-2 bg-white/10 rounded-full text-xs font-bold tracking-wide uppercase border border-white/5">{interest}</span>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const RoomRentalView = () => (
  <div className="max-w-5xl mx-auto px-4 py-20 animate-fadeIn text-white">
    <h1 className="text-5xl md:text-7xl font-serif text-center mb-16 uppercase tracking-tight">Room Rental</h1>
    <div className="bg-white/10 backdrop-blur-md rounded-[40px] overflow-hidden border border-white/20 shadow-2xl flex flex-col md:flex-row">
      <div className="md:w-1/2 min-h-[300px]">
        <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="Therapy Room" />
      </div>
      <div className="md:w-1/2 p-12 flex flex-col justify-center">
        <h2 className="text-3xl font-serif mb-6" style={{ color: COLORS.button }}>Practice Space</h2>
        <p className="text-lg opacity-90 mb-8 leading-relaxed">
          Centrally located in Willerby Square, this bespoke therapy room offers a quiet and professional environment for private practitioners.
        </p>
        <ul className="space-y-4 text-sm opacity-80 mb-10">
          <li className="flex items-center gap-3"><Icons.Check /> Waiting area for clients</li>
          <li className="flex items-center gap-3"><Icons.Check /> Quiet, soundproofed space</li>
          <li className="flex items-center gap-3"><Icons.Check /> High-speed internet included</li>
        </ul>
        <PrimaryButton onClick={() => window.location.href = 'mailto:dthomsonta@outlook.com'}>Enquire Now</PrimaryButton>
      </div>
    </div>
  </div>
);

const FAQView = () => (
  <div className="max-w-3xl mx-auto px-4 py-20 animate-fadeIn text-white">
    <h1 className="text-5xl md:text-7xl font-serif text-center mb-16 uppercase tracking-tight">FAQ</h1>
    <div className="space-y-6">
      {[
        { q: "Where is the practice located?", a: "The practice is centrally located in Willerby Square, East Yorkshire." },
        { q: "Do you offer online sessions?", a: "Yes, I offer online sessions for individuals. Couples therapy is face-to-face only." },
        { q: "How long is a standard session?", a: "Individual sessions are 60 minutes. Couples sessions are 90 minutes." }
      ].map((item, i) => (
        <div key={i} className="p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20">
          <h3 className="text-2xl font-serif mb-3" style={{ color: COLORS.button }}>{item.q}</h3>
          <p className="opacity-80 leading-relaxed">{item.a}</p>
        </div>
      ))}
    </div>
  </div>
);

const ContactView = () => (
  <div className="max-w-5xl mx-auto px-4 py-20 animate-fadeIn text-white">
    <h1 className="text-5xl md:text-7xl font-serif text-center mb-16 uppercase tracking-tight">Contact</h1>
    <div className="bg-white/10 backdrop-blur-md p-10 rounded-[40px] border border-white/20 shadow-2xl">
      <div className="grid md:grid-cols-2 gap-16">
        <div className="space-y-8">
          <p className="text-3xl font-subtitle" style={{ color: COLORS.button }}>I'm here to help.</p>
          <div className="space-y-6">
            <div className="flex items-center gap-4 group cursor-pointer hover:opacity-80 transition-opacity"><Icons.Mail /> dthomsonta@outlook.com</div>
            <div className="flex items-center gap-4 group cursor-pointer hover:opacity-80 transition-opacity"><Icons.Phone /> 07883 393590</div>
            <div className="flex items-center gap-4 group cursor-pointer hover:opacity-80 transition-opacity"><Icons.MapPin /> Willerby Square, East Yorks</div>
          </div>
        </div>
        <form className="space-y-6" name="contact" method="POST" data-netlify="true">
          <input type="hidden" name="form-name" value="contact" />
          <input className="w-full p-4 rounded-2xl bg-white/5 border border-white/20 focus:outline-none focus:ring-2" style={{ ringColor: COLORS.button }} placeholder="Name" name="name" required />
          <input className="w-full p-4 rounded-2xl bg-white/5 border border-white/20 focus:outline-none focus:ring-2" style={{ ringColor: COLORS.button }} placeholder="Email" name="email" type="email" required />
          <textarea className="w-full p-4 rounded-2xl bg-white/5 border border-white/20 focus:outline-none focus:ring-2" style={{ ringColor: COLORS.button }} placeholder="Message" name="message" rows="5" required></textarea>
          <PrimaryButton type="submit" className="w-full">Send Message</PrimaryButton>
        </form>
      </div>
    </div>
  </div>
);

// --- MAIN APP COMPONENT ---

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        .font-serif { font-family: 'Kalam', cursive !important; }
        .font-sans { font-family: 'Patrick Hand', cursive !important; }
        .font-subtitle { font-family: 'Caveat', cursive !important; font-size: 2.2rem !important; line-height: 1.2 !important; }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes float { 0%, 100% { transform: translateY(0px) rotate(3deg); } 50% { transform: translateY(-15px) rotate(1deg); } }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 10px; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}} />

      <nav className="sticky top-0 z-50 shadow-2xl backdrop-blur-xl bg-white/5 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 h-20 md:h-24 flex justify-between items-center text-white">
          <div className="cursor-pointer group flex items-center shrink-0" onClick={() => navigateTo('home')}>
            <img src="/logo.png" alt="Logo" className="h-10 sm:h-12 md:h-16 w-auto" />
          </div>
          <div className="hidden lg:flex space-x-6 xl:space-x-8">
            {navLinks.map((link) => (
              <button 
                key={link.id} 
                onClick={() => navigateTo(link.id)} 
                className={`text-xs xl:text-sm uppercase tracking-widest font-bold transition-all ${currentPage === link.id ? 'border-b-2 border-white pb-1' : 'opacity-70 hover:opacity-100'}`}
              >
                {link.label}
              </button>
            ))}
          </div>
          <div className="lg:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 bg-white/10 rounded-xl">
              {isMobileMenuOpen ? <Icons.X /> : <Icons.Menu />}
            </button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-[#8cb2b0] border-t border-white/10 text-white animate-fadeIn shadow-2xl p-6 flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button key={link.id} onClick={() => navigateTo(link.id)} className="py-4 uppercase tracking-widest text-lg font-bold">
                {link.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      <main className="flex-grow min-h-[60vh]">
        {currentPage === 'home' && <HomeView navigateTo={navigateTo} />}
        {currentPage === 'about' && <AboutView />}
        {currentPage === 'services' && <ServicesView navigateTo={navigateTo} />}
        {currentPage === 'associates' && <AssociatesView navigateTo={navigateTo} />}
        {currentPage === 'room-rental' && <RoomRentalView />}
        {currentPage === 'faq' && <FAQView />}
        {currentPage === 'contact' && <ContactView />}
      </main>

      <footer className="mt-12 py-12 text-center border-t border-white/10 bg-black/5">
        <h3 className="font-serif text-2xl uppercase tracking-widest mb-4">Debbie Thomson Therapy</h3>
        <p className="opacity-40 mb-6 max-w-xs mx-auto text-sm">Providing a safe space in Willerby Square.</p>
        <p className="text-[10px] opacity-40 font-sans tracking-widest uppercase">&copy; {new Date().getFullYear()} Debbie Thomson Therapy. All rights reserved.</p>
      </footer>
    </div>
  );
}