import React from 'react';
import { Briefcase, Calendar, TrendingUp, Star } from 'lucide-react';
import { Student, Opportunity } from '../../types';
import { mockOpportunities } from '../../data/mockData';
import { findMatches } from '../../utils/matching';

interface StudentDashboardProps {
  user: Student;
}

export function StudentDashboard({ user }: StudentDashboardProps) {
  const matches = findMatches(user, mockOpportunities);
  const topMatches = matches.slice(0, 3);

  const stats = [
    {
      label: 'Profile Matches',
      value: matches.length,
      icon: TrendingUp,
      color: 'text-green-600 bg-green-100',
    },
    {
      label: 'Applications',
      value: '2',
      icon: Briefcase,
      color: 'text-blue-600 bg-blue-100',
    },
    {
      label: 'Interviews',
      value: '1',
      icon: Calendar,
      color: 'text-purple-600 bg-purple-100',
    },
    {
      label: 'Match Score',
      value: topMatches[0]?.score ? `${Math.round(topMatches[0].score)}%` : 'N/A',
      icon: Star,
      color: 'text-orange-600 bg-orange-100',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
        <p className="text-gray-600 mt-2">Here's what's happening with your opportunities</p>
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

      {/* Top Matches */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Your Top Matches</h2>
          <p className="text-gray-600 mt-1">Opportunities that best match your profile</p>
        </div>
        
        <div className="p-6">
          {topMatches.length > 0 ? (
            <div className="space-y-4">
              {topMatches.map((match) => (
                <div key={match.opportunity.id} className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{match.opportunity.title}</h3>
                      <p className="text-gray-600">{match.opportunity.startup.company}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-purple-600">{Math.round(match.score)}%</span>
                      <span className="text-sm text-gray-500">match</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {match.opportunity.requiredSkills.slice(0, 3).map((skill) => (
                      <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                    {match.reasons.slice(0, 2).map((reason, index) => (
                      <span key={index} className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-green-500" />
                        <span>{reason}</span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No matches yet</h3>
              <p className="text-gray-600">Complete your profile to get matched with opportunities</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
        </div>
        
        <div className="p-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-900">Applied to Frontend Developer Intern at TechFlow</span>
              <span className="text-gray-500">2 hours ago</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-900">New match found: UI/UX Design Gig</span>
              <span className="text-gray-500">1 day ago</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-gray-900">Profile viewed by HealthAI</span>
              <span className="text-gray-500">2 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}