import { fetchUpcomingMatches } from '../../src/components/ui/upcomingMatches/matchesApi';
import { server } from '../mocks/server';
import { http, HttpResponse } from 'msw';

describe('fetchUpcomingMatches', () => {
  it('returns array of matches', async () => {
    const matches = await fetchUpcomingMatches('2025-06-24');
    expect(matches.length).toBeGreaterThanOrEqual(1);
    expect(matches[0].home_team).toBe('Real Madrid');
  });

  it('handles error from API', async () => {
    server.use(
      http.get('http://localhost:8000/matches/', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    await expect(fetchUpcomingMatches('2025-06-24')).rejects.toThrow();
  });

  it('handles axios error with response', async () => {
    const error = {
      isAxiosError: true,
      message: 'Request failed',
      response: { status: 500, data: { error: 'fail' } },
    };
    jest.spyOn(require('axios'), 'get').mockRejectedValueOnce(error);
    await expect(fetchUpcomingMatches('d')).rejects.toEqual(error);
  });

  it('handles axios error with request', async () => {
    const error = {
      isAxiosError: true,
      message: 'No response',
      request: {},
    };
    jest.spyOn(require('axios'), 'get').mockRejectedValueOnce(error);
    await expect(fetchUpcomingMatches('d')).rejects.toEqual(error);
  });

  it('handles non-axios error', async () => {
    const error = new Error('Some error');
    jest.spyOn(require('axios'), 'get').mockRejectedValueOnce(error);
    await expect(fetchUpcomingMatches('d')).rejects.toThrow('Some error');
  });
});
