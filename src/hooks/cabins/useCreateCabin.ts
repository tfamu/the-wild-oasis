import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { TwoConstants } from "../../constants/twoConstants";

export function useCreateCabin() {
    const queryClient = useQueryClient();
    const { mutate: mutateCreateCabin, isPending: isCreating } = useMutation({
        mutationFn: createNewCabin,
        onSuccess: () => {
          toast.success("New cabin successfully created");
          queryClient.invalidateQueries({
            queryKey: [TwoConstants.QUERIES_KEY.CABIN],
          });
          // only after cabin is actually created in database
          // call the reset
          // reset() will be called at component which is using this hook
            //   reset();
        },
        onError: (err) => {
          toast.error(err.message);
        },
      });
    return { isCreating, mutateCreateCabin }
} 
