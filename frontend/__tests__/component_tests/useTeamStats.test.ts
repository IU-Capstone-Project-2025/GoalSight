import { renderHook, waitFor } from '@testing-library/react';
import { useTeamStats } from '../../src/components/ui/team_stats/useTeamStats';

// Mock the stats API to control stats responses
jest.mock('../../src/components/ui/team_stats/statsApi', () => ({
    fetchTeamStats: jest.fn()
}));
import { fetchTeamStats } from '../../src/components/ui/team_stats/statsApi';
const mockFetchTeamStats = fetchTeamStats as jest.MockedFunction<typeof fetchTeamStats>;

// Main test suite for useTeamStats
// Covers loading state, stats fetching, WDL format handling, and error handling
describe('useTeamStats hook', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should initialize with loading state', async () => {
        // Ensures the hook starts in loading state and updates after fetch
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
        // Simulates a successful API call with WDL as an object
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
        // Simulates a successful API call with WDL as a stringified object
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
        // Simulates an API error and checks that stats is null
        mockFetchTeamStats.mockRejectedValue(new Error('API Error'));
        const { result } = renderHook(() => useTeamStats('Team C'));
        await waitFor(() => {
            expect(result.current.loadingStats).toBe(false);
        });
        expect(result.current.stats).toBeNull();
    });
}); 