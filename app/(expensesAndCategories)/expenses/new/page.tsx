import prisma from "@/lib/prisma";
import AddOrUpdateExpense from "./expenseForm";
import { verifySession } from "@/lib/dal";


export default async function PageAddOrUpdateCategorie () {
    const session = await verifySession();
    if(!session) return null;
    const categories = await prisma.categorie.findMany({
        where: {userId: session.userId}
    });
    return(
        <AddOrUpdateExpense data={null} categories={categories} />
    );
}