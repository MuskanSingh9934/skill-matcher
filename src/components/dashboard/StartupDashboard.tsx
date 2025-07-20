import React from 'react';
import { Users, Eye, MessageSquare, TrendingUp } from 'lucide-react';
import { Startup } from '../../types';
import { mockOpportunities } from '../../data/mockData';

interface StartupDashboardProps {
  user: Startup;
}

export function StartupDashboard({ user }: StartupDashboardProps) {
  const myOpportunities = mockOpportunities.filter(opp => opp.startupId === user.id);

  const stats = [
    {
      label: 'Active Opportunities',
      value: myOpportunities.length,
      icon: TrendingUp,
      color: 'text-green-600 bg-green-100',
    },
    {
      label: 'Total Applications',
      value: '8',
      icon: Users,
      color: 'text-blue-600 bg-blue-100',
    },
    {
      label: 'Profile Views',
      value: '24',
      icon: Eye,
      color: 'text-purple-600 bg-purple-100',
    },
    {
      label: 'Messages',
      value: '3',
      icon: MessageSquare,
      color: 'text-orange-600 bg-orange-100',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
        <p className="text-gray-600 mt-2">{user.company} • {user.industry}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Applications */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Recent Applications</h2>
          <p className="text-gray-600 mt-1">Students who applied to your opportunities</p>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">AC</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Alice Chen</h3>
                  <p className="text-gray-600 text-sm">Applied to Frontend Developer Intern</p>
                  <div className="flex space-x-2 mt-1">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">React</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">TypeScript</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                  Accept
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  Review
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">BM</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Bob Martinez</h3>
                  <p className="text-gray-600 text-sm">Applied to UI/UX Design Gig</p>
                  <div className="flex space-x-2 mt-1">
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">Figma</span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">Prototyping</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                  Accept
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  Review
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Opportunities */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Your Active Opportunities</h2>
        </div>
        
        <div className="p-6">
          {myOpportunities.length > 0 ? (
            <div className="space-y-4">
              {myOpportunities.map((opportunity) => (
                <div key={opportunity.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{opportunity.title}</h3>
                      <p className="text-gray-600">{opportunity.type} • {opportunity.commitment}</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                      {opportunity.status}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {opportunity.requiredSkills.map((skill) => (
                      <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{opportunity.compensation}</span>
                    <span>3 applications</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No opportunities posted</h3>
              <p className="text-gray-600">Create your first opportunity to start finding talent</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}