import axios from 'axios';
import { MatchApiResponse } from './Matches.types';

// Base URL for API requests, configurable via environment variable
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

/**
 * Fetches upcoming matches for a given date from the backend API.
 * 
 * @param date - The date string (e.g. '2025-07-16') to filter matches
 * @returns Promise resolving to an array of MatchApiResponse objects
 */
export async function fetchUpcomingMatches(date: string): Promise<MatchApiResponse[]> {
  try {
    // Send GET request to /matches/ endpoint with date as query parameter
    const response = await axios.get<MatchApiResponse[]>(`${API_BASE_URL}/matches/`, {
      params: { date },
    });

    // Log successful response data for debugging
    console.log("✅ Matches response:", response.data);

    // Return the array of matches from response
    return response.data;

  } catch (error) {
    // Handle errors specifically for axios requests
    if (axios.isAxiosError(error)) {
      console.error("❌ Axios error:", error.message);

      if (error.response) {
        // Server responded with a status code outside 2xx range
        console.error("❗ Response status:", error.response.status);
        console.error("❗ Response data:", error.response.data);

      } else if (error.request) {
        // Request was made but no response received
        console.error("❗ No response received:", error.request);
      }
    } else {
      // Non-axios errors (unexpected)
      console.error("❌ Unknown error:", error);
    }

    // Rethrow error so caller can handle it as well
    throw error;
  }
}