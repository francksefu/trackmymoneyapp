const CategoriePage = async () => {
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
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Eating stuff
                            </th>
                            <td className="px-6 py-4">
                                100 USD
                            </td>
                            <td className="px-6 py-4">
                                89 USD (but must be a link)
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </main>
    );
}

export default CategoriePage;