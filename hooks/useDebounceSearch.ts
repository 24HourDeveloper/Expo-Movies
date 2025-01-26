import { useEffect, useState, Dispatch, SetStateAction } from 'react'

type UseDebounceSearchReturn = [string, Dispatch<SetStateAction<string>>, string];

export default (): UseDebounceSearchReturn => {
  const [query, setQuery] = useState<string>("");
  const [debouncedSearch, setDebounceSearch] = useState<string>(query)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceSearch(query)
    },500)

    return () => clearTimeout(handler)
  }, [query]);

  return [query, setQuery, debouncedSearch]
}

