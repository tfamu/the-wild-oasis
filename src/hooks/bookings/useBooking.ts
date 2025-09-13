import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router";
import type { booking } from "../../types/booking";

// queryKey is using to identify query, save to cache
// queryFn is using for async function
export function useBooking() {
  const { bookingId } = useParams();
  const {
    data: booking,
    isLoading,
    error,
  } = useQuery<booking>({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(Number(bookingId)),
    retry: false,
  });

  return { booking, isLoading, error };
}
