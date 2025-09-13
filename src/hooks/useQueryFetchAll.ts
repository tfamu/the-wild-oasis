// queryKey is using to identify query, save to cache
import { useQuery, type QueryFunction } from "@tanstack/react-query";

// queryFn is using for async function
export function useQueryFetchAll<T>(queryKey: string, queryFn: QueryFunction<T>) {
  const { data, isLoading, error } = useQuery<T>({
    queryKey: [queryKey],
    queryFn: queryFn,
  });
  return { data, isLoading, error };
}