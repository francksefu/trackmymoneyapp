'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/dist/server/api-utils";

export default async function CreateCategorie(formData: FormData) {
    const name = formData.get("name") as string;
    let isHasLimitAmountInString = formData.get("isHasLimitAmount") as string;
    const amount = parseFloat(formData.get("amount") as string);
    let isHasLimitAmount = isHasLimitAmountInString === "1" ? true : false;
    //think about type validation with zod of something like that franck

    await prisma.categorie.create({
        data: {
            name,
            isHasLimitAmount,
            amount
        }
    });
    revalidatePath("/categories");
}