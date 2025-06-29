import { verifySession } from "@/lib/dal";
import prisma from "@/lib/prisma";
import Home from "./Home";
type Categorie = {
    name: string;
    id: number;
    amount: number | null;
    isHasLimitAmount: boolean;
    userId: number
};

export default async function Page() {
    const session = await verifySession()
    if (!session) return null
    const categories = await prisma.categorie.findMany({where: {userId: session.userId}});
    const expenses = await prisma.expense.findMany();
    const calculateExpensePerCategorie = () => {
        const arrayContainsSumAmountOfExpensesPerCategory : number[] = [];
        
        categories.map((categorie: Categorie) => {
            const expenseFilterByCategorie = expenses.filter((expense) => expense.categorieId === categorie.id);
            const arrayToReduce = [];
            if(expenseFilterByCategorie.length == 0) {
                arrayToReduce.push(0);
            } else {
                for (let i = 0; i < expenseFilterByCategorie.length; i ++) {
                    arrayToReduce.push(expenseFilterByCategorie[i].amount)
                }
            }
            arrayContainsSumAmountOfExpensesPerCategory.push(arrayToReduce.reduce((previousAmount, currentAmount) => previousAmount + currentAmount))
        })
        return arrayContainsSumAmountOfExpensesPerCategory;
    }

    return (
        <Home categories={categories} calculateExpensePerCategorie={calculateExpensePerCategorie()} />
    );
    
}
