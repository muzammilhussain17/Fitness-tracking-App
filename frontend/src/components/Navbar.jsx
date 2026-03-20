import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Activity, LayoutDashboard, User, LogOut, Menu, X, Zap, Brain } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isLanding = location.pathname === '/';
  const isAuthenticated = !!localStorage.getItem('userId');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const navLinks = isAuthenticated
    ? [
        { to: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
        { to: '/activities', label: 'Activities', icon: <Activity size={16} /> },
        { to: '/ai-lab', label: 'AI Lab', icon: <Brain size={16} /> },
        { to: '/profile', label: 'Profile', icon: <User size={16} /> },
      ]
    : [];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isLanding ? 'landing-nav' : 'app-nav'}`}>
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <div className="logo-icon">
            <Zap size={20} strokeWidth={2.5} />
          </div>
          <span>FitTrack<span className="logo-accent">AI</span></span>
        </Link>

        {/* Desktop Links */}
        <div className="nav-links desktop-links">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="nav-cta desktop-cta">
          {isAuthenticated ? (
            <button className="nav-logout-btn" onClick={handleLogout}>
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          ) : (
            <>
              <Link to="/login" className="nav-btn-ghost">Login</Link>
              <Link to="/register" className="nav-btn-primary">Get Started</Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        {navLinks.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={`mobile-nav-link ${location.pathname === link.to ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {link.icon}
            <span>{link.label}</span>
          </Link>
        ))}
        {isAuthenticated ? (
          <button className="mobile-nav-link logout-mobile" onClick={handleLogout}>
            <LogOut size={16} /><span>Logout</span>
          </button>
        ) : (
          <>
            <Link to="/login" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
            <Link to="/register" className="mobile-nav-link highlight" onClick={() => setIsMobileMenuOpen(false)}>Get Started</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
