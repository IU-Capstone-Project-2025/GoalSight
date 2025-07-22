import { useState, useEffect } from 'react';
import { fetchTeams } from './teamApi';
import { TeamListItem, TeamsApiResponse } from './Team.types';

// Returns { teams, loadingTeams } for the current tournament and year
export function useTeams(tournament_title: string, year: number) {
    const [teams, setTeams] = useState<TeamListItem[]>([]);
    const [loadingTeams, setLoadingTeams] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const loadTeams = async () => {
            try {
                // Fetch teams from API
                const teamResponses: TeamsApiResponse[] = await fetchTeams(tournament_title, year);
                if (isMounted) {
                    // Map API response to TeamListItem format
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
        // Cleanup: prevent state updates if component unmounts
        return () => {
            isMounted = false;
        };
    }, []);

    return { teams, loadingTeams };
}