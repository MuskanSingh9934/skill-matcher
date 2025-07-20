import React, { useState } from 'react';
import { ArrowLeft, Mail, Lock, User, Building } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Student, Startup } from '../../types';

interface AuthFormProps {
  userType: 'student' | 'startup';
  onBack: () => void;
}

export function AuthForm({ userType, onBack }: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock authentication - in real app, this would connect to your backend
    const baseUser = {
      id: `${userType}-${Date.now()}`,
      email,
      name,
      type: userType,
      createdAt: new Date(),
    };

    if (userType === 'student') {
      const studentUser: Student = {
        ...baseUser,
        type: 'student',
        skills: [],
        interests: [],
        availability: 'flexible',
        experience: 'beginner',
        bio: '',
        location: '',
      };
      login(studentUser);
    } else {
      const startupUser: Startup = {
        ...baseUser,
        type: 'startup',
        company: company || name,
        industry: '',
        stage: 'pre-seed',
        location: '',
        description: '',
        teamSize: '1-5',
      };
      login(startupUser);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to home</span>
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              {userType === 'student' ? (
                <User className="w-6 h-6 text-white" />
              ) : (
                <Building className="w-6 h-6 text-white" />
              )}
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              {isLogin ? 'Welcome back' : 'Get started'}
            </h2>
            <p className="text-gray-600 mt-2">
              {isLogin 
                ? `Sign in to your ${userType} account` 
                : `Create your ${userType} account`}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>
            )}

            {!isLogin && userType === 'startup' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name
                </label>
                <div className="relative">
                  <Building className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your company name"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              {isLogin 
                ? "Don't have an account? Sign up" 
                : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}