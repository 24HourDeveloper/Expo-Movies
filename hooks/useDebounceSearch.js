import { useEffect, useState } from 'react'

export default useDebounceSearch = () => {
  const [query, setQuery] = useState("");
  const [debouncedSearch, setDebounceSearch] = useState(query)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceSearch(query)
    },500)

    return () => clearTimeout(handler)
  }, [query]);

  return [query, setQuery, debouncedSearch]
}

