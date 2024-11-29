'use server'

import { revalidatePath } from 'next/cache'

export async function deleteContact(formData: FormData) {
    // const id = Number(formData.get('id'));
    // await deleteContactById(id);
    // revalidatePath('/');
}

export async function updateContact(formData: FormData) {
    // const id = Number(formData.get('id'));
    // await updateContactById(id, formData);
    // revalidatePath('/');
}

export async function createContact(formData: FormData) {
    // await createContact(formData);
    // revalidatePath('/');
}

export const deleteProperty = async (id: number) => {
    // await deletePropertyById(id);
    // revalidatePath('/');
}

export const updateProperty = async (id: number, formData: FormData) => {
    // await updatePropertyById(id, formData);
    // revalidatePath('/');
}

export const createProperty = async (formData: FormData) => {
    // await createProperty(formData);
    // revalidatePath('/');
}

