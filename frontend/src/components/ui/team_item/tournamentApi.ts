import axios from 'axios';
import { MatchPredictionApiResponse, TeamsApiResponse, TeamStatsApiResponse } from './Team.types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export async function fetchTeams(tournament_title: string, year: number): Promise<TeamsApiResponse[]> {
    try {
        const response = await axios.get<TeamsApiResponse[]>(`${API_BASE_URL}/tournaments/`, {
            params: {
                tournament_title,
                year,
            },
        });
        console.log("✅ Teams response:", response.data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("❌ Axios error:", error.message);
            if (error.response) {
                console.error("❗ Response status:", error.response.status);
                console.error("❗ Response data:", error.response.data);
            } else if (error.request) {
                console.error("❗ No response received:", error.request);
            }
        } else {
            console.error("❌ Unknown error:", error);
        }
        throw error;
    }
};

export async function fetchTeamStats(name: string): Promise<TeamStatsApiResponse> {
    try {
        const response = await axios.get<TeamStatsApiResponse>(`${API_BASE_URL}/teams/`, {
            params: { name },
        });
        console.log("✅ Team stats response:", response.data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("❌ Axios error:", error.message);
            if (error.response) {
                console.error("❗ Response status:", error.response.status);
                console.error("❗ Response data:", error.response.data);
            } else if (error.request) {
                console.error("❗ No response received:", error.request);
            }
        } else {
            console.error("❌ Unknown error:", error);
        }
        throw error;
    }
};

export async function fetchMatchPrediction(home_team: string, away_team: string): Promise<MatchPredictionApiResponse> {
    try {
        const response = await axios.post<MatchPredictionApiResponse>(
            `${API_BASE_URL}/api/ml/predict/`,
            {
                home_team,
                away_team,
            }
        );
        console.log("✅ Match prediction response:", response.data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("❌ Axios error:", error.message);
            if (error.response) {
                console.error("❗ Response status:", error.response.status);
                console.error("❗ Response data:", error.response.data);
            } else if (error.request) {
                console.error("❗ No response received:", error.request);
            }
        } else {
            console.error("❌ Unknown error:", error);
        }
        throw error;
    }
}