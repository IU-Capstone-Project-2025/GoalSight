import { renderHook, waitFor } from '@testing-library/react';
import { useTeams } from '../../src/components/ui/team_item/useTeams';

jest.mock('../../src/components/ui/team_item/teamApi', () => ({
    fetchTeams: jest.fn()
}));
import { fetchTeams } from '../../src/components/ui/team_item/teamApi';
const mockFetchTeams = fetchTeams as jest.MockedFunction<typeof fetchTeams>;

describe('useTeams hook', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should initialize with loading state', async () => {
        mockFetchTeams.mockResolvedValue([]);
        const { result } = renderHook(() => useTeams());
        expect(result.current.loadingTeams).toBe(true);
        expect(result.current.teams).toEqual([]);
        await waitFor(() => {
            expect(result.current.loadingTeams).toBe(false);
        });
    });

    it('should fetch and set teams', async () => {
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
        mockFetchTeams.mockRejectedValue(new Error('API Error'));
        const { result } = renderHook(() => useTeams());
        await waitFor(() => {
            expect(result.current.loadingTeams).toBe(false);
        });
        expect(result.current.teams).toEqual([]);
    });

    it('should handle empty array', async () => {
        mockFetchTeams.mockResolvedValue([]);
        const { result } = renderHook(() => useTeams());
        await waitFor(() => {
            expect(result.current.loadingTeams).toBe(false);
        });
        expect(result.current.teams).toEqual([]);
    });
}); 