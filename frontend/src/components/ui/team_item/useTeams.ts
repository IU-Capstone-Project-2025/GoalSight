import { useState, useEffect } from 'react';
import { fetchTeams } from './teamApi';
import { TeamListItem, TeamsApiResponse } from './Team.types';

const TOURNAMENT_TITLE = 'FIFA Club World Cup';
const YEAR = 2025;

export function useTeams() {
    const [teams, setTeams] = useState<TeamListItem[]>([]);
    const [loadingTeams, setLoadingTeams] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const loadTeams = async () => {
            try {
                const teamResponses: TeamsApiResponse[] = await fetchTeams(TOURNAMENT_TITLE, YEAR);
                if (isMounted) {
                    setTeams(teamResponses.map((team, idx) => ({
                        id: idx,
                        name: team.name,
                        country: team.country,
                        logoUrl: team.logo_url_32,
                    })));
                }
            } catch (error) {
                if (isMounted) {
                    console.error("❌ Error loading teams:", error);
                }
            } finally {
                if (isMounted) {
                    setLoadingTeams(false);
                }
            }
        };
        loadTeams();
        return () => {
            isMounted = false;
        };
    }, []);

    return { teams, loadingTeams };
}