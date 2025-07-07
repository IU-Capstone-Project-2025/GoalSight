import { useState, useEffect } from 'react';
import { fetchTeamStats } from './tournamentApi';
import { TeamStats, TeamStatsApiResponse } from './Team.types';

export function useTeamStats(name: string) {
    const [stats, setStats] = useState<TeamStats | null>(null);
    const [loadingStats, setLoadingStats] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const loadStats = async () => {
            try {
                const statsResponse: TeamStatsApiResponse = await fetchTeamStats(name);
                if (isMounted) {
                    setStats({
                        country: statsResponse.country,
                        coach: statsResponse.coach,
                        market_value: statsResponse.market_value,
                        avg_age: statsResponse.avg_age,
                        last_5_matches_wdl: statsResponse.last_5_matches_wdl,
                        xG: statsResponse.xG,
                        ball_possession: statsResponse.ball_possession,
                        shots_on_target: statsResponse.shots_on_target,
                        big_chances_created: statsResponse.big_chances_created,
                    });
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
        return () => {
            isMounted = false;
        };
    }, [name]);

    return { stats, loadingStats };
}