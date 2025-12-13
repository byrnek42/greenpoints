import { useState } from 'react';
import { Users, Trophy, MapPin, Heart, MessageCircle, Share2, Globe } from 'lucide-react';

interface Activity {
  id: string;
  activity: string;
  points: number;
  date: string;
  category?: string;
}

interface CommunityPageProps {
  userPoints: number;
  activities: Activity[];
}

export function CommunityPage({ userPoints, activities }: CommunityPageProps) {
  const [activeTab, setActiveTab] = useState<'challenges' | 'feed' | 'impact'>('challenges');
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<any>(null);

  const teamChallenges = [
    {
      id: '1',
      title: 'Green Commute Week',
      description: 'Team challenge to use sustainable transport for 5 days',
      progress: 12,
      target: 25,
      participants: 5,
      reward: 500,
      endsIn: '3 days',
      status: 'active',
    },
    {
      id: '2',
      title: 'Zero Waste Warriors',
      description: 'Reduce office waste by using reusable items',
      progress: 8,
      target: 20,
      participants: 4,
      reward: 400,
      endsIn: '1 week',
      status: 'active',
    },
    {
      id: '3',
      title: 'Energy Savers',
      description: 'Save energy by turning off devices and lights',
      progress: 15,
      target: 15,
      participants: 6,
      reward: 300,
      endsIn: 'Completed',
      status: 'completed',
    },
  ];

  const friendsFeed = [
    {
      id: '1',
      user: 'Sarah Johnson',
      avatar: 'SJ',
      action: 'Cycled to work',
      points: 50,
      time: '2 hours ago',
      likes: 12,
      comments: 3,
    },
    {
      id: '2',
      user: 'Mike Chen',
      avatar: 'MC',
      action: 'Completed "Green Commute Week" challenge',
      points: 500,
      time: '5 hours ago',
      likes: 24,
      comments: 7,
    },
    {
      id: '3',
      user: 'Emma Davis',
      avatar: 'ED',
      action: 'Used reusable cup',
      points: 10,
      time: '1 day ago',
      likes: 8,
      comments: 2,
    },
    {
      id: '4',
      user: 'Alex Kumar',
      avatar: 'AK',
      action: 'Recycled waste and composted food',
      points: 35,
      time: '1 day ago',
      likes: 15,
      comments: 4,
    },
  ];

  const communityImpact = {
    totalMembers: 234,
    totalPoints: 125680,
    co2Saved: 62840, // kg
    treesPlanted: 89,
    wasteReduced: 37704, // kg
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-green-800 mb-2">Community</h1>
      <p className="text-gray-600 mb-8">Connect, compete, and make an impact together</p>

      {/* Community Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
          <div className="text-green-600 mb-1">{communityImpact.totalMembers}</div>
          <span className="text-gray-600">Members</span>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
          <div className="text-green-600 mb-1">{communityImpact.totalPoints.toLocaleString()}</div>
          <span className="text-gray-600">Total Points</span>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
          <div className="text-green-600 mb-1">{(communityImpact.co2Saved / 1000).toFixed(1)}t</div>
          <span className="text-gray-600">CO₂ Saved</span>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
          <div className="text-green-600 mb-1">{communityImpact.treesPlanted}</div>
          <span className="text-gray-600">Trees Planted</span>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
          <div className="text-green-600 mb-1">{(communityImpact.wasteReduced / 1000).toFixed(1)}t</div>
          <span className="text-gray-600">Waste Reduced</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('challenges')}
          className={`px-4 py-2 border-b-2 transition-colors ${
            activeTab === 'challenges'
              ? 'border-green-600 text-green-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Team Challenges
        </button>
        <button
          onClick={() => setActiveTab('feed')}
          className={`px-4 py-2 border-b-2 transition-colors ${
            activeTab === 'feed'
              ? 'border-green-600 text-green-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Friends Feed
        </button>
        <button
          onClick={() => setActiveTab('impact')}
          className={`px-4 py-2 border-b-2 transition-colors ${
            activeTab === 'impact'
              ? 'border-green-600 text-green-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Impact Map
        </button>
      </div>

      {/* Team Challenges Tab */}
      {activeTab === 'challenges' && (
        <div className="space-y-6">
          {teamChallenges.map((challenge) => (
            <div
              key={challenge.id}
              className={`bg-white rounded-xl p-6 border-2 ${
                challenge.status === 'completed'
                  ? 'border-gray-200 opacity-75'
                  : 'border-green-200'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-gray-900 mb-1">{challenge.title}</h3>
                  <p className="text-gray-600">{challenge.description}</p>
                </div>
                {challenge.status === 'completed' && (
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    ✓ Completed
                  </span>
                )}
              </div>

              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Team Progress</span>
                  <span className="text-gray-900">
                    {challenge.progress}/{challenge.target} activities
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-green-500 h-3 rounded-full transition-all"
                    style={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4" />
                    {challenge.participants} participants
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Trophy className="w-4 h-4" />
                    {challenge.reward} points
                  </div>
                </div>
                <div className="text-gray-600">Ends in {challenge.endsIn}</div>
              </div>

              {challenge.status === 'active' && (
                <button
                  className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                  onClick={() => {
                    setSelectedChallenge(challenge);
                    setShowJoinModal(true);
                  }}
                >
                  Join Challenge
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Friends Feed Tab */}
      {activeTab === 'feed' && (
        <div className="space-y-4">
          {friendsFeed.map((item) => (
            <div key={item.id} className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white">
                  {item.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-gray-900">{item.user}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-500">{item.time}</span>
                  </div>
                  <p className="text-gray-700 mb-2">{item.action}</p>
                  <div className="inline-flex items-center gap-2 bg-green-50 text-green-600 px-3 py-1 rounded-full">
                    +{item.points} points
                  </div>
                  <div className="flex items-center gap-4 mt-4 text-gray-600">
                    <button className="flex items-center gap-1 hover:text-green-600 transition-colors">
                      <Heart className="w-4 h-4" />
                      {item.likes}
                    </button>
                    <button className="flex items-center gap-1 hover:text-green-600 transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      {item.comments}
                    </button>
                    <button className="flex items-center gap-1 hover:text-green-600 transition-colors">
                      <Share2 className="w-4 h-4" />
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Impact Map Tab */}
      {activeTab === 'impact' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-5 h-5 text-green-600" />
              <h2 className="text-gray-900">NYC Community Impact Map</h2>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg h-96 relative overflow-hidden">
              {/* Simple NYC Map representation */}
              <svg viewBox="0 0 400 400" className="w-full h-full">
                {/* Water (surrounding areas) */}
                <rect x="0" y="0" width="400" height="400" fill="#dbeafe" />
                
                {/* Manhattan */}
                <path d="M 180 80 L 185 85 L 188 140 L 192 200 L 190 280 L 188 320 L 175 322 L 173 280 L 170 200 L 168 140 L 172 85 Z" 
                      fill="#86efac" stroke="#16a34a" strokeWidth="1"/>
                
                {/* Brooklyn */}
                <path d="M 190 280 L 270 290 L 275 340 L 250 350 L 220 345 L 188 320 Z" 
                      fill="#4ade80" stroke="#16a34a" strokeWidth="1"/>
                
                {/* Queens */}
                <path d="M 192 200 L 280 210 L 320 220 L 325 270 L 270 290 L 190 280 Z" 
                      fill="#22c55e" stroke="#16a34a" strokeWidth="1"/>
                
                {/* Bronx */}
                <path d="M 180 80 L 220 75 L 240 90 L 245 130 L 235 150 L 192 145 L 188 140 L 185 85 Z" 
                      fill="#10b981" stroke="#16a34a" strokeWidth="1"/>
                
                {/* Staten Island */}
                <path d="M 80 320 L 130 310 L 140 340 L 130 370 L 85 365 Z" 
                      fill="#059669" stroke="#16a34a" strokeWidth="1"/>
                
                {/* Impact markers */}
                <circle cx="180" cy="180" r="6" fill="#dc2626" opacity="0.7"/>
                <circle cx="220" cy="220" r="8" fill="#dc2626" opacity="0.7"/>
                <circle cx="250" cy="300" r="5" fill="#dc2626" opacity="0.7"/>
                <circle cx="210" cy="110" r="4" fill="#dc2626" opacity="0.7"/>
                <circle cx="110" cy="340" r="4" fill="#dc2626" opacity="0.7"/>
                
                {/* Labels */}
                <text x="178" y="160" fontSize="10" fill="#065f46" fontWeight="bold">Manhattan</text>
                <text x="220" y="240" fontSize="9" fill="#065f46" fontWeight="bold">Brooklyn</text>
                <text x="250" y="235" fontSize="9" fill="#065f46" fontWeight="bold">Queens</text>
                <text x="200" y="105" fontSize="9" fill="#065f46" fontWeight="bold">Bronx</text>
                <text x="95" y="345" fontSize="8" fill="#065f46" fontWeight="bold">Staten Island</text>
              </svg>
              
              {/* Legend */}
              <div className="absolute top-4 right-4 bg-white rounded-lg p-3 shadow-lg">
                <div className="text-gray-900 mb-2">Impact Points</div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 rounded-full bg-red-600"></div>
                  <span className="text-gray-600">Activity hubs</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500"></div>
                  <span className="text-gray-600">High impact</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-gray-900 mb-4">Top Cities</h3>
              <div className="space-y-3">
                {['San Francisco', 'New York', 'Seattle', 'Austin', 'Portland'].map((city, index) => (
                  <div key={city} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">{index + 1}</span>
                      <span className="text-gray-900">{city}</span>
                    </div>
                    <span className="text-green-600">{(5000 - index * 500).toLocaleString()} pts</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-gray-900 mb-4">Top Teams</h3>
              <div className="space-y-3">
                {['Engineering', 'Marketing', 'Sales', 'HR', 'Design'].map((team, index) => (
                  <div key={team} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">{index + 1}</span>
                      <span className="text-gray-900">{team}</span>
                    </div>
                    <span className="text-green-600">{(15000 - index * 1500).toLocaleString()} pts</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-gray-900 mb-4">Recent Milestones</h3>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="text-gray-900">100k Points Reached!</div>
                  <span className="text-gray-500">2 days ago</span>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-gray-900">50 Tons CO₂ Saved</div>
                  <span className="text-gray-500">1 week ago</span>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <div className="text-gray-900">200 Members Joined</div>
                  <span className="text-gray-500">2 weeks ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Join Challenge Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-8 max-w-2xl w-full">
            <h2 className="text-gray-900 text-xl font-bold mb-4">Join Challenge</h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to join the <strong>{selectedChallenge?.title}</strong> challenge?
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                onClick={() => setShowJoinModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                onClick={() => {
                  // Add logic to join the challenge
                  setShowJoinModal(false);
                }}
              >
                Join
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}