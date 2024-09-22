import { useState } from "react";

async function searchDictionary(word) {
  const response = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );
  const data = await response.json();

  const success = response.ok ? data : null;
  const error = response.ok ? null : data;

  return [success, error];
}

export function useFetchDictionaryData() {
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchData(word) {
    setLoading(true);
    const result = await searchDictionary(word);
    setResponse(result); // [success, error];
    setLoading(false);
  }

  return { fetchData, response, loading };
}
