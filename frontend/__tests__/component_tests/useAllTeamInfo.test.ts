import { renderHook, waitFor } from '@testing-library/react';
import { useAllTeamInfo } from '../../src/components/ui/team_item/useAllTeamInfo';
import { TeamsApiResponse, TeamStatsApiResponse } from '../../src/components/ui/team_item/Team.types';

// Mock the entire module
jest.mock('../../src/components/ui/team_item/tournamentApi', () => ({
    fetchTeams: jest.fn(),
    fetchTeamStats: jest.fn()
}));

// Import the mocked functions
import { fetchTeams, fetchTeamStats } from '../../src/components/ui/team_item/tournamentApi';
const mockFetchTeams = fetchTeams as jest.MockedFunction<typeof fetchTeams>;
const mockFetchTeamStats = fetchTeamStats as jest.MockedFunction<typeof fetchTeamStats>;

describe('useAllTeamInfo Hook', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should initialize with loading state', () => {
        mockFetchTeams.mockResolvedValue([]);
        mockFetchTeamStats.mockResolvedValue({
            logoUrl: 'test-logo.png',
            country: 'Test Country',
            coach: 'Test Coach',
            market_value: 100000000,
            avg_age: 25.5,
            last_5_matches_wdl: { wins: 3, draws: 1, losses: 1 },
            xG: 1.5,
            ball_possession: 60,
            shots_on_target: 5,
            big_chances_created: 2
        });
        const { result } = renderHook(() => useAllTeamInfo());
        expect(result.current.loadingTeams).toBe(true);
        expect(result.current.teams).toEqual([]);
    });

    it('should fetch teams and their stats successfully', async () => {
        const mockTeamsResponse = [
            { name: 'Team A', logoUrl: 'logo1.png' },
            { name: 'Team B', logoUrl: 'logo2.png' }
        ];

        const mockStatsResponse = {
            logoUrl: 'test-logo.png',
            country: 'Test Country',
            coach: 'Test Coach',
            market_value: 100000000,
            avg_age: 25.5,
            last_5_matches_wdl: { wins: 3, draws: 1, losses: 1 },
            xG: 1.5,
            ball_possession: 60,
            shots_on_target: 5,
            big_chances_created: 2
        };

        mockFetchTeams.mockResolvedValue(mockTeamsResponse);
        mockFetchTeamStats.mockResolvedValue(mockStatsResponse);
        const { result } = renderHook(() => useAllTeamInfo());

        await waitFor(() => {
            expect(result.current.loadingTeams).toBe(false);
        });

        expect(result.current.teams).toHaveLength(2);
        expect(result.current.teams[0].name).toBe('Team A');
        expect(result.current.teams[1].name).toBe('Team B');
        expect(mockFetchTeams).toHaveBeenCalledWith('FIFA Club World Cup', 2025);
        expect(mockFetchTeamStats).toHaveBeenCalledTimes(2);
    });

    it('should handle API errors gracefully', async () => {
        const error = new Error('API Error');
        mockFetchTeams.mockRejectedValue(error);
        const { result } = renderHook(() => useAllTeamInfo());

        await waitFor(() => {
            expect(result.current.loadingTeams).toBe(false);
        });

        expect(result.current.teams).toEqual([]);
    });

    it('should parse string WDL data correctly', async () => {
        const mockTeamsResponse = [
            { name: 'Team A', logoUrl: 'logo1.png' }
        ];

        const mockStatsResponse = {
            logoUrl: 'test-logo.png',
            country: 'Test Country',
            coach: 'Test Coach',
            market_value: 100000000,
            avg_age: 25.5,
            last_5_matches_wdl: { wins: 3, draws: 1, losses: 1 },
            xG: 1.5,
            ball_possession: 60,
            shots_on_target: 5,
            big_chances_created: 2
        };

        mockFetchTeams.mockResolvedValue(mockTeamsResponse);
        mockFetchTeamStats.mockResolvedValue(mockStatsResponse);
        const { result } = renderHook(() => useAllTeamInfo());

        await waitFor(() => {
            expect(result.current.loadingTeams).toBe(false);
        });

        expect(result.current.teams[0].last_5_matches_wdl).toEqual({
            wins: 3,
            draws: 1,
            losses: 1
        });
    });
}); 