import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { booking } from "../../types/booking";
import { TwoConstants } from "../../constants/twoConstants";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router";

export const useBookings = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const filterVal = searchParams.get("status");
  const filter =
    !filterVal || filterVal === "all"
      ? null
      : { field: "status", value: filterVal };

  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  const page = !searchParams.get("page" ? 1 : Number(searchParams.get("page")));

  const {
    data: { data: bookings, count } = {},
    isError,
    isLoading,
  } = useQuery<booking[]>({
    queryKey: [TwoConstants.QUERIES_KEY.BOOKING, filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // PRE FETCHING
  const pageCount = Math.ceil(count / 10);
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: [TwoConstants.QUERIES_KEY.BOOKING, filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  }
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: [TwoConstants.QUERIES_KEY.BOOKING, filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  }

  return { bookings, isError, isLoading };
};
