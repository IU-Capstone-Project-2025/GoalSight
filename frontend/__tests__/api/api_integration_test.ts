import { fetchMatchPrediction } from '../../src/components/ui/match_forecast/forecastApi';
import { fetchTeams } from '../../src/components/ui/team_item/teamApi';
import { fetchTeamStats } from '../../src/components/ui/team_stats/statsApi';
import { fetchUpcomingMatches } from '../../src/components/ui/upcomingMatches/matchesApi';
import { server } from '../mocks/server';
import { http, HttpResponse } from 'msw';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

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

  it('handles non-axios error', async () => {
    const error = new Error('Unknown');
    jest.spyOn(require('axios'), 'get').mockRejectedValueOnce(error);
    await expect(fetchTeams('t', 2025)).rejects.toThrow('Unknown');
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
});

describe('fetchMatchPrediction', () => {
  it('returns match prediction', async () => {
  const result = await fetchMatchPrediction('Arsenal', 'Chelsea');
  expect(result.home_win).toBeGreaterThanOrEqual(0);
  expect(result.away_win).toBeGreaterThanOrEqual(0);
  expect(result.logo_url_64_home).toContain('http');
  expect(result.logo_url_64_away).toContain('http');
});

  it('handles missing input', async () => {
    server.use(
      http.post('http://localhost:8000/api/ml/predict/', () => {
        return new HttpResponse(null, { status: 400 });
      })
    );

    await expect(fetchMatchPrediction('', '')).rejects.toThrow();
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
});

describe('fetchUpcomingMatches', () => {
  it('returns array of matches', async () => {
    const matches = await fetchUpcomingMatches('2025-06-24T00:00:00Z');
    expect(matches.length).toBeGreaterThan(0);
    expect(matches[0].home_team).toBe('Real Madrid');
  });

  it('handles error from API', async () => {
    server.use(
      http.get('http://localhost:8000/matches/', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    await expect(fetchUpcomingMatches('2025-06-24T00:00:00Z')).rejects.toThrow();
  });

  it('handles non-axios error', async () => {
    const error = new Error('Some error');
    jest.spyOn(require('axios'), 'get').mockRejectedValueOnce(error);
    await expect(fetchUpcomingMatches('d')).rejects.toThrow('Some error');
  });
});