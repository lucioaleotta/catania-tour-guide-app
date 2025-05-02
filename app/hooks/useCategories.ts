import { useState, useEffect } from 'react';
import { apiService } from '@services/api';

export const useCategories = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const sites = await apiService.getAllSites();
        const data = Array.from(new Set(sites.map(site => site.category)));
        setCategories(data);
      } catch (error) {
        console.error('Error in useCategories:', error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading };
};