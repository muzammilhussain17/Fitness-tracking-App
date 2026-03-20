import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Plus, Filter, Clock, Flame, ChevronRight, X, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import AnimatedButton from '../components/AnimatedButton';
import PremiumInput from '../components/PremiumInput';
import { getAllActivities, trackActivity, getActivityRecommendations } from '../services/api';
import { isDemoMode, MOCK_ACTIVITIES, MOCK_ACTIVITY_RECOMMENDATION } from '../services/mockData';
import './Activities.css';

const ACTIVITY_TYPES = ['RUNNING', 'CYCLING', 'SWIMMING', 'WALKING', 'WORKOUT', 'YOGA', 'HIIT'];

const Activities = () => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [activityRec, setActivityRec] = useState(null);

  const userId = localStorage.getItem('userId');

  const [form, setForm] = useState({
    activityType: 'RUNNING',
    duration: '',
    caloriesBurned: '',
    startTime: new Date().toISOString().slice(0, 16),
    additionalMetrics: { distance: '', heartRate: '' },
  });

  const isDemo = isDemoMode();

  useEffect(() => {
    if (!userId) { navigate('/login'); return; }
    loadActivities();
  }, []);

  const loadActivities = async () => {
    setLoading(true);
    if (isDemo) {
      await new Promise(r => setTimeout(r, 300));
      setActivities(MOCK_ACTIVITIES);
      setLoading(false);
      return;
    }
    try {
      const data = await getAllActivities();
      setActivities(data || []);
    } catch (e) {
      setActivities(MOCK_ACTIVITIES); // fallback
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (name === 'distance' || name === 'heartRate') {
      setForm(prev => ({ ...prev, additionalMetrics: { ...prev.additionalMetrics, [name]: value } }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError('');
    if (isDemo) {
      // Simulate adding activity in demo mode
      await new Promise(r => setTimeout(r, 600));
      const newAct = {
        id: `demo-${Date.now()}`,
        activityType: form.activityType,
        duration: parseInt(form.duration),
        caloriesBurned: parseInt(form.caloriesBurned),
        startTime: form.startTime,
        additionalMetrics: {
          distance: parseFloat(form.additionalMetrics.distance) || 0,
          heartRate: parseInt(form.additionalMetrics.heartRate) || 0,
        },
      };
      setActivities(prev => [newAct, ...prev]);
      setShowForm(false);
      setFormLoading(false);
      return;
    }
    try {
      await trackActivity({
        userId,
        activityType: form.activityType,
        duration: parseInt(form.duration),
        caloriesBurned: parseInt(form.caloriesBurned),
        startTime: form.startTime,
        additionalMetrics: {
          distance: parseFloat(form.additionalMetrics.distance) || 0,
          heartRate: parseInt(form.additionalMetrics.heartRate) || 0,
        },
      });
      setShowForm(false);
      loadActivities();
    } catch (err) {
      setFormError(err.message || 'Failed to log activity.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleSelectActivity = async (act) => {
    setSelectedActivity(act);
    setActivityRec(null);
    if (isDemo) {
      await new Promise(r => setTimeout(r, 400));
      setActivityRec(MOCK_ACTIVITY_RECOMMENDATION);
      return;
    }
    if (act.id) {
      try {
        const rec = await getActivityRecommendations(act.id);
        setActivityRec(rec);
      } catch (_) { setActivityRec(MOCK_ACTIVITY_RECOMMENDATION); }
    }
  };

  const COLORS = { RUNNING: '#00f2fe', CYCLING: '#4facfe', SWIMMING: '#7f00ff', WALKING: '#10b981', WORKOUT: '#f59e0b', YOGA: '#ec4899', HIIT: '#ef4444' };

  return (
    <div className="activities-page">
      <Navbar />
      <div className="activities-layout">
        {isDemo && (
          <div className="demo-mode-banner" style={{ marginBottom: 0 }}>
            <Sparkles size={15} />
            <span>You're in <strong>Demo Mode</strong> — log activities to see them added locally. AI insights are simulated.</span>
          </div>
        )}
        <div className="activities-header animate-fade-in-up">
          <div>
            <h1>My <span className="text-gradient">Activities</span></h1>
            <p>Track and analyze every session</p>
          </div>
          <AnimatedButton variant="primary" icon={<Plus size={18} />} onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'Log Activity'}
          </AnimatedButton>
        </div>

        {/* Log Activity Form */}
        {showForm && (
          <div className="log-form-card glass-panel animate-fade-in-up">
            <div className="log-form-header">
              <h2><Activity size={20} /> Log New Activity</h2>
            </div>
            {formError && <div className="form-error">{formError}</div>}
            <form onSubmit={handleSubmit} className="log-form">
              <div className="log-form-grid">
                {/* Activity Type Selector */}
                <div className="type-selector">
                  <label>Activity Type</label>
                  <div className="type-chips">
                    {ACTIVITY_TYPES.map(type => (
                      <button
                        key={type}
                        type="button"
                        className={`type-chip ${form.activityType === type ? 'active' : ''}`}
                        style={form.activityType === type ? { background: `${COLORS[type]}22`, color: COLORS[type], borderColor: COLORS[type] } : {}}
                        onClick={() => setForm(prev => ({ ...prev, activityType: type }))}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="form-row">
                  <PremiumInput label="Duration (min)" type="number" name="duration" value={form.duration} onChange={handleFormChange} icon={<Clock size={16} />} required />
                  <PremiumInput label="Calories Burned" type="number" name="caloriesBurned" value={form.caloriesBurned} onChange={handleFormChange} icon={<Flame size={16} />} required />
                </div>
                <div className="form-row">
                  <PremiumInput label="Distance (km)" type="number" name="distance" value={form.additionalMetrics.distance} onChange={handleFormChange} />
                  <PremiumInput label="Heart Rate (bpm)" type="number" name="heartRate" value={form.additionalMetrics.heartRate} onChange={handleFormChange} />
                </div>
                <PremiumInput label="Start Time" type="datetime-local" name="startTime" value={form.startTime} onChange={handleFormChange} required />
              </div>
              <AnimatedButton type="submit" variant="primary" disabled={formLoading}>
                {formLoading ? 'Logging...' : 'Log Activity'}
              </AnimatedButton>
            </form>
          </div>
        )}

        {/* Activity List + Detail */}
        <div className="activities-body">
          <div className="activity-list-panel glass-panel">
            <div className="panel-header"><Filter size={16} /> All Activities</div>
            {loading ? (
              <div className="loading-skeleton">{[1,2,3,4,5].map(i => <div key={i} className="skeleton-row" />)}</div>
            ) : activities.length === 0 ? (
              <div className="empty-state"><Activity size={40} /><p>No activities logged yet.</p></div>
            ) : (
              <div className="activity-items">
                {activities.map((act, i) => (
                  <div
                    key={act.id || i}
                    className={`activity-item ${selectedActivity?.id === act.id ? 'selected' : ''}`}
                    onClick={() => handleSelectActivity(act)}
                  >
                    <div className="ai-badge" style={{ background: `${COLORS[act.activityType] || '#4facfe'}22`, color: COLORS[act.activityType] || '#4facfe' }}>
                      {act.activityType || 'WORKOUT'}
                    </div>
                    <div className="ai-info">
                      <span className="ai-stats">{act.duration}min · {act.caloriesBurned}kcal</span>
                      <span className="ai-date">{act.startTime ? new Date(act.startTime).toLocaleDateString() : 'Today'}</span>
                    </div>
                    <ChevronRight size={16} className="ai-chevron" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Activity Detail Panel */}
          {selectedActivity && (
            <div className="activity-detail-panel glass-panel animate-fade-in">
              <div className="detail-header">
                <h3>Activity Details</h3>
                <button className="close-detail" onClick={() => setSelectedActivity(null)}><X size={18} /></button>
              </div>
              <div className="detail-type-pill" style={{ background: `${COLORS[selectedActivity.activityType] || '#4facfe'}22`, color: COLORS[selectedActivity.activityType] || '#4facfe' }}>
                {selectedActivity.activityType}
              </div>
              <div className="detail-metrics-grid">
                <div className="detail-metric"><span className="dm-label">Duration</span><span className="dm-value">{selectedActivity.duration} min</span></div>
                <div className="detail-metric"><span className="dm-label">Calories</span><span className="dm-value">{selectedActivity.caloriesBurned} kcal</span></div>
                <div className="detail-metric"><span className="dm-label">Distance</span><span className="dm-value">{selectedActivity.additionalMetrics?.distance || '-'} km</span></div>
                <div className="detail-metric"><span className="dm-label">Heart Rate</span><span className="dm-value">{selectedActivity.additionalMetrics?.heartRate || '-'} bpm</span></div>
              </div>
              {activityRec && (
                <div className="detail-rec">
                  <div className="detail-rec-header">🤖 AI Insight</div>
                  <p>{activityRec.recommendation || activityRec.message || JSON.stringify(activityRec)}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Activities;
