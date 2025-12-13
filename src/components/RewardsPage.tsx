import { useState } from 'react';
import { Coffee, Gift, ShoppingBag, TreePine, Shirt, Book, Headphones, Heart } from 'lucide-react';

interface RewardsPageProps {
  userPoints: number;
  onRedeem: (points: number) => void;
}

export function RewardsPage({ userPoints, onRedeem }: RewardsPageProps) {
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [selectedReward, setSelectedReward] = useState<any>(null);

  const rewards = [
    {
      id: '1',
      name: 'Free Coffee',
      description: 'Redeem for a free coffee at the office café',
      points: 50,
      icon: Coffee,
      color: 'bg-amber-100',
      iconColor: 'text-amber-600',
    },
    {
      id: '2',
      name: 'Free Lunch',
      description: 'Enjoy a complimentary lunch from our canteen',
      points: 150,
      icon: Gift,
      color: 'bg-orange-100',
      iconColor: 'text-orange-600',
    },
    {
      id: '3',
      name: 'Eco Tote Bag',
      description: 'Branded reusable tote bag made from recycled materials',
      points: 200,
      icon: ShoppingBag,
      color: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      id: '4',
      name: 'Plant a Tree',
      description: 'We\'ll plant a tree in your name',
      points: 300,
      icon: TreePine,
      color: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
    },
    {
      id: '5',
      name: 'Company Merch',
      description: 'Choose from our sustainable merchandise collection',
      points: 250,
      icon: Shirt,
      color: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      id: '6',
      name: 'Book Voucher',
      description: '$25 voucher for eco-friendly books',
      points: 400,
      icon: Book,
      color: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
    {
      id: '7',
      name: 'Wireless Earbuds',
      description: 'Premium eco-friendly wireless earbuds',
      points: 800,
      icon: Headphones,
      color: 'bg-indigo-100',
      iconColor: 'text-indigo-600',
    },
    {
      id: '8',
      name: 'Charity Donation',
      description: 'Donate to an environmental charity of your choice',
      points: 500,
      icon: Heart,
      color: 'bg-pink-100',
      iconColor: 'text-pink-600',
    },
  ];

  const handleRedeemClick = (reward: any) => {
    if (userPoints >= reward.points) {
      setSelectedReward(reward);
      setShowRedeemModal(true);
    }
  };

  const confirmRedeem = () => {
    if (selectedReward) {
      onRedeem(selectedReward.points);
      setShowRedeemModal(false);
      setSelectedReward(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-green-800 mb-2">Rewards</h1>
          <p className="text-gray-600">Redeem your points for exciting rewards</p>
        </div>
        <div className="bg-green-600 text-white px-6 py-3 rounded-lg">
          <div className="text-green-100">Your Points</div>
          <div>{userPoints}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rewards.map((reward) => {
          const Icon = reward.icon;
          const canAfford = userPoints >= reward.points;

          return (
            <div
              key={reward.id}
              className={`bg-white rounded-xl p-6 border-2 transition-all ${
                canAfford ? 'border-gray-200 hover:border-green-300' : 'border-gray-100 opacity-60'
              }`}
            >
              <div className={`w-16 h-16 ${reward.color} rounded-lg flex items-center justify-center mb-4`}>
                <Icon className={`w-8 h-8 ${reward.iconColor}`} />
              </div>
              
              <h3 className="text-gray-900 mb-2">{reward.name}</h3>
              <p className="text-gray-600 mb-4">{reward.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="text-green-600">{reward.points} points</div>
                <button
                  onClick={() => handleRedeemClick(reward)}
                  disabled={!canAfford}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    canAfford
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Redeem
                </button>
              </div>
              
              {!canAfford && (
                <div className="mt-3 text-gray-500">
                  Need {reward.points - userPoints} more points
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Redeem Confirmation Modal */}
      {showRedeemModal && selectedReward && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h2 className="text-gray-900 mb-4">Confirm Redemption</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to redeem <span className="text-gray-900">{selectedReward.name}</span> for{' '}
              <span className="text-green-600">{selectedReward.points} points</span>?
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Current Points:</span>
                <span className="text-gray-900">{userPoints}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Reward Cost:</span>
                <span className="text-red-600">-{selectedReward.points}</span>
              </div>
              <div className="border-t border-gray-200 pt-2 mt-2">
                <div className="flex justify-between">
                  <span className="text-gray-900">Remaining Points:</span>
                  <span className="text-green-600">{userPoints - selectedReward.points}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowRedeemModal(false);
                  setSelectedReward(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmRedeem}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
