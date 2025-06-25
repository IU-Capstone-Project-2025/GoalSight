import { useEffect, useState } from 'react';
import { MatchPredictionApiResponse, MatchPrediction } from './Team.types';
import { fetchMatchPrediction } from './tournamentApi';

export function useMatchPrediction(homeTeam: string | null, awayTeam: string | null) {
  const [prediction, setPrediction] = useState<MatchPrediction | null>(null);
  const [loadingPrediction, setLoadingPrediction] = useState(true);

  useEffect(() => {
    if (!homeTeam || !awayTeam) return;

    setLoadingPrediction(true);

    fetchMatchPrediction(homeTeam, awayTeam)
      .then((data: MatchPredictionApiResponse) => {
        const { prediction, confidence } = data;
        const conf = confidence * 100;

        let result: MatchPrediction;
        if (prediction === homeTeam) {
          result = {
            name1: homeTeam,
            confidence1: parseFloat(conf.toFixed(1)),
            name2: awayTeam,
            confidence2: parseFloat((100 - conf).toFixed(1)),
          };
        } else {
          result = {
            name1: awayTeam,
            confidence1: parseFloat(conf.toFixed(1)),
            name2: homeTeam,
            confidence2: parseFloat((100 - conf).toFixed(1)),
          };
        }

        setPrediction(result);
      })
      .catch((e) => {
        console.error(e);
        setPrediction(null);
      })
      .finally(() => setLoadingPrediction(false));
  }, [homeTeam, awayTeam]);

  return { prediction, loadingPrediction };
}