import axios from "axios";
import { useState } from "react";

const useAxiosGPT = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true)

  const makeRequest = async (url, payload, headers) => {
    // set The loading
    setLoading(true)
    const timeout = setTimeout(() => {
      console.log(
        "Due to the high traffic of the ChatGPT API, the response may take a few seconds."
      );
    }, 10000);
    try {
      const response = await axios.post(url, payload, { headers });
      setData(response.data);
    } catch (error) {
      setError(error);
      console.log("Something went wrong. Please try again later");
    } finally {
      // set the loading false
       setLoading(false)
      clearTimeout(timeout);
    }
  };

  return { makeRequest, data, error,loading};
};

export default useAxiosGPT;
