import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import {
  useForm,
  type SubmitErrorHandler,
  type SubmitHandler,
} from "react-hook-form";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";
import type { cabin } from "../../types/cabin";
import { useCreateCabin } from "../../hooks/cabins/useCreateCabin";
import { useEditCabin } from "../../hooks/cabins/useEditCabin";

type CreateCabinFormProps = {
  cabinToEdit?: cabin;
  onCloseModal?: () => void;
};

function CreateCabinForm({
  cabinToEdit = {},
  onCloseModal,
}: CreateCabinFormProps) {
  const { id: editId } = cabinToEdit;
  const isEditSession = !!editId;

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? cabinToEdit : {},
  });
  // mutateCreateCabin is seemly independent function
  // but this actually coming from mutate function of react-query
  // defining it here is just pass value to react-query then trigger the mutation
  const { isCreating, mutateCreateCabin } = useCreateCabin();
  const { isEditing, mutateEditCabin } = useEditCabin();
  const { errors } = formState;

  const isWorking = isCreating || isEditing;

  const onSubmit: SubmitHandler<cabin> = (data) => {
    console.log(data);
    if (isEditSession) {
      console.log("start editing cabin...");
      mutateEditCabin(
        {
          ...data,
          imageFile: (data.imageFile as FileList | undefined)?.[0],
        },
        {
          onSuccess: (data) => {
            console.log(data);
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      console.log("start creating new cabin...");
      mutateCreateCabin(
        {
          ...data,
          imageFile: (data.imageFile as FileList | undefined)?.[0],
        },
        {
          onSuccess: (data) => {
            console.log(data);
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  };

  const onError: SubmitErrorHandler<cabin> = (error) => {
    console.log(error);

    toast.error(`there is invalid input`);
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? 'modal' : 'regular'}>
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

      <FormRow
        label="Cabin photo"
        error={errors?.imageFile?.message?.toString()}
      >
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
          <Button
            variation="secondary"
            size="small"
            type="reset"
            onClick={() => onCloseModal?.()}
          >
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
