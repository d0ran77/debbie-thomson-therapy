import React, { useState, useEffect, useRef } from 'react';

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

// --- WORLD CLASS COMPONENTS ---

const KineticSignature = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sigRef = useRef(null);
  const text = "Debbie Thomson";

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.5 });

    if (sigRef.current) observer.observe(sigRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sigRef} className="flex flex-col items-center justify-center py-20 mt-10 overflow-hidden">
      <div className="relative inline-block text-center select-none">
        {/* WORLD CLASS: Sequential "signing" reveal */}
        <div className="font-serif text-5xl md:text-7xl lg:text-8xl text-white flex">
          {text.split('').map((char, index) => (
            <span 
              key={index}
              className={`transition-all duration-700 ease-out inline-block
              ${isVisible ? 'opacity-100 blur-0 translate-y-0 translate-x-0' : 'opacity-0 blur-sm translate-y-4 -translate-x-2'}`}
              style={{ 
                transitionDelay: `${isVisible ? (index * 80) + 200 : 0}ms`,
                whiteSpace: char === ' ' ? 'pre' : 'normal'
              }}
            >
              {char}
            </span>
          ))}
        </div>
        <div className={`h-px w-3/4 mx-auto bg-white/20 mt-6 transition-all duration-[3000ms] ease-in-out ${isVisible ? 'scale-x-100 opacity-30' : 'scale-x-0 opacity-0'}`} />
      </div>
    </div>
  );
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
  <div className="animate-ink px-6 md:px-8">
    <div className="relative overflow-hidden min-h-[70vh] md:min-h-[85vh] flex items-center py-12 md:py-0 max-w-7xl mx-auto">
       <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
       
       <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 lg:gap-24 w-full">
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
            <div className="hidden md:block pt-4">
              <PrimaryButton onClick={() => navigateTo('contact')}>
                Begin Your Journey
              </PrimaryButton>
            </div>
          </div>

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
  <div className="max-w-5xl mx-auto px-6 py-20 animate-ink text-white">
    <h1 className="text-5xl md:text-7xl font-serif text-center mb-20 drop-shadow-md uppercase tracking-tight">About Debbie</h1>
    <div className="flex flex-col md:flex-row gap-16 items-center mb-24">
      <div className="w-full md:w-2/5 flex justify-center">
        <div className="w-full max-sm aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border border-white/20">
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
          I am a qualified Psychotherapist and UKCP accredited at level 6. I provide a bespoke treatment plan for each of my individual clients in Willerby, East Yorkshire.
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

    {/* IDEA 3: KINETIC SIGNATURE (Sequential "signing" logic) */}
    <KineticSignature />
  </div>
);

