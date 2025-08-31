import { useQuery } from "@tanstack/react-query"
import type { booking } from "../../types/booking"
import { TwoConstants } from "../../constants/twoConstants"
import { getBookings } from "../../services/apiBookings"
import { useSearchParams } from "react-router";

export const useBookings = () => {
  const [searchParams] = useSearchParams();

  const filterVal = searchParams.get("status");
  const filter =
    !filterVal || filterVal === "all"
      ? null
      : { field: "status", value: filterVal };

  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  const {
    data: bookings,
    isError,
    isLoading,
  } = useQuery<booking[]>({
    queryKey: [TwoConstants.QUERIES_KEY.BOOKING, filter, sortBy],
    queryFn: () => getBookings({ filter, sortBy }),
  });

  return { bookings, isError, isLoading };
};