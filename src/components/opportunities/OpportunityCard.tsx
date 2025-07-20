import React from 'react';
import { MapPin, Clock, DollarSign, Users, Calendar } from 'lucide-react';
import { Opportunity } from '../../types';

interface OpportunityCardProps {
  opportunity: Opportunity;
  onApply?: () => void;
  showMatchScore?: boolean;
  matchScore?: number;
}

export function OpportunityCard({ opportunity, onApply, showMatchScore, matchScore }: OpportunityCardProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'internship':
        return 'bg-blue-100 text-blue-700';
      case 'gig':
        return 'bg-green-100 text-green-700';
      case 'hackathon':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-xl font-semibold text-gray-900">{opportunity.title}</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(opportunity.type)}`}>
              {opportunity.type}
            </span>
          </div>
          <p className="text-gray-600 font-medium">{opportunity.startup.company}</p>
          <p className="text-gray-500 text-sm">{opportunity.startup.industry}</p>
        </div>
        
        {showMatchScore && matchScore && (
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{Math.round(matchScore)}%</div>
            <div className="text-sm text-gray-500">match</div>
          </div>
        )}
      </div>

      <p className="text-gray-700 mb-4 line-clamp-2">{opportunity.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {opportunity.requiredSkills.slice(0, 4).map((skill) => (
          <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded-md">
            {skill}
          </span>
        ))}
        {opportunity.requiredSkills.length > 4 && (
          <span className="px-2 py-1 bg-gray-100 text-gray-500 text-sm rounded-md">
            +{opportunity.requiredSkills.length - 4} more
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4" />
          <span>{opportunity.remote ? 'Remote' : opportunity.location}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4" />
          <span>{opportunity.commitment}</span>
        </div>
        <div className="flex items-center space-x-2">
          <DollarSign className="w-4 h-4" />
          <span>{opportunity.compensation}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4" />
          <span>{opportunity.duration}</span>
        </div>
      </div>

      {opportunity.deadline && (
        <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
          <p className="text-orange-700 text-sm font-medium">
            Application deadline: {opportunity.deadline.toLocaleDateString()}
          </p>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Users className="w-4 h-4" />
          <span>Team size: {opportunity.startup.teamSize}</span>
        </div>
        
        {onApply && (
          <button
            onClick={onApply}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            Apply Now
          </button>
        )}
      </div>
    </div>
  );
}