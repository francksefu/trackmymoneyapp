'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function CreateExpenses(formData: FormData) {
    const amount = parseFloat(formData.get("amount") as string);
    let description = formData.get("description") as string;
    const categorieId = parseFloat(formData.get("idCategorie") as string);
    let datetimeInString = formData.get("datetime") as string;
    let date = new Date(datetimeInString);
    //think about type validation with zod of something like that franck

    await prisma.expense.create({
        data: {
            amount,
            date,
            description,
            categorieId
        }
    });
    revalidatePath("/expenses");
    redirect("/expenses");
}