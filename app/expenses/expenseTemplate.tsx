import Link from "next/link";
import ModalUpdateDeleteExpense from "./ModalUpdateDeleteExpense";
import prisma from "@/lib/prisma";

type SearchParamProps = {
    show: Record<string, string> | null | undefined;
    delete: Record<string, string> | null | undefined;
};

export default async function ExpenseTemplate ({searchParams, expenses} : {searchParams: Record<string, string> | null | undefined, expenses: ({
    categorie: {
        name: string;
        id: number;
        amount: number | null;
        isHasLimitAmount: boolean;
    };
} & {
    id: number;
    amount: number;
    date: Date;
    description: string | null;
    categorieId: number;
})[]}) {
    const showContent = await searchParams;
    console.log(showContent?.show)
    const show = showContent?.show;
    const deleteCategorie = showContent?.delete;
    const categories = await prisma.categorie.findMany();
    return (
        <main className="container mx-auto px-6 py-4">
            <h1 className="text-2xl p-3 mb-3 mt-3 sm:mt-1 dark:text-white sm:mb-1 text-center text-gray-500">List of my expenses</h1>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Amount</th>
                            <th scope="col" className="px-6 py-3">Date</th>
                            <th scope="col" className="px-6 py-3">Description</th>
                            <th scope="col" className="px-6 py-3">Related categorie</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map((expense: {
                            categorie: {
                                name: string;
                                id: number;
                                amount: number | null;
                                isHasLimitAmount: boolean;
                            };
                        } & {
                            id: number;
                            amount: number;
                            date: Date;
                            description: string | null;
                            categorieId: number;
                        }) => (
                            <tr key={expense.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {expense.amount}
                                </th>
                                <td className="px-6 py-4">
                                    {expense.date.toString()}
                                </td>
                                <td className="px-6 py-4">
                                    {expense.description}
                                </td>
                                <td className="px-6 py-4">
                                    {expense.categorie.name}
                                </td>
                                <td className="px-6 py-4">
                                    <Link href={`/expenses/?show=${expense.id}`} className="border-purple-200 text-purple-600 m-1 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700 px-1 py-1 rounded-lg border ">
                                        Edit
                                    </Link>
                                    <Link href={`/expenses/?delete=${expense.id}`} className="border-purple-200 text-purple-600 m-1 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700 px-1 py-1 rounded-lg border ">
                                        Delete
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {show &&  (<ModalUpdateDeleteExpense categories={categories} deleteId={null} data={await prisma.expense.findUnique({ where : {id: parseInt(show)}, include: {categorie: true}})}/>)}
                {deleteCategorie &&  (<ModalUpdateDeleteExpense categories={null} deleteId={parseInt(deleteCategorie)} data={null}/>)}
            </div>
        </main>
    );
}