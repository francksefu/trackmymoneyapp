import prisma from "@/lib/prisma";
import ExpenseTemplate from "./expenseTemplate";
import { verifySession } from "@/lib/dal";

type SearchParamProps = {
    searchParams: Promise< {show?: string, delete?: string}>
};

const ExpensePage = async ({searchParams}: SearchParamProps) => {
    const session = await verifySession()
    if (!session) return null
    console.log(typeof(session.userId))
    const expenses = await prisma.expense.findMany({
        include: {
            categorie: true,
        },
        orderBy: [
            {id: 'desc'},
        ],
        where: {categorie: {userId: session.userId}}
    });
    return (
        <ExpenseTemplate expenses={expenses} searchParams={searchParams} />
    );
}

export default ExpensePage;