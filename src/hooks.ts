import { useEffect, useState } from 'react'
import axios from "axios";

export const useStream = () => {
  const [ data, setData ] = useState(null);
  const [ error, setError ] = useState(null);
  const [ done, setDone ] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          'https://api.axios.com/api/render/stream/content',
          {
            params: {
              page_size: 20,
            },
          },
        );
        setData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setDone(true);
      }
    })();
  }, []);

  return { data, error, done };
};

export const useContent = (uuid) => {
  const [ data, setData ] = useState(null)
  const [ error, setError ] = useState(null)
  const [ done, setDone ] = useState(false)

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`https://api.axios.com/api/render/content/${uuid}`);
        setData(response.data)
      } catch (error) {
        setError(error.message);
      } finally {
        setDone(true);
      }
    })();
  }, []);

  return { data, error, done };
}
