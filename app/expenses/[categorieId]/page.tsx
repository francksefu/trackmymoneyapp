import prisma from "@/lib/prisma";
import ExpenseTemplate from "../expenseTemplate";

const ExpensePage = async ({ params }: { params: Promise< {categorieId: string}>}) => {
    const {categorieId} = await params;
    const expenses = await prisma.expense.findMany({
        where: {categorieId: parseInt(categorieId)},
        include: {
            categorie: true,
        }
    });
    return (
        <ExpenseTemplate expenses={expenses} searchParams={null}/>
    );
}

export default ExpensePage;