import { renderHook, waitFor } from '@testing-library/react';
import { useTeams } from '../../src/components/ui/team_item/useTeams';

// Mock the team API to control team responses
jest.mock('../../src/components/ui/team_item/teamApi', () => ({
    fetchTeams: jest.fn()
}));
import { fetchTeams } from '../../src/components/ui/team_item/teamApi';
const mockFetchTeams = fetchTeams as jest.MockedFunction<typeof fetchTeams>;

// Main test suite for useTeams
// Covers loading state, team fetching, error handling, and empty array handling
describe('useTeams hook', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should initialize with loading state', async () => {
        // Ensures the hook starts in loading state and updates after fetch
        mockFetchTeams.mockResolvedValue([]);
        const { result } = renderHook(() => useTeams());
        expect(result.current.loadingTeams).toBe(true);
        expect(result.current.teams).toEqual([]);
        await waitFor(() => {
            expect(result.current.loadingTeams).toBe(false);
        });
    });

    it('should fetch and set teams', async () => {
        // Simulates a successful API call and checks that teams are set
        const mockTeams = [
            { name: 'Team A', country: 'Country A', logo_url_32: 'logoA.png' },
            { name: 'Team B', country: 'Country B', logo_url_32: 'logoB.png' }
        ];
        mockFetchTeams.mockResolvedValue(mockTeams);
        const { result } = renderHook(() => useTeams());
        await waitFor(() => {
            expect(result.current.loadingTeams).toBe(false);
        });
        expect(result.current.teams).toHaveLength(2);
        expect(result.current.teams[0].name).toBe('Team A');
        expect(result.current.teams[1].country).toBe('Country B');
    });

    it('should handle API error gracefully', async () => {
        // Simulates an API error and checks that teams is an empty array
        mockFetchTeams.mockRejectedValue(new Error('API Error'));
        const { result } = renderHook(() => useTeams());
        await waitFor(() => {
            expect(result.current.loadingTeams).toBe(false);
        });
        expect(result.current.teams).toEqual([]);
    });

    it('should handle empty array', async () => {
        // Ensures the hook handles an empty array response correctly
        mockFetchTeams.mockResolvedValue([]);
        const { result } = renderHook(() => useTeams());
        await waitFor(() => {
            expect(result.current.loadingTeams).toBe(false);
        });
        expect(result.current.teams).toEqual([]);
    });
}); 