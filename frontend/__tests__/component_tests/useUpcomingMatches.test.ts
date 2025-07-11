import { renderHook, waitFor } from '@testing-library/react';
import { useMatchesSeparated } from '../../src/components/ui/upcomingMatches/useUpcomingMatches';
import { MatchApiResponse } from '../../src/components/ui/upcomingMatches/types';

jest.mock('../../src/components/ui/upcomingMatches/api', () => ({
    fetchUpcomingMatches: jest.fn()
}));

import { fetchUpcomingMatches } from '../../src/components/ui/upcomingMatches/api';
const mockFetchUpcomingMatches = fetchUpcomingMatches as jest.MockedFunction<typeof fetchUpcomingMatches>;

describe('useMatchesSeparated Hook', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should initialize with loading state', async () => {
        mockFetchUpcomingMatches.mockResolvedValue([]);
        const { result } = renderHook(() => useMatchesSeparated());

        expect(result.current.loading).toBe(true);
        expect(result.current.nextMatch).toBe(null);
        expect(result.current.upcomingMatches).toEqual([]);

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });
    });

    it('should fetch matches and separate next match from upcoming matches', async () => {
        const mockMatches: MatchApiResponse[] = [
            { id: 1, date: '2025-01-15', home_team: 'Manchester United', away_team: 'Liverpool' },
            { id: 2, date: '2025-01-20', home_team: 'Arsenal', away_team: 'Chelsea' },
            { id: 3, date: '2025-01-25', home_team: 'Barcelona', away_team: 'Real Madrid' },
            { id: 4, date: '2025-01-30', home_team: 'Bayern', away_team: 'Dortmund' },
            { id: 5, date: '2025-02-01', home_team: 'PSG', away_team: 'Marseille' },
            { id: 6, date: '2025-02-05', home_team: 'Juventus', away_team: 'Milan' }
        ];

        mockFetchUpcomingMatches.mockResolvedValue(mockMatches);
        const { result } = renderHook(() => useMatchesSeparated());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.nextMatch).toEqual(mockMatches[0]);
        expect(result.current.upcomingMatches).toEqual(mockMatches.slice(1, 5));
        expect(mockFetchUpcomingMatches).toHaveBeenCalledTimes(1);
    });

    it('should handle empty matches array', async () => {
        mockFetchUpcomingMatches.mockResolvedValue([]);
        const { result } = renderHook(() => useMatchesSeparated());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.nextMatch).toBe(null);
        expect(result.current.upcomingMatches).toEqual([]);
    });

    it('should handle single match', async () => {
        const mockMatches: MatchApiResponse[] = [
            { id: 1, date: '2025-01-15', home_team: 'Manchester United', away_team: 'Liverpool' }
        ];

        mockFetchUpcomingMatches.mockResolvedValue(mockMatches);
        const { result } = renderHook(() => useMatchesSeparated());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.nextMatch).toEqual(mockMatches[0]);
        expect(result.current.upcomingMatches).toEqual([]);
    });

    it('should handle API error', async () => {
        const error = new Error('API Error');
        mockFetchUpcomingMatches.mockRejectedValue(error);
        const { result } = renderHook(() => useMatchesSeparated());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.nextMatch).toBe(null);
        expect(result.current.upcomingMatches).toEqual([]);
    });

    it('should call API with correct date parameter', async () => {
        mockFetchUpcomingMatches.mockResolvedValue([]);
        renderHook(() => useMatchesSeparated());

        await waitFor(() => {
            expect(mockFetchUpcomingMatches).toHaveBeenCalledTimes(1);
        });

        const today = new Date().toISOString().split('T')[0];
        expect(mockFetchUpcomingMatches).toHaveBeenCalledWith(today);
    });

    it('should limit upcoming matches to 4 items', async () => {
        const mockMatches: MatchApiResponse[] = [
            { id: 1, date: '2025-01-15', home_team: 'Team A', away_team: 'Team B' },
            { id: 2, date: '2025-01-20', home_team: 'Team C', away_team: 'Team D' },
            { id: 3, date: '2025-01-25', home_team: 'Team E', away_team: 'Team F' },
            { id: 4, date: '2025-01-30', home_team: 'Team G', away_team: 'Team H' },
            { id: 5, date: '2025-02-01', home_team: 'Team I', away_team: 'Team J' },
            { id: 6, date: '2025-02-05', home_team: 'Team K', away_team: 'Team L' },
            { id: 7, date: '2025-02-10', home_team: 'Team M', away_team: 'Team N' }
        ];

        mockFetchUpcomingMatches.mockResolvedValue(mockMatches);
        const { result } = renderHook(() => useMatchesSeparated());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.nextMatch).toEqual(mockMatches[0]);
        expect(result.current.upcomingMatches).toHaveLength(4);
        expect(result.current.upcomingMatches).toEqual(mockMatches.slice(1, 5));
    });
}); 