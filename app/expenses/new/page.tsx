import prisma from "@/lib/prisma";
import AddOrUpdateExpense from "./expenseForm";


export default async function PageAddOrUpdateCategorie () {
    const categories = await prisma.categorie.findMany();
    return(
        <AddOrUpdateExpense data={null} categories={categories} />
    );
}