const ServicesView = () => (
  <div className="max-w-5xl mx-auto px-4 py-20 animate-ink text-white">
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
  const [lang, setLang] = useState('ENG');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const associates = [
    {
      id: 'kim',
      name: "Kim Jones",
      titles: { ENG: ["UKCP Psychotherapist & Clinical Supervisor", "RTM Licenced Clinician", "Eco Coach/Therapist", "Advanced Practitioner of Emotional Freedom Technique"] },
      tagline: { ENG: "Creating more choices and empowering minds leads to positive changes both personally and professionally." },
      about: {
        ENG: [
          "I am empathic, approachable, open minded, friendly and professional. In my work I provide therapeutic solutions, build confidence, enable clients to realise their potential, develop awareness of their innate ability to perceive and resolve problems from a different perspective as well as help re-discover the true inner version of themselves.",
          "I work with adults and businesses, with a varied range of social, behavioural, and mental health issues, within local authorities, charities, privately and businesses.",
          "I am passionate about working within a range of areas and clients, ensuring I remain versatile and multi-faceted in my work. My mission to empower you, to remind you that you are enough, always, and to help you re-discover the true inner you.",
          "I abide by confidentiality and have the utmost respect for who you are.",
          "Having made an enquiry, we will arrange a convenient time for an initial consultation where I will learn more about you. Together we will outline a flexible schedule, within which we will aim for your goals to be met, we will work together to facilitate positive changes to ensure you get the results that you want."
        ]
      },
      interests: { ENG: ["Abuse", "Anger management", "Anxiety", "Bullying", "PTSD/CPTSD", "Depression", "Divorce", "Domestic abuse", "Relationships", "Stress", "Trauma"] },
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
      titles: { ENG: ["Transactional Analysis (TA) Psychotherapist", "Imago Relationship Therapist (in training)", "UKCP trainee member & NCPS registered"] },
      tagline: { ENG: "A thoughtful and psychologically grounded space for individuals and couples." },
      about: {
        ENG: [
          "I offer a thoughtful and psychologically grounded space for individuals and couples who are ready to explore the patterns beneath their struggles.",
          "I am a psychotherapist and UKCP Trainee Member, registered with the NCPS, with specialist training in Transactional Analysis (TA). I am also an Imago Relationship Therapy practitioner in training.",
          "My approach is warm, collaborative and reflective. I work in a trauma-informed way, recognising how past experiences particularly relational trauma which can shape present emotional responses, attachment patterns and self-beliefs.",
          "Transactional Analysis provides a clear and practical framework for understanding how early experiences shape our internal “scripts.” These patterns often influence how we relate to others, manage conflict, and experience ourselves.",
          "Together, we explore these dynamics at your pace, supporting greater awareness, emotional resilience and meaningful choice."
        ]
      },
      interests: {
        ENG: [
          "Relationship difficulties", "Couples therapy", "Imago Therapy", "Low self-esteem", "Anxiety", "Stress", 
          "Identity", "Childhood neglect", "Inner child work", "Life transitions", "Family dynamics", "Boundaries",
          "Cultural identity", "Narcissistic abuse", "Trauma recovery", "Somatic awareness", "Depression", 
          "Inner critic", "Parenting", "Grief & loss"
        ]
      },
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
      badge: "Bilingual (Spanish)",
      titles: {
        ENG: ["Transactional Analysis (TA) Advanced Trainee", "Bilingual Therapist (English/Spanish)"],
        ESP: ["Psicoterapeuta en formación avanzada (AT)", "Terapeuta Bilingüe (Inglés/Español)"]
      },
      tagline: {
        ENG: "I welcome clients who may not have a specific 'label' but simply know that something doesn't feel right.",
        ESP: "Doy la bienvenida a clientes que tal vez no tengan una 'etiqueta' específica, pero simplemente saben que algo no va bien."
      },
      about: {
        ENG: [
          "As an advanced trainee therapist, I am warm, thoughtful and relational in my approach. I believe meaningful change happens through a safe, collaborative therapeutic relationship where you feel genuinely heard and understood.",
          "My clinical experience includes placements with Humberside Police and Valued Minds (Space2BHeard), where I have supported adults facing anxiety, low mood, trauma-related difficulties, and complex life challenges.",
          "Grounded in Transactional Analysis, my work explores patterns in how you relate to yourself and others, helping you understand where certain beliefs or behaviours may have developed and how they might be affecting you now.",
          "As a bilingual therapist (English and Spanish), I aim to offer a culturally sensitive and inclusive space where all parts of your identity are welcome."
        ],
        ESP: [
          "Como terapeuta avanzada en formación, soy cálida, reflexiva y relacional en mi enfoque. Creo que el cambio significativo ocurre a través de una relación terapéutica segura y colaborativa donde te sientas genuinamente escuchado y comprendido.",
          "Mi experiencia clínica incluye prácticas con la Policía de Humberside y Valued Minds (Space2BHeard), donde he apoyado a adultos que enfrentan ansiedad, bajo estado de ánimo, dificultades relacionadas con el trauma y desafíos vitales complejos.",
          "Basado en el Análisis Transaccional, mi trabajo explora patrones en cómo te relacionas contigo mismo y con los demás, ayudándote a comprender dónde pueden haberse desarrollado ciertas creencias o comportamientos.",
          "Como terapeuta bilingüe (inglés y español), mi objetivo es ofrecer un espacio culturalmente sensible e inclusivo donde todas las partes de tu identidad sean bienvenidas."
        ]
      },
      interests: {
        ENG: ["Anxiety", "Low mood", "Relationship difficulties", "Repeating patterns", "Inner world exploration", "Cultural identity", "Trauma-related difficulties", "Ethical practice"],
        ESP: ["Ansiedad", "Bajo ánimo", "Dificultades en relaciones", "Patrones repetitivos", "Exploración interior", "Identidad cultural", "Dificultades por trauma", "Práctica ética"]
      },
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

  const handleLangToggle = (newLang) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setLang(newLang);
      setIsTransitioning(false);
    }, 300);
  };

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
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 animate-ink text-white relative min-h-[80vh]">
      {!selectedAssociate ? (
        <>
          <h1 className="text-5xl md:text-7xl font-serif text-center mb-10 uppercase tracking-tight">Associates</h1>
          <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md p-8 md:p-12 rounded-[2.5rem] border border-white/20 shadow-2xl mb-16 text-center">
            <h2 className="text-3xl font-serif mb-6" style={{ color: COLORS.button }}>Announcement</h2>
            <p className="text-xl md:text-2xl font-subtitle mb-6 leading-relaxed text-white">I am excited to announce the launch of my Associate Therapist Service!</p>
            <p className="text-lg opacity-90 mb-0 leading-relaxed text-white">If I am full in my caseload, I can recommend other therapists who may be able to work with you.</p>
          </div>
          <div className="relative group">
            <div className="overflow-x-auto lg:overflow-hidden pb-10 scrollbar-hide snap-x snap-mandatory flex">
              <div className="flex transition-transform duration-700 ease-in-out md:translate-x-0" style={{ transform: window.innerWidth >= 1024 ? `translateX(-${currentSlide * 33.33}%)` : 'none' }}>
                {associates.map((associate) => (
                  <div key={associate.id} className="w-[82vw] sm:w-1/2 lg:w-1/3 flex-shrink-0 px-2 sm:px-3 relative snap-center">
                    <div onClick={() => { setSelectedAssociate(associate); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="cursor-pointer bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-[2rem] border border-white/20 text-center flex flex-col items-center hover:scale-[1.03] active:scale-95 transition-all duration-300 shadow-xl h-[520px] md:h-[620px] justify-between overflow-hidden relative">
                      {associate.badge && <div className="absolute top-4 right-4 bg-[#b28c8e] text-white text-[9px] font-bold px-2 py-1 rounded-full uppercase tracking-widest shadow-md z-20">{associate.badge}</div>}
                      <div className="flex flex-col items-center w-full">
                        <div className="w-28 h-28 md:w-44 md:h-44 rounded-2xl mb-4 md:mb-6 overflow-hidden border-4 border-white/30 shadow-lg bg-white/5 flex-shrink-0">
                          <img src={associate.img} className="w-full h-full object-cover object-center" alt={associate.name} />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-serif mb-1 md:mb-2" style={{ color: COLORS.button }}>{associate.name}</h3>
                        <div className="space-y-1 mb-4 h-10 md:h-12 overflow-hidden flex-shrink-0">
                          {associate.titles.ENG.slice(0, 1).map((t, i) => (
                            <p key={i} className="text-[9px] md:text-[10px] opacity-60 uppercase tracking-widest font-bold px-4 text-white line-clamp-2">{t}</p>
                          ))}
                        </div>
                        <p className="font-subtitle text-lg md:text-xl text-white mb-4 md:mb-6 leading-snug px-2 line-clamp-4">"{associate.tagline.ENG}"</p>
                      </div>
                      <div className="w-full px-2 mt-auto">
                        <PrimaryButton className="pointer-events-none scale-75 md:scale-90 w-full py-3">View Profile</PrimaryButton>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {associates.length > 3 && (
              <div className="hidden lg:block">
                <button onClick={prevSlide} className="absolute left-0 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-all z-10 opacity-0 group-hover:opacity-100"><Icons.ChevronLeft /></button>
                <button onClick={nextSlide} className="absolute right-0 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-all z-10 opacity-0 group-hover:opacity-100"><Icons.ChevronRight /></button>
              </div>
            )}
          </div>
        </>
      ) : (
        /* FULL-VIEW PROFILE DETAIL: Logos removed, Enquire button moved to bottom of detail col */
        <div className="animate-ink relative z-[10] min-h-[80vh] w-full">
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
            <button onClick={() => { setSelectedAssociate(null); setLang('ENG'); }} className="absolute top-4 right-4 md:top-8 md:right-8 p-3 md:p-4 bg-white/20 rounded-full hover:bg-white/40 transition-all z-[110] active:scale-90"><Icons.X /></button>

            <div className="flex flex-col lg:flex-row gap-8 md:gap-16 items-start relative z-10">
              <div className="w-full lg:w-1/3 space-y-6 md:space-y-8 lg:sticky lg:top-8">
                <div className="relative group w-full aspect-square rounded-2xl md:rounded-[2.5rem] overflow-hidden border-4 md:border-8 border-white/20 shadow-2xl bg-white/5">
                  <img src={selectedAssociate.img} className="w-full h-full object-cover object-center" alt={selectedAssociate.name} />
                </div>
                
                <div className="space-y-4 text-center lg:text-left pt-2">
                  <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                    <h2 className="text-4xl md:text-5xl font-serif text-white uppercase tracking-tight leading-none mb-6">
                      {lang === 'ENG' ? `Work with ${selectedAssociate.name.split(' ')[0]}` : `Trabaja con ${selectedAssociate.name.split(' ')[0]}`}
                    </h2>
                  </div>
                  
                  {selectedAssociate.id === 'letisia' && (
                    <div className="flex justify-center lg:justify-start gap-4 p-1 bg-white/10 rounded-full w-fit mx-auto lg:mx-0 backdrop-blur-md border border-white/10">
                      <button onClick={() => handleLangToggle('ENG')} className={`px-4 py-1 rounded-full text-xs font-bold transition-all ${lang === 'ENG' ? 'bg-[#b28c8e] text-white shadow-lg' : 'text-white/50'}`}>ENG</button>
                      <button onClick={() => handleLangToggle('ESP')} className={`px-4 py-1 rounded-full text-xs font-bold transition-all ${lang === 'ESP' ? 'bg-[#b28c8e] text-white shadow-lg' : 'text-white/50'}`}>ESP</button>
                    </div>
                  )}
                  
                  <div className={`space-y-2 pt-2 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                    {(selectedAssociate.titles[lang] || selectedAssociate.titles['ENG']).map((t, i) => (
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
                  <div className="pt-4 border-t border-white/10">
                    <p className="font-bold text-lg mb-2">{lang === 'ENG' ? 'Fees' : 'Tarifas'}</p>
                    <p className="opacity-90 leading-relaxed text-xs whitespace-pre-line">{selectedAssociate.fees}</p>
                  </div>
                </div>
              </div>

              <div className={`w-full lg:w-2/3 space-y-12 md:space-y-16 pt-8 lg:pt-0 transition-all duration-300 ${isTransitioning ? 'opacity-0 blur-sm' : 'opacity-100 blur-0'}`}>
                <section><p className="font-subtitle text-3xl md:text-5xl leading-tight text-white">"{selectedAssociate.tagline[lang] || selectedAssociate.tagline['ENG']}"</p></section>
                <section className="space-y-6 md:space-y-8">
                  <h4 className="font-serif text-3xl md:text-4xl flex items-center gap-4 text-white">{lang === 'ENG' ? 'About' : 'Sobre mí'} <div className="h-px bg-white/20 flex-grow"></div></h4>
                  <div className="space-y-6">{(selectedAssociate.about[lang] || selectedAssociate.about['ENG']).map((p, i) => <p key={i} className="text-lg md:text-xl opacity-90 leading-relaxed text-white">{p}</p>)}</div>
                </section>
                <section className="space-y-6 md:space-y-8 pb-12">
                  <h4 className="font-serif text-3xl md:text-4xl flex items-center gap-4 text-white">{lang === 'ENG' ? 'Areas of Interest' : 'Áreas de interés'} <div className="h-px bg-white/20 flex-grow"></div></h4>
                  <div className="flex flex-wrap gap-2 md:gap-3">{(selectedAssociate.interests[lang] || selectedAssociate.interests['ENG']).map((interest) => <span key={interest} className="px-4 md:px-6 py-2 md:py-3 bg-white/10 rounded-full text-xs md:text-sm font-bold tracking-wide uppercase border border-white/10 text-white hover:bg-white/20 transition-colors">{interest}</span>)}</div>
                </section>
                
                {/* Enquire Now button repositioned to the bottom of the detail column */}
                <div className="pt-12 border-t border-white/10">
                  <PrimaryButton onClick={() => window.open(ENQUIRY_FORM_URL, '_blank')} className="w-full">
                    {lang === 'ENG' ? 'Enquire Now' : 'Consultar Ahora'} <Icons.ExternalLink />
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const RoomRentalView = () => {
  const images = ['/1.webp', '/2.webp', '/3.webp', '/4.webp', '/5.webp', '/6.webp'];
  const scrollRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleScroll = (e) => {
    const scrollLeft = e.target.scrollLeft;
    const width = e.target.offsetWidth;
    const index = Math.round(scrollLeft / width);
    setCurrentSlide(index);
  };

  const scrollToIndex = (index) => {
    if (scrollRef.current) {
      const width = scrollRef.current.offsetWidth;
      scrollRef.current.scrollTo({ left: width * index, behavior: 'smooth' });
      setCurrentSlide(index);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 animate-ink text-white">
      <h1 className="text-5xl md:text-7xl font-serif text-center mb-16 uppercase tracking-tight">Room Rental</h1>
      <div className="bg-white/10 backdrop-blur-md rounded-[40px] overflow-hidden border border-white/20 shadow-2xl flex flex-col md:flex-row">
        <div className="md:w-1/2 min-h-[400px] md:min-h-[500px] relative group bg-black/20">
          <div ref={scrollRef} onScroll={handleScroll} className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scrollbar-hide">
            {images.map((src, idx) => <div key={idx} className="w-full h-full flex-shrink-0 snap-center"><img src={src} alt={`Therapy Room ${idx + 1}`} className="w-full h-full object-cover" /></div>)}
          </div>
          <button onClick={() => scrollToIndex((currentSlide - 1 + images.length) % images.length)} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-md transition-all z-10"><Icons.ChevronLeft /></button>
          <button onClick={() => scrollToIndex((currentSlide + 1) % images.length)} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-md transition-all z-10"><Icons.ChevronRight /></button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
            {images.map((_, idx) => <button key={idx} onClick={() => scrollToIndex(idx)} className={`h-2 rounded-full transition-all duration-500 shadow-md ${currentSlide === idx ? 'bg-white w-8' : 'bg-white/50 w-2'}`} />)}
          </div>
        </div>
        <div className="md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
          <h2 className="text-4xl font-serif mb-6" style={{ color: COLORS.button }}>Practice Space</h2>
          <p className="text-xl md:text-2xl font-subtitle opacity-90 mb-6 leading-relaxed">My therapy room is in the heart of Willerby Square, East Yorkshire.</p>
          <p className="text-lg opacity-80 mb-10 leading-relaxed">I also have a smaller therapy room available to rent if you are a therapist looking for a new space to work from.</p>
          <PrimaryButton onClick={() => window.open(ENQUIRY_FORM_URL, '_blank')} className="self-start">Get in touch <Icons.ExternalLink /></PrimaryButton>
        </div>
      </div>
    </div>
  );
};

const FAQView = () => (
  <div className="max-w-3xl mx-auto px-6 py-20 animate-ink text-white">
    <h1 className="text-5xl md:text-7xl font-serif text-center mb-16 uppercase tracking-tight">FAQ</h1>
    <div className="space-y-4">
      {[
        { q: "How long is a standard session?", a: "Individual sessions are 60 minutes long. Couples sessions are 90 minutes." },
        { q: "Where is the practice located?", a: "The practice is centrally located in Willerby Square, East Yorkshire." },
        { q: "Do you offer online sessions?", a: "Yes, I offer online sessions for individuals. Couples therapy is face-to-face only." }
      ].map((item) => (
        <div key={item.q} className="p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20">
          <h3 className="text-2xl font-serif mb-3" style={{ color: COLORS.button }}>{item.q}</h3>
          <p className="opacity-80 leading-relaxed">{item.a}</p>
        </div>
      ))}
    </div>
  </div>
);

const ContactView = () => (
  <div className="max-w-5xl mx-auto px-4 py-20 animate-ink text-white">
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
            <PrimaryButton onClick={() => window.open(ENQUIRY_FORM_URL, '_blank')} className="w-full">Open Enquiry Form <Icons.ExternalLink /></PrimaryButton>
          </div>
        </div>
        <form className="space-y-6" name="contact" method="POST" data-netlify="true">
          <p className="text-center font-serif text-xl mb-4">Or send a message below</p>
          <input type="hidden" name="form-name" value="contact" /><input className="w-full p-4 rounded-2xl bg-white/5 border border-white/20 focus:outline-none focus:ring-2 text-white" style={{ ringColor: COLORS.button }} placeholder="Name" name="name" required /><input className="w-full p-4 rounded-2xl bg-white/5 border border-white/20 focus:outline-none focus:ring-2 text-white" style={{ ringColor: COLORS.button }} placeholder="Email" name="email" type="email" required /><textarea className="w-full p-4 rounded-2xl bg-white/5 border border-white/20 focus:outline-none focus:ring-2 text-white" style={{ ringColor: COLORS.button }} placeholder="Message" name="message" rows="5" required></textarea>
          <PrimaryButton type="submit" className="w-full">Send Message</PrimaryButton>
        </form>
      </div>
    </div>
  </div>
);

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef(null);

  const navigateTo = (page) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => setIsScrolling(false), 1000); 
    };
    window.addEventListener('scroll', handleScroll);
    return () => { window.removeEventListener('scroll', handleScroll); if (scrollTimeout.current) clearTimeout(scrollTimeout.current); };
  }, []);

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
        
        .animate-ink { animation: inkReveal 1s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        @keyframes inkReveal {
          0% { filter: blur(30px); opacity: 0; transform: scale(1.05); }
          100% { filter: blur(0); opacity: 1; transform: scale(1); }
        }

        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-marquee-ltr { animation: marquee-ltr 60s linear infinite; }
        @keyframes float { 0%, 100% { transform: translateY(0px) rotate(3deg); } 50% { transform: translateY(-15px) rotate(1deg); } }
        @keyframes marquee-ltr { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 10px; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .magnet-effect { transition: transform 0.4s cubic-bezier(0.33, 1, 0.68, 1), filter 0.3s ease; }
        .magnet-effect:hover { transform: scale(1.18) translateY(-8px); filter: brightness(1.15); }
        .mobile-hamburger-fixed { position: fixed; top: 1.5rem; right: 1.5rem; z-index: 100; }
      `}} />

      <nav className="sticky top-0 z-50 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 md:px-8 h-24 md:h-32 lg:h-40 flex justify-between items-center text-white">
          <div className="cursor-pointer group flex items-center shrink-0" onClick={() => navigateTo('home')}>
            <img src="/debbielogo.webp" alt="Logo" className="h-24 sm:h-32 md:h-40 lg:h-48 w-auto transition-transform hover:scale-105 duration-500" />
          </div>
          <div className="hidden lg:flex items-center gap-12">
            <div className="relative group">
              <button className="flex items-center gap-3 text-xl uppercase tracking-widest font-bold opacity-90 hover:opacity-100 transition-opacity py-2">Menu <Icons.ChevronDown size={22} /></button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 overflow-hidden flex flex-col">
                {navLinks.filter(l => l.id !== 'contact').map((link) => (
                  <button key={link.id} onClick={() => navigateTo(link.id)} className="w-full text-left px-8 py-5 hover:bg-white/10 transition-colors text-lg uppercase tracking-widest font-bold border-b border-white/5 last:border-0">{link.label}</button>
                ))}
              </div>
            </div>
            <button onClick={() => navigateTo('contact')} className={`text-xl uppercase tracking-widest font-bold transition-all magnet-effect ${currentPage === 'contact' ? 'border-b-4 border-white pb-1' : 'opacity-90 hover:opacity-100'}`}>Contact</button>
          </div>
          <div className="lg:hidden mobile-hamburger-fixed">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-3 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 shadow-xl">{isMobileMenuOpen ? <Icons.X /> : <Icons.Menu />}</button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-[90] bg-white/10 backdrop-blur-3xl flex flex-col pt-32 p-6 space-y-2 animate-fadeIn overflow-y-auto">
             <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none"></div>
            {navLinks.map((link) => <button key={link.id} onClick={() => navigateTo(link.id)} className="relative z-10 py-5 uppercase tracking-widest text-2xl font-bold text-left border-b border-white/10">{link.label}</button>)}
          </div>
        )}
      </nav>

      {/* Main Content Area: Key forces a re-mount for the ink animation */}
      <main key={currentPage} className="flex-grow pb-48 md:pb-64">
        {currentPage === 'home' && <HomeView navigateTo={navigateTo} />}
        {currentPage === 'about' && <AboutView />}
        {currentPage === 'services' && <ServicesView />}
        {currentPage === 'associates' && <AssociatesView navigateTo={navigateTo} />}
        {currentPage === 'room-rental' && <RoomRentalView />}
        {currentPage === 'faq' && <FAQView />}
        {currentPage === 'contact' && <ContactView />}
      </main>

      <footer 
        className={`fixed bottom-0 left-0 right-0 z-20 py-6 flex flex-col items-center bg-white/10 backdrop-blur-xl transition-transform duration-1000 ease-in-out ${isScrolling ? 'translate-y-[100%]' : 'translate-y-0'}`}
      >
        <div className="flex gap-10 mb-6">
          <a href="https://www.linkedin.com/in/debbie-thomson-35131a1b8/" target="_blank" rel="noopener noreferrer" className="text-white magnet-effect"><Icons.LinkedIn size={44} /></a>
          <a href="https://www.facebook.com/Debbiettherapy" target="_blank" rel="noopener noreferrer" className="text-white magnet-effect"><Icons.Facebook size={44} /></a>
          <a href="https://www.instagram.com/debbiettherapy/" target="_blank" rel="noopener noreferrer" className="text-white magnet-effect"><Icons.Instagram size={44} /></a>
        </div>
        <p className="opacity-70 mb-4 max-w-xs mx-auto text-sm text-center text-white">Providing a safe space in Willerby Square.</p>
        <div className="flex flex-col items-center gap-2 text-[10px] opacity-60 font-sans tracking-widest uppercase text-white">
          <span>&copy; {new Date().getFullYear()} All rights reserved.</span>
          <a href="https://builtbyliam.uk/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors underline decoration-white/30 underline-offset-4">Built By Liam</a>
        </div>
      </footer>
    </div>
  );
}