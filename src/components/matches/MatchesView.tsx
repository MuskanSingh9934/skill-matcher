import React from 'react';
import { Heart, X, Star } from 'lucide-react';
import { Student } from '../../types';
import { mockOpportunities } from '../../data/mockData';
import { findMatches } from '../../utils/matching';
import { OpportunityCard } from '../opportunities/OpportunityCard';

interface MatchesViewProps {
  user: Student;
}

export function MatchesView({ user }: MatchesViewProps) {
  const matches = findMatches(user, mockOpportunities);

  const handleLike = (opportunityId: string) => {
    alert(`Added opportunity ${opportunityId} to favorites!`);
  };

  const handlePass = (opportunityId: string) => {
    alert(`Passed on opportunity ${opportunityId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Matches</h1>
        <p className="text-gray-600">Opportunities tailored to your skills and interests</p>
      </div>

      {matches.length > 0 ? (
        <div className="space-y-8">
          {matches.map((match) => (
            <div key={match.opportunity.id} className="relative">
              <OpportunityCard
                opportunity={match.opportunity}
                showMatchScore={true}
                matchScore={match.score}
                onApply={() => alert(`Applied to ${match.opportunity.title}!`)}
              />
              
              {/* Match Reasons */}
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2 flex items-center">
                  <Star className="w-4 h-4 mr-2" />
                  Why this is a great match:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {match.reasons.map((reason, index) => (
                    <div key={index} className="flex items-center space-x-2 text-green-700">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span className="text-sm">{reason}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center space-x-4 mt-6">
                <button
                  onClick={() => handlePass(match.opportunity.id)}
                  className="flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                  <span>Pass</span>
                </button>
                
                <button
                  onClick={() => handleLike(match.opportunity.id)}
                  className="flex items-center space-x-2 px-6 py-3 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                >
                  <Heart className="w-5 h-5" />
                  <span>Like</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">No matches yet</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Complete your profile with skills and interests to get personalized opportunity matches
          </p>
          <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">
            Complete Profile
          </button>
        </div>
      )}
    </div>
  );
}