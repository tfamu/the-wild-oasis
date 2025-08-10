import supabase from "./supabase"

export async function getCabins<T>() {
    const { data, error } = await supabase
        .from('cabin')
        .select('*')
    if (error) {
        console.error('Cabins could not be loaded')
        throw new Error("Cabins could not be loaded")
    }

    return data as T
}
