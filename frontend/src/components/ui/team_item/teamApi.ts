import axios from 'axios';
import { TeamsApiResponse } from './Team.types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// Fetches teams for a given tournament and year from the backend API
// Returns an array of TeamsApiResponse objects
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