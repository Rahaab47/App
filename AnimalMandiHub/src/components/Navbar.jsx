import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu, X, Home, Search, ListPlus, Phone, User, Shield,
  LogOut, ChevronDown, Bird, PawPrint, Heart, LayoutDashboard, Info
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from './ui/Button';

const navItems = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Animal Listings', path: '/listings', icon: Search },
  { name: 'Birds', path: '/birds', icon: Bird },
  { name: 'Pets', path: '/pets', icon: PawPrint },
  { name: 'Services', path: '/services', icon: Heart },
  { name: 'Contact', path: '/contact', icon: Phone },
  { name: 'About', path: '/about', icon: Info },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate('/');
  };

  return (
    <>
      <div className="h-8 bg-primary-dark text-white text-xs font-medium flex items-center justify-center tracking-wide font-body">
        <span className="flex items-center gap-2 text-white/70">
          <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
          Explore a world where sellers and buyers interact through technology… all breeds of pets, livestock and other animals, under one roof.
          <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
        </span>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-elevated'
            : 'bg-white shadow-card'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <div className="w-9 h-9 bg-gradient-to-br from-primary-dark to-primary rounded-lg flex items-center justify-center">
                <PawPrint className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold font-display text-primary-dark leading-tight">
                  Animal<span className="text-primary">Mandi</span>Hub
                </span>
                <span className="text-[9px] text-stone-light tracking-wider uppercase -mt-0.5 leading-none">
                  All animals, under one roof
                </span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`
                      px-3 py-2 rounded-lg text-sm font-medium transition-colors
                      ${isActive
                        ? 'text-primary bg-primary-50'
                        : 'text-stone hover:text-primary-dark hover:bg-surface-warm'
                      }
                    `}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden lg:flex items-center gap-2">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-surface-warm transition-colors"
                  >
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{user.name?.[0] || 'U'}</span>
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-semibold text-stone-dark leading-tight">{user.name}</div>
                      <div className="text-[10px] text-stone-light leading-tight">
                        {user.role === 'admin' ? 'Administrator' : 'Member'}
                      </div>
                    </div>
                    <ChevronDown className={`w-3.5 h-3.5 text-stone-light transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-elevated border border-stone-dark/8 overflow-hidden animate-scale-in z-50">
                      {user.role === 'admin' && (
                        <Link
                          to="/admin"
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-stone hover:bg-surface-warm transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          Dashboard
                        </Link>
                      )}
                      <Link
                        to="/post-listing"
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-stone hover:bg-surface-warm transition-colors"
                      >
                        <ListPlus className="w-4 h-4" />
                        Post Listing
                      </Link>
                      <hr className="border-stone-dark/8" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 w-full transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/auth')}
                  >
                    Sign In
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    icon={User}
                    onClick={() => navigate('/auth')}
                  >
                    Join Now
                  </Button>
                </>
              )}
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-surface-warm transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-72 bg-white shadow-xl overflow-y-auto animate-slide-in">
            <div className="p-4 border-b border-stone-dark/8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-bold font-display text-primary-dark">Menu</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1 rounded-lg hover:bg-surface-warm transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">{user.name?.[0] || 'U'}</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-stone-dark">{user.name}</div>
                    <div className="text-xs text-stone-light">
                      {user.role === 'admin' ? 'Administrator' : 'Member'}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => navigate('/auth')}>
                    Sign In
                  </Button>
                  <Button variant="primary" size="sm" className="flex-1" onClick={() => navigate('/auth')}>
                    Join Now
                  </Button>
                </div>
              )}
            </div>

            <nav className="p-3">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`
                      flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors mb-0.5
                      ${isActive
                        ? 'text-primary bg-primary-50'
                        : 'text-stone hover:text-primary-dark hover:bg-surface-warm'
                      }
                    `}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {user && (
              <div className="p-3 border-t border-stone-dark/8">
                <Button
                  variant="ghost-danger"
                  size="sm"
                  className="w-full justify-start"
                  icon={LogOut}
                  onClick={handleLogout}
                >
                  Sign Out
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
