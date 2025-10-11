import { useTranslation } from "react-i18next";
import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Settings() {
  const { t } = useTranslation();
  return (
    <Row>
      <Heading as="h1">{t("Settings")}</Heading>
      <UpdateSettingsForm />
    </Row>
  );
}

export default Settings;
