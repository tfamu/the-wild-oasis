import { useTranslation } from "react-i18next";
import SignupForm from "../features/authentication/SignupForm";
import Heading from "../ui/Heading";

function NewUsers() {
  const { t } = useTranslation();
  return (
    <>
      <Heading as="h1">{t("CreateNewUser")}</Heading>
      <SignupForm />
    </>
  );
}

export default NewUsers;
