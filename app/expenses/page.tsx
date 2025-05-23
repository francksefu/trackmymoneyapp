import prisma from "@/lib/prisma";
import ExpenseTemplate from "./expenseTemplate";

const ExpensePage = async () => {
    const expenses = await prisma.expense.findMany({
        include: {
            categorie: true,
        }
    });
    return (
        <ExpenseTemplate expenses={expenses} />
    );
}

export default ExpensePage;