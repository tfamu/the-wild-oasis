import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TwoConstants } from "../../constants/twoConstants";
import toast from "react-hot-toast";
import { deleteCabin } from "../../services/apiCabins";

export function useDeleteCabin() {
  const queryClient = useQueryClient();
  
    // mutate is using to make mutation to remote state
    // by called mutation server api, then it do mutate the remote state also
    // invalidateQueries is using to tell react-query that the queries is now invalidated
    // those query is now possible to refetch, using especially after mutation success
    // another benefit of using invalidateQueries is to sync between many tab, in the scenerio there are many reference at resource on same time from other device or browser
    const { isPending: isDeleting, mutate: mutateDeleteCabin } = useMutation({
      mutationFn: deleteCabin,
      onSuccess: () => {
        toast.success("Cabin successfully deleted");
        queryClient.invalidateQueries({
          queryKey: [TwoConstants.QUERIES_KEY.CABIN],
        });
      },
      onError: (err) => toast.error(err.message),
    });

    return { isDeleting, mutateDeleteCabin }
}
