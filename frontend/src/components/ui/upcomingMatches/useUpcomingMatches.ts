import { useEffect, useState } from 'react';
import { MatchApiResponse } from './types';
import { fetchUpcomingMatches } from './api';

export function useMatchesSeparated() {
  const [nextMatch, setNextMatch] = useState<MatchApiResponse | null>(null);
  const [upcomingMatches, setUpcomingMatches] = useState<MatchApiResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    fetchUpcomingMatches(today)
      .then((data) => {
        setNextMatch(data[0] || null);
        setUpcomingMatches(data.slice(1, 5));
      })
      .finally(() => setLoading(false));
  }, []);

  return { nextMatch, upcomingMatches, loading };
}