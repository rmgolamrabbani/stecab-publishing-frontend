'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { 
  Search, 
  Menu, 
  X, 
  BookOpen, 
  LogIn, 
  LogOut, 
  FileText, 
  Mail, 
  Facebook, 
  Linkedin, 
  Youtube 
} from 'lucide-react';
import './globals.css';

// X (Twitter) এর আইকনের জন্য একটি কাস্টম SVG উপাদান
const TwitterXIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function RootLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname(); 

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('stecab_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('stecab_user');
        localStorage.removeItem('stecab_token');
      }
    }

    // Custom event listener for login status updates
    const handleAuthChange = () => {
      const updatedUser = localStorage.getItem('stecab_user');
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
    };

    window.addEventListener('auth-change', handleAuthChange);
    return () => window.removeEventListener('auth-change', handleAuthChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('stecab_token');
    localStorage.removeItem('stecab_user');
    setUser(null);
    window.dispatchEvent(new Event('auth-change'));
    router.push('/');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  // Helper function to check active state
  const isActive = (path) => {
    if (path === '/#journals') {
      return pathname === '/';
    }
    return pathname === path;
  };

  return (
    <html lang="en">
      <head>
        <title>Stecab Publishing | Academic Journals</title>
        <meta name="description" content="Rapidly growing international academic publisher that offers double-blinded, peer-reviewed and open-access journals." />
        <link rel="icon" href="https://journals.stecab.com/files/icon.png" sizes="32x32" />
      </head>
      <body className="bg-gray-50 flex flex-col min-h-screen">
        <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              
              {/* Logo with Image on Top & Name Below */}
              <div className="flex items-center ">
                <Link href="/" className="flex flex-row items-center group py-2">
                  <img 
                    src="https://journals.stecab.com/files/icon.png" 
                    alt="Stecab Publishing Logo" 
                    className="w-10 h-10 object-contain group-hover:scale-105 transition-transform" 
                  />
                  <div className="text-center mt-1">
                    <span className="font-bold text-base text-primary-950 tracking-tight block leading-tight ml-2">
                      Stecab Publishing
                    </span>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-medium ml-2">
                      Academic Journals
                    </span>
                  </div>
                </Link>
              </div>

              {/* Navigation Desktop */}
              <nav className="hidden md:flex items-center gap-8">
                <Link 
                  href="/#journals" 
                  className={`text-sm transition-colors py-1 border-b-2 ${
                    isActive('/#journals') 
                      ? 'text-primary-600 font-bold border-primary-600' 
                      : 'text-gray-600 hover:text-primary-600 font-medium border-transparent'
                  }`}
                >
                  Journals
                </Link>
                <Link 
                  href="/apc" 
                  className={`text-sm transition-colors py-1 border-b-2 ${
                    isActive('/apc') 
                      ? 'text-primary-600 font-bold border-primary-600' 
                      : 'text-gray-600 hover:text-primary-600 font-medium border-transparent'
                  }`}
                >
                  APCs
                </Link>
                <Link 
                  href="/contact" 
                  className={`text-sm transition-colors py-1 border-b-2 ${
                    isActive('/contact') 
                      ? 'text-primary-600 font-bold border-primary-600' 
                      : 'text-gray-600 hover:text-primary-600 font-medium border-transparent'
                  }`}
                >
                  Contact
                </Link>

                {user ? (
                  <>
                    <Link 
                      href="/submit" 
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                        isActive('/submit') 
                          ? 'bg-primary-600 text-white shadow-sm' 
                          : 'bg-primary-50 text-primary-700 hover:bg-primary-100'
                      }`}
                    >
                      <FileText size={16} /> Submit Article
                    </Link>
                    <div className="flex items-center gap-4 border-l border-gray-200 pl-6">
                      <span className="text-sm font-semibold text-gray-700">Hi, {user.name}</span>
                      <button 
                        onClick={handleLogout}
                        className="text-gray-500 hover:text-red-600 font-medium text-sm transition-colors flex items-center gap-1"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <Link 
                      href="/login" 
                      className={`text-sm font-medium transition-colors flex items-center gap-1.5 py-1 border-b-2 ${
                        isActive('/login') 
                          ? 'text-primary-600 font-bold border-primary-600' 
                          : 'text-gray-600 hover:text-primary-600 border-transparent'
                      }`}
                    >
                      <LogIn size={16} /> Login
                    </Link>
                    <Link 
                      href="/register" 
                      className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors shadow-sm ${
                        isActive('/register')
                          ? 'bg-primary-700 text-white ring-2 ring-primary-500'
                          : 'bg-primary-600 text-white hover:bg-primary-700'
                      }`}
                    >
                      Register
                    </Link>
                  </>
                )}
                
                {/* Search Toggle */}
                <button 
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-2.5 rounded-full hover:bg-gray-100 text-gray-600 hover:text-primary-600 transition-all"
                  aria-label="Search"
                >
                  {isSearchOpen ? <X size={20} /> : <Search size={20} />}
                </button>
              </nav>

              {/* Mobile Menu & Search Button */}
              <div className="flex items-center md:hidden gap-2">
                <button 
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                >
                  <Search size={20} />
                </button>
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>

          {/* Search Drawer */}
          {isSearchOpen && (
            <div className="border-t border-gray-100 bg-white py-4 px-4 sm:px-6 shadow-inner animate-fade-in-down">
              <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto flex gap-3">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles by title, author, keyword, or journal..."
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                  autoFocus
                />
                <button 
                  type="submit"
                  className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Search size={18} /> Search
                </button>
              </form>
            </div>
          )}

          {/* Mobile Menu Links */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-100 bg-white px-4 py-6 flex flex-col gap-4 shadow-lg">
              <Link 
                href="/#journals" 
                onClick={() => setIsMenuOpen(false)}
                className={`font-semibold text-base py-2 border-b border-gray-50 ${
                  isActive('/#journals') ? 'text-primary-600 font-bold' : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                Journals
              </Link>
              <Link 
                href="/apc" 
                onClick={() => setIsMenuOpen(false)}
                className={`font-semibold text-base py-2 border-b border-gray-50 ${
                  isActive('/apc') ? 'text-primary-600 font-bold' : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                APCs
              </Link>
              <Link 
                href="/contact" 
                onClick={() => setIsMenuOpen(false)}
                className={`font-semibold text-base py-2 border-b border-gray-50 ${
                  isActive('/contact') ? 'text-primary-600 font-bold' : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                Contact
              </Link>
              {user ? (
                <>
                  <Link 
                    href="/submit" 
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-2 font-semibold text-base py-2 border-b border-gray-50 ${
                      isActive('/submit') ? 'text-primary-600 font-bold' : 'text-primary-700 hover:text-primary-850'
                    }`}
                  >
                    <FileText size={18} /> Submit Article
                  </Link>
                  <div className="py-2 flex items-center justify-between">
                    <span className="text-gray-600 font-semibold text-sm">Logged in: {user.name}</span>
                    <button 
                      onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                      className="text-red-600 font-semibold text-sm hover:text-red-700"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-3 pt-3">
                  <Link 
                    href="/login" 
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-center font-semibold py-2.5 border rounded-lg ${
                      isActive('/login') 
                        ? 'bg-primary-50 text-primary-600 border-primary-600' 
                        : 'text-gray-700 hover:text-primary-600 border-gray-200'
                    }`}
                  >
                    Login
                  </Link>
                  <Link 
                    href="/register" 
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-center font-semibold py-2.5 rounded-lg shadow-sm ${
                      isActive('/register')
                        ? 'bg-primary-700 text-white'
                        : 'bg-primary-600 hover:bg-primary-700 text-white'
                    }`}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          )}
        </header>

        <main className="flex-1 flex flex-col">
          {children}
        </main>

        <footer className="bg-primary-950 text-gray-300 mt-auto border-t-4 border-primary-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-primary-800 pb-2">About Us</h4>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">
                  Stecab Publishing is a rapidly growing international academic publisher providing peer-reviewed, double-blind open-access journals.
                </p>
                <Link href="/contact" className="text-sm text-primary-400 hover:text-primary-300 flex items-center gap-1">
                  <Mail size={14} /> Get in touch
                </Link>
              </div>
              <div>
                <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-primary-800 pb-2">Information</h4>
                <ul className="space-y-2.5 text-sm">
                  <li><Link href="/apc" className="hover:text-white transition-colors">Author Guidelines</Link></li>
                  <li><Link href="/apc" className="hover:text-white transition-colors">Reviewer Policies</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition-colors">Editorial Support</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-primary-800 pb-2">Explore</h4>
                <ul className="space-y-2.5 text-sm">
                  <li><Link href="/apc" className="hover:text-white transition-colors">APCs & Fees</Link></li>
                  <li><Link href="/#journals" className="hover:text-white transition-colors">List of Journals</Link></li>
                  <li><Link href="/apc" className="hover:text-white transition-colors">Publication Ethics</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-primary-800 pb-2">Connect with us</h4>
                <div className="flex gap-4 mb-4">
                  {/* Facebook Link */}
                  <a 
                    href="https://www.facebook.com/stecab.publishing" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Facebook"
                    className="w-8 h-8 rounded-full bg-primary-900 flex items-center justify-center text-white hover:bg-primary-800 hover:text-blue-500 transition-colors"
                  >
                    <Facebook size={16} />
                  </a>

                  {/* Twitter / X Link */}
                  <a 
                    href="https://x.com/stecab_publish" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="X (Twitter)"
                    className="w-8 h-8 rounded-full bg-primary-900 flex items-center justify-center text-white hover:bg-primary-800 hover:text-gray-200 transition-colors"
                  >
                    <TwitterXIcon className="w-4 h-4" />
                  </a>

                  {/* LinkedIn Link */}
                  <a 
                    href="https://linkedin.com/company/stecab-publishing" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="LinkedIn"
                    className="w-8 h-8 rounded-full bg-primary-900 flex items-center justify-center text-white hover:bg-primary-800 hover:text-blue-400 transition-colors"
                  >
                    <Linkedin size={16} />
                  </a>

                  {/* YouTube Link */}
                  <a 
                    href="https://youtube.com/@stecabpublishing" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="YouTube"
                    className="w-8 h-8 rounded-full bg-primary-900 flex items-center justify-center text-white hover:bg-primary-800 hover:text-red-500 transition-colors"
                  >
                    <Youtube size={16} />
                  </a>
                </div>
                <p className="text-xs text-gray-500">
                  This website and metadata are licensed under CC BY 4.0.
                </p>
              </div>
            </div>
            <div className="border-t border-primary-900 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400 gap-4">
              <p>Copyright © 2026 Stecab Publishing, Bangladesh.</p>
              <div className="flex gap-6">
                <Link href="#" className="hover:underline">Privacy Policy</Link>
                <Link href="#" className="hover:underline">Terms & Conditions</Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}