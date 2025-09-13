import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";
import { TwoConstants } from "../../constants/twoConstants";

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[...Object.values(TwoConstants.BOOKING_SEARCH_OP)]}
      />
      <SortBy options={[...Object.values(TwoConstants.BOOKING_SORT_OP)]} />
    </TableOperations>
  );
}

export default BookingTableOperations;
