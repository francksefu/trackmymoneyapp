import prisma from "@/lib/prisma";
import ExpenseTemplate from "./expenseTemplate";
import { verifySession } from "@/lib/dal";

type SearchParamProps = {
    searchParams: Record<string, string> | null | undefined;
};

const ExpensePage = async ({searchParams}: SearchParamProps) => {
    const session = await verifySession()
    if (!session) return null
    const expenses = await prisma.expense.findMany({
        include: {
            categorie: true,
        },
        orderBy: [
            {id: 'desc'},
        ]
    });
    return (
        <ExpenseTemplate expenses={expenses} searchParams={searchParams} />
    );
}

export default ExpensePage;