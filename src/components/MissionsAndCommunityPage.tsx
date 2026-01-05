import { useState } from 'react';
import { Target, Lock, CheckCircle, Sparkles, Camera, Scan, Users, Trophy, MapPin, Heart, MessageCircle, Share2, Globe } from 'lucide-react';
//import mapImage from '../assets/2d4ec5397c951fdaf4b8b789f66d16a496aed1c5.png';
const mapImage = new URL('../assets/2d4ec539c951fdaf4b8b789f66d16a496aed1c5.png', import.meta.url).href;

interface Activity {
  id: string;
  activity: string;
  points: number;
  date: string;
  category?: string;
}

interface MissionsAndCommunityPageProps {
  userPoints: number;
  activities: Activity[];
  onCompleteTask: (activity: string, points: number, category: string) => void;
}

export function MissionsAndCommunityPage({ userPoints, activities, onCompleteTask }: MissionsAndCommunityPageProps) {
  const [activeSection, setActiveSection] = useState<'missions' | 'challenges' | 'feed' | 'impact'>('missions');
  const [selectedMission, setSelectedMission] = useState<string | null>(null);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<any>(null);

  const missions = [
    {
      id: '1',
      title: 'Green Commuter',
      description: 'Complete 5 sustainable commutes this week',
      difficulty: 'Easy',
      progress: activities.filter(a => a.category === 'Transportation').length,
      target: 5,
      reward: 250,
      xp: 100,
      status: 'active',
      tasks: [
        { id: 't1', name: 'Cycle to work', completed: true },
        { id: 't2', name: 'Walk to a meeting', completed: true },
        { id: 't3', name: 'Use public transport', completed: false },
        { id: 't4', name: 'Carpool with colleagues', completed: false },
        { id: 't5', name: 'Work from home (save commute)', completed: false },
      ],
    },
    {
      id: '2',
      title: 'Zero Waste Champion',
      description: 'Reduce waste by using reusable items 10 times',
      difficulty: 'Medium',
      progress: activities.filter(a => a.category === 'Waste Reduction').length,
      target: 10,
      reward: 400,
      xp: 200,
      status: 'active',
      tasks: [
        { id: 't1', name: 'Use reusable cup 3 times', completed: true },
        { id: 't2', name: 'Bring reusable bags shopping', completed: false },
        { id: 't3', name: 'Pack lunch in reusable containers', completed: false },
        { id: 't4', name: 'Use refillable water bottle daily', completed: false },
      ],
    },
    {
      id: '3',
      title: 'Recycling Master',
      description: 'Properly sort and recycle waste for 7 days',
      difficulty: 'Easy',
      progress: activities.filter(a => a.category === 'Recycling').length,
      target: 7,
      reward: 300,
      xp: 150,
      status: 'active',
      tasks: [
        { id: 't1', name: 'Recycle paper and cardboard', completed: true },
        { id: 't2', name: 'Compost food waste', completed: true },
        { id: 't3', name: 'Recycle plastic bottles', completed: false },
        { id: 't4', name: 'Recycle electronics properly', completed: false },
      ],
    },
    {
      id: '4',
      title: 'Energy Saver Pro',
      description: 'Save energy through conscious actions',
      difficulty: 'Medium',
      progress: activities.filter(a => a.category === 'Energy').length,
      target: 8,
      reward: 350,
      xp: 180,
      status: 'active',
      tasks: [
        { id: 't1', name: 'Turn off lights when leaving', completed: false },
        { id: 't2', name: 'Unplug devices overnight', completed: false },
        { id: 't3', name: 'Use natural light during day', completed: false },
        { id: 't4', name: 'Adjust thermostat mindfully', completed: false },
      ],
    },
    {
      id: '5',
      title: 'Eco Influencer',
      description: 'Inspire 5 colleagues to join sustainability efforts',
      difficulty: 'Hard',
      progress: 0,
      target: 5,
      reward: 600,
      xp: 300,
      status: 'locked',
      tasks: [],
    },
  ];

  const aiTips = [
    {
      id: '1',
      title: 'Smart Tip: Weather-Based Suggestion',
      tip: 'Based on today\'s sunny weather (72°F), cycling would be ideal! You could save 2.5kg CO₂ and earn 50 points.',
      icon: '☀️',
    },
    {
      id: '2',
      title: 'Pattern Insight',
      tip: 'You typically use reusable items on weekdays. Setting a morning reminder could help maintain this habit on weekends too!',
      icon: '📊',
    },
    {
      id: '3',
      title: 'Personalized Goal',
      tip: 'You\'re close to the Silver badge! Just 150 more points. Try carpooling 5 times this week to reach it.',
      icon: '🎯',
    },
  ];

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
    co2Saved: 62840,
    treesPlanted: 89,
    wasteReduced: 37704,
  };

  

  

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-green-800 mb-2">Missions & Community</h1>
      <p className="text-gray-600 mb-8">Complete missions, connect with others, and make an impact together</p>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200 overflow-x-auto">
        <button
          onClick={() => setActiveSection('missions')}
          className={`px-4 py-2 border-b-2 transition-colors whitespace-nowrap ${
            activeSection === 'missions'
              ? 'border-green-600 text-green-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Eco Missions
        </button>
        <button
          onClick={() => setActiveSection('challenges')}
          className={`px-4 py-2 border-b-2 transition-colors whitespace-nowrap ${
            activeSection === 'challenges'
              ? 'border-green-600 text-green-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Team Challenges
        </button>
        <button
          onClick={() => setActiveSection('feed')}
          className={`px-4 py-2 border-b-2 transition-colors whitespace-nowrap ${
            activeSection === 'feed'
              ? 'border-green-600 text-green-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Friends Feed
        </button>
        <button
          onClick={() => setActiveSection('impact')}
          className={`px-4 py-2 border-b-2 transition-colors whitespace-nowrap ${
            activeSection === 'impact'
              ? 'border-green-600 text-green-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Impact Map
        </button>
      </div>

      {/* Missions Tab */}
      {activeSection === 'missions' && (
        <div>
          


            

          {/* AI Tips Section */}
          <div className="mb-8">
            <h2 className="text-gray-900 mb-4">AI-Generated Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {aiTips.map((tip) => (
                <div key={tip.id} className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="text-4xl mb-3">{tip.icon}</div>
                  <h3 className="text-gray-900 mb-2">{tip.title}</h3>
                  <p className="text-gray-600">{tip.tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Missions Grid */}
          <h2 className="text-gray-900 mb-4">Active Missions</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {missions.map((mission) => {
              const isLocked = mission.status === 'locked';
              const progressPercent = (mission.progress / mission.target) * 100;

              return (
                <div
                  key={mission.id}
                  className={`bg-white rounded-xl p-6 border-2 transition-all ${
                    isLocked
                      ? 'border-gray-200 opacity-60'
                      : selectedMission === mission.id
                      ? 'border-green-500'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                  onClick={() => !isLocked && setSelectedMission(mission.id)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-gray-900">{mission.title}</h3>
                        {isLocked && <Lock className="w-4 h-4 text-gray-400" />}
                      </div>
                      <p className="text-gray-600 mb-2">{mission.description}</p>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-white ${
                          mission.difficulty === 'Easy' ? 'bg-green-500' :
                          mission.difficulty === 'Medium' ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}>
                          {mission.difficulty}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-600 mb-1">+{mission.reward} pts</div>
                      <div className="text-gray-500">+{mission.xp} XP</div>
                    </div>
                  </div>

                  {!isLocked && (
                    <>
                      <div className="mb-4">
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">Progress</span>
                          <span className="text-gray-900">
                            {mission.progress}/{mission.target}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-green-500 h-3 rounded-full transition-all"
                            style={{ width: `${progressPercent}%` }}
                          />
                        </div>
                      </div>

                      {selectedMission === mission.id && mission.tasks.length > 0 && (
                        <div className="border-t border-gray-200 pt-4">
                          <h4 className="text-gray-900 mb-3">Tasks</h4>
                          <div className="space-y-2">
                            {mission.tasks.map((task) => (
                              <div
                                key={task.id}
                                className={`flex items-center gap-3 p-3 rounded-lg ${
                                  task.completed ? 'bg-green-50' : 'bg-gray-50'
                                }`}
                              >
                                {task.completed ? (
                                  <CheckCircle className="w-5 h-5 text-green-600" />
                                ) : (
                                  <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
                                )}
                                <span className={task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}>
                                  {task.name}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {isLocked && (
                    <div className="text-center py-4 text-gray-500">
                      Complete previous missions to unlock
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Team Challenges Tab */}
      {activeSection === 'challenges' && (
        <div>
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
        </div>
      )}

      {/* Friends Feed Tab */}
      {activeSection === 'feed' && (
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
      {activeSection === 'impact' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-5 h-5 text-green-600" />
              <h2 className="text-gray-900">NYC Community Impact Map</h2>
            </div>
            <div className="rounded-lg overflow-hidden">
              <img src={mapImage} alt="NYC Community Impact Map" className="w-full h-auto" />
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-8 max-w-2xl w-full">
            <h2 className="text-gray-900 mb-4">Join Challenge</h2>
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
