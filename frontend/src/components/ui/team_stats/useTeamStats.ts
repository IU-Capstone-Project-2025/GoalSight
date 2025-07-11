import { useState, useEffect } from 'react';
import { fetchTeamStats } from './statsApi';
import { TeamStats, TeamStatsApiResponse } from './TeamStats.type';

export function useTeamStats(name: string) {
    const [stats, setStats] = useState<TeamStats | null>(null);
    const [loadingStats, setLoadingStats] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const loadStats = async () => {
            try {
                const stats: TeamStatsApiResponse = await fetchTeamStats(name);
                const parsedWDL = typeof stats.last_5_matches_wdl === 'string'
                    ? JSON.parse(stats.last_5_matches_wdl)
                    : stats.last_5_matches_wdl;
                if (isMounted) {
                    setStats({
                        country: stats.country,
                        coach: stats.coach,
                        market_value: stats.market_value,
                        avg_age: stats.avg_age,
                        last_5_matches_wdl: {
                            wins: parsedWDL.wins,
                            draws: parsedWDL.draws,
                            losses: parsedWDL.losses,
                        },
                        xG: stats.xG,
                        ball_possession: stats.ball_possession,
                        shots_on_target: stats.shots_on_target,
                        big_chances_created: stats.big_chances_created,
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