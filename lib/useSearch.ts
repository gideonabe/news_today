"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export function useSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams?.get("search") || "");
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  // 🔹 Debounce the search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim());
    }, 600);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  // 🔹 Handle pressing Enter in search input
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const query = e.currentTarget.value.trim();
      const params = new URLSearchParams(searchParams.toString());

      if (query) {
        params.set("search", query);
      } else {
        params.delete("search");
      }

      router.replace(`/?${params.toString()}`);
      e.currentTarget.blur();
    }
  };

  return {
    searchQuery,
    setSearchQuery,
    debouncedQuery,
    handleSearchKeyDown,
  };
}
