import { useEffect, useState } from 'react';
import { MatchApiResponse } from './types';
import { fetchUpcomingMatches } from './api';

export function useUpcomingMatches() {
  const [matches, setMatches] = useState<MatchApiResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]; // fromat YYYY-MM-DD
    fetchUpcomingMatches(today)
      .then((data) => setMatches(data.slice(0, 4)))
      .finally(() => setLoading(false));
  }, []);

  return { matches, loading };
}