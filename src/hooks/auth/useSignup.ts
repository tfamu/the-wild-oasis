import { useMutation } from "@tanstack/react-query";
import { signup as signUpApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
    const { mutate: signup, isPending: isSigningUp } = useMutation({
        mutationFn: signUpApi,
        onSuccess: (user) => {
            console.log(user);
            toast.success("Account successfully created!")
        },
        onError: (err) => {
            console.log(err.message);
            toast.error("Cannot create account")
        }
    })

    return { signup, isSigningUp }
}