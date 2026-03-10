import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, ChevronDown, Menu, X, ArrowDown } from "lucide-react";

const PHOTO = "/ruan.png";

const titles = [
  "BCOM HR MANAGEMENT",
  "SABPP STUDENT MEMBER",
  "NWU VANDERBIJLPARK",
  "STRATEGIC HR THINKER"
];

const Typewriter = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setDisplayedText("");
    setIndex(0);
  }, [text]);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, 40);
      return () => clearTimeout(timeout);
    }
  }, [index, text]);

  return (
    <span className="font-mono uppercase tracking-widest text-xs md:text-sm font-semibold">
      {displayedText}
      <span
        style={{
          display: "inline-block",
          width: "8px",
          height: "14px",
          background: "#E8FF00",
          marginLeft: "6px",
          verticalAlign: "middle",
          animation: "blink 1s step-end infinite"
        }}
      />
    </span>
  );
};

const Ticker = () => {
  const items = [
    "EMPLOYEE RELATIONS",
    "TALENT ACQUISITION",
    "HUMAN CAPITAL",
    "LABOUR LAW",
    "STRATEGIC HR",
    "PEOPLE MANAGEMENT",
    "CONFLICT RESOLUTION",
  ];

  return (
    <div
      style={{
        background: "#E8FF00",
        borderTop: "1px solid rgba(0,0,0,0.1)",
        borderBottom: "1px solid rgba(0,0,0,0.1)",
        overflow: "hidden",
        padding: "16px 0",
        position: "relative",
      }}
    >
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, ease: "linear", repeat: Infinity }}
        style={{ display: "flex", gap: "0", whiteSpace: "nowrap" }}
      >
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "13px",
              fontWeight: 700,
              color: "#0A0A0A",
              letterSpacing: "0.15em",
              padding: "0 32px",
              display: "flex",
              alignItems: "center"
            }}
          >
            {item} 
            <span className="mx-8 opacity-30 text-xs">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const slideUp = {
  initial: { y: 60, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

const NAV_ITEMS = ["ABOUT", "CAPABILITIES", "CREDENTIALS", "CONTACT"];

export default function Home() {
  const [activeTitle, setActiveTitle] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTitle((prev) => (prev + 1) % titles.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="bg-[#050505] text-[#F5F5F0] font-mono min-h-screen relative overflow-x-hidden"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Bebas+Neue&display=swap');
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        ::selection { background: #E8FF00; color: #000; }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        
        .progress-bar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: #E8FF00;
          transform-origin: left;
          z-index: 1000;
          box-shadow: 0 0 15px rgba(232,255,0,0.5);
        }
        
        .display-font { 
          font-family: 'Bebas Neue', sans-serif; 
        }
        
        .nav-item { 
          position: relative; 
          overflow: hidden;
          cursor: pointer;
          padding: 8px 0;
          font-weight: 700;
          letter-spacing: 0.1em;
          font-size: 13px;
        }
        .nav-item::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0%;
          height: 2px;
          background: #E8FF00;
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .nav-item:hover::after { width: 100%; }
        
        .noise-overlay {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 999;
          opacity: 0.04;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
        }
        
        .grid-bg {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%);
          pointer-events: none;
          z-index: 0;
        }
        
        /* Typography Scale for Hero */
        .hero-title {
          font-size: clamp(80px, 20vw, 240px);
          line-height: 0.85;
          letter-spacing: 0.02em;
          text-transform: uppercase;
        }
        
        /* Mobile Layout Optimizations */
        .hero-photo-wrapper {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
        }
        
        @media (min-width: 1024px) {
          .hero-photo-wrapper {
            position: absolute;
            right: 0;
            bottom: 0;
            width: clamp(400px, 45vw, 650px);
            max-width: none;
            margin: 0;
            transform-origin: bottom center;
          }
        }
        
        .glass-panel {
          background: rgba(10, 10, 10, 0.6);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.08);
        }
      `}</style>

      <div className="noise-overlay" />
      <motion.div className="progress-bar" style={{ scaleX }} />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4 glass-panel' : 'py-6 md:py-8 bg-transparent'}`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex justify-between items-center">
          <motion.div
            className="display-font text-3xl text-[#E8FF00] tracking-wider cursor-pointer z-50 relative"
            onClick={() => window.scrollTo(0, 0)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            RF<span className="text-white">.</span>
          </motion.div>
          
          <div className="hidden md:flex gap-10">
            {NAV_ITEMS.map((item, i) => (
              <motion.button
                key={item}
                className="nav-item text-white/60 hover:text-[#E8FF00] transition-colors"
                onClick={() => scrollTo(item)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
              >
                {item}
              </motion.button>
            ))}
          </div>

          <button
            className="md:hidden text-white z-50 relative p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={28} color="#E8FF00" /> : <Menu size={28} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 z-40 bg-[#050505] flex flex-col justify-center px-8"
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="grid-bg opacity-30" />
            <div className="flex flex-col gap-8 relative z-10">
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item}
                  className="display-font text-5xl sm:text-7xl text-left text-white/90 hover:text-[#E8FF00] hover:pl-6 transition-all duration-300 relative group"
                  onClick={() => scrollTo(item)}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                >
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-1 bg-[#E8FF00] transition-all duration-300 group-hover:w-4 -ml-6" />
                  {item}
                </motion.button>
              ))}
            </div>
            
            <motion.div 
              className="absolute bottom-12 left-8 right-8 flex justify-between items-center border-t border-white/10 pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="text-[#E8FF00] font-mono text-xs tracking-widest">
                AVAILABLE FOR WORK
              </div>
              <a href="https://linkedin.com/in/ruan-fouche" target="_blank" rel="noreferrer" className="text-white/50 hover:text-white transition-colors">
                <ArrowUpRight size={20} />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO SECTION ── */}
      <section className="relative min-h-[100dvh] w-full flex flex-col justify-center pt-24 pb-0 overflow-hidden">
        <div className="grid-bg" />
        
        <div className="max-w-[1600px] mx-auto w-full px-6 md:px-12 relative z-10 flex-1 flex flex-col lg:flex-row items-center lg:items-end pb-0 lg:pb-16 h-full mt-8 md:mt-0">
          
          {/* Left/Top Content: Text */}
          <div className="w-full lg:w-[60%] flex flex-col items-center lg:items-start z-20 text-center lg:text-left pt-10 lg:pt-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-4 inline-flex items-center gap-3 px-4 py-2 border border-white/10 rounded-full bg-white/5 backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-[#E8FF00] animate-pulse" />
              <span className="text-xs font-bold tracking-widest text-white/80">OPEN TO OPPORTUNITIES</span>
            </motion.div>

            <motion.h1 
              className="display-font hero-title text-white flex flex-col w-full"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="block drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">RUAN</span>
              <span className="block text-[#E8FF00] drop-shadow-[0_0_40px_rgba(232,255,0,0.2)]">FOUCHE</span>
            </motion.h1>

            <motion.div 
              className="mt-6 md:mt-8 min-h-[40px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTitle}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="text-white/80"
                >
                  <Typewriter text={titles[activeTitle]} />
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start hidden md:flex"
            >
              <button onClick={() => scrollTo("ABOUT")} className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-none text-xs tracking-widest transition-all duration-300 font-bold hover:border-[#E8FF00]/50">
                DISCOVER MORE
              </button>
              <button onClick={() => scrollTo("CONTACT")} className="px-8 py-4 bg-[#E8FF00] text-black hover:bg-white rounded-none text-xs tracking-widest transition-all duration-300 font-bold shadow-[0_0_20px_rgba(232,255,0,0.2)] flex items-center gap-2">
                CONTACT ME <ArrowUpRight size={16} />
              </button>
            </motion.div>
          </div>

          {/* Right/Bottom Content: Photo */}
          <motion.div 
            className="hero-photo-wrapper mt-auto lg:mt-0 flex-1 flex justify-center lg:justify-end items-end w-full"
            initial={{ opacity: 0, scale: 0.95, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Decorative glow behind image */}
            <div className="absolute -inset-4 bg-[#E8FF00]/5 blur-[100px] z-0 rounded-full" />
            
            {/* Photo container with rounded corners and border */}
            <div className="relative z-10 w-[85%] sm:w-[70%] lg:w-full rounded-3xl lg:rounded-[4rem] overflow-hidden border-2 border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.4)] max-h-[60vh] lg:max-h-[85vh] flex flex-col">
              <img 
                src={PHOTO} 
                alt="Ruan Fouche Portrait" 
                className="w-full h-full object-cover object-top"
                style={{
                  filter: "contrast(1.1) saturate(1.1)",
                }}
                loading="lazy"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
              {/* Bottom fade overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent" />
            </div>
          </motion.div>
          
        </div>

        {/* Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-white/30"
          >
            <ArrowDown size={20} />
          </motion.div>
        </motion.div>
      </section>

      {/* Ticker Banner */}
      <Ticker />

      {/* ── ABOUT SECTION ── */}
      <section id="about" className="py-24 md:py-40 px-6 md:px-12 relative">
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            <motion.div {...slideUp} className="lg:col-span-5 sticky top-32">
              <div className="text-[#E8FF00] text-xs font-bold tracking-[0.3em] mb-4 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-[#E8FF00]" />
                01 / ABOUT
              </div>
              <h2 className="display-font text-6xl md:text-8xl lg:text-9xl leading-[0.85] text-white">
                WHO <br />
                <span className="text-white/40">I AM.</span>
              </h2>
            </motion.div>

            <div className="lg:col-span-7 flex flex-col gap-10 md:gap-12 mt-4 lg:mt-24">
              <motion.div {...slideUp} className="text-lg md:text-2xl leading-relaxed text-white/90 font-light">
                I am a first-year <strong className="text-[#E8FF00] font-normal border-b border-[#E8FF00]/30 pb-1">BCom Human Resource Management</strong> student at North-West University (Vanderbijlpark Campus), passionate about unlocking human potential within organizations.
              </motion.div>
              
              <motion.div {...slideUp} className="text-sm md:text-base leading-loose text-white/60">
                My academic journey is driven by a deep curiosity for organizational behavior, strategic talent acquisition, and creating equitable workplace cultures. As an active student member of the <span className="text-white font-semibold">South African Board for People Practices (SABPP)</span>, I stay aligned with industry standards and emerging trends in the HR landscape.
              </motion.div>

              <motion.div {...slideUp} className="p-8 md:p-10 bg-white/[0.02] border border-white/5 rounded-2xl backdrop-blur-sm relative overflow-hidden group hover:border-[#E8FF00]/30 transition-colors duration-500">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#E8FF00] to-transparent" />
                <h3 className="text-[#E8FF00] font-bold text-xs tracking-widest uppercase mb-6">Core Philosophy</h3>
                <p className="text-white/70 leading-relaxed text-sm">
                  I believe that effective HR isn't just about compliance and administration—it's about strategic alignment. People are the fundamental engine of any successful enterprise, and optimizing that engine requires empathy, analytical thinking, and ethical leadership.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES ── */}
      <section id="capabilities" className="py-24 md:py-40 px-6 md:px-12 bg-[#0A0A0A] relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#E8FF00]/5 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-[1400px] mx-auto relative z-10">
          <motion.div {...slideUp} className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <div className="text-[#E8FF00] text-xs font-bold tracking-[0.3em] mb-4 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-[#E8FF00]" />
                02 / CAPABILITIES
              </div>
              <h2 className="display-font text-6xl md:text-8xl lg:text-9xl leading-[0.85] text-white">
                FOCUS <br />
                <span className="text-white/40">AREAS.</span>
              </h2>
            </div>
            <div className="max-w-xs text-white/50 text-sm leading-relaxed pb-2 hidden md:block">
              Areas of academic focus and developing expertise within the Human Resources domain.
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { title: "TALENT ACQUISITION", desc: "Strategic approaches to sourcing, interviewing, and onboarding high-caliber professionals." },
              { title: "EMPLOYEE RELATIONS", desc: "Fostering positive workplace environments through conflict resolution and policy development." },
              { title: "ORGANIZATIONAL BEHAVIOR", desc: "Analyzing how individuals and teams interact within corporate structures." },
              { title: "LABOUR LEGISLATION", desc: "Understanding the framework of SA employment laws (BCEA, LRA, EEA)." },
              { title: "PERFORMANCE MANAGEMENT", desc: "Systems and processes designed to evaluate, develop, and reward contributions." },
              { title: "STRATEGIC HR", desc: "Aligning human capital initiatives directly with broader business objectives." }
            ].map((skill, i) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group p-8 md:p-10 border border-white/10 hover:bg-[#E8FF00] transition-all duration-500 rounded-xl"
              >
                <div className="text-4xl display-font text-white/10 mb-6 group-hover:text-black/20 transition-colors duration-500">
                  0{i + 1}
                </div>
                <h3 className="text-white font-bold tracking-widest text-sm mb-4 group-hover:text-black transition-colors duration-500">{skill.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed group-hover:text-black/70 transition-colors duration-500">{skill.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...slideUp} className="mt-20 md:mt-32">
            <h3 className="text-white/30 text-xs tracking-[0.2em] uppercase mb-8 text-center font-bold">Core Competencies</h3>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {[
                "COMMUNICATION", "ANALYTICAL THINKING", "EMPATHY", "CONFLICT RESOLUTION", 
                "ETHICAL JUDGMENT", "TEAM COLLABORATION", "ADAPTABILITY", "RESEARCH"
              ].map((tag) => (
                <div key={tag} className="px-5 py-3 border border-white/10 rounded-full text-[10px] tracking-widest text-white/60 hover:text-[#E8FF00] hover:border-[#E8FF00]/50 transition-all cursor-default bg-white/[0.01]">
                  {tag}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CREDENTIALS ── */}
      <section id="credentials" className="py-24 md:py-40 px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto relative z-10">
          <motion.div {...slideUp} className="mb-16 md:mb-24">
            <div className="text-[#E8FF00] text-xs font-bold tracking-[0.3em] mb-4 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-[#E8FF00]" />
              03 / CREDENTIALS
            </div>
            <h2 className="display-font text-6xl md:text-8xl lg:text-9xl leading-[0.85] text-white">
              THE <br />
              <span className="text-[#E8FF00]">RECORDS.</span>
            </h2>
          </motion.div>

          <div className="flex flex-col border-t border-white/10">
            {[
              { title: "BCOM HR MANAGEMENT", subtitle: "DEGREE PROGRAM (1ST YEAR)", year: "PRESENT", detail: "NORTH-WEST UNIVERSITY" },
              { title: "SABPP MEMBERSHIP", subtitle: "STUDENT MEMBER", year: "ACTIVE", detail: "SA BOARD FOR PEOPLE PRACTICES" },
              { title: "MATRICULATION", subtitle: "ACADEMIC EXCELLENCE", year: "2025", detail: "COMPLETED WITH DISTINCTION" },
            ].map((cred, i) => (
              <motion.div
                key={cred.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="py-10 md:py-16 border-b border-white/10 group flex flex-col md:flex-row md:items-center justify-between gap-6 relative"
              >
                <div className="absolute inset-0 bg-[#E8FF00]/0 group-hover:bg-[#E8FF00]/5 transition-colors duration-500 -z-10 -mx-6 md:-mx-12 px-6 md:px-12" />
                
                <div className="flex-1">
                  <h3 className="display-font text-4xl md:text-5xl lg:text-6xl text-white group-hover:text-[#E8FF00] transition-colors duration-300 mb-2">
                    {cred.title}
                  </h3>
                  <div className="text-white/50 text-xs tracking-widest uppercase">
                    {cred.subtitle}
                  </div>
                </div>
                
                <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center w-full md:w-auto gap-2 text-right">
                  <div className="display-font text-3xl md:text-4xl text-white/30 group-hover:text-white transition-colors duration-300">
                    {cred.year}
                  </div>
                  <div className="text-white/40 text-[10px] tracking-widest uppercase max-w-[200px]">
                    {cred.detail}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-32 md:py-48 px-6 md:px-12 relative flex flex-col justify-center min-h-[70vh]">
        <div className="absolute inset-0 bg-[#E8FF00] z-0" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] opacity-[0.03] z-0 pointer-events-none mix-blend-overlay" />
        
        <div className="max-w-[1400px] mx-auto w-full relative z-10 text-black">
          <motion.div {...slideUp} className="flex flex-col items-center text-center">
            <div className="text-black font-bold text-xs tracking-[0.3em] mb-8 uppercase px-6 py-2 border-2 border-black rounded-full">
              Let's Connect
            </div>
            <h2 className="display-font text-7xl md:text-[12rem] leading-[0.8] tracking-tighter mb-12">
              START A <br />
              CONVERSATION.
            </h2>

            <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl justify-center mt-8">
              <motion.a
                href="https://www.linkedin.com/in/ruan-fouche"
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-between px-8 py-6 bg-black text-white font-bold tracking-widest text-sm hover:bg-black/80 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                LINKEDIN <ArrowUpRight size={20} className="text-[#E8FF00]" />
              </motion.a>
              <motion.a
                href="mailto:ruanfouche007@gmail.com"
                className="flex-1 flex items-center justify-between px-8 py-6 bg-transparent border-2 border-black text-black font-bold tracking-widest text-sm hover:bg-black/5 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                EMAIL <ArrowUpRight size={20} />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-8 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left bg-black text-white">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-[10px] tracking-widest font-bold text-white/50">
          <span className="text-white">RUAN FOUCHE &copy; {new Date().getFullYear()}</span>
          <span className="hidden md:inline-block w-1 h-1 rounded-full bg-[#E8FF00]"></span>
          <span>HR MANAGEMENT STUDENT</span>
        </div>
        
        <div className="flex items-center gap-3 text-[10px] tracking-widest font-bold">
          <div className="w-2 h-2 rounded-full bg-[#E8FF00] animate-pulse"></div>
          <span className="text-[#E8FF00]">NWU VANDERBIJLPARK, ZA</span>
        </div>
      </footer>
    </div>
  );
}
