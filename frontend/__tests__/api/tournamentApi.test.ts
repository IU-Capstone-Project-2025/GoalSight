import { fetchTeams } from '../../src/components/ui/team_item/teamApi';
import { fetchTeamStats } from '@/components/ui/team_stats/statsApi';
import { fetchMatchPrediction } from '@/components/ui/match_forecast/forecastApi';
import { server } from '../mocks/server';
import { http, HttpResponse } from 'msw';

describe('fetchTeams', () => {
  it('fetches teams from API', async () => {
    const data = await fetchTeams('Champions League', 2025);
    expect(data[0].name).toBe('Arsenal');
  });

  it('handles axios error with response', async () => {
    const error = {
      isAxiosError: true,
      message: 'Request failed',
      response: { status: 500, data: { error: 'fail' } },
    };
    jest.spyOn(require('axios'), 'get').mockRejectedValueOnce(error);
    await expect(fetchTeams('t', 2025)).rejects.toEqual(error);
  });

  it('handles axios error with request', async () => {
    const error = {
      isAxiosError: true,
      message: 'No response',
      request: {},
    };
    jest.spyOn(require('axios'), 'get').mockRejectedValueOnce(error);
    await expect(fetchTeams('t', 2025)).rejects.toEqual(error);
  });

  it('handles non-axios error', async () => {
    const error = new Error('Some error');
    jest.spyOn(require('axios'), 'get').mockRejectedValueOnce(error);
    await expect(fetchTeams('t', 2025)).rejects.toThrow('Some error');
  });
});

describe('fetchTeamStats', () => {
  it('fetches team stats correctly', async () => {
    const stats = await fetchTeamStats('Arsenal');
    expect(stats.coach).toBe('Mikel Arteta');
    expect(stats.avg_age).toBeGreaterThan(20);
  });

  it('handles axios error with response', async () => {
    const error = {
      isAxiosError: true,
      message: 'Request failed',
      response: { status: 500, data: { error: 'fail' } },
    };
    jest.spyOn(require('axios'), 'get').mockRejectedValueOnce(error);
    await expect(fetchTeamStats('t')).rejects.toEqual(error);
  });

  it('handles axios error with request', async () => {
    const error = {
      isAxiosError: true,
      message: 'No response',
      request: {},
    };
    jest.spyOn(require('axios'), 'get').mockRejectedValueOnce(error);
    await expect(fetchTeamStats('t')).rejects.toEqual(error);
  });

  it('handles non-axios error', async () => {
    const error = new Error('Some error');
    jest.spyOn(require('axios'), 'get').mockRejectedValueOnce(error);
    await expect(fetchTeamStats('t')).rejects.toThrow('Some error');
  });
});

describe('fetchMatchPrediction', () => {
  it('returns match prediction', async () => {
    const result = await fetchMatchPrediction('Arsenal', 'Chelsea');
    expect(result.prediction).toBe('Arsenal');
    expect(result.confidence).toBeGreaterThan(0.5);
  });

  it('handles missing input', async () => {
    server.use(
      http.post('http://localhost:8000/api/ml/predict/', () => {
        return new HttpResponse(null, { status: 400 });
      })
    );

    await expect(fetchMatchPrediction('', '')).rejects.toThrow();
  });

  it('handles axios error with response', async () => {
    const error = {
      isAxiosError: true,
      message: 'Request failed',
      response: { status: 500, data: { error: 'fail' } },
    };
    jest.spyOn(require('axios'), 'post').mockRejectedValueOnce(error);
    await expect(fetchMatchPrediction('a', 'b')).rejects.toEqual(error);
  });

  it('handles axios error with request', async () => {
    const error = {
      isAxiosError: true,
      message: 'No response',
      request: {},
    };
    jest.spyOn(require('axios'), 'post').mockRejectedValueOnce(error);
    await expect(fetchMatchPrediction('a', 'b')).rejects.toEqual(error);
  });

  it('handles non-axios error', async () => {
    const error = new Error('Some error');
    jest.spyOn(require('axios'), 'post').mockRejectedValueOnce(error);
    await expect(fetchMatchPrediction('a', 'b')).rejects.toThrow('Some error');
  });
});
