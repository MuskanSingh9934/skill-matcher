import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LandingPage } from './components/LandingPage';
import { AuthForm } from './components/auth/AuthForm';
import { Header } from './components/Header';
import { StudentDashboard } from './components/dashboard/StudentDashboard';
import { StartupDashboard } from './components/dashboard/StartupDashboard';
import { BrowseOpportunities } from './components/opportunities/BrowseOpportunities';
import { MatchesView } from './components/matches/MatchesView';
import { ProfileSetup } from './components/profile/ProfileSetup';
import { Student, Startup } from './types';

function AppContent() {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState('dashboard');
  const [authMode, setAuthMode] = useState<'student' | 'startup' | null>(null);

  // Landing page
  if (!user && !authMode) {
    return <LandingPage onGetStarted={setAuthMode} />;
  }

  // Authentication
  if (!user && authMode) {
    return (
      <AuthForm 
        userType={authMode} 
        onBack={() => setAuthMode(null)} 
      />
    );
  }

  // Main application
  if (user) {
    const renderCurrentView = () => {
      switch (currentView) {
        case 'dashboard':
          return user.type === 'student' 
            ? <StudentDashboard user={user as Student} />
            : <StartupDashboard user={user as Startup} />;
        
        case 'browse':
          return user.type === 'student' ? <BrowseOpportunities /> : null;
        
        case 'matches':
          return user.type === 'student' 
            ? <MatchesView user={user as Student} /> 
            : null;
        
        case 'opportunities':
          return user.type === 'startup' ? <div>Manage Opportunities</div> : null;
        
        case 'candidates':
          return user.type === 'startup' ? <div>Browse Candidates</div> : null;
        
        case 'applications':
          return <div>Applications</div>;
        
        case 'profile':
        case 'settings':
          return <ProfileSetup />;
        
        default:
          return user.type === 'student' 
            ? <StudentDashboard user={user as Student} />
            : <StartupDashboard user={user as Startup} />;
      }
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <Header currentView={currentView} onViewChange={setCurrentView} />
        {renderCurrentView()}
      </div>
    );
  }

  return null;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;