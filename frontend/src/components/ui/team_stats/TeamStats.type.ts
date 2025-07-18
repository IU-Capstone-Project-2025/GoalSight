// Represents processed team statistics for use in the UI
export type TeamStats = {
    country: string;
    market_value: number;
    avg_age: number;
    team_strength: number;
    league_strength: number;
    glicko2_rating: number;
    elo_rating: number;
    wins_last_5: number;
    losses_last_5: number;
    drawns_last_5: number;
    goal_avg_last_5: number;
    avg_xG_last_5: number;
    avg_xGA_last_5: number;
    days_since_last_game: number;
    matches_14_days: number;
}

// Represents the raw API response for team statistics
export type TeamStatsApiResponse = TeamStats;