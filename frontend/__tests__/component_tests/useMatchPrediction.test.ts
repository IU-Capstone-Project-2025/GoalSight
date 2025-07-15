import { renderHook, waitFor } from '@testing-library/react';
import { useMatchPrediction } from '../../src/components/ui/match_forecast/useMatchForecast';

jest.mock('../../src/components/ui/match_forecast/forecastApi', () => ({
    fetchMatchPrediction: jest.fn()
}));
import { fetchMatchPrediction } from '../../src/components/ui/match_forecast/forecastApi';
const mockFetchMatchPrediction = fetchMatchPrediction as jest.MockedFunction<typeof fetchMatchPrediction>;

describe('useMatchPrediction hook', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should not fetch if teams are null', () => {
        const { result } = renderHook(() => useMatchPrediction(null, null));
        expect(result.current.loadingPrediction).toBe(true);
        expect(result.current.prediction).toBeNull();
        expect(mockFetchMatchPrediction).not.toHaveBeenCalled();
    });

    it('should fetch and set prediction', async () => {
        mockFetchMatchPrediction.mockResolvedValue({ home_win: 0.7, away_win: 0.3 });
        const { result } = renderHook(() => useMatchPrediction('Team A', 'Team B'));
        await waitFor(() => {
            expect(result.current.loadingPrediction).toBe(false);
        });
        expect(result.current.prediction).toEqual({
            name1: 'Team A',
            confidence1: 70.0,
            name2: 'Team B',
            confidence2: 30.0
        });
    });

    it('should handle API error gracefully', async () => {
        mockFetchMatchPrediction.mockRejectedValue(new Error('API Error'));
        const { result } = renderHook(() => useMatchPrediction('Team X', 'Team Y'));
        await waitFor(() => {
            expect(result.current.loadingPrediction).toBe(false);
        });
        expect(result.current.prediction).toBeNull();
    });
}); 