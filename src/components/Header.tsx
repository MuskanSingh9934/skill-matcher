import React from "react";
import { User, LogOut, Settings } from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface HeaderProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export function Header({ currentView, onViewChange }: HeaderProps) {
  const { user, logout } = useAuth();

  const studentNavItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "browse", label: "Browse Opportunities" },
    { id: "matches", label: "My Matches" },
    { id: "applications", label: "Applications" },
  ];

  const startupNavItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "opportunities", label: "My Opportunities" },
    { id: "candidates", label: "Candidates" },
    { id: "applications", label: "Applications" },
  ];

  const navItems = user?.type === "student" ? studentNavItems : startupNavItems;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => (location.href = "/")}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SM</span>
              </div>
              <span className="text-xl font-bold text-gray-900">
                SkillMatch
              </span>
            </div>

            <nav className="hidden md:flex space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentView === item.id
                      ? "bg-purple-100 text-purple-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => onViewChange("profile")}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <User className="w-5 h-5" />
              <span className="hidden sm:block text-sm font-medium">
                {user?.name}
              </span>
            </button>

            <button
              onClick={() => onViewChange("settings")}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Settings className="w-5 h-5" />
            </button>

            <button
              onClick={logout}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
