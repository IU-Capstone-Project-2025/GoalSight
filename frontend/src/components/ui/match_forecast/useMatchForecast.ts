import { useEffect, useState } from 'react';
import { fetchMatchPrediction } from './forecastApi';
import { MatchPrediction } from '../match_forecast/MatchForecast.types';

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

                let result: MatchPrediction | null = null;

                result = {
                    name1: homeTeam!,
                    confidence1: parseFloat((data.home_win * 100).toFixed(1)),
                    name2: awayTeam!,
                    confidence2: parseFloat((data.away_win * 100).toFixed(1)),
                    logoUrl1: data.logo_url_64_home,
                    logoUrl2: data.logo_url_64_away,
                };

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