import { useState } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { ImpactPage } from './components/ImpactPage';
import { LogActivityPage } from './components/LogActivityPage';
import { MissionsAndCommunityPage } from './components/MissionsAndCommunityPage';
import { RewardsAndMarketplacePage } from './components/RewardsAndMarketplacePage';

type Page = 'home' | 'impact' | 'log' | 'missions-community' | 'rewards';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [userPoints, setUserPoints] = useState(850);
  const [streak, setStreak] = useState(7);
  const [activities, setActivities] = useState([
    { id: '1', activity: 'Cycled to work', points: 50, date: '2025-12-05', category: 'Transportation' },
    { id: '2', activity: 'Used reusable cup', points: 10, date: '2025-12-05', category: 'Waste Reduction' },
    { id: '3', activity: 'Recycled waste', points: 15, date: '2025-12-04', category: 'Recycling' },
    { id: '4', activity: 'Carpooled', points: 30, date: '2025-12-04', category: 'Transportation' },
    { id: '5', activity: 'Walked to work', points: 40, date: '2025-12-03', category: 'Transportation' },
    { id: '6', activity: 'Composted food waste', points: 20, date: '2025-12-03', category: 'Recycling' },
    { id: '7', activity: 'Used reusable water bottle', points: 10, date: '2025-12-02', category: 'Waste Reduction' },
    { id: '8', activity: 'Turned off lights', points: 5, date: '2025-12-02', category: 'Energy' },
    { id: '9', activity: 'Cycled to work', points: 50, date: '2025-12-01', category: 'Transportation' },
    { id: '10', activity: 'Used reusable bags', points: 10, date: '2025-12-01', category: 'Waste Reduction' },
    { id: '11', activity: 'Carpooled', points: 30, date: '2025-11-30', category: 'Transportation' },
    { id: '12', activity: 'Recycled waste', points: 15, date: '2025-11-29', category: 'Recycling' },
  ]);

  const [achievements, setAchievements] = useState([
    { id: '1', name: 'First Steps', description: 'Log your first activity', icon: 'star', unlocked: true, unlockedDate: '2025-11-28' },
    { id: '2', name: 'Week Warrior', description: 'Maintain a 7-day streak', icon: 'fire', unlocked: true, unlockedDate: '2025-12-04' },
    { id: '3', name: 'Point Collector', description: 'Earn 500 points', icon: 'trophy', unlocked: true, unlockedDate: '2025-12-01' },
    { id: '4', name: 'Eco Champion', description: 'Earn 1000 points', icon: 'trophy', unlocked: false, unlockedDate: null },
    { id: '5', name: 'Social Butterfly', description: 'Join 5 team challenges', icon: 'users', unlocked: false, unlockedDate: null },
    { id: '6', name: 'Green Commuter', description: 'Log 20 sustainable commutes', icon: 'bike', unlocked: false, unlockedDate: null },
  ]);

  const [goals, setGoals] = useState([
    { id: '1', title: 'Cycle to work 3 times this week', progress: 2, target: 3, points: 150 },
    { id: '2', title: 'Earn 200 points this month', progress: 125, target: 200, points: 100 },
    { id: '3', title: 'Complete 5 recycling activities', progress: 2, target: 5, points: 75 },
  ]);

  const handleLogActivity = (activity: string, points: number, category: string) => {
    const newActivity = {
      id: Date.now().toString(),
      activity,
      points,
      date: new Date().toISOString().split('T')[0],
      category,
    };
    setActivities([newActivity, ...activities]);
    setUserPoints(userPoints + points);
    
    // Check if this maintains or breaks streak
    const today = new Date().toISOString().split('T')[0];
    const lastActivity = activities[0];
    if (lastActivity && lastActivity.date !== today) {
      const lastDate = new Date(lastActivity.date);
      const todayDate = new Date(today);
      const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        setStreak(streak + 1);
      }
    }

    // Update goals
    updateGoalsProgress(activity, category);
    checkAchievements(userPoints + points, activities.length + 1, streak);
  };

  const updateGoalsProgress = (activity: string, category: string) => {
    setGoals(goals.map(goal => {
      if (goal.title.includes('Cycle') && activity.toLowerCase().includes('cycl')) {
        return { ...goal, progress: Math.min(goal.progress + 1, goal.target) };
      }
      if (goal.title.includes('recycling') && category === 'Recycling') {
        return { ...goal, progress: Math.min(goal.progress + 1, goal.target) };
      }
      return goal;
    }));
  };

  const checkAchievements = (points: number, activityCount: number, currentStreak: number) => {
    setAchievements(achievements.map(achievement => {
      if (!achievement.unlocked) {
        if (achievement.name === 'Eco Champion' && points >= 1000) {
          return { ...achievement, unlocked: true, unlockedDate: new Date().toISOString().split('T')[0] };
        }
        if (achievement.name === 'Green Commuter' && activityCount >= 20) {
          return { ...achievement, unlocked: true, unlockedDate: new Date().toISOString().split('T')[0] };
        }
      }
      return achievement;
    }));
  };

  const handleRedeemReward = (points: number) => {
    setUserPoints(userPoints - points);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <main>
        {currentPage === 'home' && (
          <HomePage 
            userPoints={userPoints}
            streak={streak}
            recentActivities={activities.slice(0, 5)}
            achievements={achievements}
            goals={goals}
          />
        )}
        {currentPage === 'impact' && (
          <ImpactPage 
            userPoints={userPoints} 
            activities={activities}
            streak={streak}
          />
        )}
        {currentPage === 'log' && (
          <LogActivityPage 
            onLogActivity={handleLogActivity}
            activities={activities}
            streak={streak}
          />
        )}
        {currentPage === 'missions-community' && (
          <MissionsAndCommunityPage 
            userPoints={userPoints}
            activities={activities}
            onCompleteTask={handleLogActivity}
          />
        )}
        {currentPage === 'rewards' && (
          <RewardsAndMarketplacePage 
            userPoints={userPoints} 
            onRedeem={handleRedeemReward} 
          />
        )}
      </main>
    </div>
  );
}