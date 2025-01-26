import { useState, useCallback } from 'react';

interface StreamFetchOptions {
  maxRetries?: number;
  retryDelay?: number;
}

interface StreamResponse {
  data: Response | null;
  error: Error | null;
  isLoading: boolean;
}

export const useStreamFetch = (options: StreamFetchOptions = {}) => {
  const { maxRetries = 3, retryDelay = 1000 } = options;
  const [isLoading, setIsLoading] = useState(false);

  const fetchWithRetry = useCallback(async (url: string, attempt = 0): Promise<Response> => {
    try {
      const response = await fetch(url, {
        mode: 'no-cors',
        credentials: 'omit',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
          'Upgrade-Insecure-Requests': '1',
        },
      });

      // With no-cors, we can't check status, so we'll assume it's ok
      return response;
    } catch (error) {
      if (attempt < maxRetries) {
        console.log(`Retry attempt ${attempt + 1} for ${url} after error:`, error);
        await new Promise(resolve => setTimeout(resolve, retryDelay));
        return fetchWithRetry(url, attempt + 1);
      }
      throw error;
    }
  }, [maxRetries, retryDelay]);

  const fetchStream = useCallback(async (url: string): Promise<StreamResponse> => {
    setIsLoading(true);
    try {
      const response = await fetchWithRetry(url);
      return { data: response, error: null, isLoading: false };
    } catch (error) {
      return { data: null, error: error as Error, isLoading: false };
    } finally {
      setIsLoading(false);
    }
  }, [fetchWithRetry]);

  return { fetchStream, isLoading };
};
