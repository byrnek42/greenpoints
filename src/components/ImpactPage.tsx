import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, Area, AreaChart } from 'recharts';
import { Leaf, Droplets, Recycle, Download, Share2, TrendingUp, Calendar } from 'lucide-react';
import { CircularProgress } from './CircularProgress';

interface Activity {
  id: string;
  activity: string;
  points: number;
  date: string;
  category?: string;
}

interface ImpactPageProps {
  userPoints: number;
  activities: Activity[];
  streak: number;
}

// Custom tooltip component for charts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white px-4 py-3 rounded-lg shadow-lg border border-gray-200">
        <p className="text-gray-900 mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }} className="text-sm">
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function ImpactPage({ userPoints, activities, streak }: ImpactPageProps) {
  // Calculate statistics by category
  const activityByCategory = activities.reduce((acc, activity) => {
    const category = activity.category || 'Other';
    acc[category] = (acc[category] || 0) + activity.points;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(activityByCategory).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = ['#16a34a', '#22c55e', '#4ade80', '#86efac', '#a7f3d0'];

  // Weekly data with actual activity points
  const last7Days = [...Array(7)].map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toISOString().split('T')[0];
  });

  const weeklyData = last7Days.map(date => {
    const dayActivities = activities.filter(a => a.date === date);
    const points = dayActivities.reduce((sum, a) => sum + a.points, 0);
    const co2 = points * 0.5;
    return {
      date: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
      points,
      co2: Number(co2.toFixed(1)),
    };
  });

  // Monthly data
  const monthlyData = ['Nov', 'Dec'].map(month => {
    const monthActivities = activities.filter(a => {
      const activityMonth = new Date(a.date).toLocaleDateString('en-US', { month: 'short' });
      return activityMonth === month;
    });
    const points = monthActivities.reduce((sum, a) => sum + a.points, 0);
    return { month, points };
  });

  // Category breakdown with counts
  const categoryBreakdown = Object.entries(
    activities.reduce((acc, activity) => {
      const category = activity.category || 'Other';
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([category, count]) => ({ category, count }));

  // Environmental impact estimates
  const totalCO2Saved = (userPoints * 0.5).toFixed(1);
  const waterSaved = (userPoints * 2).toFixed(0);
  const wasteReduced = (userPoints * 0.3).toFixed(1);
  const treesEquivalent = Math.floor(Number(totalCO2Saved) / 21);
  const showersEquivalent = Math.floor(Number(waterSaved) / 50);

  // Comparison data
  const avgUserPoints = 650;
  const comparisonData = [
    { category: 'You', points: userPoints, fill: '#16a34a' },
    { category: 'Team Avg', points: avgUserPoints, fill: '#9ca3af' },
    { category: 'Top 10%', points: 1500, fill: '#fbbf24' },
  ];

  const handleDownloadReport = () => {
    alert('Your personalized impact report has been downloaded!');
  };

  const handleShareImpact = () => {
    alert('Impact shared to your social feed!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-gray-900 mb-2">My Impact</h1>
            <p className="text-gray-600">Track your environmental contributions</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleShareImpact}
              className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow hover:shadow-md transition-all border border-gray-200"
            >
              <Share2 className="w-4 h-4 text-blue-600" />
              <span className="text-gray-700">Share</span>
            </button>
            <button
              onClick={handleDownloadReport}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl shadow hover:shadow-md transition-all"
            >
              <Download className="w-4 h-4" />
              Download Report
            </button>
          </div>
        </div>

        {/* Main Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Leaf className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-gray-900">{totalCO2Saved} kg</div>
                <span className="text-gray-500">CO₂ Saved</span>
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-3">
              <p className="text-green-700">= {treesEquivalent} trees planted 🌳</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Droplets className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-gray-900">{waterSaved} L</div>
                <span className="text-gray-500">Water Saved</span>
              </div>
            </div>
            <div className="bg-blue-50 rounded-lg p-3">
              <p className="text-blue-700">= {showersEquivalent} showers saved 🚿</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Recycle className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <div className="text-gray-900">{wasteReduced} kg</div>
                <span className="text-gray-500">Waste Reduced</span>
              </div>
            </div>
            <div className="bg-orange-50 rounded-lg p-3">
              <p className="text-orange-700">= {activities.length} actions ♻️</p>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* CO2 Emissions Breakdown */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-gray-900 mb-6">CO₂ Impact by Category</h2>
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-72 text-gray-400">
                No data available
              </div>
            )}
          </div>

          {/* Weekly Progress */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-gray-900">Weekly Progress</h2>
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">Points</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                  <span className="text-gray-600">CO₂ (kg)</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCO2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4ade80" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4ade80" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="points" stroke="#16a34a" strokeWidth={3} fillOpacity={1} fill="url(#colorPoints)" />
                <Area type="monotone" dataKey="co2" stroke="#4ade80" strokeWidth={3} fillOpacity={1} fill="url(#colorCO2)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Comparison and Activity Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Comparison */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-gray-900 mb-6">Monthly Points</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="points" fill="#16a34a" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Comparison with Others */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-gray-900 mb-6">How You Compare</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={comparisonData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" stroke="#6b7280" />
                <YAxis dataKey="category" type="category" stroke="#6b7280" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="points" radius={[0, 8, 8, 0]}>
                  {comparisonData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity Summary */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <h2 className="text-gray-900 mb-6">Activity Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
              <div className="text-green-600 mb-2">{activities.length}</div>
              <span className="text-gray-600">Total Activities</span>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
              <div className="text-blue-600 mb-2">{userPoints}</div>
              <span className="text-gray-600">Total Points</span>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl">
              <div className="text-purple-600 mb-2">
                {activities.length > 0 ? Math.round(userPoints / activities.length) : 0}
              </div>
              <span className="text-gray-600">Avg Points</span>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl">
              <div className="text-orange-600 mb-2">{streak} days</div>
              <span className="text-gray-600">Current Streak</span>
            </div>
          </div>
        </div>

        {/* Real-World Impact */}
        <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl p-8 shadow-lg text-white">
          <h2 className="mb-6">🌍 Real-World Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur rounded-xl p-6">
              <div className="mb-3">{Math.floor(Number(totalCO2Saved) / 4.6)}</div>
              <p className="text-green-100">Gallons of gas saved</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-6">
              <div className="mb-3">{treesEquivalent}</div>
              <p className="text-green-100">Trees planted equivalent</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-6">
              <div className="mb-3">{showersEquivalent}</div>
              <p className="text-green-100">Showers worth of water</p>
            </div>
          </div>
          <div className="mt-6 text-green-100">
            Keep up the amazing work! Your actions are making a real difference for our planet.
          </div>
        </div>
      </div>
    </div>
  );
}
