import { useQuery } from "@tanstack/react-query"
import type { booking } from "../../types/booking"
import { TwoConstants } from "../../constants/twoConstants"
import { getBookings } from "../../services/apiBookings"

export const useBookings = () => {
    const { data: bookings, isError, isLoading } = useQuery<booking[]>({
        queryKey: [TwoConstants.QUERIES_KEY.BOOKING],
        queryFn: getBookings
    })

    return { bookings, isError, isLoading }
}