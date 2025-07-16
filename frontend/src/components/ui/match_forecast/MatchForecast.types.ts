// Represents the processed prediction for a match, used in the UI
export type MatchPrediction = {
    name1: string;
    confidence1: number;
    name2: string;
    confidence2: number;
    logoUrl1: string;
    logoUrl2: string;
};

// Represents the raw API response for a match prediction
export type MatchPredictionApiResponse = {
    home_win: number;
    away_win: number;
    logo_url_64_home: string;
    logo_url_64_away: string;
};