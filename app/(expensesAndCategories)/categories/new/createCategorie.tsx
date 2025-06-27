'use server';

import { verifySession } from "@/lib/dal";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { number, success, z } from "zod/v4";

export default async function CreateCategorie(state: any, formData: FormData) {
    const session = await verifySession()
    if (!session) return null
    let userId = session.userId;
    const id = parseInt(formData.get("id") as string);
    const name = formData.get("name") as string;
    let isHasLimitAmountInString = formData.get("isHasLimitAmount") as string;
    let isHasLimitAmount = isHasLimitAmountInString === "on" ? true : false;
    let amount = isHasLimitAmount ? parseFloat(formData.get("amount") as string) : null;

    const Validation = z.object({
        name: z.string().min(1, "Is required"),
        amount:  z.number().optional(),
    })

    const result = Validation.safeParse({
        name, amount: amount
    })

    async function saveInDataBase (id: number|null = null) {
        if(id) {
            await prisma.categorie.update({
                where: {id: id},
                data: {
                    name,
                    isHasLimitAmount,
                    amount,
                }
            });
        } else {
            await prisma.categorie.create({
                data: {
                    name,
                    isHasLimitAmount,
                    amount,
                    userId: 2,
                }
            });
        }
        revalidatePath("/categories");
        redirect("/categories");
    }

    if (! result.success ) {
        const formFieldErrors = result.error.flatten().fieldErrors;
        if (isHasLimitAmount) {
            return {
                success: "",
                errors: {
                  name: formFieldErrors?.name,
                  amount: formFieldErrors?.amount,
                }
            };
        } else {
            if (formFieldErrors.name) {
                return {
                    success: "",
                    errors: {
                      name: formFieldErrors?.name,
                      amount: formFieldErrors?.amount,
                    }
                };
            } else {
                await saveInDataBase(id)
                return {
                    success: "Bien",
                    errors: {
                      name: "",
                      amount: "",
                    }
                };
            }

        }
        
    } else {
        await saveInDataBase(id)
        return {
            success: "Bien",
            errors: {
              name: "",
              amount: "",
            }
        };
    }
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
