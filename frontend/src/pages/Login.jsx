import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Zap, Eye, EyeOff, Sparkles } from 'lucide-react';
import AnimatedButton from '../components/AnimatedButton';
import PremiumInput from '../components/PremiumInput';
import { DEMO_CREDENTIALS, DEMO_USER } from '../services/mockData';
import './AuthPage.css';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const loginAsDemo = () => {
    localStorage.setItem('userId', DEMO_USER.id);
    localStorage.setItem('token', 'demo-token');
    localStorage.setItem('demoMode', 'true');
    navigate('/dashboard');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Demo bypass — works offline
    if (
      form.email === DEMO_CREDENTIALS.email &&
      form.password === DEMO_CREDENTIALS.password
    ) {
      setTimeout(() => {
        loginAsDemo();
      }, 600);
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error('Invalid credentials');
      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      localStorage.removeItem('demoMode');
      navigate('/dashboard');
    } catch (err) {
      if (err.message.includes('fetch')) {
        setError('Backend is offline. Use the demo account below to explore the app.');
      } else {
        setError(err.message || 'Login failed. Please try again.');
      }
      setLoading(false);
    }
  };

  const fillDemo = () => setForm({ email: DEMO_CREDENTIALS.email, password: DEMO_CREDENTIALS.password });

  return (
    <div className="auth-page">
      <div className="auth-bg-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
      </div>

      <div className="auth-card glass-panel animate-fade-in-up">
        <div className="auth-header">
          <Link to="/" className="auth-logo">
            <div className="logo-icon"><Zap size={18} strokeWidth={2.5} /></div>
            <span>FitTrack<span className="logo-accent">AI</span></span>
          </Link>
          <h2>Welcome Back</h2>
          <p>Sign in to continue your fitness journey</p>
        </div>

        {/* Demo Quick-Access Banner */}
        <div className="demo-banner" onClick={fillDemo}>
          <Sparkles size={15} />
          <div className="demo-banner-text">
            <strong>Try the Demo</strong>
            <span>demo@fittrack.ai · demo123</span>
          </div>
          <span className="demo-badge">Click to fill</span>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <PremiumInput
            label="Email Address"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            icon={<Mail size={16} />}
            required
          />
          <div className="password-wrapper">
            <PremiumInput
              label="Password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={form.password}
              onChange={handleChange}
              icon={<Lock size={16} />}
              required
            />
            <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <AnimatedButton type="submit" variant="primary" fullWidth disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </AnimatedButton>
        </form>

        <div className="auth-divider"><span>or</span></div>

        <button className="demo-login-btn" onClick={loginAsDemo}>
          <Sparkles size={16} />
          Continue with Demo Account
        </button>

        <p className="auth-switch">
          Don't have an account? <Link to="/register">Create one</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
