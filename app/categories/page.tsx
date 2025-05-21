import prisma from "@/lib/prisma";
import Link from "next/link";

const CategoriePage = async () => {
    const categories = await prisma.categorie.findMany();
    return (
        <main className="container mx-auto px-6 py-4">
            <h1 className="text-2xl p-3 mb-3 mt-3 sm:mt-1 sm:mb-1 text-center text-gray-500">Categories of expenses</h1>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Amount limit</th>
                            <th scope="col" className="px-6 py-3">Current related expenses</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((categorie) => (
                            <tr key={categorie.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {categorie.name}
                                </th>
                                <td className="px-6 py-4">
                                    {categorie.isHasLimitAmount ? categorie.amount : '-'}
                                </td>
                                <td className="px-6 py-4">
                                    <Link href={`/expenses/${categorie.id}`}> Details </Link>
                                </td>
                                <td>
                                    <button className="border-purple-200 text-purple-600 m-1 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700 px-1 py-1 rounded-lg border ">
                                        Edit
                                    </button>
                                    <button className="border-purple-200 text-purple-600 m-1 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700 px-1 py-1 rounded-lg border ">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}

export default CategoriePage;