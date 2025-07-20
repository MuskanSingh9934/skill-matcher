export interface User {
  id: string;
  email: string;
  name: string;
  type: 'student' | 'startup';
  avatar?: string;
  createdAt: Date;
}

export interface Student extends User {
  type: 'student';
  skills: string[];
  interests: string[];
  availability: 'full-time' | 'part-time' | 'weekends' | 'flexible';
  experience: 'beginner' | 'intermediate' | 'advanced';
  bio: string;
  location: string;
  portfolio?: string;
  github?: string;
  linkedin?: string;
}

export interface Startup extends User {
  type: 'startup';
  company: string;
  industry: string;
  stage: 'pre-seed' | 'seed' | 'series-a' | 'series-b' | 'growth';
  location: string;
  website?: string;
  description: string;
  teamSize: string;
}

export interface Opportunity {
  id: string;
  startupId: string;
  startup: Startup;
  title: string;
  type: 'internship' | 'gig' | 'hackathon';
  description: string;
  requiredSkills: string[];
  commitment: 'full-time' | 'part-time' | 'weekends' | 'flexible';
  duration: string;
  compensation: string;
  location: string;
  remote: boolean;
  deadline?: Date;
  requirements: string[];
  benefits: string[];
  createdAt: Date;
  status: 'active' | 'paused' | 'closed';
}

export interface Application {
  id: string;
  studentId: string;
  opportunityId: string;
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
  message: string;
  appliedAt: Date;
  updatedAt: Date;
}

export interface Match {
  student: Student;
  opportunity: Opportunity;
  score: number;
  reasons: string[];
}