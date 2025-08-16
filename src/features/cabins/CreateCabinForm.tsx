import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewCabin, editCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { TwoConstants } from "../../constants/twoConstants";
import FormRow from "../../ui/FormRow";
import type { cabin } from "../../types/cabin";

type CreateCabinFormProps = {
  cabinToEdit?: cabin;
};

function CreateCabinForm({ cabinToEdit = {} }: CreateCabinFormProps) {
  const { id: editId } = cabinToEdit;

  const isEditSession = !!editId;

  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? cabinToEdit : {},
  });
  const { errors } = formState;

  const { mutate: mutateCreateCabin, isPending: isCreating } = useMutation({
    mutationFn: createNewCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({
        queryKey: [TwoConstants.QUERIES_KEY.CABIN],
      });
      // only after cabin is actually created in database
      // call the reset
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const { mutate: mutateEditCabin, isPending: isEditing } = useMutation({
    mutationFn: editCabin,
    onSuccess: () => {
      toast.success("Cabin successfully Edited");
      queryClient.invalidateQueries({
        queryKey: [TwoConstants.QUERIES_KEY.CABIN],
      });
      // only after cabin is actually created in database
      // call the reset
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const isWorking = isCreating || isEditing;

  const onSubmit = (data) => {
    console.log(data);
    if (isEditSession) {
      console.log("start editing cabin...");
      mutateEditCabin({ ...data, imageFile: data.imageFile[0] });
    } else {
      console.log("start creating new cabin...");
      mutateCreateCabin({ ...data, imageFile: data.imageFile[0] });
    }
  };

  const onError = (error) => {
    toast.error(`there is invalid input`);
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin Name" error={errors?.name?.message?.toString()}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow
        label="Maximum capacity"
        error={errors?.maxCapacity?.message?.toString()}
      >
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "this field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Regular price"
        error={errors?.regularPrice?.message?.toString()}
      >
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "this field is required",
            min: {
              value: 1,
              message: "price should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message?.toString()}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "this field is required",
            validate: (value) =>
              value! <= getValues().regularPrice! ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message?.toString()}
      >
        <Textarea
          id="description"
          disabled={isWorking}
          defaultValue=""
          {...register("description", {
            required: "this field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="imageFile"
          type="file"
          accept="image/*"
          {...register("imageFile", {
            required: isEditSession ? false : "this field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <>
          <Button variation="secondary" size="small" type="reset">
            Cancel
          </Button>
          <Button variation="secondary" size="small" disabled={isWorking}>
            {isEditSession ? "Edit cabin" : "Create new cabin"}
          </Button>
        </>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
