import React from 'react';

export default function Dashboard() {
  const campaigns = [
    {
      id: 1,
      title: "Ludo King Promo",
      payout: "₹50 per 1k views",
      videoUrl: "#",
      status: "Active"
    },
    {
      id: 2,
      title: "Crypto App Review",
      payout: "₹100 per 1k views",
      videoUrl: "#",
      status: "High Paying"
    },
    {
      id: 3,
      title: "Funny Cat Compilation",
      payout: "₹20 per 1k views",
      videoUrl: "#",
      status: "Easy Viral"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      {/* Header */}
      <header className="border-b border-gray-800 p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-400">CreatorGigs</h1>
        <div className="flex gap-4">
          <span className="text-gray-400">Balance: ₹0</span>
          <button className="bg-green-500 px-4 py-1 rounded text-black font-bold">Wallet</button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <h2 className="text-xl mb-4">Available Campaigns</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((gig) => (
            <div key={gig.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-green-500 transition">
              <div className="h-40 bg-gray-700 rounded mb-4 flex items-center justify-center text-gray-500">
                [VIDEO PREVIEW]
              </div>
              
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">{gig.title}</h3>
                <span className="text-xs bg-green-900 text-green-300 px-2 py-1 rounded">{gig.status}</span>
              </div>
              
              <p className="text-gray-400 text-sm mb-4">{gig.payout}</p>
              
              <div className="flex gap-2">
                <button className="flex-1 bg-white text-black py-2 rounded font-medium hover:bg-gray-200">
                  Download
                </button>
                <button className="flex-1 border border-green-500 text-green-500 py-2 rounded font-medium hover:bg-green-500 hover:text-black">
                  Submit Link
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
