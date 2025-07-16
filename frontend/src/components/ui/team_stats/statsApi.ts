import axios from 'axios';
import { TeamStatsApiResponse } from '../team_stats/TeamStats.type';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// Fetches statistics for a given team from the backend API
// Returns a TeamStatsApiResponse object
export async function fetchTeamStats(name: string): Promise<TeamStatsApiResponse> {
    try {
        const response = await axios.get<TeamStatsApiResponse>(`${API_BASE_URL}/teams/`, {
            params: { name },
        });
        console.log("✅ Team stats response:", response.data);
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
};