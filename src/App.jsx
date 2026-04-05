import React, { useState, useEffect } from 'react';

// --- STYLING CONSTANTS ---
const COLORS = {
  main: '#8cb2b0', // Your main body color
  button: '#b28c8e', // Your Dusty Rose
  textWhite: '#ffffff',
};

// --- EXTERNAL LINKS ---
const ENQUIRY_FORM_URL = "https://forms.office.com/pages/responsepage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAN__kMoCMBURTFHS0Q5S1FNSzJSS1IyM1NVTlBYN1JMQy4u&route=shorturl";

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
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1 22 16.92z"/></svg>
  ),
  MapPin: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
  ),
  Clock: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
  ),
  ExternalLink: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
  ),
  ChevronLeft: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
  ),
  ChevronRight: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
  ),
  ChevronDown: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
  ),
  Facebook: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
  ),
  Instagram: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
  ),
  LinkedIn: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
  )
};

// --- SUB-COMPONENTS ---

const PrimaryButton = ({ children, onClick, className = '', type = "button" }) => (
  <button
    type={type}
    onClick={onClick}
    className={`px-8 py-4 rounded-full font-serif text-lg md:text-xl transition-all duration-500 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 ${className}`}
    style={{ backgroundColor: COLORS.button, color: COLORS.textWhite }}
  >
    {children}
  </button>
);

