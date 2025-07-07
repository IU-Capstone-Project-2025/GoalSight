import { useEffect, useState } from 'react';
import { fetchMatchPrediction } from './tournamentApi';
import { MatchPrediction } from './Team.types';

export function useMatchPrediction(homeTeam: string | null, awayTeam: string | null) {
  const [prediction, setPrediction] = useState<MatchPrediction | null>(null);
  const [loadingPrediction, setLoadingPrediction] = useState(true);

  useEffect(() => {
    if (!homeTeam || !awayTeam) return;

    let isMounted = true;

    async function getPrediction() {
      setLoadingPrediction(true);

      try {
        const data = await fetchMatchPrediction(homeTeam!, awayTeam!);
        if (!isMounted) return;

        const conf = data.confidence * 100;
        let result: MatchPrediction | null = null;

        if (data.prediction === homeTeam) {
          result = {
            name1: homeTeam!,
            confidence1: parseFloat(conf.toFixed(1)),
            name2: awayTeam!,
            confidence2: parseFloat((100 - conf).toFixed(1)),
          };
        } else {
          result = {
            name1: homeTeam!,
            confidence1: parseFloat((100 - conf).toFixed(1)),
            name2: awayTeam!,
            confidence2: parseFloat(conf.toFixed(1)),
          };
        }

        setPrediction(result);
      } catch (e) {
        if (!isMounted) return;
        console.error(e);
        setPrediction(null);
      } finally {
        if (!isMounted) return;
        setLoadingPrediction(false);
      }
    }

    getPrediction();

    return () => {
      isMounted = false;
    };
  }, [homeTeam, awayTeam]);

  return { prediction, loadingPrediction };
}