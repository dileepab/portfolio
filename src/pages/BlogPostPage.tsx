import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, ArrowRight, Share2, Twitter, Linkedin, Facebook, Link2, Check, Menu, X, Download, Github, Mail, ChevronUp, BookOpen } from 'lucide-react';
import { blogPosts, getPostBySlug, getRelatedPosts, BlogPost } from '@/data/blogData';
import CodeBlock from '@/components/CodeBlock';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [activeSection, setActiveSection] = useState('');
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showMobileToc, setShowMobileToc] = useState(false);

  useEffect(() => {
    if (slug) {
      const foundPost = getPostBySlug(slug);
      if (foundPost) {
        setPost(foundPost);
        setRelatedPosts(getRelatedPosts(foundPost, 3));
      } else {
        navigate('/blog');
      }
    }
  }, [slug, navigate]);

  // Track scroll position for TOC highlighting and scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);

      if (post) {
        const sections = post.tableOfContents.map(item => document.getElementById(item.id));
        const scrollPosition = window.scrollY + 100;

        for (let i = sections.length - 1; i >= 0; i--) {
          const section = sections[i];
          if (section && section.offsetTop <= scrollPosition) {
            setActiveSection(post.tableOfContents[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [post]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
    }
    setShowMobileToc(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = post?.title || '';

    const shareUrls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } else {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
    setShowShareMenu(false);
  };

  // Parse and render content with code blocks
  const renderContent = (content: string) => {
    const parts = content.split(/(```[\s\S]*?```)/g);

    return parts.map((part, index) => {
      if (part.startsWith('```')) {
        const match = part.match(/```(\w+)?\n([\s\S]*?)```/);
        if (match) {
          const language = match[1] || 'typescript';
          const code = match[2].trim();
          return <CodeBlock key={index} code={code} language={language} />;
        }
      }

      // Parse markdown-like content
      const lines = part.split('\n');
      return lines.map((line, lineIndex) => {
        // Headers with IDs
        const h2Match = line.match(/^## (.+?) \{#(.+?)\}$/);
        if (h2Match) {
          return (
            <h2 key={`${index}-${lineIndex}`} id={h2Match[2]} className="text-2xl font-bold mt-12 mb-4 text-white scroll-mt-24">
              {h2Match[1]}
            </h2>
          );
        }

        // Regular h2
        if (line.startsWith('## ')) {
          return (
            <h2 key={`${index}-${lineIndex}`} className="text-2xl font-bold mt-12 mb-4 text-white">
              {line.replace('## ', '')}
            </h2>
          );
        }

        // H3
        if (line.startsWith('### ')) {
          return (
            <h3 key={`${index}-${lineIndex}`} className="text-xl font-semibold mt-8 mb-3 text-white">
              {line.replace('### ', '')}
            </h3>
          );
        }

        // Bold text
        if (line.startsWith('**') && line.endsWith('**')) {
          return (
            <p key={`${index}-${lineIndex}`} className="font-semibold text-white mt-4">
              {line.replace(/\*\*/g, '')}
            </p>
          );
        }

        // List items
        if (line.startsWith('- ')) {
          return (
            <li key={`${index}-${lineIndex}`} className="text-slate-300 ml-4 mb-2 list-disc">
              {line.replace('- ', '').replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 bg-slate-800 rounded text-cyan-400 text-sm">$1</code>')}
            </li>
          );
        }

        // Numbered list
        const numberedMatch = line.match(/^(\d+)\. (.+)$/);
        if (numberedMatch) {
          return (
            <li key={`${index}-${lineIndex}`} className="text-slate-300 ml-4 mb-2 list-decimal">
              {numberedMatch[2]}
            </li>
          );
        }

        // Table rows (simplified)
        if (line.startsWith('|') && line.endsWith('|')) {
          const cells = line.split('|').filter(cell => cell.trim());
          if (cells.every(cell => cell.trim().match(/^-+$/))) {
            return null; // Skip separator row
          }
          const isHeader = lines[lineIndex + 1]?.includes('---');
          return (
            <tr key={`${index}-${lineIndex}`} className={isHeader ? 'bg-slate-800' : 'border-b border-slate-700'}>
              {cells.map((cell, cellIndex) => (
                isHeader ? (
                  <th key={cellIndex} className="px-4 py-2 text-left text-sm font-semibold text-white">
                    {cell.trim()}
                  </th>
                ) : (
                  <td key={cellIndex} className="px-4 py-2 text-sm text-slate-300">
                    {cell.trim()}
                  </td>
                )
              ))}
            </tr>
          );
        }

        // Paragraphs
        if (line.trim()) {
          // Handle inline code
          const processedLine = line.replace(
            /`([^`]+)`/g,
            '<code class="px-1.5 py-0.5 bg-slate-800 rounded text-cyan-400 text-sm font-mono">$1</code>'
          );
          return (
            <p
              key={`${index}-${lineIndex}`}
              className="text-slate-300 leading-relaxed mb-4"
              dangerouslySetInnerHTML={{ __html: processedLine }}
            />
          );
        }

        return null;
      });
    });
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-lg">
                DB
              </div>
              <span className="font-semibold text-lg hidden sm:block">Dileepa Balasuriya</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-slate-300 hover:text-cyan-400 transition-colors text-sm font-medium"
                >
                  {link.name}
                </Link>
              ))}
              <a
                href="#"
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Resume
              </a>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-b border-slate-800">
            <div className="px-4 py-4 space-y-3">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block text-slate-300 hover:text-cyan-400 transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Article Header */}
      <header className="pt-24 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          {/* Category & Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-xs font-medium">
              {post.category}
            </span>
            {post.tags.slice(0, 3).map(tag => (
              <span key={tag} className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-xs text-slate-300">
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-slate-400 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-semibold">
                {post.author.avatar}
              </div>
              <div>
                <div className="font-medium text-white">{post.author.name}</div>
                <div className="text-sm">{post.author.role}</div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {post.readTime} read
              </span>
            </div>
          </div>

          {/* Share buttons */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500">Share:</span>
            <button
              onClick={() => handleShare('twitter')}
              className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
            >
              <Twitter className="w-4 h-4 text-slate-400 hover:text-white" />
            </button>
            <button
              onClick={() => handleShare('linkedin')}
              className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
            >
              <Linkedin className="w-4 h-4 text-slate-400 hover:text-white" />
            </button>
            <button
              onClick={() => handleShare('facebook')}
              className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
            >
              <Facebook className="w-4 h-4 text-slate-400 hover:text-white" />
            </button>
            <button
              onClick={() => handleShare('copy')}
              className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
            >
              {linkCopied ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Link2 className="w-4 h-4 text-slate-400 hover:text-white" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Cover Image */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-2xl"
        />
      </div>

      {/* Mobile TOC Toggle */}
      <div className="lg:hidden sticky top-16 z-40 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <button
            onClick={() => setShowMobileToc(!showMobileToc)}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white"
          >
            <BookOpen className="w-4 h-4" />
            Table of Contents
            <ChevronUp className={`w-4 h-4 transition-transform ${showMobileToc ? '' : 'rotate-180'}`} />
          </button>

          {showMobileToc && (
            <nav className="mt-3 pb-2">
              <ul className="space-y-2">
                {post.tableOfContents.map(item => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={`text-sm transition-colors ${activeSection === item.id
                        ? 'text-cyan-400 font-medium'
                        : 'text-slate-400 hover:text-white'
                        }`}
                    >
                      {item.title}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex gap-12">
          {/* Main Content */}
          <article className="flex-1 max-w-4xl">
            <div className="prose prose-invert prose-lg max-w-none">
              {renderContent(post.content)}
            </div>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-slate-800">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-slate-500 text-sm">Tags:</span>
                {post.tags.map(tag => (
                  <Link
                    key={tag}
                    to={`/blog?tag=${tag}`}
                    className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-sm text-slate-300 hover:border-cyan-500/50 hover:text-cyan-400 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Author Bio */}
            <div className="mt-12 p-6 bg-slate-800/30 rounded-2xl border border-slate-700">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-xl flex-shrink-0">
                  {post.author.avatar}
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Written by {post.author.name}</h3>
                  <p className="text-slate-400 text-sm mb-3">{post.author.role}</p>
                  <p className="text-slate-400 text-sm">
                    Full Stack Software Engineer passionate about building exceptional digital experiences
                    with modern technologies. I write about React, TypeScript, and software architecture.
                  </p>
                  <div className="flex items-center gap-3 mt-4">
                    <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
                      <Github className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Share Section */}
            <div className="mt-12 p-6 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 rounded-2xl border border-cyan-500/20">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold mb-1">Enjoyed this article?</h3>
                  <p className="text-slate-400 text-sm">Share it with your network</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleShare('twitter')}
                    className="px-4 py-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors flex items-center gap-2 text-sm"
                  >
                    <Twitter className="w-4 h-4" />
                    Tweet
                  </button>
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="px-4 py-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors flex items-center gap-2 text-sm"
                  >
                    <Linkedin className="w-4 h-4" />
                    Share
                  </button>
                  <button
                    onClick={() => handleShare('copy')}
                    className="px-4 py-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors flex items-center gap-2 text-sm"
                  >
                    {linkCopied ? <Check className="w-4 h-4 text-green-400" /> : <Link2 className="w-4 h-4" />}
                    {linkCopied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar - Table of Contents */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24">
              <div className="p-6 bg-slate-800/30 rounded-2xl border border-slate-700">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-cyan-400" />
                  Table of Contents
                </h3>
                <nav>
                  <ul className="space-y-3">
                    {post.tableOfContents.map(item => (
                      <li key={item.id}>
                        <button
                          onClick={() => scrollToSection(item.id)}
                          className={`text-sm text-left transition-all w-full ${activeSection === item.id
                            ? 'text-cyan-400 font-medium pl-3 border-l-2 border-cyan-400'
                            : 'text-slate-400 hover:text-white pl-3 border-l-2 border-transparent hover:border-slate-600'
                            }`}
                        >
                          {item.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              {/* Newsletter CTA */}
              <div className="mt-6 p-6 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-2xl border border-cyan-500/20">
                <h3 className="font-semibold mb-2">Stay Updated</h3>
                <p className="text-slate-400 text-sm mb-4">Get new articles delivered to your inbox.</p>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 mb-3"
                />
                <button className="w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                  Subscribe
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-20 bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map(relatedPost => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.slug}`}
                  className="group bg-slate-800/30 rounded-2xl border border-slate-700 overflow-hidden hover:border-cyan-500/50 transition-all hover:-translate-y-1"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={relatedPost.coverImage}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
                      <span>{relatedPost.date}</span>
                      <span>{relatedPost.readTime}</span>
                    </div>
                    <h3 className="font-semibold group-hover:text-cyan-400 transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Post Navigation */}
      <section className="py-12 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between gap-4">
            {blogPosts.findIndex(p => p.id === post.id) > 0 && (
              <Link
                to={`/blog/${blogPosts[blogPosts.findIndex(p => p.id === post.id) - 1].slug}`}
                className="flex-1 p-4 bg-slate-800/30 rounded-xl border border-slate-700 hover:border-cyan-500/50 transition-colors group"
              >
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </div>
                <div className="font-medium group-hover:text-cyan-400 transition-colors line-clamp-1">
                  {blogPosts[blogPosts.findIndex(p => p.id === post.id) - 1].title}
                </div>
              </Link>
            )}
            {blogPosts.findIndex(p => p.id === post.id) < blogPosts.length - 1 && (
              <Link
                to={`/blog/${blogPosts[blogPosts.findIndex(p => p.id === post.id) + 1].slug}`}
                className="flex-1 p-4 bg-slate-800/30 rounded-xl border border-slate-700 hover:border-cyan-500/50 transition-colors group text-right"
              >
                <div className="flex items-center justify-end gap-2 text-sm text-slate-500 mb-2">
                  Next
                  <ArrowRight className="w-4 h-4" />
                </div>
                <div className="font-medium group-hover:text-cyan-400 transition-colors line-clamp-1">
                  {blogPosts[blogPosts.findIndex(p => p.id === post.id) + 1].title}
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-lg">
                DB
              </div>
              <span className="font-semibold text-lg">Dileepa Balasuriya</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors">
                <Github className="w-5 h-5 text-slate-400 hover:text-white" />
              </a>
              <a href="#" className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors">
                <Linkedin className="w-5 h-5 text-slate-400 hover:text-white" />
              </a>
              <a href="#" className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors">
                <Twitter className="w-5 h-5 text-slate-400 hover:text-white" />
              </a>
              <a href="#" className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors">
                <Mail className="w-5 h-5 text-slate-400 hover:text-white" />
              </a>
            </div>
            <p className="text-slate-500 text-sm">
              © 2026 Dileepa Balasuriya. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-lg hover:opacity-90 transition-all z-50"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default BlogPostPage;
