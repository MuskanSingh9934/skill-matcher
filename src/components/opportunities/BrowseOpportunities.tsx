import React, { useState } from 'react';
import { Search, Filter, MapPin } from 'lucide-react';
import { Opportunity } from '../../types';
import { mockOpportunities } from '../../data/mockData';
import { OpportunityCard } from './OpportunityCard';

export function BrowseOpportunities() {
  const [opportunities] = useState<Opportunity[]>(mockOpportunities);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [locationFilter, setLocationFilter] = useState<string>('all');

  const filteredOpportunities = opportunities.filter(opp => {
    const matchesSearch = opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         opp.startup.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         opp.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = typeFilter === 'all' || opp.type === typeFilter;
    
    const matchesLocation = locationFilter === 'all' || 
                           (locationFilter === 'remote' && opp.remote) ||
                           opp.location.toLowerCase().includes(locationFilter.toLowerCase());
    
    return matchesSearch && matchesType && matchesLocation;
  });

  const handleApply = (opportunityId: string) => {
    // Mock application - in real app, this would submit to backend
    alert(`Applied to opportunity ${opportunityId}! Check your applications page.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Opportunities</h1>
        <p className="text-gray-600">Discover internships, gigs, and hackathons that match your interests</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search opportunities, companies, skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="internship">Internships</option>
              <option value="gig">Gigs</option>
              <option value="hackathon">Hackathons</option>
            </select>
          </div>
          
          <div>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Locations</option>
              <option value="remote">Remote</option>
              <option value="san francisco">San Francisco</option>
              <option value="boston">Boston</option>
              <option value="new york">New York</option>
            </select>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Filter className="w-4 h-4" />
            <span>{filteredOpportunities.length} opportunities found</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select className="text-sm border border-gray-300 rounded px-2 py-1">
              <option>Relevance</option>
              <option>Date Posted</option>
              <option>Company Name</option>
            </select>
          </div>
        </div>
      </div>

      {/* Opportunities Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredOpportunities.map((opportunity) => (
          <OpportunityCard
            key={opportunity.id}
            opportunity={opportunity}
            onApply={() => handleApply(opportunity.id)}
          />
        ))}
      </div>

      {filteredOpportunities.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No opportunities found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or filters</p>
        </div>
      )}
    </div>
  );
}