'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function CreateCategorie(formData: FormData) {
    const id = parseFloat(formData.get("id") as string);
    const name = formData.get("name") as string;
    let isHasLimitAmountInString = formData.get("isHasLimitAmount") as string;
    const amount = parseFloat(formData.get("amount") as string);
    let isHasLimitAmount = isHasLimitAmountInString === "on" ? true : false;
    //think about type validation with zod of something like that franck
    if(id) {
        await prisma.categorie.update({
            where: {id: id},
            data: {
                name,
                isHasLimitAmount,
                amount
            }
        });
    } else {
        await prisma.categorie.create({
            data: {
                name,
                isHasLimitAmount,
                amount
            }
        });
    }
    
    revalidatePath("/categories");
    redirect("/categories");
}

export async function DeleteCategorie (formData: FormData) {
    const id = parseInt(formData.get("id") as string);
    if(id) {
        await prisma.expense.deleteMany({
            where: {categorieId: id}
        });
        await prisma.categorie.delete({
            where: {id: id}
        });
    }
    revalidatePath("/categories");
    redirect("/categories");
}
