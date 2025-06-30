import { fetchTeams, fetchTeamStats, fetchMatchPrediction } from '../../src/components/ui/team_item/tournamentApi';
import { server } from '../mocks/server';
import { http, HttpResponse } from 'msw';

describe('fetchTeams', () => {
  it('fetches teams from API', async () => {
    const data = await fetchTeams('Champions League', 2025);
    expect(data[0].name).toBe('Arsenal');
  });
});

describe('fetchTeamStats', () => {
  it('fetches team stats correctly', async () => {
    const stats = await fetchTeamStats('Arsenal');
    expect(stats.coach).toBe('Mikel Arteta');
    expect(stats.avg_age).toBeGreaterThan(20);
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
});