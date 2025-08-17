import type React from "react";
import { TwoConstants } from "../../constants/twoConstants";
import { useUpdateSetting } from "../../hooks/settings/useUpdateSetting";
import { useQueryFetchAll } from "../../hooks/useQueryFetchAll";
import { getSettings } from "../../services/apiSettings";
import type { setting } from "../../types/setting";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";

type SettingField =
  | "minBookingLength"
  | "maxBookingLength"
  | "maxGuestsPerBooking"
  | "breakfastPrice";

function UpdateSettingsForm() {
  const { data, isLoading } = useQueryFetchAll<setting>(
    TwoConstants.QUERIES_KEY.SETTING,
    getSettings
  );
  const { isUpdating, mutateUpdateSetting } = useUpdateSetting();
  const settingData = data ? data[0] : {};

  const handleUpdate = (
    e: React.FocusEvent<HTMLInputElement>,
    field: SettingField
  ) => {
    const { value } = e.target;
    if (!value || settingData[field]?.toString() === value) return;
    mutateUpdateSetting({ [field]: value });
  };
  if (isLoading) return <Spinner />;
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={settingData.minBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={settingData.maxBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={settingData.maxGuestsPerBooking}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={settingData.breakfastPrice}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
