import type { BookingStatus } from "./bookingStatus"

export interface CheckinInfo {
    bookingId: number,
    breakfast: {
        status?: BookingStatus
        isPaid?: boolean
        hasBreakfast?: boolean,
        extrasPrice?: number,
        totalPrice?: number
    }
}