import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";
import CabinTableOperation from "../features/cabins/CabinTableOperation";
import { useTranslation } from "react-i18next";

function Cabins() {
  const { t } = useTranslation();
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">{t("Cabins")}</Heading>
        <CabinTableOperation />
      </Row>
      <Row type="vertical">
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
