export type TeamStats = {
    country: string;
    coach: string;
    market_value: number;
    avg_age: number;
    last_5_matches_wdl: {
        wins: number;
        draws: number;
        losses: number;
    };
    xG: number;
    ball_possession: number;
    shots_on_target: number;
    big_chances_created: number;
}

export type TeamStatsApiResponse = {
    logoUrl: string;
    country: string;
    coach: string;
    market_value: number;
    avg_age: number;
    last_5_matches_wdl: {
        wins: number;
        draws: number;
        losses: number;
    };
    xG: number;
    ball_possession: number;
    shots_on_target: number;
    big_chances_created: number;
}