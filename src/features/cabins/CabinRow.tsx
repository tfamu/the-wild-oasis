import styled from "styled-components";
import type { cabin } from "../../types/cabin";
import { formatJPY } from "../../utils/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import { TwoConstants } from "../../constants/twoConstants";
import toast from "react-hot-toast";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

interface CabinRowProps {
  cabin: cabin;
}

const CabinRow = ({ cabin }: CabinRowProps) => {
  const [showForm, setShowForm] = useState<boolean>(false);

  const {
    name,
    image,
    discount,
    maxCapacity,
    regularPrice,
    id: cabinId,
  } = cabin;

  const queryClient = useQueryClient();

  // mutate is using to make mutation to remote state
  // by called mutation server api, then it do mutate the remote state also
  // invalidateQueries is using to tell react-query that the queries is now invalidated
  // those query is now possible to refetch, using especially after mutation success
  // another benefit of using invalidateQueries is to sync between many tab, in the scenerio there are many reference at resource on same time from other device or browser
  const { isPending: isDeleting, mutate } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast.success("Cabin successfully deleted");
      queryClient.invalidateQueries({
        queryKey: [TwoConstants.QUERIES_KEY.CABIN],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return (
    <>
      <TableRow role="row">
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up tp {maxCapacity}</div>
        <Price>{formatJPY(regularPrice)}</Price>
        <Discount>{formatJPY(discount)}</Discount>
        <div>
          <button onClick={() => setShowForm((show) => !show)}>Edit</button>
          <button onClick={() => mutate(cabinId!)} disabled={isDeleting}>
            delete
          </button>
        </div>
      </TableRow>
      {showForm && <CreateCabinForm cabinToEdit={cabin} />}
    </>
  );
};

export default CabinRow;

