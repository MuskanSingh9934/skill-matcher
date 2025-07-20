import React, { useState } from 'react';
import { Save, Plus, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Student, Startup } from '../../types';

export function ProfileSetup() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  // Student-specific state
  const [skills, setSkills] = useState<string[]>((user as Student)?.skills || []);
  const [interests, setInterests] = useState<string[]>((user as Student)?.interests || []);
  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    bio: user?.type === 'student' ? (user as Student).bio || '' : (user as Startup).description || '',
    location: user?.type === 'student' ? (user as Student).location || '' : (user as Startup).location || '',
    availability: user?.type === 'student' ? (user as Student).availability || 'flexible' : '',
    experience: user?.type === 'student' ? (user as Student).experience || 'beginner' : '',
    portfolio: user?.type === 'student' ? (user as Student).portfolio || '' : '',
    github: user?.type === 'student' ? (user as Student).github || '' : '',
    linkedin: user?.type === 'student' ? (user as Student).linkedin || '' : '',
    // Startup fields
    company: user?.type === 'startup' ? (user as Startup).company || '' : '',
    industry: user?.type === 'startup' ? (user as Startup).industry || '' : '',
    stage: user?.type === 'startup' ? (user as Startup).stage || 'pre-seed' : '',
    website: user?.type === 'startup' ? (user as Startup).website || '' : '',
    teamSize: user?.type === 'startup' ? (user as Startup).teamSize || '1-5' : '',
  });

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const addInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest('');
    }
  };

  const removeInterest = (interestToRemove: string) => {
    setInterests(interests.filter(interest => interest !== interestToRemove));
  };

  const handleSave = () => {
    const updates = {
      ...formData,
      ...(user?.type === 'student' && {
        skills,
        interests,
        bio: formData.bio,
      }),
      ...(user?.type === 'startup' && {
        description: formData.bio,
      }),
    };
    
    updateProfile(updates);
    setIsEditing(false);
  };

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
              <p className="text-gray-600 mt-1">
                {user.type === 'student' 
                  ? 'Complete your profile to get better matches' 
                  : 'Manage your company profile and preferences'}
              </p>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Basic Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={user.name}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                />
              </div>

              {user.type === 'startup' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  disabled={!isEditing}
                  placeholder="City, State"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
            </div>
          </div>

          {/* Student-specific fields */}
          {user.type === 'student' && (
            <>
              {/* Skills */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                    >
                      {skill}
                      {isEditing && (
                        <button
                          onClick={() => removeSkill(skill)}
                          className="ml-2 text-purple-500 hover:text-purple-700"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </span>
                  ))}
                </div>
                
                {isEditing && (
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Add a skill"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                    />
                    <button
                      onClick={addSkill}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Interests */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Interests</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {interests.map((interest) => (
                    <span
                      key={interest}
                      className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                    >
                      {interest}
                      {isEditing && (
                        <button
                          onClick={() => removeInterest(interest)}
                          className="ml-2 text-blue-500 hover:text-blue-700"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </span>
                  ))}
                </div>
                
                {isEditing && (
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newInterest}
                      onChange={(e) => setNewInterest(e.target.value)}
                      placeholder="Add an interest"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      onKeyPress={(e) => e.key === 'Enter' && addInterest()}
                    />
                    <button
                      onClick={addInterest}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Availability and Experience */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Availability
                  </label>
                  <select
                    value={formData.availability}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                  >
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="weekends">Weekends only</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience Level
                  </label>
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>

              {/* Links */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Portfolio URL
                  </label>
                  <input
                    type="url"
                    value={formData.portfolio}
                    onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                    disabled={!isEditing}
                    placeholder="https://your-portfolio.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={formData.github}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    disabled={!isEditing}
                    placeholder="https://github.com/username"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    disabled={!isEditing}
                    placeholder="https://linkedin.com/in/username"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
              </div>
            </>
          )}

          {/* Startup-specific fields */}
          {user.type === 'startup' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry
                </label>
                <input
                  type="text"
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  disabled={!isEditing}
                  placeholder="e.g., FinTech, HealthTech, SaaS"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Stage
                </label>
                <select
                  value={formData.stage}
                  onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                >
                  <option value="pre-seed">Pre-seed</option>
                  <option value="seed">Seed</option>
                  <option value="series-a">Series A</option>
                  <option value="series-b">Series B</option>
                  <option value="growth">Growth</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Team Size
                </label>
                <select
                  value={formData.teamSize}
                  onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                >
                  <option value="1-5">1-5 employees</option>
                  <option value="6-10">6-10 employees</option>
                  <option value="11-25">11-25 employees</option>
                  <option value="26-50">26-50 employees</option>
                  <option value="50+">50+ employees</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website URL
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  disabled={!isEditing}
                  placeholder="https://your-company.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
            </div>
          )}

          {/* Bio/Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {user.type === 'student' ? 'Bio' : 'Company Description'}
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              disabled={!isEditing}
              rows={4}
              placeholder={user.type === 'student' 
                ? 'Tell us about yourself, your goals, and what you\'re looking for...'
                : 'Describe your company, mission, and what makes it unique...'}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>

          {/* Save Button */}
          {isEditing && (
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}