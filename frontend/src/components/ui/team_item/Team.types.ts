export type Team = {
    id: number;
    name: string;
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

export type MatchPrediction = {
    name1: string;
    confidence1: number;
    name2: string;
    confidence2: number;
};

export type TeamsApiResponse = {
    name: string;
    logoUrl: string;
}

export type TeamStatsApiResponse = {
    logoUrl: string;
    country: string;
    coach: string;
    market_value: number; // overview
    avg_age: number; // overview
    last_5_matches_wdl: { // forms
        wins: number;
        draws: number;
        losses: number;
    };
    xG: number; // match statistics
    ball_possession: number; // match statistics
    shots_on_target: number; // match statistics
    big_chances_created: number; // match statistics
}

export type MatchPredictionApiResponse = {
    prediction: string;
    confidence: number;
};