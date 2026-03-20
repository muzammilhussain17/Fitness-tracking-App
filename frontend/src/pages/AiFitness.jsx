import React, { useState, useRef, useEffect } from 'react';
import { Brain, Zap, ChevronRight, ChevronLeft, Loader, Dumbbell, Target, User, BarChart3, Flame, Heart, Shield, RefreshCw, Download, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import { getUserRecommendations } from '../services/api';
import { isDemoMode } from '../services/mockData';
import './AiFitness.css';

// ───────────────────────────────────────────────
//  DEMO AI REPORT — full structured response
// ───────────────────────────────────────────────
const generateMockReport = (data) => ({
  overview: `Based on your profile as a ${data.age}-year-old ${data.gender} at ${data.weight}kg with a ${data.fitnessLevel} fitness level and a goal of ${data.goal?.toLowerCase()}, our AI engine has generated a precision-tailored 8-week performance protocol.`,
  score: Math.floor(70 + Math.random() * 25),
  sections: [
    {
      icon: '🏋️',
      title: 'Training Protocol',
      color: '#00f2fe',
      items: [
        data.goal === 'MUSCLE_GAIN'
          ? 'Progressive overload: increase weight 2.5–5% every 7 days on compound lifts'
          : 'HIIT intervals: 4×4 protocol (4 min high effort, 4 min recovery) 3× weekly',
        `Weekly volume: ${data.fitnessLevel === 'BEGINNER' ? '10–12' : data.fitnessLevel === 'INTERMEDIATE' ? '14–16' : '18–22'} sets per muscle group`,
        `Primary focus: ${data.activityPreference?.toLowerCase() || 'compound movements'} — optimal for your goal`,
        `Deload every 4th week — reduce volume by 40% to prevent CNS fatigue`,
      ],
    },
    {
      icon: '🥗',
      title: 'Nutrition Blueprint',
      color: '#10b981',
      items: [
        `Daily caloric target: ${data.goal === 'WEIGHT_LOSS' ? Math.round(data.weight * 24 * 0.85) : data.goal === 'MUSCLE_GAIN' ? Math.round(data.weight * 24 * 1.1) : Math.round(data.weight * 24)} kcal`,
        `Protein: ${Math.round(data.weight * (data.fitnessLevel === 'ADVANCED' ? 2.2 : 1.8))}g/day — prioritize leucine-rich sources (chicken, eggs, whey)`,
        `Carb timing: 60–70% of daily carbs in the 2h window around training`,
        `Hydration target: ${(data.weight * 0.035).toFixed(1)}L/day — increase by 500ml on training days`,
      ],
    },
    {
      icon: '❤️',
      title: 'Cardiovascular Strategy',
      color: '#f59e0b',
      items: [
        `Aerobic base: 2× weekly Zone 2 sessions (${Math.round(220 - data.age * 0.6 * 0.7)}–${Math.round(220 - data.age * 0.6 * 0.8)} BPM) for 40–60 min`,
        `VO₂ max training: 1× weekly maximal effort intervals, 30s on / 90s off ×8`,
        `Resting HR target: aim below ${60 + (data.fitnessLevel === 'BEGINNER' ? 10 : data.fitnessLevel === 'INTERMEDIATE' ? 5 : 0)} BPM within 8 weeks`,
        `Morning HRV tracking recommended — train hard only when HRV is above baseline`,
      ],
    },
    {
      icon: '🔋',
      title: 'Recovery & Adaptation',
      color: '#7f00ff',
      items: [
        `Sleep: 7.5–9h minimum — this is when 90% of muscle protein synthesis occurs`,
        `Cold exposure: 3× weekly, 3 min at 12–15°C post-training for inflammation control`,
        `Mobility: 10 min dynamic warm-up + 15 min foam rolling on rest days`,
        `Supplement stack: Creatine monohydrate (5g/day), Vitamin D3 (2000 IU), Magnesium Glycinate (300mg before bed)`,
      ],
    },
  ],
  warning: data.fitnessLevel === 'BEGINNER'
    ? 'Start at 60% intensity for the first 2 weeks to build connective tissue resilience and avoid overuse injury.'
    : null,
  keyMetric: {
    label: 'Projected Result in 8 Weeks',
    value: data.goal === 'WEIGHT_LOSS'
      ? `−${(data.weight * 0.06).toFixed(1)}kg body fat`
      : data.goal === 'MUSCLE_GAIN'
      ? `+${(data.weight * 0.015).toFixed(1)}kg lean mass`
      : 'Peak performance baseline established',
  },
});

// ───────────────────────────────────────────────
//  TYPEWRITER Hook
// ───────────────────────────────────────────────
const useTypewriter = (text, speed = 18, active = false) => {
  const [displayed, setDisplayed] = useState('');
  const idx = useRef(0);
  useEffect(() => {
    if (!active || !text) return;
    setDisplayed('');
    idx.current = 0;
    const timer = setInterval(() => {
      if (idx.current < text.length) {
        setDisplayed(text.slice(0, idx.current + 1));
        idx.current++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, active]);
  return displayed;
};

// ───────────────────────────────────────────────
//  FORM STEPS
// ───────────────────────────────────────────────
const STEPS = [
  {
    id: 'profile',
    icon: <User size={22} />,
    title: 'Your Profile',
    subtitle: 'Basic biometric data for calibration',
  },
  {
    id: 'goals',
    icon: <Target size={22} />,
    title: 'Goals & Experience',
    subtitle: 'What you want to achieve',
  },
  {
    id: 'activity',
    icon: <Dumbbell size={22} />,
    title: 'Activity Preference',
    subtitle: 'How you like to train',
  },
];

const GOALS = [
  { value: 'WEIGHT_LOSS', label: 'Weight Loss', icon: '🔥', desc: 'Burn fat, improve definition' },
  { value: 'MUSCLE_GAIN', label: 'Muscle Gain', icon: '💪', desc: 'Build lean mass, strength' },
  { value: 'ENDURANCE', label: 'Endurance', icon: '🏃', desc: 'Stamina, cardiovascular peak' },
  { value: 'GENERAL_FITNESS', label: 'General Fitness', icon: '⚡', desc: 'Overall health, wellbeing' },
];

const LEVELS = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'];
const ACTIVITIES = ['RUNNING', 'CYCLING', 'SWIMMING', 'WEIGHTLIFTING', 'YOGA', 'HIIT', 'CROSSFIT'];
const GENDERS = ['MALE', 'FEMALE', 'OTHER'];

// ───────────────────────────────────────────────
//  MAIN COMPONENT
// ───────────────────────────────────────────────
const AiFitness = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    age: '',
    weight: '',
    height: '',
    gender: '',
    goal: '',
    fitnessLevel: '',
    activityPreference: '',
    workoutsPerWeek: 3,
    injuryNotes: '',
  });
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [showReport, setShowReport] = useState(false);
  const overviewTyped = useTypewriter(report?.overview, 16, showReport);
  const userId = localStorage.getItem('userId');

  const set = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      let data;
      if (isDemoMode() || !userId) {
        await new Promise(r => setTimeout(r, 2800)); // dramatic AI thinking time
        data = generateMockReport(form);
      } else {
        // Real: call the AI recommendation service
        const raw = await getUserRecommendations(userId);
        data = raw?.report ? raw : generateMockReport(form);
      }
      setReport(data);
      setShowReport(true);
    } catch {
      setReport(generateMockReport(form));
      setShowReport(true);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setReport(null);
    setShowReport(false);
    setStep(0);
    setForm({ age: '', weight: '', height: '', gender: '', goal: '', fitnessLevel: '', activityPreference: '', workoutsPerWeek: 3, injuryNotes: '' });
  };

  const canProceed = () => {
    if (step === 0) return form.age && form.weight && form.height && form.gender;
    if (step === 1) return form.goal && form.fitnessLevel;
    if (step === 2) return form.activityPreference;
    return false;
  };

  // ── REPORT VIEW ──
  if (loading) {
    return (
      <div className="ai-page">
        <Navbar />
        <div className="ai-thinking-screen">
          <div className="thinking-orbs">
            <div className="t-orb t-orb-1" /><div className="t-orb t-orb-2" /><div className="t-orb t-orb-3" />
          </div>
          <div className="thinking-content">
            <div className="thinking-brain-icon">
              <Brain size={52} />
              <div className="brain-pulse" />
            </div>
            <h2>AI Engine Processing</h2>
            <p>Calibrating your personalised fitness protocol...</p>
            <div className="thinking-steps">
              {['Analysing biometric data', 'Computing energy expenditure', 'Generating training protocol', 'Optimising nutrition blueprint'].map((s, i) => (
                <div key={i} className="thinking-step" style={{ animationDelay: `${i * 0.5}s` }}>
                  <div className="ts-dot" />
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (report && showReport) {
    return (
      <div className="ai-page">
        <Navbar />
        <div className="report-layout">
          {/* Report Header */}
          <div className="report-header animate-fade-in-up">
            <div className="report-header-left">
              <div className="report-badge"><Sparkles size={14} /> AI Analysis Complete</div>
              <h1>Your <span className="text-gradient">Performance Report</span></h1>
              <p>Generated in real-time by the FitTrackAI engine</p>
            </div>
            <div className="report-header-right">
              <div className="score-ring">
                <svg viewBox="0 0 120 120" className="score-svg">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                  <circle
                    cx="60" cy="60" r="52" fill="none"
                    stroke="url(#scoreGrad)" strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 52 * report.score / 100} ${2 * Math.PI * 52}`}
                    strokeLinecap="round"
                    transform="rotate(-90 60 60)"
                    className="score-arc"
                  />
                  <defs>
                    <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#00f2fe" />
                      <stop offset="100%" stopColor="#4facfe" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="score-label">
                  <span className="score-value">{report.score}</span>
                  <span className="score-sub">/ 100</span>
                  <span className="score-text">Fitness Score</span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Metric */}
          <div className="key-metric-bar animate-fade-in-up delay-100">
            <BarChart3 size={20} />
            <span className="km-label">{report.keyMetric.label}:</span>
            <span className="km-value text-gradient">{report.keyMetric.value}</span>
          </div>

          {/* Overview — typewriter */}
          <div className="overview-card glass-panel animate-fade-in-up delay-200">
            <div className="overview-header"><Brain size={18} /> AI Overview</div>
            <p className="overview-text">{overviewTyped}<span className="cursor-blink">{overviewTyped.length < (report.overview?.length || 0) ? '|' : ''}</span></p>
          </div>

          {/* Warning */}
          {report.warning && (
            <div className="report-warning animate-fade-in-up delay-200">
              <Shield size={16} /> {report.warning}
            </div>
          )}

          {/* Section Cards */}
          <div className="report-sections">
            {report.sections.map((sec, i) => (
              <div key={i} className="report-section glass-card animate-fade-in-up" style={{ animationDelay: `${0.3 + i * 0.12}s`, '--section-color': sec.color }}>
                <div className="section-header-row">
                  <span className="section-emoji">{sec.icon}</span>
                  <h3 style={{ color: sec.color }}>{sec.title}</h3>
                </div>
                <ul className="section-items">
                  {sec.items.map((item, j) => (
                    <li key={j} className="section-item">
                      <div className="item-dot" style={{ background: sec.color }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="report-actions animate-fade-in-up">
            <button className="action-btn secondary" onClick={reset}>
              <RefreshCw size={16} /> New Analysis
            </button>
            <button className="action-btn primary" onClick={() => window.print()}>
              <Download size={16} /> Export Report
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── FORM VIEW ──
  return (
    <div className="ai-page">
      <Navbar />
      <div className="ai-layout">

        {/* Left: info panel */}
        <div className="ai-side-panel">
          <div className="side-orb" />
          <div className="side-content">
            <div className="side-badge"><Brain size={14} /> AI Fitness Engine</div>
            <h2>Precision-Calibrated<br /><span className="text-gradient">Performance Analysis</span></h2>
            <p>Answer 3 quick steps. Our AI engine will analyse your biometrics, goals, and training preferences to generate a fully personalised protocol.</p>
            <div className="side-features">
              {[
                { icon: <Dumbbell size={16} />, text: 'Custom Training Protocol' },
                { icon: <Flame size={16} />, text: 'Nutrition Blueprint' },
                { icon: <Heart size={16} />, text: 'Cardio & Recovery Plan' },
                { icon: <BarChart3 size={16} />, text: 'Projected 8-Week Results' },
              ].map((f, i) => (
                <div key={i} className="side-feature">
                  <div className="sf-icon">{f.icon}</div>
                  <span>{f.text}</span>
                </div>
              ))}
            </div>
            {/* Step indicators */}
            <div className="step-rail">
              {STEPS.map((s, i) => (
                <div key={i} className={`step-rail-item ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
                  <div className="sri-dot">{i < step ? '✓' : i + 1}</div>
                  <div className="sri-info">
                    <span className="sri-title">{s.title}</span>
                    <span className="sri-sub">{s.subtitle}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: form */}
        <div className="ai-form-panel">
          <div className="form-card glass-panel animate-fade-in-up">
            <div className="form-card-header">
              {STEPS[step].icon}
              <div>
                <h3>{STEPS[step].title}</h3>
                <p>{STEPS[step].subtitle}</p>
              </div>
            </div>

            {/* Step 0: Profile */}
            {step === 0 && (
              <div className="form-fields">
                <div className="field-row">
                  <div className="field-group">
                    <label>Age <span>*</span></label>
                    <input className="ai-input" type="number" placeholder="e.g. 27" value={form.age} onChange={e => set('age', e.target.value)} min="10" max="99" />
                  </div>
                  <div className="field-group">
                    <label>Weight (kg) <span>*</span></label>
                    <input className="ai-input" type="number" placeholder="e.g. 75" value={form.weight} onChange={e => set('weight', e.target.value)} />
                  </div>
                </div>
                <div className="field-group">
                  <label>Height (cm) <span>*</span></label>
                  <input className="ai-input" type="number" placeholder="e.g. 178" value={form.height} onChange={e => set('height', e.target.value)} />
                </div>
                <div className="field-group">
                  <label>Gender <span>*</span></label>
                  <div className="chip-group">
                    {GENDERS.map(g => (
                      <button key={g} type="button" className={`option-chip ${form.gender === g ? 'active' : ''}`} onClick={() => set('gender', g)}>
                        {g === 'MALE' ? '♂ Male' : g === 'FEMALE' ? '♀ Female' : '⊕ Other'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: Goals */}
            {step === 1 && (
              <div className="form-fields">
                <div className="field-group">
                  <label>Primary Goal <span>*</span></label>
                  <div className="goal-grid">
                    {GOALS.map(g => (
                      <button key={g.value} type="button"
                        className={`goal-card ${form.goal === g.value ? 'active' : ''}`}
                        onClick={() => set('goal', g.value)}
                      >
                        <span className="goal-icon">{g.icon}</span>
                        <span className="goal-label">{g.label}</span>
                        <span className="goal-desc">{g.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="field-group">
                  <label>Fitness Level <span>*</span></label>
                  <div className="chip-group">
                    {LEVELS.map(l => (
                      <button key={l} type="button" className={`option-chip ${form.fitnessLevel === l ? 'active' : ''}`} onClick={() => set('fitnessLevel', l)}>
                        {l === 'BEGINNER' ? '🌱 Beginner' : l === 'INTERMEDIATE' ? '⚡ Intermediate' : '🔥 Advanced'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Activity */}
            {step === 2 && (
              <div className="form-fields">
                <div className="field-group">
                  <label>Preferred Activity <span>*</span></label>
                  <div className="activity-grid">
                    {ACTIVITIES.map(a => (
                      <button key={a} type="button"
                        className={`activity-chip ${form.activityPreference === a ? 'active' : ''}`}
                        onClick={() => set('activityPreference', a)}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="field-group">
                  <label>Sessions per Week: <strong>{form.workoutsPerWeek}</strong></label>
                  <input
                    className="ai-range"
                    type="range" min="1" max="7"
                    value={form.workoutsPerWeek}
                    onChange={e => set('workoutsPerWeek', parseInt(e.target.value))}
                  />
                  <div className="range-labels"><span>1×</span><span>7×</span></div>
                </div>
                <div className="field-group">
                  <label>Injury Notes (optional)</label>
                  <textarea
                    className="ai-textarea"
                    placeholder="e.g. right knee tendonitis, lower back sensitivity..."
                    value={form.injuryNotes}
                    onChange={e => set('injuryNotes', e.target.value)}
                    rows={2}
                  />
                </div>
              </div>
            )}

            {/* Nav Buttons */}
            <div className="form-nav">
              {step > 0 && (
                <button className="nav-back-btn" onClick={() => setStep(s => s - 1)}>
                  <ChevronLeft size={18} /> Back
                </button>
              )}
              <div className="nav-spacer" />
              {step < STEPS.length - 1 ? (
                <button className={`nav-next-btn ${!canProceed() ? 'disabled' : ''}`} disabled={!canProceed()} onClick={() => setStep(s => s + 1)}>
                  Next <ChevronRight size={18} />
                </button>
              ) : (
                <button className={`nav-analyze-btn ${!canProceed() ? 'disabled' : ''}`} disabled={!canProceed()} onClick={handleAnalyze}>
                  <Zap size={18} /> Generate Report
                </button>
              )}
            </div>

            {/* Progress bar */}
            <div className="form-progress">
              <div className="progress-bar" style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiFitness;
