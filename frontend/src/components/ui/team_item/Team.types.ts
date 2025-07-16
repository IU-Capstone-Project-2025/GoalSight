// Represents a full team with all details (used in stats and details views)
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

// Represents a team in a list (summary info)
export type TeamListItem = {
    id: number;
    name: string;
    country: string;
    logoUrl: string;
}

// Represents the API response for a team (raw format)
export type TeamsApiResponse = {
    name: string;
    country: string;
    logo_url_32: string;
}