import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import { login as loginApi } from "../../services/apiAuth"
import toast from "react-hot-toast"

export const useLogin = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { mutate: login, isPending } = useMutation({
        mutationFn: ({ email, password }) => loginApi({email, password}),
        onSuccess: (user) => {
            console.log(user);
            queryClient.setQueryData(["user"], user.user)
            navigate("/dashboard", { replace: true })
        },
        onError: (err) => {
            console.log('ERROR', err)
            toast.error("Provided email or password are incorrect")
        }
    })

    return { login, isPending }
}