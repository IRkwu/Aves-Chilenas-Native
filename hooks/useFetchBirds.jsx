import { useState, useEffect } from 'react';

const useFetchBirds = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch(`https://aves.ninjas.cl/api/birds`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => setError(error))
      .finally(() => setIsLoading(false));
  }, []);

  return { data, isLoading, error };
};

export default useFetchBirds;