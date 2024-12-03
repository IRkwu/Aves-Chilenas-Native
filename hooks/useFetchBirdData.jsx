import { useState, useEffect } from 'react';

const useFetchBirdData = (uid) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Si la uid no existe o aun no se define, no se hace nada, para evitar errores
    if (!uid) return;

    setIsLoading(true);
    setError(null);

    fetch(`https://aves.ninjas.cl/api/birds/${uid}`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => setError(error))
      .finally(() => setIsLoading(false));
  }, [uid]);

  return { data, isLoading, error };
};

export default useFetchBirdData;
