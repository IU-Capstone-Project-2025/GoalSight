import { renderHook, waitFor } from '@testing-library/react';
import { useMatchPrediction } from '../components/ui/team_item/useMatchForecast';

// Mock the entire module
jest.mock('../components/ui/team_item/tournamentApi', () => ({
    fetchMatchPrediction: jest.fn()
}));

// Import the mocked function
import { fetchMatchPrediction } from '../components/ui/team_item/tournamentApi';
const mockFetchMatchPrediction = fetchMatchPrediction as jest.MockedFunction<typeof fetchMatchPrediction>;

describe('useMatchPrediction Hook', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should initialize with loading state when teams are provided', () => {
        mockFetchMatchPrediction.mockResolvedValue({
            prediction: 'Team A',
            confidence: 0.7
        });
        const { result } = renderHook(() => useMatchPrediction('Team A', 'Team B'));
        expect(result.current.loadingPrediction).toBe(true);
        expect(result.current.prediction).toBe(null);
    });

    it('should not make API call when teams are null', () => {
        const { result } = renderHook(() => useMatchPrediction(null, 'Team B'));
        expect(result.current.loadingPrediction).toBe(true);
        expect(result.current.prediction).toBe(null);
        expect(mockFetchMatchPrediction).not.toHaveBeenCalled();
    });

    it('should fetch prediction successfully when home team wins', async () => {
        const mockResponse = {
            prediction: 'Team A',
            confidence: 0.75
        };
        mockFetchMatchPrediction.mockResolvedValue(mockResponse);
        const { result } = renderHook(() => useMatchPrediction('Team A', 'Team B'));
        await waitFor(() => {
            expect(result.current.loadingPrediction).toBe(false);
        });
        expect(result.current.prediction).toEqual({
            name1: 'Team A',
            confidence1: 75.0,
            name2: 'Team B',
            confidence2: 25.0
        });
        expect(mockFetchMatchPrediction).toHaveBeenCalledWith('Team A', 'Team B');
    });

    it('should fetch prediction successfully when away team wins', async () => {
        const mockResponse = {
            prediction: 'Team B',
            confidence: 0.8
        };
        mockFetchMatchPrediction.mockResolvedValue(mockResponse);
        const { result } = renderHook(() => useMatchPrediction('Team A', 'Team B'));
        await waitFor(() => {
            expect(result.current.loadingPrediction).toBe(false);
        });
        expect(result.current.prediction).toEqual({
            name1: 'Team B',
            confidence1: 80.0,
            name2: 'Team A',
            confidence2: 20.0
        });
    });

    it('should handle API errors gracefully', async () => {
        const error = new Error('API Error');
        mockFetchMatchPrediction.mockRejectedValue(error);
        const { result } = renderHook(() => useMatchPrediction('Team A', 'Team B'));
        await waitFor(() => {
            expect(result.current.loadingPrediction).toBe(false);
        });
        expect(result.current.prediction).toBe(null);
    });

    it('should round confidence values to one decimal place', async () => {
        const mockResponse = {
            prediction: 'Team A',
            confidence: 0.666666
        };
        mockFetchMatchPrediction.mockResolvedValue(mockResponse);
        const { result } = renderHook(() => useMatchPrediction('Team A', 'Team B'));
        await waitFor(() => {
            expect(result.current.loadingPrediction).toBe(false);
        });
        expect(result.current.prediction).toEqual({
            name1: 'Team A',
            confidence1: 66.7,
            name2: 'Team B',
            confidence2: 33.3
        });
    });
}); 