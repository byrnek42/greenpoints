import { Award, TrendingUp, Users, Flame, Trophy, Target, Sparkles, ChevronRight } from 'lucide-react';
import { CircularProgress } from './CircularProgress';

interface Activity {
  id: string;
  activity: string;
  points: number;
  date: string;
  category?: string;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedDate: string | null;
}

interface Goal {
  id: string;
  title: string;
  progress: number;
  target: number;
  points: number;
}

interface HomePageProps {
  userPoints: number;
  streak: number;
  recentActivities: Activity[];
  achievements: Achievement[];
  goals: Goal[];
}

export function HomePage({ userPoints, streak, recentActivities, achievements, goals }: HomePageProps) {
  const getBadgeLevel = (points: number) => {
    if (points >= 1000) return { level: 'Gold', color: 'yellow', nextLevel: null, pointsNeeded: 0 };
    if (points >= 500) return { level: 'Silver', color: 'gray', nextLevel: 'Gold', pointsNeeded: 1000 - points };
    return { level: 'Bronze', color: 'orange', nextLevel: 'Silver', pointsNeeded: 500 - points };
  };

  const badge = getBadgeLevel(userPoints);

  const leaderboard = [
    { name: 'Sarah Johnson', points: 1250, avatar: 'SJ' },
    { name: 'Mike Chen', points: 1100, avatar: 'MC' },
    { name: 'You', points: userPoints, avatar: 'ME', isCurrentUser: true },
    { name: 'Emma Davis', points: 780, avatar: 'ED' },
    { name: 'Alex Kumar', points: 650, avatar: 'AK' },
  ].sort((a, b) => b.points - a.points);

  const userRank = leaderboard.findIndex(member => member.isCurrentUser) + 1;

  const weeklyPoints = recentActivities
    .filter(a => {
      const activityDate = new Date(a.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return activityDate >= weekAgo;
    })
    .reduce((sum, a) => sum + a.points, 0);

  const totalCO2 = (userPoints * 0.5).toFixed(1);
  const totalWater = Math.floor(userPoints * 2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Profile Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white shadow-lg">
              <span>RY</span>
            </div>
            <div>
              <h1 className="text-gray-900 mb-1">Hello, Ryan 👋</h1>
              <p className="text-gray-600">ryan.smith@email.com</p>
            </div>
          </div>
          <button className="p-2 hover:bg-white rounded-lg transition-colors">
            <Sparkles className="w-6 h-6 text-yellow-500" />
          </button>
        </div>

        {/* Main Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Points Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-green-600">+{weeklyPoints} this week</span>
            </div>
            <div className="text-gray-900 mb-1">{userPoints}</div>
            <div className="text-gray-500 mb-3">Total Points</div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all"
                style={{ width: `${badge.nextLevel ? ((userPoints % 500) / 5) : 100}%` }}
              />
            </div>
            {badge.nextLevel && (
              <p className="text-gray-500 mt-2">{badge.pointsNeeded} to {badge.nextLevel}</p>
            )}
          </div>

          {/* Streak Card */}
          <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all text-white">
            <div className="flex items-center justify-between mb-4">
              <Flame className="w-10 h-10" />
              <span className="bg-white/20 px-3 py-1 rounded-full">Active</span>
            </div>
            <div className="mb-1">{streak} Days</div>
            <div className="text-orange-100 mb-3">Current Streak 🔥</div>
            <div className="flex gap-1">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-2 rounded-full ${
                    i < streak ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* CO2 Saved Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                <span className="text-emerald-600">🌿</span>
              </div>
            </div>
            <div className="text-gray-900 mb-1">{totalCO2} kg</div>
            <div className="text-gray-500 mb-3">CO₂ Saved</div>
            <div className="text-emerald-600">
              = {Math.floor(Number(totalCO2) / 21)} trees planted
            </div>
          </div>

          {/* Rank Card */}
          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all text-white">
            <div className="flex items-center justify-between mb-4">
              <Trophy className="w-10 h-10" />
              <span className="bg-white/20 px-3 py-1 rounded-full">#{userRank}</span>
            </div>
            <div className="mb-1">{badge.level}</div>
            <div className="text-purple-100 mb-3">Badge Level</div>
            <div className="flex items-center gap-2">
              <Award className={`w-5 h-5 ${
                badge.color === 'yellow' ? 'text-yellow-300' :
                badge.color === 'gray' ? 'text-gray-300' :
                'text-orange-300'
              }`} />
              <span>Rank {userRank} in team</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Your Statistics - Large Card */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-gray-900">Your Statistics</h2>
              <button className="text-green-600 hover:text-green-700 flex items-center gap-1">
                See all
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Circular Progress for CO2 */}
              <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl relative">
                <CircularProgress
                  value={parseInt(totalCO2)}
                  max={500}
                  size={140}
                  strokeWidth={14}
                  color="#16a34a"
                  backgroundColor="#e5e7eb"
                  showValue={false}
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <span className="text-2xl mb-1">🌿</span>
                  <div className="text-gray-900">{totalCO2} kg</div>
                  <span className="text-gray-500">CO₂ saved</span>
                </div>
                <div className="mt-4 text-center">
                  <div className="text-green-600">{Math.floor(userPoints * 2)} L</div>
                  <span className="text-gray-500">Water saved</span>
                </div>
              </div>

              {/* Water Saved Stats */}
              <div className="flex flex-col justify-between">
                <div className="p-4 bg-blue-50 rounded-xl mb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span>💧</span>
                    </div>
                    <div>
                      <div className="text-gray-900">{totalWater} L</div>
                      <span className="text-gray-500">Water saved</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-orange-50 rounded-xl mb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <span>♻️</span>
                    </div>
                    <div>
                      <div className="text-gray-900">{(userPoints * 0.3).toFixed(1)} kg</div>
                      <span className="text-gray-500">Waste reduced</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-purple-50 rounded-xl">
                  <div className="text-purple-600">Risk: Low</div>
                  <span className="text-gray-500">Environmental impact</span>
                </div>
              </div>
            </div>
          </div>

          {/* Active Goals Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-gray-900">Active Goals</h2>
            </div>
            <div className="space-y-4">
              {goals.map((goal) => {
                const progressPercent = (goal.progress / goal.target) * 100;
                return (
                  <div key={goal.id} className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-3">
                      <p className="text-gray-900 flex-1">{goal.title}</p>
                      <span className="text-green-600 ml-2">+{goal.points}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all"
                            style={{ width: `${progressPercent}%` }}
                          />
                        </div>
                      </div>
                      <span className="text-gray-600 whitespace-nowrap">
                        {goal.progress}/{goal.target}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Team Leaderboard */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-amber-600" />
                </div>
                <h2 className="text-gray-900">Leaderboard</h2>
              </div>
              <button className="text-green-600 hover:text-green-700">View all</button>
            </div>
            <div className="space-y-3">
              {leaderboard.map((member, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                    member.isCurrentUser
                      ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 shadow-sm'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    index === 0 ? 'bg-yellow-100 text-yellow-600' :
                    index === 1 ? 'bg-gray-200 text-gray-600' :
                    index === 2 ? 'bg-orange-100 text-orange-600' :
                    'bg-gray-100 text-gray-500'
                  }`}>
                    {index + 1}
                  </div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                    member.isCurrentUser
                      ? 'bg-gradient-to-br from-green-500 to-emerald-600'
                      : 'bg-gradient-to-br from-gray-400 to-gray-500'
                  }`}>
                    {member.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="text-gray-900">{member.name}</div>
                  </div>
                  <div className="text-green-600">{member.points} pts</div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-gray-900">Recent Actions</h2>
              <button className="text-green-600 hover:text-green-700">View all</button>
            </div>
            <div className="space-y-3">
              {recentActivities.length > 0 ? (
                recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <span>
                          {activity.category === 'Transportation' ? '🚴' :
                           activity.category === 'Recycling' ? '♻️' :
                           activity.category === 'Waste Reduction' ? '🌱' :
                           '💡'}
                        </span>
                      </div>
                      <div>
                        <div className="text-gray-900">{activity.activity}</div>
                        <span className="text-gray-500">{new Date(activity.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      </div>
                    </div>
                    <div className="text-green-600">+{activity.points}</div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">No activities yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}