export type MatchPrediction = {
    name1: string;
    confidence1: number;
    name2: string;
    confidence2: number;
};

export type MatchPredictionApiResponse = {
    home_win: number;
    away_win: number;
};