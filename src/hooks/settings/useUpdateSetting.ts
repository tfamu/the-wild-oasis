import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { TwoConstants } from "../../constants/twoConstants";
import { updateSetting } from "../../services/apiSettings";

export function useUpdateSetting() {
    const queryClient = useQueryClient();
    const { mutate: mutateUpdateSetting, isPending: isUpdating } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success("Setting successfully Edited");
      queryClient.invalidateQueries({
        queryKey: [TwoConstants.QUERIES_KEY.SETTING],
      });
      // only after cabin is actually created in database
      // call the reset
    //   reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isUpdating, mutateUpdateSetting }
}