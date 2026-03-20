import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Activity, Brain, Zap, TrendingUp, Shield, ArrowRight, ChevronDown, Star } from 'lucide-react';
import Navbar from '../components/Navbar';
import AnimatedButton from '../components/AnimatedButton';
import GlassCard from '../components/GlassCard';
import './LandingPage.css';

const StatItem = ({ value, label }) => (
  <div className="stat-item">
    <span className="stat-value">{value}</span>
    <span className="stat-label">{label}</span>
  </div>
);

const FeatureCard = ({ icon, title, description, delay }) => (
  <GlassCard delay={delay} className="feature-card">
    <div className="feature-icon">{icon}</div>
    <h3>{title}</h3>
    <p>{description}</p>
  </GlassCard>
);

const LandingPage = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 30;
      const y = (clientY / innerHeight - 0.5) * 30;
      heroRef.current.style.setProperty('--mouse-x', `${x}px`);
      heroRef.current.style.setProperty('--mouse-y', `${y}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="landing-page">
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section" ref={heroRef}>
        <div className="hero-bg-orbs">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>
        <div className="hero-grid-overlay"></div>

        <div className="container hero-content">
          <div className="hero-badge animate-fade-in">
            <Zap size={14} />
            <span>AI-Powered Fitness Intelligence</span>
          </div>

          <h1 className="hero-title animate-fade-in-up delay-100">
            Train Smarter.<br />
            <span className="text-gradient">Achieve More.</span>
          </h1>

          <p className="hero-subtitle animate-fade-in-up delay-200">
            The enterprise-grade fitness platform that combines cutting-edge AI with
            comprehensive activity tracking to supercharge your performance.
          </p>

          <div className="hero-actions animate-fade-in-up delay-300">
            <Link to="/register">
              <AnimatedButton variant="primary" icon={<ArrowRight size={18} />}>
                Start Your Journey
              </AnimatedButton>
            </Link>
            <Link to="/login">
              <AnimatedButton variant="secondary">
                Sign In
              </AnimatedButton>
            </Link>
          </div>

          {/* Stats */}
          <div className="hero-stats animate-fade-in-up delay-400">
            <StatItem value="50K+" label="Active Users" />
            <div className="stat-divider" />
            <StatItem value="2M+" label="Activities Tracked" />
            <div className="stat-divider" />
            <StatItem value="98%" label="AI Accuracy" />
            <div className="stat-divider" />
            <StatItem value="4.9★" label="User Rating" />
          </div>
        </div>

        <div className="scroll-indicator">
          <ChevronDown size={20} />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">What We Offer</span>
            <h2>Everything You Need to <span className="text-gradient">Excel</span></h2>
            <p>Built on a robust enterprise microservices architecture, delivering enterprise-grade reliability at every step.</p>
          </div>

          <div className="features-grid">
            <FeatureCard
              icon={<Activity size={28} />}
              title="Advanced Activity Tracking"
              description="Log workouts with granular metrics — duration, heart rate, distance, calories — and visualize your progress over time."
              delay={100}
            />
            <FeatureCard
              icon={<Brain size={28} />}
              title="AI-Driven Recommendations"
              description="Our AI service analyzes your activity data to generate personalized recommendations uniquely tailored to your goals."
              delay={200}
            />
            <FeatureCard
              icon={<TrendingUp size={28} />}
              title="Performance Analytics"
              description="Deep-dive into your metrics with rich analytical dashboards showing trends, personal records, and growth trajectories."
              delay={300}
            />
            <FeatureCard
              icon={<Shield size={28} />}
              title="Enterprise Security"
              description="JWT authentication, role-based access control, rate limiting, and full TLS encryption — security without compromise."
              delay={400}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card glass-panel">
            <div className="cta-glow"></div>
            <div className="cta-stars">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <h2>Ready to transform your fitness?</h2>
            <p>Join thousands of elite athletes and fitness enthusiasts already using FitTrackAI.</p>
            <Link to="/register">
              <AnimatedButton variant="primary" icon={<ArrowRight size={18} />}>
                Get Started — It's Free
              </AnimatedButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-logo">
            <Zap size={18} />
            <span>FitTrack<span className="logo-accent">AI</span></span>
          </div>
          <p className="footer-copy">© 2026 FitTrackAI. Built on enterprise microservices.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
