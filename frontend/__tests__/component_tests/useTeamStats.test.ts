import { renderHook, waitFor } from '@testing-library/react';
import { useTeamStats } from '../../src/components/ui/team_stats/useTeamStats';

jest.mock('../../src/components/ui/team_stats/statsApi', () => ({
    fetchTeamStats: jest.fn()
}));
import { fetchTeamStats } from '../../src/components/ui/team_stats/statsApi';
const mockFetchTeamStats = fetchTeamStats as jest.MockedFunction<typeof fetchTeamStats>;

describe('useTeamStats hook', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should initialize with loading state', async () => {
        mockFetchTeamStats.mockResolvedValue({
            country: 'Test Country',
            coach: 'Test Coach',
            market_value: 100000000,
            avg_age: 25.5,
            last_5_matches_wdl: { wins: 3, draws: 1, losses: 1 },
            xG: 1.5,
            ball_possession: 60,
            shots_on_target: 5,
            big_chances_created: 2,
            logoUrl: 'https://example.com/logo.png'
        });
        const { result } = renderHook(() => useTeamStats('Team A'));
        expect(result.current.loadingStats).toBe(true);
        await waitFor(() => {
            expect(result.current.loadingStats).toBe(false);
        });
    });

    it('should fetch and set stats (object WDL)', async () => {
        const stats = {
            country: 'Test Country',
            coach: 'Test Coach',
            market_value: 100000000,
            avg_age: 25.5,
            last_5_matches_wdl: { wins: 3, draws: 1, losses: 1 },
            xG: 1.5,
            ball_possession: 60,
            shots_on_target: 5,
            big_chances_created: 2,
            logoUrl: 'https://example.com/logo.png'
        };
        mockFetchTeamStats.mockResolvedValue(stats);
        const { result } = renderHook(() => useTeamStats('Team A'));
        await waitFor(() => {
            expect(result.current.loadingStats).toBe(false);
        });
        expect(result.current.stats).toMatchObject({
            country: 'Test Country',
            coach: 'Test Coach',
            last_5_matches_wdl: { wins: 3, draws: 1, losses: 1 }
        });
    });

    it('should fetch and set stats (string WDL)', async () => {
        const stats = {
            country: 'Test Country',
            coach: 'Test Coach',
            market_value: 100000000,
            avg_age: 25.5,
            last_5_matches_wdl: JSON.stringify({ wins: 2, draws: 2, losses: 1 }) as any,
            xG: 1.5,
            ball_possession: 60,
            shots_on_target: 5,
            big_chances_created: 2,
            logoUrl: 'https://example.com/logo.png'
        };
        mockFetchTeamStats.mockResolvedValue(stats);
        const { result } = renderHook(() => useTeamStats('Team B'));
        await waitFor(() => {
            expect(result.current.loadingStats).toBe(false);
        });
        expect(result.current.stats?.last_5_matches_wdl).toEqual({ wins: 2, draws: 2, losses: 1 });
    });

    it('should handle API error gracefully', async () => {
        mockFetchTeamStats.mockRejectedValue(new Error('API Error'));
        const { result } = renderHook(() => useTeamStats('Team C'));
        await waitFor(() => {
            expect(result.current.loadingStats).toBe(false);
        });
        expect(result.current.stats).toBeNull();
    });
}); 