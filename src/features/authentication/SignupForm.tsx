import { useForm, type SubmitHandler } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "../../hooks/auth/useSignup";
import type { UserInfo } from "../../types/userInfo";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const { signup, isSigningUp } = useSignup();

  const onSubmit: SubmitHandler<UserInfo> = ({
    fullName,
    email,
    password,
  }: UserInfo) => {
    signup(
      {
        email: email ?? "",
        fullName: fullName ?? "",
        password: password ?? "",
      },
      {
        onSettled: () => reset(),
      }
    );
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message?.toString()}>
        <Input
          type="text"
          id="fullName"
          disabled={isSigningUp}
          {...register("fullName", { required: "this field is required" })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message?.toString()}>
        <Input
          type="email"
          id="email"
          disabled={isSigningUp}
          {...register("email", {
            required: "this field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message?.toString()}
      >
        <Input
          type="password"
          id="password"
          disabled={isSigningUp}
          {...register("password", {
            required: "this field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Repeat password"
        error={errors?.passwordConfirm?.message?.toString()}
      >
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isSigningUp}
          {...register("passwordConfirm", {
            required: "this field is required",
            validate: (value) =>
              value === getValues().password || "Passwords need to match",
          })}
        />
      </FormRow>

      {/* type is an HTML attribute! */}
      <FormRow>
        <>
          <Button
            variation="secondary"
            type="reset"
            disabled={isSigningUp}
            onClick={reset}
          >
            Cancel
          </Button>
          <Button disabled={isSigningUp}>Create new user</Button>
        </>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
