import { renderHook, waitFor } from '@testing-library/react';
import { useMatchPrediction } from '../../src/components/ui/match_forecast/useMatchForecast';

// Mock the forecast API to control prediction responses
jest.mock('../../src/components/ui/match_forecast/forecastApi', () => ({
    fetchMatchPrediction: jest.fn()
}));
import { fetchMatchPrediction } from '../../src/components/ui/match_forecast/forecastApi';
const mockFetchMatchPrediction = fetchMatchPrediction as jest.MockedFunction<typeof fetchMatchPrediction>;

// Main test suite for useMatchPrediction
// Covers loading state, successful fetch, and error handling
describe('useMatchPrediction hook', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should not fetch if teams are null', () => {
        // Ensures no API call is made if team names are not provided
        const { result } = renderHook(() => useMatchPrediction(null, null));
        expect(result.current.loadingPrediction).toBe(true);
        expect(result.current.prediction).toBeNull();
        expect(mockFetchMatchPrediction).not.toHaveBeenCalled();
    });

    it('should fetch and set prediction', async () => {
        // Simulates a successful API call and checks prediction values
        mockFetchMatchPrediction.mockResolvedValue({
            home_win: 0.7,
            away_win: 0.3,
            logo_url_64_home: 'https://example.com/logo.png',
            logo_url_64_away: 'https://example.com/logo.png'
        });
        const { result } = renderHook(() => useMatchPrediction('Team A', 'Team B'));
        await waitFor(() => {
            expect(result.current.loadingPrediction).toBe(false);
        });
        expect(result.current.prediction).toEqual(expect.objectContaining({
            name1: 'Team A',
            confidence1: 70.0,
            name2: 'Team B',
            confidence2: 30.0
        }));
    });

    it('should handle API error gracefully', async () => {
        // Simulates an API error and checks that prediction is null
        mockFetchMatchPrediction.mockRejectedValue(new Error('API Error'));
        const { result } = renderHook(() => useMatchPrediction('Team X', 'Team Y'));
        await waitFor(() => {
            expect(result.current.loadingPrediction).toBe(false);
        });
        expect(result.current.prediction).toBeNull();
    });
}); 