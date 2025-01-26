import { useEffect, useState, Dispatch, SetStateAction } from 'react'

type UseDebounceSearchTypes = [string, Dispatch<SetStateAction<string>>, string];

export default (): UseDebounceSearchTypes => {
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

