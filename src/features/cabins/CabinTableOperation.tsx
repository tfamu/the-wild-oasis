import { TwoConstants } from "../../constants/twoConstants"
import Filter from "../../ui/Filter"
import SortBy from "../../ui/SortBy"
import TableOperations from "../../ui/TableOperations"

const CabinTableOperation = () => {
    return (
      <TableOperations>
        <Filter
          filterField="discount"
          options={[...Object.values(TwoConstants.CABIN_SEARCH_OP)]}
        />

        <SortBy options={[...Object.values(TwoConstants.CABIN_SORT_OP)]} />
      </TableOperations>
    );
}

export default CabinTableOperation
