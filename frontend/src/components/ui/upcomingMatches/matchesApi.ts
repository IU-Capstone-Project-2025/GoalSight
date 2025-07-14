import axios from 'axios';
import { MatchApiResponse } from './Matches.types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export async function fetchUpcomingMatches(date: string): Promise<MatchApiResponse[]> {
  try {
    const response = await axios.get<MatchApiResponse[]>(`${API_BASE_URL}/api/matches/`, {
      params: { date },
    });
    console.log("✅ Matches response:", response.data);
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