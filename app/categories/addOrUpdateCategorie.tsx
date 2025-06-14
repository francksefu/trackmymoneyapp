'use client'
import { useState } from "react";
import CreateCategorie from "./new/createCategorie";


export default function AddOrUpdateCategorie ({data}: {data: null|{name: string, isHasLimitAmount: boolean, amount: null|number, id: number}}) {
    const [name, setName] = useState(data ? data.name : '');
    const [isHasLimitAmount, setIsHasLimitAmount] = useState(data ? data.isHasLimitAmount : false);
    const [amount, setAmount] = useState(data ? data.amount : '');
    const [id, setId] = useState(data ? data.id : '')
    return(
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white text-center py-3">Add new type of expenses</h2>
                <form className="mx-auto" action={CreateCategorie}>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div className="sm:col-span-2">
                            <label htmlFor="name" className="">Name of category</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        
                            <div className="w-full">
                                <label className="inline-flex items-center mb-5 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="isHasLimitAmount"
                                        className="sr-only peer"
                                        checked={isHasLimitAmount}
                                        onChange={(e) => setIsHasLimitAmount(e.target.checked)}
                                    />
                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Limited budget for this category : {isHasLimitAmount ? 'Yes' : 'No'}</span>
                                </label>
                            </div>
                            {isHasLimitAmount && (
                                <div className="w-full">
                                    <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Limit amount</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        name="amount"
                                        id="amount"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Amount limit"
                                        value={amount ? amount : ''}
                                        onChange={(e) => setAmount(e.target.value? parseFloat(e.target.value) : 0)}
                                        required
                                    />
                                </div>
                            )}
                            <input type="hidden" name="id" value={id} onChange={(e) => setId(e.target.value? parseFloat(e.target.value) : 0)} />
                        
                    </div>
                    <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-500 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-blue-700">Add categorie</button>
                </form>
            </div>
        </section>
    );
}
