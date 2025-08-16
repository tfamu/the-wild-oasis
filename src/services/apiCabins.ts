import type { cabin } from "../types/cabin";
import {
  createNewData,
  deleteData,
  getAll,
  modifyData,
  uploadImage,
} from "./apiCore";

const MODEL_NAME = "cabin";

export async function getCabins() {
  return await getAll<cabin>(MODEL_NAME);
}

export async function createNewCabin(newCabin: cabin): Promise<cabin> {
  const { imageFile, ...cabinData } = newCabin;

  const { imagePath, error: imgUploadErr } = await uploadImage(
    "cabin-images",
    imageFile
  );

  if (imgUploadErr) {
    console.error(imgUploadErr);
    throw new Error(imgUploadErr);
  }

  const res = await createNewData(MODEL_NAME, {
    ...cabinData,
    image: imagePath,
  } as cabin);
  return res.data[0];
}

type newResImgInfo = {
  imagePath?: string;
  error?: string;
};

export async function editCabin(cabinToEdit: cabin): Promise<cabin> {
  const hasOldImagePath = cabinToEdit.image?.startsWith(
    import.meta.env.VITE_SUPABASE_URL
  );
  const { imageFile, ...cabinData } = cabinToEdit;

  const newResImgInfo: newResImgInfo = {};

  if (!hasOldImagePath) {
    const { imagePath, error: imgUploadErr } = await uploadImage(
      "cabin-images",
      imageFile
    );
    newResImgInfo.imagePath = imagePath;
    newResImgInfo.error = imgUploadErr;
    if (imgUploadErr) {
      console.error(imgUploadErr);
      throw new Error(imgUploadErr);
    }
  }

  const res = await modifyData(
    MODEL_NAME,
    {
      ...cabinData,
      image: hasOldImagePath ? cabinToEdit.image : newResImgInfo.imagePath,
    } as cabin,
    cabinToEdit.id!
  );
  return res.data[0];
}

export async function deleteCabin(id: number) {
  await deleteData(MODEL_NAME, id);
}
