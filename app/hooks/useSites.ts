// app/hooks/useSites.ts
import { useState, useEffect } from 'react';
import { apiService, Site } from '@services/api';

export const useSites = () => {
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSites = async () => {
      try {
        setLoading(true);
        const data = await apiService.getAllSites();
        setSites(data);
        setError(null);
      } catch (err) {
        setError('Impossibile caricare i siti turistici');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSites();
  }, []);

  return { sites, loading, error };
};