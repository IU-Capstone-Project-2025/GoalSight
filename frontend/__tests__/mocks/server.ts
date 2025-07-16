// Import setup tools from MSW (Mock Service Worker)
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

const API_BASE_URL = 'http://localhost:8000';

// Define all mock request handlers
export const handlers = [
  // Mock for fetchTeams API
  http.get(`${API_BASE_URL}/tournaments/`, ({ request }) => {
    const url = new URL(request.url);
    const tournamentTitle = url.searchParams.get('tournament_title');
    const year = url.searchParams.get('year');

    // Return mock team data if both query parameters are provided
    if (tournamentTitle && year) {
      return HttpResponse.json([
        { name: "Arsenal", country: "England", logo_url_32: "https://logo.com/arsenal.png" },
      ]);
    }

    // Return 400 error if parameters are missing
    return new HttpResponse(null, { status: 400 });
  }),

  // Mock for fetchTeamStats API
  http.get(`${API_BASE_URL}/teams/`, ({ request }) => {
    const url = new URL(request.url);
    const name = url.searchParams.get('name') || 'Arsenal';

    // Return 404 if no team name is provided
    if (!name) {
      return new HttpResponse(null, { status: 404 });
    }

    // Return mock stats for the team
    return HttpResponse.json({
      logo_url_64: "https://logo.com/arsenal-large.png",
      country: "England",
      coach: "Mikel Arteta",
      market_value: 800_000_000,
      avg_age: 25.5,
      xG: 1.9,
      ball_possession: 55.1,
      shots_on_target: 7,
      big_chances_created: 4,
      last_5_matches_wdl: {
        wins: 3,
        draws: 1,
        losses: 1,
      },
    });
  }),

  // Mock for fetchMatchPrediction API
  http.post(`${API_BASE_URL}/api/ml/predict/`, async ({ request }) => {
    const body = await request.json() as { home_team: string; away_team: string };
    const { home_team, away_team } = body;

    // Return 400 if either team is missing
    if (!home_team || !away_team) {
      return new HttpResponse(
        JSON.stringify({ error: 'Both home_team and away_team are required.' }),
        { status: 400 }
      );
    }

    // Return 404 if one or both teams are "NotFound"
    if (home_team === 'NotFound' || away_team === 'NotFound') {
      return new HttpResponse(
        JSON.stringify({ error: 'One or both teams not found.' }),
        { status: 404 }
      );
    }

    // Return mock prediction result
    return HttpResponse.json({
      home_win: 1,
      away_win: 0,
      logo_url_64_home: "https://logo.com/home.png",
      logo_url_64_away: "https://logo.com/away.png"
    });
  }),

  // Mock for fetchUpcomingMatches API
  http.get(`${API_BASE_URL}/matches/`, ({ request }) => {
    const url = new URL(request.url);
    const date = url.searchParams.get('date');

    // Return 400 if invalid date format is provided
    if (date === 'invalid') {
      return new HttpResponse(JSON.stringify({ error: 'Invalid date format. Use YYYY-MM-DD.' }), {
        status: 400,
      });
    }

    // Return mock upcoming match data
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

// Initialize and export the mock server
export const server = setupServer(...handlers);