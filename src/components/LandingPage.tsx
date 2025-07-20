import React from 'react';
import { Search, Users, Target, ArrowRight, CheckCircle } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: (userType: 'student' | 'startup') => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SM</span>
              </div>
              <span className="text-xl font-bold text-gray-900">SkillMatch</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => onGetStarted('student')}
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                I'm a Student
              </button>
              <button
                onClick={() => onGetStarted('startup')}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                I'm a Startup
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
            Bridge the gap between
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {' '}talent and opportunity
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Connect skilled students with exciting startup opportunities. 
            Find your perfect match for internships, gigs, and hackathons.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onGetStarted('student')}
              className="bg-purple-600 text-white px-8 py-4 rounded-xl hover:bg-purple-700 transition-all duration-200 flex items-center justify-center space-x-2 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Users className="w-5 h-5" />
              <span>I'm a Student</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => onGetStarted('startup')}
              className="bg-white text-purple-600 px-8 py-4 rounded-xl hover:bg-gray-50 transition-all duration-200 flex items-center justify-center space-x-2 font-semibold text-lg border-2 border-purple-200 hover:border-purple-300 transform hover:-translate-y-1"
            >
              <Target className="w-5 h-5" />
              <span>I'm a Startup</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How SkillMatch Works
            </h2>
            <p className="text-lg text-gray-600">
              Simple, smart, and effective matching for the modern workforce
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Create Your Profile</h3>
              <p className="text-gray-600">
                Showcase your skills, interests, and availability to get matched with relevant opportunities.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Matching</h3>
              <p className="text-gray-600">
                Our algorithm finds the perfect matches based on skills, interests, and requirements.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Connect & Grow</h3>
              <p className="text-gray-600">
                Apply to opportunities, build your network, and accelerate your career growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                For Students
              </h2>
              <div className="space-y-4">
                {[
                  'Discover opportunities that match your skills',
                  'Get hands-on experience with innovative startups',
                  'Build your professional network',
                  'Flexible opportunities that fit your schedule',
                  'Gain real-world experience and portfolio projects'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                For Startups
              </h2>
              <div className="space-y-4">
                {[
                  'Access a pool of talented, motivated students',
                  'Find candidates with the exact skills you need',
                  'Reduce time and cost of traditional recruiting',
                  'Test potential hires through short-term projects',
                  'Build relationships with emerging talent'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to find your perfect match?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of students and startups already using SkillMatch
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onGetStarted('student')}
              className="bg-white text-purple-600 px-8 py-4 rounded-xl hover:bg-gray-50 transition-colors font-semibold text-lg"
            >
              Get Started as Student
            </button>
            <button
              onClick={() => onGetStarted('startup')}
              className="bg-purple-700 text-white px-8 py-4 rounded-xl hover:bg-purple-800 transition-colors font-semibold text-lg border-2 border-purple-500"
            >
              Get Started as Startup
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}