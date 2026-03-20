// ================================================
// MOCK DATA — used when backend is not running
// ================================================

export const DEMO_USER = {
  id: 'demo-001',
  firstName: 'Alex',
  lastName: 'Chen',
  email: 'demo@fittrack.ai',
};

export const DEMO_CREDENTIALS = {
  email: 'demo@fittrack.ai',
  password: 'demo123',
};

export const MOCK_ACTIVITIES = [
  {
    id: 'act-001',
    activityType: 'RUNNING',
    duration: 45,
    caloriesBurned: 520,
    startTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    additionalMetrics: { distance: 7.2, heartRate: 158 },
  },
  {
    id: 'act-002',
    activityType: 'CYCLING',
    duration: 60,
    caloriesBurned: 680,
    startTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    additionalMetrics: { distance: 22.5, heartRate: 142 },
  },
  {
    id: 'act-003',
    activityType: 'HIIT',
    duration: 30,
    caloriesBurned: 410,
    startTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    additionalMetrics: { distance: 0, heartRate: 175 },
  },
  {
    id: 'act-004',
    activityType: 'SWIMMING',
    duration: 50,
    caloriesBurned: 450,
    startTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    additionalMetrics: { distance: 2.0, heartRate: 135 },
  },
  {
    id: 'act-005',
    activityType: 'YOGA',
    duration: 60,
    caloriesBurned: 180,
    startTime: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    additionalMetrics: { distance: 0, heartRate: 95 },
  },
  {
    id: 'act-006',
    activityType: 'WALKING',
    duration: 40,
    caloriesBurned: 210,
    startTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    additionalMetrics: { distance: 4.1, heartRate: 110 },
  },
];

export const MOCK_RECOMMENDATIONS = [
  {
    recommendation: 'Your running pace is improving! Consider adding interval training to push past your 7km plateau and increase your VO2 max.',
  },
  {
    recommendation: 'Your resting heart rate has trended down this week — a great sign of cardiovascular adaptation. Keep your HIIT sessions to 2x per week.',
  },
  {
    recommendation: 'You have logged 6 sessions this week. Excellent consistency! Schedule a full rest day tomorrow to let your muscles recover and grow.',
  },
  {
    recommendation: 'Try a long slow distance (LSD) run this weekend — aim for 90 minutes at a conversational pace to build your aerobic base.',
  },
];

export const MOCK_ACTIVITY_RECOMMENDATION = {
  recommendation: 'Great session! Your heart rate efficiency is above average for this activity type. Consider increasing distance by 10% next week following progressive overload principles.',
};

/** Returns true if user logged in using the demo account */
export const isDemoMode = () => localStorage.getItem('demoMode') === 'true';
