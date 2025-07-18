import { useState, useEffect } from 'react';
import { fetchTeamStats } from './statsApi';
import { TeamStats, TeamStatsApiResponse } from './TeamStats.type';

// Returns { stats, loadingStats } for the given team name
export function useTeamStats(name: string) {
    const [stats, setStats] = useState<TeamStats | null>(null);
    const [loadingStats, setLoadingStats] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const loadStats = async () => {
            try {
                // Fetch stats from API
                const stats: TeamStatsApiResponse = await fetchTeamStats(name);
                if (isMounted) {
                    setStats(stats);
                }
            } catch (error) {
                if (isMounted) {
                    console.error("❌ Error loading team stats:", error);
                }
            } finally {
                if (isMounted) {
                    setLoadingStats(false);
                }
            }
        };
        if (name) {
            loadStats();
        }
        // Cleanup: prevent state updates if component unmounts
        return () => {
            isMounted = false;
        };
    }, [name]);

    return { stats, loadingStats };
}