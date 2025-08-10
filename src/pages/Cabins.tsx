import { useEffect, useState } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabins } from "../services/apiCabins";
import type { cabin as cabinType } from "../types/cabin";
import { formatJPY } from "../utils/helpers";
import CabinTable from "../features/cabins/CabinTable";

function Cabins() {
  // const [cabins, setCabins] = useState<cabinType[]>([]);

  // useEffect(() => {
  //   getCabins<cabinType[]>().then((data) => {
  //     if (data) setCabins(data);
  //   });
  // }, []);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <div>
          {/* {cabins.map((cabin) => (
            <div key={cabin.id}>
              <h3>{cabin.name}</h3>
              <p>Max Capacity: {cabin.maxCapacity}</p>
              <p>Price: {formatJPY(cabin.discount)}</p>
              {cabin.discount > 0 && (
                <p>Discount: {formatJPY(cabin.discount)}</p>
              )}
              <img src={cabin.image} alt={cabin.name} />
            </div>
          ))} */}
        </div>
        <p>filter / sort</p>
      </Row>
      <Row type="vertical">
        <CabinTable />
      </Row>
    </>
  );
}

export default Cabins;
