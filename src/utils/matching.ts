import { Student, Opportunity, Match } from '../types';

export function calculateMatchScore(student: Student, opportunity: Opportunity): number {
  let score = 0;
  let maxScore = 100;

  // Skills matching (40% of total score)
  const skillsWeight = 40;
  const commonSkills = student.skills.filter(skill => 
    opportunity.requiredSkills.some(reqSkill => 
      skill.toLowerCase().includes(reqSkill.toLowerCase()) ||
      reqSkill.toLowerCase().includes(skill.toLowerCase())
    )
  );
  const skillsScore = (commonSkills.length / opportunity.requiredSkills.length) * skillsWeight;
  score += skillsScore;

  // Experience level matching (20% of total score)
  const experienceWeight = 20;
  const experienceMatch = student.experience === 'advanced' ? 20 : 
                         student.experience === 'intermediate' ? 15 : 10;
  score += Math.min(experienceMatch, experienceWeight);

  // Availability matching (20% of total score)
  const availabilityWeight = 20;
  const availabilityMatch = student.availability === opportunity.commitment || 
                           student.availability === 'flexible' || 
                           opportunity.commitment === 'flexible';
  if (availabilityMatch) {
    score += availabilityWeight;
  }

  // Location preference (10% of total score)
  const locationWeight = 10;
  if (opportunity.remote || student.location === opportunity.location) {
    score += locationWeight;
  }

  // Interest alignment (10% of total score)
  const interestWeight = 10;
  const hasRelatedInterest = student.interests.some(interest => 
    opportunity.startup.industry.toLowerCase().includes(interest.toLowerCase()) ||
    interest.toLowerCase().includes(opportunity.startup.industry.toLowerCase())
  );
  if (hasRelatedInterest) {
    score += interestWeight;
  }

  return Math.min(score, maxScore);
}

export function getMatchReasons(student: Student, opportunity: Opportunity): string[] {
  const reasons: string[] = [];

  const commonSkills = student.skills.filter(skill => 
    opportunity.requiredSkills.some(reqSkill => 
      skill.toLowerCase().includes(reqSkill.toLowerCase()) ||
      reqSkill.toLowerCase().includes(skill.toLowerCase())
    )
  );

  if (commonSkills.length > 0) {
    reasons.push(`Matching skills: ${commonSkills.join(', ')}`);
  }

  if (student.availability === opportunity.commitment || 
      student.availability === 'flexible' || 
      opportunity.commitment === 'flexible') {
    reasons.push('Compatible schedule');
  }

  if (opportunity.remote) {
    reasons.push('Remote work available');
  } else if (student.location === opportunity.location) {
    reasons.push('Same location');
  }

  const hasRelatedInterest = student.interests.some(interest => 
    opportunity.startup.industry.toLowerCase().includes(interest.toLowerCase()) ||
    interest.toLowerCase().includes(opportunity.startup.industry.toLowerCase())
  );

  if (hasRelatedInterest) {
    reasons.push(`Interest in ${opportunity.startup.industry}`);
  }

  if (student.experience === 'advanced') {
    reasons.push('Strong technical background');
  }

  return reasons;
}

export function findMatches(student: Student, opportunities: Opportunity[]): Match[] {
  return opportunities
    .map(opportunity => ({
      student,
      opportunity,
      score: calculateMatchScore(student, opportunity),
      reasons: getMatchReasons(student, opportunity),
    }))
    .filter(match => match.score >= 30) // Only show matches with 30% or higher score
    .sort((a, b) => b.score - a.score);
}