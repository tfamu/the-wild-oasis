import type { cabin } from "./cabin";
import type { guest } from "./guest";

export interface booking {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  cabinId?: number;
  guestId?: number;
  hasBreakfast?: boolean;
  observations?: string;
  isPaid?: boolean;
  numGuests: number;
  numNights: number;
  totalPrice: number;
  status: string | number;
  guest?: guest;
  cabin?: cabin;
}

// id: bookingId,
//     created_at,
//     startDate,
//     endDate,
//     numNights,
//     numGuests,
//     totalPrice,
//     status,
//     guests: { fullName: guestName, email },
//     cabins: { name: cabinName },
