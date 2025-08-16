import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editCabin } from "../../services/apiCabins";
import { TwoConstants } from "../../constants/twoConstants";
import toast from "react-hot-toast";

export function useEditCabin() {
    const queryClient = useQueryClient();
    const { mutate: mutateEditCabin, isPending: isEditing } = useMutation({
    mutationFn: editCabin,
    onSuccess: () => {
      toast.success("Cabin successfully Edited");
      queryClient.invalidateQueries({
        queryKey: [TwoConstants.QUERIES_KEY.CABIN],
      });
      // only after cabin is actually created in database
      // call the reset
    //   reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isEditing, mutateEditCabin }
}