'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { success, z } from "zod/v4";

export default async function CreateExpenses(prevState: any, formData: FormData) {
    const id = parseInt(formData.get("id") as string);
    const amount = parseFloat(formData.get("amount") as string);
    let description = formData.get("description") as string;
    const categorieId = parseFloat(formData.get("idCategorie") as string);
    let datetimeInString = formData.get("datetime") as string;
    let date = new Date(datetimeInString);
    //think about type validation with zod of something like that franck
    async function saveInDataBase(id: number | null = null) {
        if (id) {
            await prisma.expense.update({
                where: {id: id},
                data: {
                    amount,
                    date,
                    description,
                    categorieId
                }
            })
        } else {
            await prisma.expense.create({
                data: {
                    amount,
                    date,
                    description,
                    categorieId
                }
            });
        }
        
        revalidatePath("/expenses");
        redirect("/expenses");
    }
    const validation = z.object({
        amount: z.number(),
        description: z.string(),
        categorieId: z.number().gte(1),
        date: z.coerce.date()
    })

    const result = validation.safeParse({
        amount, description, categorieId, date: date
    })

    if(! result.success) {
        const formFieldErrors = result.error.flatten().fieldErrors;
        return {
            success: "",
            errors: {
                amount: formFieldErrors?.amount,
                description: formFieldErrors?.description,
                categorieId: formFieldErrors?.categorieId,
                date: formFieldErrors?.date,
            }
        }
    } else {
        await saveInDataBase()
        return {
            success: "Bien",
            errors: {
                amount: "",
                description: "",
                categorieId: "",
                date: "",
            }
        }
    }
    /**/
}

export async function DeleteExpense(formData: FormData) {
    const id = parseInt(formData.get("id") as string);
    await prisma.expense.delete({
        where: {id: id}
    })
    revalidatePath("/expenses");
    redirect("/expenses");
}