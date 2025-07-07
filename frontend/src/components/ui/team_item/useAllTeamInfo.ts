import { useState, useEffect } from 'react';
import { fetchTeams, fetchTeamStats } from './tournamentApi';
import { Team, TeamStatsApiResponse, TeamsApiResponse } from './Team.types';

const TOURNAMENT_TITLE = 'FIFA Club World Cup';
const YEAR = 2025;

export function useAllTeamInfo() {
    const [teams, setTeams] = useState<Team[]>([]);
    const [loadingTeams, setLoadingTeams] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const loadTeamData = async () => {
            try {
                const teamResponses: TeamsApiResponse[] = await fetchTeams(TOURNAMENT_TITLE, YEAR);
                const detailedTeams: Team[] = await Promise.all(
                    teamResponses.map(async (team, index) => {
                        const stats: TeamStatsApiResponse = await fetchTeamStats(team.name);
                        const parsedWDL = typeof stats.last_5_matches_wdl === 'string'
                            ? JSON.parse(stats.last_5_matches_wdl)
                            : stats.last_5_matches_wdl;
                        return {
                            id: index,
                            name: team.name,
                            logoUrl: team.logoUrl,
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
                        };
                    })
                );

                if (isMounted) {
                    setTeams(detailedTeams);
                }
            } catch (error) {
                if (isMounted) {
                    console.error("❌ Error loading commands or statistics:", error);
                }
            } finally {
                if (isMounted) {
                    setLoadingTeams(false);
                }
            }
        };

        loadTeamData();

        return () => {
            isMounted = false;
        };
    }, []);

    return { teams, loadingTeams };
}