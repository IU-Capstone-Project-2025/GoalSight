export type MatchPrediction = {
    name1: string;
    confidence1: number;
    name2: string;
    confidence2: number;
    logoUrl1: string;
    logoUrl2: string;
};

export type MatchPredictionApiResponse = {
    home_win: number;
    away_win: number;
    logo_url_64_home: string;
    logo_url_64_away: string;
};