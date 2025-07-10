import { useEffect, useState } from 'react';
import { MatchApiResponse } from './Matches.types';
import { fetchUpcomingMatches } from './matchesApi';

export function useMatchesSeparated() {
  const [nextMatch, setNextMatch] = useState<MatchApiResponse | null>(null);
  const [upcomingMatches, setUpcomingMatches] = useState<MatchApiResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const today = new Date().toISOString().split('T')[0];

    fetchUpcomingMatches(today)
      .then((data) => {
        if (!isMounted) return;
        setNextMatch(data[0] || null);
        setUpcomingMatches(data.slice(1, 5));
      })
      .catch((error) => {
        if (!isMounted) return;
        console.error('Error fetching upcoming matches:', error);
        setNextMatch(null);
        setUpcomingMatches([]);
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { nextMatch, upcomingMatches, loading };
}