const HomeView = ({ navigateTo }) => (
  <div className="animate-fadeIn px-4">
    <div className="relative overflow-hidden min-h-[70vh] md:min-h-[85vh] flex items-center py-12 md:py-0">
       <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
       
       <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 lg:gap-24 w-full">
          
          {/* Header & Text Content */}
          <div className="w-full md:w-1/2 text-center md:text-left text-white space-y-6 flex flex-col">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif leading-tight drop-shadow-md tracking-tight uppercase" style={{ color: COLORS.button }}>
              Debbie Thomson Therapy
            </h1>
            <div className="space-y-4">
              <p className="font-subtitle text-3xl sm:text-4xl opacity-90 tracking-wide uppercase">
                Private Psychotherapist
              </p>
              <p className="text-xl md:text-2xl leading-relaxed opacity-95 max-w-xl mx-auto md:mx-0 font-light">
                Providing a safe, nurturing space in Willerby, East Yorkshire, to help you navigate life's challenges and improve your emotional wellbeing.
              </p>
            </div>
            {/* Desktop-only button: stays with text */}
            <div className="hidden md:block pt-4">
              <PrimaryButton onClick={() => navigateTo('contact')}>
                Begin Your Journey
              </PrimaryButton>
            </div>
          </div>

          {/* Portrait Image - Now appears under text on mobile, animated */}
          <div className="w-full md:w-1/2 flex justify-center animate-float">
            <div className="relative w-full max-w-sm lg:max-w-md aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border border-white/20 bg-white/5 backdrop-blur-sm">
              <img 
                src="/debbie.webp" 
                alt="Debbie Thomson" 
                className="w-full h-full object-cover object-top" 
                onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800'} 
              />
            </div>
          </div>

          {/* Mobile-only centered CTA button */}
          <div className="md:hidden w-full flex justify-center pt-4">
            <PrimaryButton onClick={() => navigateTo('contact')}>
              Begin Your Journey
            </PrimaryButton>
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
        <div className="w-full max-w-sm aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border border-white/20">
          <img 
            src="/debbie.webp" 
            alt="Debbie Thomson"
            className="w-full h-full object-cover object-top" 
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

const ServicesView = () => (
  <div className="max-w-5xl mx-auto px-4 py-20 animate-fadeIn text-white">
    <h1 className="text-5xl md:text-7xl font-serif text-center mb-16 uppercase tracking-tight">Services</h1>
    <div className="grid md:grid-cols-2 gap-12">
      <div className="bg-white/10 backdrop-blur-md p-10 rounded-3xl border border-white/20 text-center">
        <h2 className="text-3xl font-serif mb-4" style={{ color: COLORS.button }}>Individual Therapy</h2>
        <p className="opacity-80 mb-8">Face-to-face or online sessions focusing on anxiety, depression, and personal scripts.</p>
        <p className="text-3xl font-bold mb-8">£60 / hour</p>
        <PrimaryButton onClick={() => window.open(ENQUIRY_FORM_URL, '_blank')} className="w-full">
          Enquire <Icons.ExternalLink />
        </PrimaryButton>
      </div>
      <div className="bg-white/10 backdrop-blur-md p-10 rounded-3xl border border-white/20 text-center">
        <h2 className="text-3xl font-serif mb-4" style={{ color: COLORS.button }}>Couples Therapy</h2>
        <p className="opacity-80 mb-8">Specialised Imago sessions to deepen connection and resolve conflict. Face-to-face only.</p>
        <p className="text-3xl font-bold mb-8">£120 / 90 mins</p>
        <PrimaryButton onClick={() => window.open(ENQUIRY_FORM_URL, '_blank')} className="w-full">
          Enquire <Icons.ExternalLink />
        </PrimaryButton>
      </div>
    </div>
  </div>
);

const AssociatesView = ({ navigateTo }) => {
  const [selectedAssociate, setSelectedAssociate] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const associates = [
    {
      id: 'kim',
      name: "Kim Jones",
      logo: "/kimlogo.webp",
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
        "I am passionate about working within a range of areas and clients, ensuring I remain versatile and multi-faceted in my work. My mission to empower you, to remind you that you are enough, always, and to help you re-discover the true inner you.",
        "I abide by confidentiality and have the utmost respect for who you are.",
        "Having made an enquiry, we will arrange a convenient time for an initial consultation where I will learn more about you. Together we will outline a flexible schedule, within which we will aim for your goals to be met, we will work together to facilitate positive changes to ensure you get the results that you want."
      ],
      principles: [
        "I operate judgement free across all services, in a safe, comfortable and a protective environment in which we explore and resolve the things that you want to change.",
        "I adopt principles of empathy, understanding and support as you begin to find the real and authentic you."
      ],
      interests: ["Abuse", "Anger management", "Anxiety", "Bullying", "PTSD/CPTSD", "Depression", "Divorce", "Domestic abuse", "Relationships", "Stress", "Trauma"],
      worksWith: "Individual clients, groups, adult and young adults from 18+",
      methods: "Face-to-face, online & eco therapy",
      supervisees: "Yes",
      hours: "Monday 1-7pm; Tuesday/Wednesday/Thursday 8.45am-6.30pm; Friday 8.45am-1pm. (Flexible when required)",
      fees: "Individual: £85/hr; Trainees: Reduced rates; Supervisees: £60/hr; Groups: On application.",
      location: "Howden",
      img: "/kim.webp"
    },
    {
      id: 'kiran',
      name: "Kiran Nagra",
      logo: "/kiranlogo.webp",
      titles: [
        "Transactional Analysis (TA) Psychotherapist",
        "Imago Relationship Therapist (in training)",
        "UKCP trainee member & NCPS registered"
      ],
      tagline: "A thoughtful and psychologically grounded space for individuals and couples.",
      about: [
        "I offer a thoughtful and psychologically grounded space for individuals and couples who are ready to explore the patterns beneath their struggles.",
        "I am a psychotherapist and UKCP Trainee Member, registered with the NCPS, with specialist training in Transactional Analysis (TA). I am also an Imago Relationship Therapy practitioner in training.",
        "My approach is warm, collaborative and reflective. I work in a trauma-informed way, recognising how past experiences particularly relational trauma which can shape present emotional responses, attachment patterns and self-beliefs.",
        "Transactional Analysis provides a clear and practical framework for understanding how early experiences shape our internal “scripts.” These patterns often influence how we relate to others, manage conflict, and experience ourselves.",
        "Together, we explore these dynamics at your pace, supporting greater awareness, emotional resilience and meaningful choice."
      ],
      interests: [
        "Relationship difficulties", "Couples therapy", "Imago Therapy", "Low self-esteem", "Anxiety", "Stress", 
        "Identity", "Childhood neglect", "Inner child work", "Life transitions", "Family dynamics", "Boundaries",
        "Cultural identity", "Narcissistic abuse", "Trauma recovery", "Somatic awareness", "Depression", 
        "Inner critic", "Parenting", "Grief & loss"
      ],
      worksWith: "Adult individuals & couples (18+)",
      methods: "Face-to-face & online",
      supervisees: "No",
      hours: "Mon, Wed, Fri 9am-8pm; Thu 10am-7pm; Sat 10am-3pm",
      fees: "Individuals £55 (50 mins); Couples £75 (60 mins) & £110 (90 mins)",
      location: "Willerby Square",
      insurance: "Balens Ltd",
      img: "/kiran.webp"
    },
    {
      id: 'letisia',
      name: "Letisia Vela",
      logo: "/letisalogo.webp",
      badge: "Bilingual (Spanish)",
      titles: [
        "Transactional Analysis (TA) Advanced Trainee",
        "Bilingual Therapist (English/Spanish)"
      ],
      tagline: "I welcome clients who may not have a specific 'label' but simply know that something doesn't feel right.",
      about: [
        "As an advanced trainee therapist, I am warm, thoughtful and relational in my approach. I believe meaningful change happens through a safe, collaborative therapeutic relationship where you feel genuinely heard and understood.",
        "My clinical experience includes placements with Humberside Police and Valued Minds (Space2BHeard), where I have supported adults facing anxiety, low mood, trauma-related difficulties, and complex life challenges.",
        "Grounded in Transactional Analysis, my work explores patterns in how you relate to yourself and others, helping you understand where certain beliefs or behaviours may have developed and how they might be affecting you now.",
        "As a bilingual therapist (English and Spanish), I aim to offer a culturally sensitive and inclusive space where all parts of your identity are welcome. As a UKCP trainee, I bring curiosity, up-to-date training, and dedicated supervision, alongside a strong commitment to ethical and reflective practice."
      ],
      interests: [
        "Anxiety", "Low mood", "Relationship difficulties", "Repeating patterns", "Inner world exploration",
        "Cultural identity", "Trauma-related difficulties", "Ethical practice"
      ],
      worksWith: "Individuals & Adults",
      methods: "Face-to-face & online",
      supervisees: "No",
      hours: "Tues, Wed, Thurs (Day into Evening) & Sat mornings",
      fees: "Individuals £40 per session",
      location: "Willerby",
      insurance: "Balens Ltd",
      img: "/letisa.webp"
    }
  ];

  const nextSlide = () => {
    const visibleCount = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1;
    const max = associates.length - visibleCount;
    if (max > 0) setCurrentSlide((prev) => (prev >= max ? 0 : prev + 1));
  };
  const prevSlide = () => {
    const visibleCount = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1;
    const max = associates.length - visibleCount;
    if (max > 0) setCurrentSlide((prev) => (prev <= 0 ? max : prev - 1));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 animate-fadeIn text-white relative min-h-[80vh]">
      {!selectedAssociate ? (
        <>
          <h1 className="text-5xl md:text-7xl font-serif text-center mb-10 uppercase tracking-tight">Associates</h1>
          
          <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md p-8 md:p-12 rounded-[2.5rem] border border-white/20 shadow-2xl mb-16 text-center">
            <h2 className="text-3xl font-serif mb-6" style={{ color: COLORS.button }}>Announcement</h2>
            <p className="text-xl md:text-2xl font-subtitle mb-6 leading-relaxed text-white">
              I am excited to announce the launch of my Associate Therapist Service!
            </p>
            <p className="text-lg opacity-90 mb-0 leading-relaxed text-white">
              If I am full in my caseload, I can recommend other therapists who may be able to work with you and meet your needs.
            </p>
          </div>

          <div className="relative px-2 sm:px-12 group">
            <div className="overflow-hidden pb-10">
              <div 
                className="flex transition-transform duration-700 ease-in-out" 
                style={{ transform: `translateX(-${currentSlide * (window.innerWidth >= 1024 ? 33.33 : window.innerWidth >= 640 ? 50 : 100)}%)` }}
              >
                {associates.map((associate) => (
                  <div key={associate.id} className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-3 relative">
                    <div 
                      onClick={() => { setSelectedAssociate(associate); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="cursor-pointer bg-white/10 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/20 text-center flex flex-col items-center hover:scale-[1.03] active:scale-95 transition-all duration-300 shadow-xl h-[680px] justify-between overflow-hidden pb-10 relative"
                    >
                      {associate.badge && (
                        <div className="absolute top-6 right-6 bg-[#b28c8e] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-md z-20">
                          {associate.badge}
                        </div>
                      )}
                      
                      <div className="flex flex-col items-center w-full">
                        <div className="w-32 h-32 md:w-44 md:h-44 rounded-2xl mb-6 overflow-hidden border-4 border-white/30 shadow-lg bg-white/5 flex-shrink-0">
                          <img src={associate.img} className="w-full h-full object-cover object-center" alt={associate.name} />
                        </div>
                        <h3 className="text-3xl font-serif mb-2" style={{ color: COLORS.button }}>{associate.name}</h3>
                        <div className="space-y-1 mb-4 h-12 overflow-hidden flex-shrink-0">
                          {associate.titles.slice(0, 1).map((t, i) => (
                            <p key={i} className="text-[10px] opacity-60 uppercase tracking-widest font-bold px-4 text-white line-clamp-2">{t}</p>
                          ))}
                        </div>
                        <p className="font-subtitle text-xl text-white mb-6 leading-snug px-2 line-clamp-4">"{associate.tagline}"</p>
                      </div>
                      <div className="w-full px-4 mt-auto">
                        <PrimaryButton className="pointer-events-none scale-90 w-full">View Profile</PrimaryButton>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {associates.length > (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1) && (
              <>
                <button onClick={prevSlide} className="absolute left-0 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-all z-10 opacity-0 group-hover:opacity-100">
                  <Icons.ChevronLeft />
                </button>
                <button onClick={nextSlide} className="absolute right-0 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-all z-10 opacity-0 group-hover:opacity-100">
                  <Icons.ChevronRight />
                </button>
              </>
            )}
          </div>
        </>
      ) : (
        /* FULL-VIEW PROFILE DETAIL */
        <div className="animate-fadeIn relative z-[10] min-h-[80vh] w-full">
          <div className="absolute inset-x-0 top-0 h-full overflow-hidden pointer-events-none opacity-10 -z-0">
             <div className="flex whitespace-nowrap animate-marquee-ltr py-10 mt-20">
               {[...Array(12)].map((_, i) => (
                 <span key={i} className="text-[10rem] md:text-[14rem] font-serif font-bold uppercase tracking-tighter mx-10 md:mx-20 text-white">
                   {selectedAssociate.name} • {selectedAssociate.name} •
                 </span>
               ))}
             </div>
          </div>

          <div className="relative w-full bg-white/15 rounded-[2.5rem] md:rounded-[4rem] border border-white/30 shadow-2xl overflow-hidden flex flex-col backdrop-blur-3xl p-6 md:p-16">
            <button 
              onClick={() => setSelectedAssociate(null)}
              className="absolute top-4 right-4 md:top-8 md:right-8 p-3 md:p-4 bg-white/20 rounded-full hover:bg-white/40 transition-all z-[110] active:scale-90"
            >
              <Icons.X />
            </button>

            <div className="flex flex-col lg:flex-row gap-8 md:gap-16 items-start relative z-10">
              
              <div className="w-full lg:w-1/3 space-y-6 md:space-y-8 lg:sticky lg:top-8">
                
                <div className="relative group w-full aspect-square rounded-2xl md:rounded-[2.5rem] overflow-hidden border-4 md:border-8 border-white/20 shadow-2xl bg-white/5">
                  <img src={selectedAssociate.img} className="w-full h-full object-cover object-center" alt={selectedAssociate.name} />
                </div>
                
                <div className="space-y-4 text-center lg:text-left pt-2">
                  <div className="flex flex-col lg:flex-row items-center lg:items-end gap-6">
                    <h2 className="text-4xl md:text-5xl font-serif text-white uppercase tracking-tight leading-none">
                      Work with {selectedAssociate.name.split(' ')[0]}
                    </h2>
                    {/* Enlarged Associate Logos */}
                    {selectedAssociate.logo && (
                      <div className="h-24 md:h-44 lg:h-64 shrink-0 flex items-center">
                        <img 
                          src={selectedAssociate.logo} 
                          className="h-full w-auto object-contain" 
                          alt={`${selectedAssociate.name} Logo`} 
                        />
                      </div>
                    )}
                  </div>
                  
                  {selectedAssociate.badge && (
                    <span className="inline-block bg-[#b28c8e] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-md mb-2">
                      {selectedAssociate.badge}
                    </span>
                  )}
                  
                  <div className="space-y-2 pt-2">
                    {selectedAssociate.titles.map((t, i) => (
                      <p key={i} className="text-[11px] md:text-xs font-bold opacity-80 uppercase tracking-widest leading-tight text-white">{t}</p>
                    ))}
                  </div>
                </div>

                <div className="p-5 md:p-8 bg-black/10 md:bg-white/10 rounded-[2rem] space-y-4 text-sm md:text-base border border-white/10 text-white">
                  <div className="flex items-start gap-3"><Icons.MapPin className="shrink-0 mt-1" /> <span><strong>Location:</strong> {selectedAssociate.location}</span></div>
                  <div className="flex items-start gap-3"><Icons.Clock className="shrink-0 mt-1" /> <span><strong>Hours:</strong> {selectedAssociate.hours}</span></div>
                  <div className="flex items-start gap-3"><Icons.User className="shrink-0 mt-1" /> <span><strong>Works With:</strong> {selectedAssociate.worksWith}</span></div>
                  <div className="flex items-start gap-3"><Icons.Calendar className="shrink-0 mt-1" /> <span><strong>Methods:</strong> {selectedAssociate.methods}</span></div>
                  <div className="flex items-start gap-3"><Icons.Users className="shrink-0 mt-1" /> <span><strong>Supervisees:</strong> {selectedAssociate.supervisees}</span></div>
                  {selectedAssociate.insurance && (
                    <div className="flex items-start gap-3"><Icons.Check className="shrink-0 mt-1" /> <span><strong>Insurance:</strong> {selectedAssociate.insurance}</span></div>
                  )}
                  <div className="pt-4 border-t border-white/10">
                    <p className="font-bold text-lg mb-2">Fees</p>
                    <p className="opacity-90 leading-relaxed text-xs whitespace-pre-line">{selectedAssociate.fees}</p>
                  </div>
                </div>

                <PrimaryButton onClick={() => window.open(ENQUIRY_FORM_URL, '_blank')} className="w-full">
                  Enquire Now <Icons.ExternalLink />
                </PrimaryButton>
              </div>

              <div className="w-full lg:w-2/3 space-y-12 md:space-y-16 pt-8 lg:pt-0">
                <section>
                  <p className="font-subtitle text-3xl md:text-5xl leading-tight text-white">"{selectedAssociate.tagline}"</p>
                </section>

                <section className="space-y-6 md:space-y-8">
                  <h4 className="font-serif text-3xl md:text-4xl flex items-center gap-4 text-white">About <div className="h-px bg-white/20 flex-grow"></div></h4>
                  <div className="space-y-6">
                    {selectedAssociate.about.map((p, i) => (
                      <p key={i} className="text-lg md:text-xl opacity-90 leading-relaxed text-white">{p}</p>
                    ))}
                  </div>
                </section>

                {selectedAssociate.principles && (
                  <section className="space-y-6">
                    <ul className="space-y-4 md:space-y-6">
                      {selectedAssociate.principles.map((p, i) => (
                        <li key={i} className="flex gap-4 items-start text-lg md:text-xl opacity-90 leading-relaxed text-white">
                          <span className="mt-2 shrink-0 bg-white/20 p-1 rounded-full"><Icons.Check /></span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                <section className="space-y-6 md:space-y-8 pb-12">
                  <h4 className="font-serif text-3xl md:text-4xl flex items-center gap-4 text-white">Areas of Interest <div className="h-px bg-white/20 flex-grow"></div></h4>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {selectedAssociate.interests.map((interest, i) => (
                      <span key={i} className="px-4 md:px-6 py-2 md:py-3 bg-white/10 rounded-full text-xs md:text-sm font-bold tracking-wide uppercase border border-white/10 text-white hover:bg-white/20 transition-colors">
                        {interest}
                      </span>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const RoomRentalView = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = ['/1.webp', '/2.webp', '/3.webp', '/4.webp', '/5.webp', '/6.webp'];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="max-w-6xl mx-auto px-4 py-20 animate-fadeIn text-white">
      <h1 className="text-5xl md:text-7xl font-serif text-center mb-16 uppercase tracking-tight">Room Rental</h1>
      
      <div className="bg-white/10 backdrop-blur-md rounded-[40px] overflow-hidden border border-white/20 shadow-2xl flex flex-col md:flex-row">
        
        <div className="md:w-1/2 min-h-[400px] md:min-h-[500px] relative group overflow-hidden bg-black/20">
          <div 
            className="flex w-full h-full transition-transform duration-700 ease-in-out absolute inset-0" 
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {images.map((src, idx) => (
              <div key={idx} className="w-full h-full flex-shrink-0">
                <img src={src} alt={`Therapy Room ${idx + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          
          <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-md transition-all z-10 opacity-0 group-hover:opacity-100">
            <Icons.ChevronLeft />
          </button>
          <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-md transition-all z-10 opacity-0 group-hover:opacity-100">
            <Icons.ChevronRight />
          </button>
          
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
            {images.map((_, idx) => (
              <button 
                key={idx} 
                onClick={() => setCurrentSlide(idx)} 
                className={`h-2 rounded-full transition-all duration-500 shadow-md ${currentSlide === idx ? 'bg-white w-8' : 'bg-white/50 w-2'}`} 
              />
            ))}
          </div>
        </div>

        <div className="md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
          <h2 className="text-4xl font-serif mb-6" style={{ color: COLORS.button }}>Practice Space</h2>
          
          <p className="text-xl md:text-2xl font-subtitle opacity-90 mb-6 leading-relaxed">
            My therapy room is in the heart of Willerby Square, East Yorkshire.
          </p>
          <p className="text-lg opacity-80 mb-10 leading-relaxed">
            I also have a smaller therapy room available to rent if you are a therapist looking for a new space to work from.
          </p>
          
          <PrimaryButton onClick={() => window.open(ENQUIRY_FORM_URL, '_blank')} className="self-start">
            Get in touch <Icons.ExternalLink />
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

const FAQView = () => (
  <div className="max-w-3xl mx-auto px-4 py-20 animate-fadeIn text-white">
    <h1 className="text-5xl md:text-7xl font-serif text-center mb-16 uppercase tracking-tight">FAQ</h1>
    <div className="space-y-6">
      {[
        { q: "How long is a standard session?", a: "Individual sessions are 60 minutes long. Couples sessions are 90 minutes." },
        { q: "Where is the practice located?", a: "The practice is centrally located in Willerby Square, East Yorkshire." },
        { q: "Do you offer online sessions?", a: "Yes, I offer online sessions for individuals. Couples therapy is face-to-face only." }
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

          <div className="pt-8 border-t border-white/10">
            <p className="mb-6 opacity-90 text-lg">Use our digital form for a quick enquiry:</p>
            <PrimaryButton onClick={() => window.open(ENQUIRY_FORM_URL, '_blank')} className="w-full">
              Open Enquiry Form <Icons.ExternalLink />
            </PrimaryButton>
          </div>
        </div>

        <form className="space-y-6" name="contact" method="POST" data-netlify="true">
          <p className="text-center font-serif text-xl mb-4">Or send a message below</p>
          <input type="hidden" name="form-name" value="contact" />
          <input className="w-full p-4 rounded-2xl bg-white/5 border border-white/20 focus:outline-none focus:ring-2 text-white" style={{ ringColor: COLORS.button }} placeholder="Name" name="name" required />
          <input className="w-full p-4 rounded-2xl bg-white/5 border border-white/20 focus:outline-none focus:ring-2 text-white" style={{ ringColor: COLORS.button }} placeholder="Email" name="email" type="email" required />
          <textarea className="w-full p-4 rounded-2xl bg-white/5 border border-white/20 focus:outline-none focus:ring-2 text-white" style={{ ringColor: COLORS.button }} placeholder="Message" name="message" rows="5" required></textarea>
          <PrimaryButton type="submit" className="w-full">Send Message</PrimaryButton>
        </form>
      </div>
    </div>
  </div>
);

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
    <div className="min-h-screen font-sans text-white overflow-x-hidden flex flex-col" style={{ backgroundColor: COLORS.main }}>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Kalam:wght@300;400;700&family=Patrick+Hand&display=swap');
        .font-serif { font-family: 'Kalam', cursive !important; }
        .font-sans { font-family: 'Patrick Hand', cursive !important; }
        .font-subtitle { font-family: 'Caveat', cursive !important; font-size: 2.2rem !important; line-height: 1.2 !important; }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-marquee-ltr { animation: marquee-ltr 60s linear infinite; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes float { 0%, 100% { transform: translateY(0px) rotate(3deg); } 50% { transform: translateY(-15px) rotate(1deg); } }
        @keyframes marquee-ltr { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 10px; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}} />

      {/* Header: Transparent, shadow-free, enlarged logo and bigger menu/contact text */}
      <nav className="sticky top-0 z-50 bg-transparent">
        <div className="max-w-6xl mx-auto px-4 h-24 md:h-32 lg:h-40 flex justify-between items-center text-white">
          <div className="cursor-pointer group flex items-center shrink-0" onClick={() => navigateTo('home')}>
            {/* Logo: Larger and no shadows */}
            <img src="/debbielogo.webp" alt="Logo" className="h-24 sm:h-32 md:h-40 lg:h-48 w-auto transition-transform hover:scale-105 duration-500" />
          </div>
          
          <div className="hidden lg:flex items-center gap-12">
            <div className="relative group">
              {/* Menu Text: Bigger (text-xl) */}
              <button className="flex items-center gap-3 text-xl uppercase tracking-widest font-bold opacity-90 hover:opacity-100 transition-opacity py-2">
                Menu <Icons.ChevronDown size={22} />
              </button>
              {/* Dropdown: Glassmorphism effect */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 overflow-hidden flex flex-col">
                {navLinks.filter(l => l.id !== 'contact').map((link) => (
                  <button 
                    key={link.id} 
                    onClick={() => navigateTo(link.id)} 
                    className="w-full text-left px-8 py-5 hover:bg-white/10 transition-colors text-lg uppercase tracking-widest font-bold border-b border-white/5 last:border-0"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Text: Bigger (text-xl) */}
            <button 
              onClick={() => navigateTo('contact')} 
              className={`text-xl uppercase tracking-widest font-bold transition-all ${currentPage === 'contact' ? 'border-b-4 border-white pb-1' : 'opacity-90 hover:opacity-100'}`}
            >
              Contact
            </button>
          </div>

          <div className="lg:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-3 bg-white/10 rounded-xl">
              {isMobileMenuOpen ? <Icons.X /> : <Icons.Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white/10 backdrop-blur-2xl border-t border-white/10 text-white animate-fadeIn shadow-2xl p-6 flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button key={link.id} onClick={() => navigateTo(link.id)} className="py-4 uppercase tracking-widest text-xl font-bold">
                {link.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      <main className="flex-grow min-h-[60vh]">
        {currentPage === 'home' && <HomeView navigateTo={navigateTo} />}
        {currentPage === 'about' && <AboutView />}
        {currentPage === 'services' && <ServicesView />}
        {currentPage === 'associates' && <AssociatesView navigateTo={navigateTo} />}
        {currentPage === 'room-rental' && <RoomRentalView />}
        {currentPage === 'faq' && <FAQView />}
        {currentPage === 'contact' && <ContactView />}
      </main>

      {/* Footer: Sticky, body-color match, enlarged icons, no separator line */}
      <footer className="sticky bottom-0 mt-auto pt-10 pb-12 flex flex-col items-center relative z-20">
        <div className="flex gap-10 mb-8">
          <a href="https://www.linkedin.com/in/debbie-thomson-35131a1b8/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#b28c8e] hover:scale-110 transition-all duration-300">
            <Icons.LinkedIn size={54} />
          </a>
          <a href="https://www.facebook.com/Debbiettherapy" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#b28c8e] hover:scale-110 transition-all duration-300">
            <Icons.Facebook size={54} />
          </a>
          <a href="https://www.instagram.com/debbiettherapy/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#b28c8e] hover:scale-110 transition-all duration-300">
            <Icons.Instagram size={54} />
          </a>
        </div>
        
        <p className="opacity-70 mb-6 max-w-xs mx-auto text-base text-center text-white">Providing a safe space in Willerby Square.</p>
        
        <div className="flex flex-col items-center gap-3 text-[12px] opacity-60 font-sans tracking-widest uppercase text-white">
          <span>&copy; {new Date().getFullYear()} All rights reserved.</span>
          <a href="https://builtbyliam.uk/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors underline decoration-white/30 underline-offset-4">Built By Liam</a>
        </div>
      </footer>
    </div>
  );
}