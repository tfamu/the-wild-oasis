import type { setting } from "../types/setting";
import { getAll, modifyData } from "./apiCore";

const MODEL_NAME = "setting";

export async function getSettings(): Promise<setting[]> {
  const settingData = await getAll<setting>(MODEL_NAME);
  return settingData;
}

// We expect a newSetting object that looks like {setting: newValue}
export async function updateSetting(newSetting: setting) {
  // There is only ONE row of settings, and it has the ID=1, and so this is the updated one
  const data = modifyData(MODEL_NAME, newSetting, 1);
  return data;
}
