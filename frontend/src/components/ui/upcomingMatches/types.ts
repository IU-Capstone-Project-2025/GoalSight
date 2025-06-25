export type MatchApiResponse = {
  id: number;
  date: string;
  home_team: string;
  away_team: string;
};

export type Match = {
  teamA: string;
  teamB: string;
  date: string; // '2025-01-15'
  time: string; // '20:00'
};