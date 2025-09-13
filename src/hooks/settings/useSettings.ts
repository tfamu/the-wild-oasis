import { useQuery } from "@tanstack/react-query";
import { getSetting } from "../../services/apiSettings";

export function useSettings() {
  const {
    isLoading,
    error,
    data: setting,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSetting,
  });

  return { isLoading, error, setting };
}
