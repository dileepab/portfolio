import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '@/contexts/AppContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { Menu, X, Github, Linkedin, Twitter, Mail, Phone, ExternalLink, ChevronRight, Code, Server, Database, Palette, Terminal, Globe, Send, Download, Star, Quote, Calendar, MapPin, Briefcase, GraduationCap, Award, ArrowRight, CheckCircle } from 'lucide-react';

import { profile, projects, skills as skillCategories, experiences, testimonials, blogPosts } from '@/data/portfolio';

const AppLayout: React.FC = () => {
  const { sidebarOpen, toggleSidebar } = useAppContext();
  const isMobile = useIsMobile();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});


  // Filter projects
  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  // Handle contact form
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};

    if (!contactForm.name.trim()) errors.name = "Name is required";
    if (!contactForm.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(contactForm.email)) errors.email = "Invalid email format";
    if (!contactForm.message.trim()) errors.message = "Message is required";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setFormSubmitted(true);
    setContactForm({ name: '', email: '', message: '' });
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  // Scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
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

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-lg">
                DB
              </div>
              <span className="font-semibold text-lg hidden sm:block">{profile.name}</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-slate-300 hover:text-cyan-400 transition-colors text-sm font-medium"
                >
                  {link.name}
                </button>
              ))}
              <a
                href="#"
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Resume
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-b border-slate-800">
            <div className="px-4 py-4 space-y-3">
              {navLinks.map(link => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="block w-full text-left text-slate-300 hover:text-cyan-400 transition-colors py-2"
                >
                  {link.name}
                </button>
              ))}
              <a
                href="#"
                className="flex items-center gap-2 text-cyan-400 py-2"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-full border border-slate-700">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-sm text-slate-300">Available for opportunities</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{profile.name}</span>
                </h1>
                <h2 className="text-2xl sm:text-3xl text-slate-400 font-light">
                  {profile.role}
                </h2>
                <p className="text-lg text-slate-400 max-w-xl">
                  I craft exceptional digital experiences with clean code and modern technologies.
                  Passionate about building scalable applications that make a difference.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => scrollToSection('projects')}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  View My Work
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="px-6 py-3 bg-slate-800 border border-slate-700 rounded-lg font-medium hover:bg-slate-700 transition-colors"
                >
                  Get In Touch
                </button>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <a href={`https://${profile.github}`} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-800/50 rounded-lg hover:bg-slate-700 transition-colors group">
                  <Github className="w-5 h-5 text-slate-400 group-hover:text-white" />
                </a>
                <a href={`https://${profile.linkedin}`} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-800/50 rounded-lg hover:bg-slate-700 transition-colors group">
                  <Linkedin className="w-5 h-5 text-slate-400 group-hover:text-white" />
                </a>
                <a href="#" className="p-3 bg-slate-800/50 rounded-lg hover:bg-slate-700 transition-colors group">
                  <Twitter className="w-5 h-5 text-slate-400 group-hover:text-white" />
                </a>
                <a href={`mailto:${profile.email}`} className="p-3 bg-slate-800/50 rounded-lg hover:bg-slate-700 transition-colors group">
                  <Mail className="w-5 h-5 text-slate-400 group-hover:text-white" />
                </a>
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full blur-2xl opacity-30"></div>
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full object-cover border-4 border-slate-800"
                />
                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 px-4 py-2 bg-slate-800 rounded-lg border border-slate-700 shadow-xl">
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm font-medium">{profile.stats.yearsExperience} Years</span>
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 px-4 py-2 bg-slate-800 rounded-lg border border-slate-700 shadow-xl">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-medium">{profile.stats.projectsCompleted} Projects</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-slate-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-cyan-400 text-sm font-medium">
                <span className="w-8 h-px bg-cyan-400"></span>
                About Me
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold">
                Turning Ideas Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Digital Reality</span>
              </h2>
              <div className="space-y-4 text-slate-400">
                {profile.about?.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400">{profile.stats.yearsExperience}</div>
                  <div className="text-sm text-slate-500">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400">{profile.stats.projectsCompleted}</div>
                  <div className="text-sm text-slate-500">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400">{profile.stats.happyClients}</div>
                  <div className="text-sm text-slate-500">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400">{profile.stats.openSourceContribs}</div>
                  <div className="text-sm text-slate-500">Open Source</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
                  <GraduationCap className="w-8 h-8 text-cyan-400 mb-4" />
                  <h3 className="font-semibold mb-2">Education</h3>
                  <p className="text-sm text-slate-400">{profile.education.degree}, {profile.education.school}</p>
                </div>
                <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
                  <Award className="w-8 h-8 text-blue-400 mb-4" />
                  <h3 className="font-semibold mb-2">Certifications</h3>
                  <p className="text-sm text-slate-400">{profile.certifications}</p>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
                  <Briefcase className="w-8 h-8 text-purple-400 mb-4" />
                  <h3 className="font-semibold mb-2">Current Role</h3>
                  <p className="text-sm text-slate-400">{profile.role}</p>
                </div>
                <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
                  <MapPin className="w-8 h-8 text-green-400 mb-4" />
                  <h3 className="font-semibold mb-2">Location</h3>
                  <p className="text-sm text-slate-400">{profile.location}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-cyan-400 text-sm font-medium mb-4">
              <span className="w-8 h-px bg-cyan-400"></span>
              Skills & Expertise
              <span className="w-8 h-px bg-cyan-400"></span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Technologies I Work With
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              A comprehensive toolkit of modern technologies and frameworks that I use to build exceptional digital products.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((category, idx) => (
              <div key={idx} className="p-6 bg-slate-800/30 rounded-2xl border border-slate-700 hover:border-cyan-500/50 transition-colors">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-xl text-cyan-400">
                    {category.icon}
                  </div>
                  <h3 className="font-semibold text-lg">{category.name}</h3>
                </div>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIdx) => (
                    <div key={skillIdx}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-300">{skill.name}</span>
                        <span className="text-slate-500">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-cyan-400 text-sm font-medium mb-4">
              <span className="w-8 h-px bg-cyan-400"></span>
              Portfolio
              <span className="w-8 h-px bg-cyan-400"></span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Featured Projects
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto mb-8">
              A selection of projects that showcase my skills and experience in building modern web applications.
            </p>

            {/* Filter buttons */}
            <div className="flex flex-wrap justify-center gap-3">
              {['all', 'frontend', 'backend', 'fullstack', 'mobile'].map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeFilter === filter
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                    }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => (
              <div
                key={project.id}
                className="group bg-slate-800/30 rounded-2xl border border-slate-700 overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {project.featured && (
                    <div className="absolute top-3 left-3 px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-xs font-medium">
                      Featured
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4 gap-3">
                    <a href={project.github} className="p-2 bg-slate-800/90 rounded-lg hover:bg-slate-700 transition-colors">
                      <Github className="w-5 h-5" />
                    </a>
                    <a href={project.live} className="p-2 bg-slate-800/90 rounded-lg hover:bg-slate-700 transition-colors">
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, idx) => (
                      <span key={idx} className="px-2 py-1 bg-slate-700/50 rounded text-xs text-slate-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-4">
                    <Link
                      to={`/project/${project.id}`}
                      className="flex-1 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-cyan-400 text-sm font-medium mb-4">
              <span className="w-8 h-px bg-cyan-400"></span>
              Career Journey
              <span className="w-8 h-px bg-cyan-400"></span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Work Experience
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              My professional journey through various roles and companies, building expertise along the way.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-slate-700 transform md:-translate-x-1/2"></div>

            <div className="space-y-12">
              {experiences.map((exp, idx) => (
                <div key={idx} className={`relative flex flex-col md:flex-row gap-8 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full transform -translate-x-1/2 md:-translate-x-1/2 border-4 border-slate-950"></div>

                  <div className={`md:w-1/2 ${idx % 2 === 0 ? 'md:pl-12' : 'md:pr-12 md:text-right'} pl-8 md:pl-0`}>
                    <div className={`p-6 bg-slate-800/30 rounded-2xl border border-slate-700 hover:border-cyan-500/50 transition-colors ${idx % 2 === 0 ? '' : 'md:ml-auto'}`}>
                      <div className={`flex items-center gap-2 text-cyan-400 text-sm mb-2 ${idx % 2 === 0 ? '' : 'md:justify-end'}`}>
                        <Calendar className="w-4 h-4" />
                        {exp.period}
                      </div>
                      <h3 className="text-xl font-semibold mb-1">{exp.title}</h3>
                      <div className={`flex items-center gap-2 text-slate-400 text-sm mb-4 ${idx % 2 === 0 ? '' : 'md:justify-end'}`}>
                        <span>{exp.company}</span>
                        <span className="text-slate-600">•</span>
                        <span>{exp.location}</span>
                      </div>
                      <p className="text-slate-400 text-sm mb-4">{exp.description}</p>
                      <div className={`space-y-2 ${idx % 2 === 0 ? '' : 'md:text-left'}`}>
                        {exp.achievements.map((achievement, achIdx) => (
                          <div key={achIdx} className={`flex items-center gap-2 text-sm text-slate-300 ${idx % 2 === 0 ? '' : 'md:flex-row'}`}>
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                            {achievement}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="md:w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-cyan-400 text-sm font-medium mb-4">
              <span className="w-8 h-px bg-cyan-400"></span>
              Testimonials
              <span className="w-8 h-px bg-cyan-400"></span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              What People Say
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Feedback from colleagues and clients I've had the pleasure of working with.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="p-6 bg-slate-800/30 rounded-2xl border border-slate-700 hover:border-cyan-500/50 transition-colors">
                <Quote className="w-10 h-10 text-cyan-400/30 mb-4" />
                <p className="text-slate-300 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-slate-400">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-cyan-400 text-sm font-medium mb-4">
              <span className="w-8 h-px bg-cyan-400"></span>
              Latest Articles
              <span className="w-8 h-px bg-cyan-400"></span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              From My Blog
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Thoughts, tutorials, and insights on software development and technology.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {blogPosts.map(post => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group p-6 bg-slate-800/30 rounded-2xl border border-slate-700 hover:border-cyan-500/50 transition-all hover:-translate-y-1"
              >
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <span className="inline-block px-3 py-1 bg-slate-700/50 rounded-full text-xs text-cyan-400">
                  {post.category}
                </span>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
            >
              View All Articles
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>


      {/* Contact Section */}
      <section id="contact" className="py-20 bg-slate-900/50">
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
                <a href={`mailto:${profile.email}`} className="flex items-center gap-4 p-4 bg-slate-800/30 rounded-xl border border-slate-700 hover:border-cyan-500/50 transition-colors group">
                  <div className="p-3 bg-slate-700/50 rounded-lg group-hover:bg-cyan-500/20 transition-colors">
                    <Mail className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500">Email</div>
                    <div className="font-medium">{profile.email}</div>
                  </div>
                </a>
                <a href={`tel:${profile.phone}`} className="flex items-center gap-4 p-4 bg-slate-800/30 rounded-xl border border-slate-700 hover:border-cyan-500/50 transition-colors group">
                  <div className="p-3 bg-slate-700/50 rounded-lg group-hover:bg-cyan-500/20 transition-colors">
                    <Phone className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500">Phone</div>
                    <div className="font-medium">{profile.phone}</div>
                  </div>
                </a>
                <a href={`https://${profile.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-slate-800/30 rounded-xl border border-slate-700 hover:border-cyan-500/50 transition-colors group">
                  <div className="p-3 bg-slate-700/50 rounded-lg group-hover:bg-cyan-500/20 transition-colors">
                    <Linkedin className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500">LinkedIn</div>
                    <div className="font-medium">{profile.linkedin}</div>
                  </div>
                </a>
                <a href={`https://${profile.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-slate-800/30 rounded-xl border border-slate-700 hover:border-cyan-500/50 transition-colors group">
                  <div className="p-3 bg-slate-700/50 rounded-lg group-hover:bg-cyan-500/20 transition-colors">
                    <Github className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500">GitHub</div>
                    <div className="font-medium">{profile.github}</div>
                  </div>
                </a>
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
                  DB
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
                <a href="#" className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors">
                  <Twitter className="w-5 h-5 text-slate-400 hover:text-white" />
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
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Code Review</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} {profile.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
