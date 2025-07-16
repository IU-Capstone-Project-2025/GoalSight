// API utility for fetching match predictions from the backend ML service
import axios from 'axios';
import { MatchPredictionApiResponse } from '../match_forecast/MatchForecast.types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// Fetches match prediction for the given teams from the backend ML API
// Returns the raw API response with win probabilities and logo URLs
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
        // Handle and log different types of Axios errors
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