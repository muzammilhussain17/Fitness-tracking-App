import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Brain, TrendingUp, Flame, Clock, Zap, Plus, ChevronRight, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import GlassCard from '../components/GlassCard';
import { getAllActivities, getUserRecommendations, getUserProfile } from '../services/api';
import { isDemoMode, MOCK_ACTIVITIES, MOCK_RECOMMENDATIONS, DEMO_USER } from '../services/mockData';
import './Dashboard.css';

const MetricCard = ({ icon, label, value, unit, color, delay }) => (
  <div className={`metric-card glass-card animate-fade-in-up delay-${delay}`}>
    <div className="metric-icon" style={{ background: color }}>{icon}</div>
    <div className="metric-info">
      <span className="metric-label">{label}</span>
      <span className="metric-value">{value}<span className="metric-unit">{unit}</span></span>
    </div>
  </div>
);

const ACTIVITY_COLORS = { RUNNING: '#00f2fe', CYCLING: '#4facfe', SWIMMING: '#7f00ff', WALKING: '#10b981', WORKOUT: '#f59e0b', YOGA: '#ec4899', HIIT: '#ef4444' };

const Dashboard = () => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) { navigate('/login'); return; }

    const demo = isDemoMode();
    setIsDemo(demo);

    const load = async () => {
      if (demo) {
        // Use mock data immediately in demo mode
        await new Promise(r => setTimeout(r, 400)); // brief loading feel
        setActivities(MOCK_ACTIVITIES);
        setRecommendations(MOCK_RECOMMENDATIONS);
        setProfile(DEMO_USER);
        setLoading(false);
        return;
      }

      try {
        const [acts, recs, prof] = await Promise.allSettled([
          getAllActivities(),
          getUserRecommendations(userId),
          getUserProfile(userId),
        ]);
        if (acts.status === 'fulfilled') setActivities(acts.value || []);
        else setActivities(MOCK_ACTIVITIES); // fallback
        if (recs.status === 'fulfilled') setRecommendations(recs.value || []);
        else setRecommendations(MOCK_RECOMMENDATIONS); // fallback
        if (prof.status === 'fulfilled') setProfile(prof.value);
      } finally { setLoading(false); }
    };
    load();
  }, [userId, navigate]);

  // Aggregate metrics from activities
  const totalCalories = activities.reduce((s, a) => s + (a.caloriesBurned || 0), 0);
  const totalMinutes = activities.reduce((s, a) => s + (a.duration || 0), 0);
  const totalActivities = activities.length;

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="dashboard-page">
      <Navbar />
      <div className="dashboard-layout">
        {isDemo && (
          <div className="demo-mode-banner">
            <Sparkles size={15} />
            <span>You're in <strong>Demo Mode</strong> — all data is simulated. Connect your backend to see live data.</span>
          </div>
        )}
        <main className="dashboard-main">
          {/* Header */}
          <div className="dashboard-header animate-fade-in-up">
            <div>
              <h1>{greeting()}, <span className="text-gradient">{profile?.firstName || 'Athlete'}</span> 👋</h1>
              <p className="dashboard-subheading">Here's your fitness overview for today.</p>
            </div>
            <button className="add-activity-btn" onClick={() => navigate('/activities/new')}>
              <Plus size={18} /> Log Activity
            </button>
          </div>

          {/* Metric Cards */}
          <div className="metrics-grid">
            <MetricCard icon={<Activity size={20} />} label="Total Activities" value={totalActivities} unit="" color="linear-gradient(135deg,#00f2fe,#4facfe)" delay={100} />
            <MetricCard icon={<Flame size={20} />} label="Calories Burned" value={totalCalories} unit=" kcal" color="linear-gradient(135deg,#f59e0b,#ef4444)" delay={200} />
            <MetricCard icon={<Clock size={20} />} label="Total Time" value={totalMinutes} unit=" min" color="linear-gradient(135deg,#7f00ff,#e100ff)" delay={300} />
            <MetricCard icon={<TrendingUp size={20} />} label="Streak" value="7" unit=" days" color="linear-gradient(135deg,#10b981,#059669)" delay={400} />
          </div>

          {/* Recent Activities */}
          <div className="section-block animate-fade-in-up delay-200">
            <div className="section-block-header">
              <h2><Activity size={20} /> Recent Activities</h2>
              <button className="see-all-btn" onClick={() => navigate('/activities')}>See All <ChevronRight size={16} /></button>
            </div>
            {loading ? (
              <div className="loading-skeleton">
                {[1, 2, 3].map(i => <div key={i} className="skeleton-row" />)}
              </div>
            ) : activities.length === 0 ? (
              <div className="empty-state">
                <Zap size={40} />
                <p>No activities yet. <button onClick={() => navigate('/activities/new')}>Log your first workout!</button></p>
              </div>
            ) : (
              <div className="activity-list">
                {activities.slice(0, 5).map((act, i) => (
                  <div key={act.id || i} className="activity-row">
                    <div className="activity-type-badge" style={{ background: `${ACTIVITY_COLORS[act.activityType] || '#4facfe'}22`, color: ACTIVITY_COLORS[act.activityType] || '#4facfe' }}>
                      {act.activityType || 'WORKOUT'}
                    </div>
                    <div className="activity-details">
                      <span>{act.duration || 0} min</span>
                      <span>{act.caloriesBurned || 0} kcal</span>
                    </div>
                    <span className="activity-date">{act.startTime ? new Date(act.startTime).toLocaleDateString() : 'Today'}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* AI Recommendations */}
          <div className="section-block animate-fade-in-up delay-300">
            <div className="section-block-header">
              <h2><Brain size={20} /> AI Recommendations</h2>
            </div>
            {loading ? (
              <div className="loading-skeleton">{[1, 2].map(i => <div key={i} className="skeleton-row tall" />)}</div>
            ) : recommendations.length === 0 ? (
              <GlassCard>
                <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>Complete some activities to get personalized AI recommendations!</p>
              </GlassCard>
            ) : (
              <div className="recommendations-grid">
                {recommendations.slice(0, 4).map((rec, i) => (
                  <div key={i} className="rec-card glass-panel">
                    <div className="rec-icon"><Brain size={18} /></div>
                    <p className="rec-text">{rec.recommendation || rec.message || JSON.stringify(rec)}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
