import type { UserInfo } from "../types/userInfo";
import supabase from "./supabase";

interface SigningInfo {
  fullName: string;
  email: string;
  password: string;
}
export async function signup({ fullName, email, password }: SigningInfo) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }: UserInfo) {
  if (!email || !password) {
    console.error("No email or password");
  }
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email ?? "",
    password: password ?? "",
  });
  if (error) throw new Error(error.message);

  console.log(data);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;
  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  console.log(data);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({
  password,
  fullName,
  avatar,
}: UserInfo) {
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };
  if (!updateData) {
    console.error("no updated data");
  }
  const { data, error } = await supabase.auth.updateUser(updateData!);

  if (error) throw new Error(error.message);

  if (!avatar) return data;

  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  const { data: updateUser, error: updateUserErr } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${
          import.meta.env.VITE_SUPABASE_URL
        }/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (updateUserErr) throw new Error(updateUserErr.message);

  return updateUser;
}
