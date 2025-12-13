import { useState } from 'react';
import { ShoppingCart, Heart, Leaf, Package, TrendingUp, DollarSign } from 'lucide-react';

interface MarketplacePageProps {
  userPoints: number;
  onPurchase: (points: number) => void;
}

export function MarketplacePage({ userPoints, onPurchase }: MarketplacePageProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [donationAmount, setDonationAmount] = useState(100);

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'sustainable', name: 'Sustainable Products' },
    { id: 'experiences', name: 'Experiences' },
    { id: 'brands', name: 'Brand Partners' },
    { id: 'charity', name: 'Donate to Causes' },
  ];

  const products = [
    {
      id: '1',
      name: 'Organic Cotton T-Shirt',
      brand: 'EcoWear',
      description: '100% organic cotton, fair trade certified',
      points: 500,
      image: '🌿',
      category: 'sustainable',
      discount: '20% off',
    },
    {
      id: '2',
      name: 'Bamboo Water Bottle',
      brand: 'GreenBottle Co.',
      description: 'Insulated bamboo bottle, keeps drinks cold for 24hrs',
      points: 300,
      image: '🎋',
      category: 'sustainable',
      discount: null,
    },
    {
      id: '3',
      name: 'Solar Power Bank',
      brand: 'SunCharge',
      description: 'Portable solar charger, 10000mAh capacity',
      points: 600,
      image: '☀️',
      category: 'sustainable',
      discount: '15% off',
    },
    {
      id: '4',
      name: 'Plant a Forest',
      brand: 'TreeNation',
      description: 'Plant 10 trees in your name',
      points: 400,
      image: '🌳',
      category: 'charity',
      discount: null,
    },
    {
      id: '5',
      name: 'Eco-Friendly Yoga Mat',
      brand: 'YogaEarth',
      description: 'Made from recycled materials, non-toxic',
      points: 450,
      image: '🧘',
      category: 'sustainable',
      discount: null,
    },
    {
      id: '6',
      name: 'Sustainable Gift Box',
      brand: 'Multiple Brands',
      description: 'Curated box of eco-friendly products',
      points: 800,
      image: '🎁',
      category: 'brands',
      discount: '25% off',
    },
    {
      id: '7',
      name: 'Ocean Cleanup Support',
      brand: 'Ocean Conservancy',
      description: 'Support ocean cleanup initiatives',
      points: 250,
      image: '🌊',
      category: 'charity',
      discount: null,
    },
    {
      id: '8',
      name: 'Zero-Waste Starter Kit',
      brand: 'ZeroWaste Co.',
      description: 'Everything you need to start your zero-waste journey',
      points: 550,
      image: '♻️',
      category: 'sustainable',
      discount: '10% off',
    },
    {
      id: '9',
      name: 'City Bike Tour',
      brand: 'Urban Adventures',
      description: 'Guided eco-friendly bike tour of the city',
      points: 400,
      image: '🚴',
      category: 'experiences',
      discount: null,
    },
    {
      id: '10',
      name: 'Cooking Class: Zero Waste',
      brand: 'Green Kitchen',
      description: 'Learn to cook sustainable, zero-waste meals',
      points: 350,
      image: '👨‍🍳',
      category: 'experiences',
      discount: null,
    },
    {
      id: '11',
      name: 'National Park Pass',
      brand: 'Parks Service',
      description: 'One-year access to all national parks',
      points: 700,
      image: '🏞️',
      category: 'experiences',
      discount: null,
    },
    {
      id: '12',
      name: 'Eco Spa Day',
      brand: 'Green Spa',
      description: 'Full day at eco-friendly spa retreat',
      points: 900,
      image: '🧖',
      category: 'experiences',
      discount: '15% off',
    },
  ];

  const brandPartners = [
    {
      name: 'Patagonia',
      logo: '🏔️',
      description: 'Outdoor clothing & gear',
      discount: '15% off with points',
    },
    {
      name: 'Allbirds',
      logo: '👟',
      description: 'Sustainable footwear',
      discount: '20% off with points',
    },
    {
      name: 'Seventh Generation',
      logo: '🧴',
      description: 'Eco-friendly cleaning products',
      discount: '10% off with points',
    },
  ];

  const charities = [
    {
      id: '1',
      name: 'World Wildlife Fund',
      logo: '🐼',
      description: 'Protecting endangered species and habitats',
      impactPerPoint: '0.1kg CO₂ offset',
    },
    {
      id: '2',
      name: 'The Ocean Cleanup',
      logo: '🌊',
      description: 'Removing plastic from oceans',
      impactPerPoint: '5g plastic removed',
    },
    {
      id: '3',
      name: 'One Tree Planted',
      logo: '🌲',
      description: 'Planting trees worldwide',
      impactPerPoint: '0.01 trees planted',
    },
  ];

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const handlePurchase = (points: number) => {
    if (userPoints >= points) {
      onPurchase(points);
      alert('Purchase successful! Your item will be delivered soon.');
    }
  };

  const handleDonate = () => {
    if (userPoints >= donationAmount) {
      onPurchase(donationAmount);
      setShowDonateModal(false);
      alert(`Thank you for donating ${donationAmount} points to environmental causes!`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-green-800 mb-2">Eco-Marketplace</h1>
          <p className="text-gray-600">Redeem points for sustainable products and support green causes</p>
        </div>
        <div className="bg-green-600 text-white px-6 py-3 rounded-lg">
          <div className="text-green-100">Your Points</div>
          <div>{userPoints}</div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              selectedCategory === cat.id
                ? 'bg-green-600 text-white'
                : 'bg-white border border-gray-200 text-gray-700 hover:border-green-300'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Brand Partners Section */}
      {selectedCategory === 'brands' && (
        <div className="mb-8">
          <h2 className="text-gray-900 mb-4">Our Brand Partners</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {brandPartners.map((brand) => (
              <div key={brand.name} className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="text-center mb-4">
                  <div className="text-6xl mb-3">{brand.logo}</div>
                  <h3 className="text-gray-900 mb-1">{brand.name}</h3>
                  <p className="text-gray-600 mb-3">{brand.description}</p>
                  <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full inline-block">
                    {brand.discount}
                  </div>
                </div>
                <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                  View Products
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Charity Donation Section */}
      {selectedCategory === 'charity' && (
        <div className="mb-8">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200 mb-6">
            <h2 className="text-gray-900 mb-2">Make a Direct Donation</h2>
            <p className="text-gray-600 mb-4">Convert your points into real environmental impact</p>
            <button
              onClick={() => setShowDonateModal(true)}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Donate Points
            </button>
          </div>

          <h2 className="text-gray-900 mb-4">Featured Charities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {charities.map((charity) => (
              <div key={charity.id} className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="text-center mb-4">
                  <div className="text-6xl mb-3">{charity.logo}</div>
                  <h3 className="text-gray-900 mb-1">{charity.name}</h3>
                  <p className="text-gray-600 mb-3">{charity.description}</p>
                  <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full inline-block">
                    {charity.impactPerPoint}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => {
          const canAfford = userPoints >= product.points;

          return (
            <div key={product.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:border-green-300 transition-all">
              <div className="text-center mb-4">
                <div className="text-6xl mb-3">{product.image}</div>
                {product.discount && (
                  <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full inline-block mb-2">
                    {product.discount}
                  </div>
                )}
              </div>
              
              <h3 className="text-gray-900 mb-1">{product.name}</h3>
              <p className="text-gray-500 mb-2">{product.brand}</p>
              <p className="text-gray-600 mb-4">{product.description}</p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="text-green-600">{product.points} points</div>
                <button className="text-gray-400 hover:text-red-500 transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
              
              <button
                onClick={() => handlePurchase(product.points)}
                disabled={!canAfford}
                className={`w-full py-2 rounded-lg transition-colors ${
                  canAfford
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {canAfford ? 'Redeem' : `Need ${product.points - userPoints} more points`}
              </button>
            </div>
          );
        })}
      </div>

      {/* Donation Modal */}
      {showDonateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h2 className="text-gray-900 mb-4">Donate Points</h2>
            <p className="text-gray-600 mb-4">Choose how many points you'd like to donate to environmental causes</p>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Donation Amount</label>
              <input
                type="number"
                value={donationAmount}
                onChange={(e) => setDonationAmount(Number(e.target.value))}
                min="10"
                max={userPoints}
                step="10"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Your Points:</span>
                <span className="text-gray-900">{userPoints}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Donation:</span>
                <span className="text-red-600">-{donationAmount}</span>
              </div>
              <div className="border-t border-gray-200 pt-2 mt-2">
                <div className="flex justify-between">
                  <span className="text-gray-900">Remaining:</span>
                  <span className="text-green-600">{userPoints - donationAmount}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDonateModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDonate}
                disabled={donationAmount > userPoints || donationAmount < 10}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Donate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}