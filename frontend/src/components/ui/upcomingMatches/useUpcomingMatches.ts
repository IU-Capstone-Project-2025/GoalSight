import { useEffect, useState } from 'react';
import { MatchApiResponse } from './Matches.types';
import { fetchUpcomingMatches } from './matchesApi';

// Custom hook to fetch and separate next match and upcoming matches
export function useMatchesSeparated() {
  // State for the very next match (first in the list)
  const [nextMatch, setNextMatch] = useState<MatchApiResponse | null>(null);

  // State for the following upcoming matches (up to 4 after the next match)
  const [upcomingMatches, setUpcomingMatches] = useState<MatchApiResponse[]>([]);

  // Loading state to track fetch status
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; // Flag to avoid state updates if component unmounts

    // Get today's date in YYYY-MM-DD format for API query
    const today = new Date().toISOString().split('T')[0];

    // Fetch matches starting from today
    fetchUpcomingMatches(today)
      .then((data) => {
        if (!isMounted) return; // Prevent updates if unmounted

        // Set the first match as nextMatch or null if none
        setNextMatch(data[0] || null);

        // Set next up to 4 matches after the first as upcomingMatches
        setUpcomingMatches(data.slice(1, 5));
      })
      .catch((error) => {
        if (!isMounted) return;

        // Log errors and reset states on failure
        console.error('Error fetching upcoming matches:', error);
        setNextMatch(null);
        setUpcomingMatches([]);
      })
      .finally(() => {
        if (!isMounted) return;

        // Loading complete regardless of success or failure
        setLoading(false);
      });

    // Cleanup function to set isMounted to false on unmount
    return () => {
      isMounted = false;
    };
  }, []);

  // Return data and loading status to component using this hook
  return { nextMatch, upcomingMatches, loading };
}