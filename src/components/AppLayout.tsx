
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '@/contexts/AppContext';
import {
  Menu, X, Github, Linkedin, Twitter, Mail, ExternalLink,
  Code, Server, Database, Terminal, Globe, Send, Download,
  Quote, Calendar, MapPin, Briefcase, GraduationCap, Award,
  ArrowRight, CheckCircle, Sparkles, Layers,
  Zap, Heart, ChevronDown, Phone
} from 'lucide-react';
import { profile, projects, skills, experiences, testimonials, blogPosts } from '@/data/portfolio';

// ===== INTERSECTION OBSERVER HOOK =====
const useReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
};

// ===== SECTION HEADER COMPONENT =====
const SectionHeader = ({ label, title, titleHighlight, description }: {
  label: string; title: string; titleHighlight?: string; description: string;
}) => {
  const { ref, isVisible } = useReveal();
  return (
    <div ref={ref} className={`text-center mb-16 lg:mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="inline-flex items-center gap-3 mb-6">
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-cyan-400"></span>
        <span className="text-cyan-400 text-xs font-semibold tracking-[0.2em] uppercase">{label}</span>
        <span className="h-px w-8 bg-gradient-to-l from-transparent to-cyan-400"></span>
      </div>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 tracking-tight">
        {title}{' '}
        {titleHighlight && <span className="gradient-text-animated">{titleHighlight}</span>}
      </h2>
      <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">{description}</p>
    </div>
  );
};

const AppLayout: React.FC = () => {
  const { sidebarOpen, toggleSidebar } = useAppContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [activeNav, setActiveNav] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [activeSkillTab, setActiveSkillTab] = useState(0);

  // Track scroll for nav and active section
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ['about', 'skills', 'projects', 'experience', 'blog', 'contact'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveNav(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!contactForm.name.trim()) errors.name = "Name is required";
    if (!contactForm.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(contactForm.email)) errors.email = "Invalid email format";
    if (!contactForm.message.trim()) errors.message = "Message is required";
    if (Object.keys(errors).length > 0) { setFormErrors(errors); return; }
    setFormErrors({});
    setFormSubmitted(true);
    setContactForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Experience', id: 'experience' },
    { name: 'Blog', id: 'blog' },
    { name: 'Contact', id: 'contact' },
  ];

  // Map skills to include colors and verify structure
  const colors = [
    "from-cyan-400 to-blue-500",
    "from-violet-400 to-purple-500",
    "from-emerald-400 to-teal-500",
    "from-orange-400 to-rose-500",
  ];
  const mappedSkills = skills.map((cat, idx) => ({
    ...cat,
    color: colors[idx % colors.length]
  }));

  // Map experiences to include colors
  const mappedExperiences = experiences.map((exp, idx) => ({
    ...exp,
    color: colors[idx % colors.length]
  }));

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white overflow-x-hidden">
      {/* ===== NAVIGATION ===== */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
        ? 'bg-[#0a0f1c]/80 backdrop-blur-2xl border-b border-white/[0.06] shadow-lg shadow-black/20'
        : 'bg-transparent'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-bold text-base tracking-tight shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 opacity-0 group-hover:opacity-20 blur transition-opacity"></div>
              </div>
              <div className="hidden sm:block">
                <span className="font-semibold text-base tracking-tight">{profile.name}</span>
                <span className="block text-[11px] text-slate-500 font-medium tracking-wide">{profile.role}</span>
              </div>
            </button>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map(link => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${activeNav === link.id
                    ? 'text-cyan-400'
                    : 'text-slate-400 hover:text-white'
                    }`}
                >
                  {link.name}
                  {activeNav === link.id && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-400"></span>
                  )}
                </button>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <a href="./DIleepa_Resume.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 btn-primary rounded-xl font-medium text-sm text-white">
                <Download className="w-4 h-4" />
                Resume
              </a>
            </div>

            {/* Mobile Menu */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2.5 rounded-xl glass text-slate-300 hover:text-white transition-colors">
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-4 py-6 bg-[#0a0f1c]/95 backdrop-blur-2xl border-t border-white/[0.06] space-y-1">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="block w-full text-left px-4 py-3 text-slate-300 hover:text-cyan-400 hover:bg-white/[0.03] rounded-xl transition-all text-sm font-medium"
              >
                {link.name}
              </button>
            ))}
            <a href="./DIleepa_Resume.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-3 text-cyan-400 text-sm font-medium">
              <Download className="w-4 h-4" /> Download Resume
            </a>
          </div>
        </div>
      </nav>

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[#0a0f1c]"></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-40"></div>
          {/* Gradient orbs */}
          <div className="absolute top-1/4 left-[15%] w-[500px] h-[500px] bg-cyan-500/[0.07] rounded-full blur-[120px] animate-float-slow"></div>
          <div className="absolute bottom-1/4 right-[15%] w-[400px] h-[400px] bg-blue-600/[0.07] rounded-full blur-[100px] animate-float-reverse"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/[0.04] rounded-full blur-[140px]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left content */}
            <div className="space-y-8 animate-fade-in-up">
              {/* Status badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 glass rounded-full">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
                </span>
                <span className="text-sm text-slate-300 font-medium">Available for new opportunities</span>
              </div>

              <div className="space-y-5">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight" style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}>
                  Hi, I'm{' '}
                  <span className="gradient-text-animated">{profile.name}</span>
                </h1>
                <h2 className="text-xl sm:text-2xl text-slate-400 font-light tracking-tight">
                  {profile.role}
                </h2>
                <p className="text-base sm:text-lg text-slate-500 max-w-xl leading-relaxed">
                  {profile.bio}
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <button onClick={() => scrollToSection('projects')} className="btn-primary px-7 py-3.5 rounded-xl font-semibold text-sm flex items-center gap-2.5 text-white">
                  View My Work
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button onClick={() => scrollToSection('contact')} className="btn-secondary px-7 py-3.5 rounded-xl font-semibold text-sm text-slate-300">
                  Get In Touch
                </button>
              </div>

              {/* Social links */}
              <div className="flex items-center gap-3 pt-2">
                {[
                  { icon: <Github className="w-[18px] h-[18px]" />, label: 'GitHub', href: `https://${profile.github}` },
                  { icon: <Linkedin className="w-[18px] h-[18px]" />, label: 'LinkedIn', href: `https://${profile.linkedin}` },
                  { icon: <Mail className="w-[18px] h-[18px]" />, label: 'Email', href: `mailto:${profile.email}` },
                  { icon: <Phone className="w-[18px] h-[18px]" />, label: 'Phone', href: `tel:${profile.phone}` },
                ].map((social) => (
                  <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl glass text-slate-400 hover:text-white hover:border-cyan-500/30 transition-all duration-300 group" aria-label={social.label}>
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Right - Profile Image */}
            <div className="relative flex justify-center lg:justify-end animate-fade-in" style={{ animationDelay: '300ms' }}>
              <div className="relative">
                {/* Decorative ring */}
                <div className="absolute -inset-4 rounded-full border border-dashed border-slate-700/50 animate-rotate-slow"></div>
                <div className="absolute -inset-8 rounded-full border border-dashed border-slate-800/30 animate-rotate-slow" style={{ animationDirection: 'reverse', animationDuration: '30s' }}></div>

                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-full blur-3xl animate-pulse-glow"></div>

                {/* Image */}
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-[380px] lg:h-[380px] rounded-full object-cover border-2 border-white/10 shadow-2xl shadow-cyan-500/10"
                />

                {/* Floating badges */}
                <div className="absolute -top-2 -right-2 glass-card px-4 py-2.5 rounded-xl shadow-xl animate-float">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                      <Code className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 block">Experience</span>
                      <span className="text-sm font-bold">{profile.stats.yearsExperience} Years</span>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-2 -left-2 glass-card px-4 py-2.5 rounded-xl shadow-xl animate-float-reverse">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center">
                      <Globe className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 block">Completed</span>
                      <span className="text-sm font-bold">{profile.stats.projectsCompleted} Projects</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-[10px] text-slate-600 uppercase tracking-[0.2em] font-medium">Scroll</span>
          <ChevronDown className="w-4 h-4 text-slate-600" />
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="relative py-8 border-y border-white/[0.04]">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/[0.03] via-transparent to-blue-500/[0.03]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {[
              { value: profile.stats.yearsExperience, label: 'Years of Experience', icon: <Zap className="w-4 h-4" /> },
              { value: profile.stats.projectsCompleted, label: 'Projects Delivered', icon: <Layers className="w-4 h-4" /> },
              { value: profile.stats.happyClients, label: 'Happy Clients', icon: <Heart className="w-4 h-4" /> },
              { value: profile.stats.openSourceContribs, label: 'Open Source Repos', icon: <Code className="w-4 h-4" /> },
            ].map((stat, idx) => (
              <div key={idx} className="flex items-center gap-4 justify-center">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/10 flex items-center justify-center text-cyan-400">
                  {stat.icon}
                </div>
                <div>
                  <div className="text-2xl font-bold tracking-tight gradient-text">{stat.value}</div>
                  <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT SECTION ===== */}
      <section id="about" className="py-24 lg:py-32 relative">
        <div className="absolute inset-0 bg-dot-pattern opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-3 mb-6">
                  <span className="h-px w-8 bg-gradient-to-r from-transparent to-cyan-400"></span>
                  <span className="text-cyan-400 text-xs font-semibold tracking-[0.2em] uppercase">About Me</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 tracking-tight" style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}>
                  Turning Ideas Into{' '}
                  <span className="gradient-text-animated">Digital Reality</span>
                </h2>
              </div>
              <div className="space-y-5 text-slate-400 leading-relaxed text-base">
                {profile.about.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Info cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <GraduationCap className="w-6 h-6" />, title: "Education", desc: `${profile.education.degree}, ${profile.education.school}`, gradient: "from-cyan-400 to-blue-500" },
                { icon: <Award className="w-6 h-6" />, title: "Certifications", desc: profile.certifications, gradient: "from-violet-400 to-purple-500" },
                { icon: <Briefcase className="w-6 h-6" />, title: "Current Role", desc: profile.role, gradient: "from-emerald-400 to-teal-500" },
                { icon: <MapPin className="w-6 h-6" />, title: "Location", desc: profile.location, gradient: "from-orange-400 to-rose-500" },
              ].map((card, idx) => (
                <div key={idx} className={`glass-card p-6 rounded-2xl ${idx % 2 === 1 ? 'mt-8' : ''}`}>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                    {React.cloneElement(card.icon, { className: 'w-5 h-5 text-white' })}
                  </div>
                  <h3 className="font-semibold mb-2 text-sm">{card.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SKILLS SECTION ===== */}
      <section id="skills" className="py-24 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1c] via-[#0d1425] to-[#0a0f1c]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Skills & Expertise"
            title="Technologies I"
            titleHighlight="Work With"
            description="A comprehensive toolkit of modern technologies and frameworks that I use to build exceptional digital products."
          />

          {/* Skill category tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {mappedSkills.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSkillTab(idx)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${activeSkillTab === idx
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/10'
                  : 'glass text-slate-400 hover:text-white'
                  }`}
              >
                {/* Try to use icon from data if available, else fallback provided by mapping/data */}
                <span className="w-5 h-5 flex items-center justify-center">{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>

          {/* Active skill category */}
          <div className="max-w-4xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {mappedSkills[activeSkillTab].skills.map((skill, idx) => (
                <div key={skill.name} className="glass-card p-5 rounded-2xl group" style={{ animationDelay: `${idx * 100}ms` }}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-sm text-white">{skill.name}</span>
                    <span className="text-xs font-semibold text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded-full">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${mappedSkills[activeSkillTab].color} rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROJECTS SECTION ===== */}
      <section id="projects" className="py-24 lg:py-32 relative">
        <div className="absolute inset-0 bg-dot-pattern opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Portfolio"
            title="Featured"
            titleHighlight="Projects"
            description="A selection of projects that showcase my skills and experience in building modern applications."
          />

          {/* Filter buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {['all', 'frontend', 'backend', 'fullstack', 'mobile'].map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${activeFilter === filter
                  ? 'btn-primary text-white shadow-lg shadow-cyan-500/20'
                  : 'glass text-slate-400 hover:text-white'
                  }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>

          {/* Projects grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, idx) => (
              <div
                key={project.id}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                className="glass-card rounded-2xl overflow-hidden group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-52 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] via-[#0a0f1c]/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

                  {project.featured && (
                    <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-xs font-semibold shadow-lg">
                      <Sparkles className="w-3 h-3" />
                      Featured
                    </div>
                  )}

                  {/* Hover action buttons */}
                  <div className={`absolute bottom-4 left-4 right-4 flex items-center justify-center gap-3 transition-all duration-300 ${hoveredProject === project.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}>
                    <a href={project.github} className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-sm font-medium hover:bg-white/10 transition-colors">
                      <Github className="w-4 h-4" /> Code
                    </a>
                    <a href={project.live} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                      <ExternalLink className="w-4 h-4" /> Live
                    </a>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-cyan-400 transition-colors tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-slate-500 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((tech, tidx) => (
                      <span key={tidx} className="tag-pill px-2.5 py-1 rounded-lg text-[11px] font-medium text-cyan-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== EXPERIENCE SECTION ===== */}
      <section id="experience" className="py-24 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1c] via-[#0d1425] to-[#0a0f1c]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Career Journey"
            title="Work"
            titleHighlight="Experience"
            description="My professional journey through various roles and companies, building expertise along the way."
          />

          <div className="max-w-4xl mx-auto relative">
            {/* Timeline line */}
            <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-blue-500/30 to-transparent lg:-translate-x-px"></div>

            <div className="space-y-12">
              {mappedExperiences.map((exp, idx) => {
                const isLeft = idx % 2 === 0;
                return (
                  <div key={idx} className="relative">
                    {/* Timeline dot */}
                    <div className="absolute left-6 lg:left-1/2 -translate-x-1/2 z-10">
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${exp.color} ring-4 ring-[#0a0f1c]`}></div>
                    </div>

                    <div className={`lg:w-[calc(50%-2rem)] ${isLeft ? 'lg:mr-auto lg:pr-0' : 'lg:ml-auto lg:pl-0'} pl-16 lg:pl-0`}>
                      <div className="glass-card p-6 rounded-2xl">
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`text-xs font-semibold bg-gradient-to-r ${exp.color} bg-clip-text text-transparent`}>
                            {exp.period}
                          </span>
                          <span className="text-slate-700">|</span>
                          <span className="text-xs text-slate-500 flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> {exp.location}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold mb-1 tracking-tight">{exp.title}</h3>
                        <p className="text-sm text-cyan-400 font-medium mb-3">{exp.company}</p>
                        <p className="text-sm text-slate-500 mb-4 leading-relaxed">{exp.description}</p>
                        <div className="space-y-2">
                          {exp.achievements.map((ach, achIdx) => (
                            <div key={achIdx} className="flex items-start gap-2.5 text-sm text-slate-400">
                              <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                              <span>{ach}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS SECTION ===== */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern opacity-20"></div>
        {/* Decorative gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-cyan-500/[0.04] to-transparent rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Testimonials"
            title="What People"
            titleHighlight="Say"
            description="Feedback from colleagues and clients I've had the pleasure of working with."
          />

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div key={idx} className="glass-card p-8 rounded-2xl relative group">
                {/* Quote mark */}
                <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-600/10 flex items-center justify-center">
                  <Quote className="w-4 h-4 text-cyan-400/50" />
                </div>

                <p className="text-slate-300 mb-8 leading-relaxed text-sm italic">
                  "{t.content}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-bold text-sm shadow-lg shadow-cyan-500/20">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs text-slate-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BLOG SECTION ===== */}
      <section id="blog" className="py-24 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1c] via-[#0d1425] to-[#0a0f1c]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Latest Articles"
            title="From My"
            titleHighlight="Blog"
            description="Thoughts, tutorials, and insights on software development and technology."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {blogPosts.map((post, idx) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="glass-card p-6 rounded-2xl group block"
              >
                <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-4 font-medium">
                  <span className="px-2 py-1 rounded-md bg-white/5 border border-white/5">{post.category}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="font-bold text-lg mb-3 leading-snug group-hover:text-cyan-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-2 text-xs font-medium text-cyan-400">
                  Read Article <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT SECTION ===== */}
      <section id="contact" className="py-24 lg:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 text-cyan-400 text-sm font-medium mb-4">
                  <span className="w-8 h-px bg-cyan-400"></span>
                  Get In Touch
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  Let's Work Together
                </h2>
                <p className="text-slate-400">
                  Have a project in mind or just want to chat? I'd love to hear from you.
                  Fill out the form or reach out through any of the channels below.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { icon: <Mail className="w-5 h-5 text-cyan-400" />, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
                  { icon: <Phone className="w-5 h-5 text-cyan-400" />, label: 'Phone', value: profile.phone, href: `tel:${profile.phone}` },
                  { icon: <Linkedin className="w-5 h-5 text-cyan-400" />, label: 'LinkedIn', value: profile.linkedin, href: `https://${profile.linkedin}` },
                  { icon: <Github className="w-5 h-5 text-cyan-400" />, label: 'GitHub', value: profile.github, href: `https://${profile.github}` },
                ].map((contact, idx) => (
                  <a key={idx} href={contact.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-slate-800/30 rounded-xl border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 group hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/10">
                    <div className="p-3 bg-slate-700/50 rounded-lg group-hover:bg-cyan-500/20 transition-all duration-300 group-hover:scale-110">
                      {contact.icon}
                    </div>
                    <div>
                      <div className="text-sm text-slate-500 group-hover:text-cyan-400 transition-colors">{contact.label}</div>
                      <div className="font-medium text-slate-200 group-hover:text-white transition-colors">{contact.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="p-8 bg-slate-800/30 rounded-2xl border border-slate-700">
              {formSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                  <p className="text-slate-400">Thank you for reaching out. I'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <input
                      type="text"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className={`w-full px-4 py-3 bg-slate-900/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${formErrors.name ? 'border-red-500' : 'border-slate-600'
                        }`}
                      placeholder="Your name"
                    />
                    {formErrors.name && <p className="text-red-400 text-sm mt-1">{formErrors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className={`w-full px-4 py-3 bg-slate-900/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${formErrors.email ? 'border-red-500' : 'border-slate-600'
                        }`}
                      placeholder="your@email.com"
                    />
                    {formErrors.email && <p className="text-red-400 text-sm mt-1">{formErrors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      rows={5}
                      className={`w-full px-4 py-3 bg-slate-900/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all resize-none ${formErrors.message ? 'border-red-500' : 'border-slate-600'
                        }`}
                      placeholder="Tell me about your project..."
                    />
                    {formErrors.message && <p className="text-red-400 text-sm mt-1">{formErrors.message}</p>}
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-lg">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </div>
                <span className="font-semibold text-lg">{profile.name}</span>
              </div>
              <p className="text-slate-400 text-sm max-w-md mb-4">
                Full Stack Software Engineer passionate about building exceptional digital experiences
                with modern technologies.
              </p>
              <div className="flex items-center gap-3">
                <a href={`https://${profile.github}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors">
                  <Github className="w-5 h-5 text-slate-400 hover:text-white" />
                </a>
                <a href={`https://${profile.linkedin}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors">
                  <Linkedin className="w-5 h-5 text-slate-400 hover:text-white" />
                </a>
                <a href={`mailto:${profile.email}`} className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors">
                  <Mail className="w-5 h-5 text-slate-400 hover:text-white" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {navLinks.map(link => (
                  <li key={link.id}>
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className="text-slate-400 hover:text-cyan-400 transition-colors text-sm"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Web Development</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Mobile Apps</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">API Development</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Consulting</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 text-center">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} {profile.name}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
