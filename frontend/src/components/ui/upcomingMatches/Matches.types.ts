// API response type for a match from the backend
export type MatchApiResponse = {
  id: number;          // Unique match identifier
  date: string;        // Match date (ISO string or formatted)
  home_team: string;   // Home team name
  away_team: string;   // Away team name
};

// Internal frontend type representing a match
export type Match = {
  teamA: string;       // First team name (mapped from home_team)
  teamB: string;       // Second team name (mapped from away_team)
  date: string;        // Match date (formatted for UI)
  time: string;        // Match time (formatted for UI)
};