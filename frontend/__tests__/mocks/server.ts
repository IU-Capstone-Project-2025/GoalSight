import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

const API_BASE_URL = 'http://localhost:8000';

export const handlers = [
  http.get(`${API_BASE_URL}/tournaments/`, () => {
    return HttpResponse.json([
      { name: "Arsenal", logo_url: "https://logo.com/arsenal.png" }
    ]);
  }),

  http.get(`${API_BASE_URL}/teams/`, () => {
    return HttpResponse.json({
      coach: "Mikel Arteta",
      country: "England",
      avg_age: 25.5,
      xG: 1.9,
      ball_possession: 55.1,
      shots_on_target: 7,
      big_chances_created: 4,
      last_5_matches_wdl: {
        wins: 3,
        draws: 1,
        losses: 1
      }
    });
  }),

    http.post(`${API_BASE_URL}/api/ml/predict/`, async ({ request }) => {
    const body = await request.json() as { home_team: string; away_team: string };
    const { home_team, away_team } = body;

    if (!home_team || !away_team) {
        return new HttpResponse(null, { status: 400 });
    }

    return HttpResponse.json({
        prediction: home_team,
        confidence: 0.88
    });
    }),

  // /matches/
  http.get(`${API_BASE_URL}/matches/`, () => {
    return HttpResponse.json([
      {
        id: 1,
        date: '2025-06-24T19:30:00Z',
        home_team: 'Real Madrid',
        away_team: 'Barcelona',
      },
    ]);
  }),
];

export const server = setupServer(...handlers);