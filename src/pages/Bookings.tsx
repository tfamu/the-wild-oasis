import { useTranslation } from "react-i18next";
import BookingTable from "../features/bookings/BookingTable";
import BookingTableOperations from "../features/bookings/BookingTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Bookings() {
  const { t } = useTranslation();
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">{t("Bookings")}</Heading>
        <BookingTableOperations />
      </Row>

      <BookingTable />
    </>
  );
}

export default Bookings;
