import { fetchUpcomingMatches } from '../../frontend/src/components/ui/upcomingMatches/api';
import { server } from '../../mocks/server';
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
});