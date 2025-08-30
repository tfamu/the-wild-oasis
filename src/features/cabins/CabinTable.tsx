import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "../../hooks/cabins/useCabins";
import Table from "../../ui/Table";
import type { cabin } from "../../types/cabin";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router";
import { TwoConstants } from "../../constants/twoConstants";

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;

const CabinTable = () => {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  const filterValue = searchParams.get("discount") || "all";

  // filter
  let filteredCabins;
  if (filterValue === TwoConstants.CABIN_SEARCH_OP.ALL.value) {
    filteredCabins = cabins;
  }
  if (filterValue === TwoConstants.CABIN_SEARCH_OP.NO_DISCOUNT.value) {
    filteredCabins = cabins?.filter((cabin) => cabin.discount === 0);
  }
  if (filterValue === TwoConstants.CABIN_SEARCH_OP.WITH_DISCOUNT.value) {
    filteredCabins = cabins?.filter(
      (cabin) => cabin.discount && cabin.discount > 0
    );
  }

  // sort
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  // sortable key
  const sortableFields: (keyof cabin)[] = [
    "regularPrice",
    "discount",
    "maxCapacity",
    "name",
  ];
  const isSortableField = (f: string): f is keyof cabin =>
    sortableFields.includes(f as keyof cabin);

  const sortedCabins = filteredCabins?.sort((a, b) => {
    if (isSortableField(field)) {
      if (typeof a[field] === "string") {
        return (
          (a[field] as string).localeCompare(b[field] as string) * modifier
        );
      }
      return ((a[field] as number) - (b[field] as number)) * modifier;
    }
    return 0;
  });

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          // data={cabins}
          // data={filteredCabins}
          data={sortedCabins}
          render={(cabin: cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
};

export default CabinTable;
