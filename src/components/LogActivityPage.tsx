import { useState } from 'react';
import { Bike, Coffee, Recycle, Lightbulb, Car, Utensils, ShoppingBag, Wind, Camera, Sparkles, Cloud, Calendar } from 'lucide-react';

interface Activity {
  id: string;
  activity: string;
  points: number;
  date: string;
  category?: string;
}

interface LogActivityPageProps {
  onLogActivity: (activity: string, points: number, category: string) => void;
  activities: Activity[];
  streak: number;
}

export function LogActivityPage({ onLogActivity, activities, streak }: LogActivityPageProps) {
  const [selectedActivity, setSelectedActivity] = useState('');
  const [customActivity, setCustomActivity] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);

  const activityOptions = [
    { name: 'Cycled to work', points: 50, icon: Bike, category: 'Transportation' },
    { name: 'Walked to work', points: 40, icon: Bike, category: 'Transportation' },
    { name: 'Carpooled', points: 30, icon: Car, category: 'Transportation' },
    { name: 'Used public transport', points: 25, icon: Car, category: 'Transportation' },
    { name: 'Used reusable cup', points: 10, icon: Coffee, category: 'Waste Reduction' },
    { name: 'Used reusable water bottle', points: 10, icon: Coffee, category: 'Waste Reduction' },
    { name: 'Recycled waste', points: 15, icon: Recycle, category: 'Recycling' },
    { name: 'Composted food waste', points: 20, icon: Recycle, category: 'Recycling' },
    { name: 'Turned off lights', points: 5, icon: Lightbulb, category: 'Energy' },
    { name: 'Used stairs instead of elevator', points: 10, icon: Wind, category: 'Energy' },
    { name: 'Brought lunch from home', points: 15, icon: Utensils, category: 'Waste Reduction' },
    { name: 'Used reusable bags', points: 10, icon: ShoppingBag, category: 'Waste Reduction' },
  ];

  // Smart suggestions based on past activities, weather, and day
  const getSmartSuggestions = () => {
    const suggestions = [];
    const today = new Date().getDay(); // 0-6
    const recentActivities = activities.slice(0, 10);
    
    // Weather-based suggestion (mock - sunny day)
    suggestions.push({
      title: '☀️ Perfect weather to cycle!',
      description: 'It\'s sunny today - great for a bike ride to work',
      activity: 'Cycled to work',
      points: 50,
    });

    // Day-based suggestion
    if (today === 1) { // Monday
      suggestions.push({
        title: '🌱 Start your week green',
        description: 'Bring your reusable cup for Monday motivation',
        activity: 'Used reusable cup',
        points: 10,
      });
    }

    // Pattern-based suggestion
    const cyclingCount = recentActivities.filter(a => a.activity.toLowerCase().includes('cycl')).length;
    if (cyclingCount >= 2) {
      suggestions.push({
        title: '🚴 Keep the cycling streak!',
        description: 'You\'ve been cycling consistently - keep it up!',
        activity: 'Cycled to work',
        points: 50,
      });
    }

    return suggestions.slice(0, 2);
  };

  const smartSuggestions = getSmartSuggestions();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const activityToLog = selectedActivity === 'custom' ? customActivity : selectedActivity;
    const selectedOption = activityOptions.find(opt => opt.name === selectedActivity);
    const points = selectedOption ? selectedOption.points : 10;
    const category = selectedOption ? selectedOption.category : 'Other';

    if (activityToLog) {
      onLogActivity(activityToLog, points, category);
      setSelectedActivity('');
      setCustomActivity('');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const handleSuggestionClick = (suggestion: any) => {
    setSelectedActivity(suggestion.activity);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-green-800 mb-2">Log Activity</h1>
      <p className="text-gray-600 mb-8">Track your sustainable actions and earn points!</p>

      {showSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
          Activity logged successfully! Points added to your account.
        </div>
      )}

      {/* Smart Suggestions */}
      {smartSuggestions.length > 0 && (
        <div className="mb-8">
          <h2 className="text-gray-900 mb-4">✨ Smart Suggestions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {smartSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 text-left hover:shadow-md transition-all"
              >
                <h3 className="text-gray-900 mb-2">{suggestion.title}</h3>
                <p className="text-gray-600 mb-3">{suggestion.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-blue-600">Suggested for you</span>
                  <span className="text-green-600">+{suggestion.points} pts</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl p-6 border border-gray-200 mb-8">
        <h2 className="text-gray-900 mb-6">Select an Activity</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {activityOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.name}
                  type="button"
                  onClick={() => setSelectedActivity(option.name)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    selectedActivity === option.name
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-green-200'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      selectedActivity === option.name ? 'bg-green-600' : 'bg-gray-100'
                    }`}>
                      <Icon className={`w-5 h-5 ${
                        selectedActivity === option.name ? 'text-white' : 'text-gray-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-900">{option.name}</div>
                    </div>
                  </div>
                  <div className="text-green-600">+{option.points} points</div>
                </button>
              );
            })}
          </div>

          {/* Custom Activity */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Or enter a custom activity</label>
            <input
              type="text"
              value={customActivity}
              onChange={(e) => {
                setCustomActivity(e.target.value);
                setSelectedActivity('custom');
              }}
              placeholder="E.g., Planted a tree, Started a recycling program..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            disabled={!selectedActivity && !customActivity}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Log Activity
          </button>
        </form>
      </div>

      {/* Tips Section */}
      <div className="bg-green-50 rounded-xl p-6 border border-green-200">
        <h3 className="text-green-800 mb-3">💡 Tips for Earning More Points</h3>
        <ul className="space-y-2 text-green-900">
          <li>• Consistency is key - log activities daily for bonus points</li>
          <li>• Transportation choices have the biggest impact</li>
          <li>• Small actions add up - every sustainable choice counts!</li>
          <li>• Share your achievements with your team to inspire others</li>
        </ul>
      </div>
    </div>
  );
}