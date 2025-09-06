import { useQuery } from "@tanstack/react-query";
import type { cabin } from "../../types/cabin";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router";

// queryKey is using to identify query, save to cache
// queryFn is using for async function
export function useBooking() {
  const { bookingId } = useParams()
    const {
        data: booking,
        isLoading,
        error,
    } = useQuery<cabin[]>({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false
  });

    return { booking, isLoading, error }
}