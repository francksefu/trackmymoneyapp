import prisma from "@/lib/prisma";
import AddOrUpdateCategorie from "./expenseForm";


export default async function PageAddOrUpdateCategorie () {
    const categories = await prisma.categorie.findMany();
    return(
        <AddOrUpdateCategorie categories={categories} />
    );
}