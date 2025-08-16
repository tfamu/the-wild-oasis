import { useQuery } from "@tanstack/react-query";
import type { cabin } from "../../types/cabin";
import { TwoConstants } from "../../constants/twoConstants";
import { getCabins } from "../../services/apiCabins";

// queryKey is using to identify query, save to cache
// queryFn is using for async function
export function useCabins() {
    const {
        data: cabins,
        isLoading,
        error,
    } = useQuery<cabin[]>({
    queryKey: [TwoConstants.QUERIES_KEY.CABIN],
    queryFn: getCabins,
  });

    return { cabins, isLoading, error }
}