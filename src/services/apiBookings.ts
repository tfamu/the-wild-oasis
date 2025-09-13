import type { booking } from "../types/booking";
import type { BookingStatus } from "../types/bookingStatus";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";

const MODEL_NAME = "booking";

type FilterMethod =
  | "eq"
  | "neq"
  | "gt"
  | "gte"
  | "lt"
  | "lte"
  | "like"
  | "ilike";

interface BookingFetchParms {
  filter: { field: string; value: BookingStatus; method?: FilterMethod } | null;
  sortBy: { field: string; direction: string };
  page: number;
}

export async function getBookings({
  filter,
  sortBy,
  page,
}: BookingFetchParms): Promise<{
  data: booking[] | null;
  count: number;
}> {
  let query = supabase
    .from(MODEL_NAME)
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, totalPrice, status, cabin(name), guest(fullName, email)",
      { count: "exact" }
    );
  // Remove dynamic method invocation and rely on the switch statement below
  // const filterMethodKey = filter?.method ? { [filter.method]: filter.method } : { "eq": "eq" }
  // query = query[filter.method || "eq"](filter.field, filter.value)
  // if (filter) {
  //   query = query[filterMethodKey](filter.field, filter.value)
  // }

  if (filter) {
    switch (filter.method) {
      case "eq":
      case undefined:
        query = query.eq(filter.field, filter.value);
        break;
      case "neq":
        query = query.neq(filter.field, filter.value);
        break;
      case "gt":
        query = query.gt(filter.field, filter.value);
        break;
      case "gte":
        query = query.gte(filter.field, filter.value);
        break;
      case "lt":
        query = query.lt(filter.field, filter.value);
        break;
      case "lte":
        query = query.lte(filter.field, filter.value);
        break;
      case "like":
        query = query.like(filter.field, filter.value);
        break;
      case "ilike":
        query = query.ilike(filter.field, filter.value);
        break;
      default:
        throw new Error(`Unsupported filter method: ${filter.method}`);
    }
  }

  if (sortBy) {
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });
  }

  if (page) {
    const from = (page - 1) * 10;
    const to = from + 10 - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded");
  }

  const bookingRes = data ? (data as booking[]) : null;
  const countRes = count ?? 0;

  return { data: bookingRes, count: countRes };
}

// for refractoring later...
// export async function getBookings({ filter, sortBy }) {
//   return getAll<booking>(
//     MODEL_NAME,
//     "id, created_at, startDate, endDate, numNights, numGuests, totalPrice, status, cabin(name), guest(fullName, email)"
//   );
// }

export async function getBooking(id: number) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data as booking;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date: string) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date: string) {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data as booking[];
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data as booking[];
}

export async function updateBooking(id: number, obj: booking) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id: number) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
