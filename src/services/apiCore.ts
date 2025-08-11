import supabase from "./supabase";

export async function getAll<T>(modelName: string) {
  const { data, error } = await supabase.from(modelName).select("*");
  if (error) {
    const errMsg = `${modelName}s could not be loaded`
    console.error(errMsg);
    throw new Error(errMsg);
  }

  return data as T[];
}

export async function createNewData<T>(modelName: string, newValues: T): Promise<{ data: T[], error?: string }> {
  const { data, error } = await supabase
    .from(modelName)
    .insert([newValues])
    .select();

  if (error) {
    const errMsg = `${modelName} could not be created`
    console.error(errMsg);
    throw new Error(errMsg);
  }

  return { data }
}

export async function deleteData(modelName: string, id: number) {
  const { error } = await supabase.from(modelName).delete().eq("id", id);

  if (error) {
    const errMsg = `${modelName} could not be deleted`
    console.error(errMsg);
  }
}

type BucketNameType = 'cabin-images' | 'avatars'

export async function uploadImage(bucketName: BucketNameType, imageFile?: File): Promise<{ imagePath?: string, error?: string }> {
  let errMsg = "Error"
  if (!imageFile || !imageFile.name) {
    errMsg = "File not exist or invalid file name"
    console.error(errMsg)
    return { error: errMsg }
  }

  const uploadImgName = `${Math.random() * 10}-${imageFile.name}`.replaceAll("/","")
  const imagePath = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/${bucketName}/${uploadImgName}`

  const { error } = await supabase.storage
    .from(bucketName)
    .upload(uploadImgName, imageFile)
  
  if (error) {
    errMsg = error.message
    console.error(errMsg)
    return { error: errMsg}
  }

  return { imagePath }
}
