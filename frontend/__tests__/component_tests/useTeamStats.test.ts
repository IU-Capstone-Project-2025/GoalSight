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
            market_value: 100000000,
            avg_age: 25.5,
            team_strength: 90,
            league_strength: 80,
            glicko2_rating: 1700,
            elo_rating: 1800,
            wins_last_5: 3,
            losses_last_5: 1,
            drawns_last_5: 1,
            goal_avg_last_5: 2.2,
            avg_xG_last_5: 1.7,
            avg_xGA_last_5: 1.1,
            days_since_last_game: 4,
            matches_14_days: 2
        });
        const { result } = renderHook(() => useTeamStats('Team A'));
        expect(result.current.loadingStats).toBe(true);
        await waitFor(() => {
            expect(result.current.loadingStats).toBe(false);
        });
    });

    it('should fetch and set stats (all fields)', async () => {
        // Simulates a successful API call as an object
        const stats = {
            country: 'Test Country',
            market_value: 100000000,
            avg_age: 25.5,
            team_strength: 90,
            league_strength: 80,
            glicko2_rating: 1700,
            elo_rating: 1800,
            wins_last_5: 3,
            losses_last_5: 1,
            drawns_last_5: 1,
            goal_avg_last_5: 2.2,
            avg_xG_last_5: 1.7,
            avg_xGA_last_5: 1.1,
            days_since_last_game: 4,
            matches_14_days: 2
        };
        mockFetchTeamStats.mockResolvedValue(stats);
        const { result } = renderHook(() => useTeamStats('Team A'));
        await waitFor(() => {
            expect(result.current.loadingStats).toBe(false);
        });
        expect(result.current.stats).toMatchObject(stats);
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