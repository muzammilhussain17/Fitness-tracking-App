import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Zap, Eye, EyeOff } from 'lucide-react';
import AnimatedButton from '../components/AnimatedButton';
import PremiumInput from '../components/PremiumInput';
import { registerUser } from '../services/api';
import './AuthPage.css';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await registerUser(form);
      // Assume the response returns a userId
      localStorage.setItem('userId', data.id || data.userId || '1');
      localStorage.setItem('token', data.token || '');
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
            <span>Neura<span className="logo-accent">Fit</span></span>
          </Link>
          <h2>Create Account</h2>
          <p>Start your enterprise fitness journey today</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-row">
            <PremiumInput
              label="First Name"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              icon={<User size={16} />}
              required
            />
            <PremiumInput
              label="Last Name"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              icon={<User size={16} />}
              required
            />
          </div>
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
            {loading ? 'Creating Account...' : 'Create Account'}
          </AnimatedButton>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
