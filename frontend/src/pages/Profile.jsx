import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Shield, Calendar } from 'lucide-react';
import Navbar from '../components/Navbar';
import GlassCard from '../components/GlassCard';
import { getUserProfile } from '../services/api';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) { navigate('/login'); return; }
    getUserProfile(userId)
      .then(setProfile)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [userId, navigate]);

  return (
    <div className="profile-page">
      <Navbar />
      <div className="profile-layout">
        <div className="profile-hero animate-fade-in-up">
          <div className="profile-avatar">
            <span>{profile?.firstName?.[0]}{profile?.lastName?.[0]}</span>
          </div>
          <div className="profile-names">
            <h1>
              {loading ? 'Loading...' : `${profile?.firstName || ''} ${profile?.lastName || ''}`}
            </h1>
            <p className="profile-role">Elite Athlete · NeuraFit Member</p>
          </div>
        </div>

        <div className="profile-grid">
          <GlassCard className="profile-info-card animate-fade-in-up delay-100">
            <h2>Profile Information</h2>
            <div className="profile-fields">
              <div className="profile-field">
                <div className="pf-icon"><User size={18} /></div>
                <div>
                  <span className="pf-label">Full Name</span>
                  <span className="pf-value">{profile ? `${profile.firstName} ${profile.lastName}` : '—'}</span>
                </div>
              </div>
              <div className="profile-field">
                <div className="pf-icon"><Mail size={18} /></div>
                <div>
                  <span className="pf-label">Email Address</span>
                  <span className="pf-value">{profile?.email || '—'}</span>
                </div>
              </div>
              <div className="profile-field">
                <div className="pf-icon"><Shield size={18} /></div>
                <div>
                  <span className="pf-label">User ID</span>
                  <span className="pf-value pf-mono">{userId}</span>
                </div>
              </div>
              <div className="profile-field">
                <div className="pf-icon"><Calendar size={18} /></div>
                <div>
                  <span className="pf-label">Member Since</span>
                  <span className="pf-value">2026</span>
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="profile-security-card animate-fade-in-up delay-200">
            <h2>Security & Access</h2>
            <div className="security-items">
              <div className="security-item">
                <div>
                  <span className="si-label">JWT Authentication</span>
                  <span className="si-sub">Active secure session</span>
                </div>
                <div className="si-badge active">Active</div>
              </div>
              <div className="security-item">
                <div>
                  <span className="si-label">API Gateway</span>
                  <span className="si-sub">localhost:8080</span>
                </div>
                <div className="si-badge connected">Connected</div>
              </div>
              <div className="security-item">
                <div>
                  <span className="si-label">Role</span>
                  <span className="si-sub">Standard User</span>
                </div>
                <div className="si-badge role">USER</div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default Profile;
