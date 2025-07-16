import { renderHook, waitFor } from '@testing-library/react';
import { useMatchesSeparated } from '../../src/components/ui/upcomingMatches/useUpcomingMatches';
import { MatchApiResponse } from '../../src/components/ui/upcomingMatches/Matches.types';

// Mock the matches API to control match responses
jest.mock('../../src/components/ui/upcomingMatches/matchesApi', () => ({
    fetchUpcomingMatches: jest.fn()
}));
import { fetchUpcomingMatches } from '../../src/components/ui/upcomingMatches/matchesApi';
const mockFetchUpcomingMatches = fetchUpcomingMatches as jest.MockedFunction<typeof fetchUpcomingMatches>;

// Main test suite for useMatchesSeparated
// Covers loading state, match separation, error handling, empty state, and unmount logic
describe('useMatchesSeparated hook', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should initialize with loading state', async () => {
        // Ensures the hook starts in loading state and updates after fetch
        mockFetchUpcomingMatches.mockResolvedValue([]);
        const { result } = renderHook(() => useMatchesSeparated());
        expect(result.current.loading).toBe(true);
        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });
    });

    it('should fetch and separate matches', async () => {
        // Simulates a successful API call and checks match separation logic
        const mockMatches = [
            { id: 1, date: '2025-01-15', home_team: 'A', away_team: 'B' },
            { id: 2, date: '2025-01-20', home_team: 'C', away_team: 'D' },
            { id: 3, date: '2025-01-25', home_team: 'E', away_team: 'F' },
            { id: 4, date: '2025-01-30', home_team: 'G', away_team: 'H' },
            { id: 5, date: '2025-02-01', home_team: 'I', away_team: 'J' },
            { id: 6, date: '2025-02-05', home_team: 'K', away_team: 'L' }
        ];
        mockFetchUpcomingMatches.mockResolvedValue(mockMatches);
        const { result } = renderHook(() => useMatchesSeparated());
        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });
        expect(result.current.nextMatch).toEqual(mockMatches[0]);
        expect(result.current.upcomingMatches).toEqual(mockMatches.slice(1, 5));
    });

    it('should handle API error gracefully', async () => {
        // Simulates an API error and checks that state is reset
        mockFetchUpcomingMatches.mockRejectedValue(new Error('API Error'));
        const { result } = renderHook(() => useMatchesSeparated());
        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });
        expect(result.current.nextMatch).toBeNull();
        expect(result.current.upcomingMatches).toEqual([]);
    });

    it('should handle empty array', async () => {
        // Ensures the hook handles an empty match array correctly
        mockFetchUpcomingMatches.mockResolvedValue([]);
        const { result } = renderHook(() => useMatchesSeparated());
        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });
        expect(result.current.nextMatch).toBeNull();
        expect(result.current.upcomingMatches).toEqual([]);
    });

    it('should not update state after unmount (isMounted = false)', async () => {
        // Simulates unmounting before fetch resolves to avoid state updates on unmounted component
        let resolvePromise: (value: MatchApiResponse[]) => void;
        const pendingPromise = new Promise<MatchApiResponse[]>((resolve) => {
            resolvePromise = resolve;
        });
        mockFetchUpcomingMatches.mockReturnValue(pendingPromise);
        const { unmount, result } = renderHook(() => useMatchesSeparated());
        unmount();
        resolvePromise!([]);
        await Promise.resolve();
        expect(result.current.loading).toBe(true);
    });
}); 