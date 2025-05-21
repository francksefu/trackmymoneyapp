'use client'
import { Categorie } from "@/app/generated/prisma";
import prisma from "@/lib/prisma";
import { useState } from "react";
import Select from "react-select/base";

export default async function AddOrUpdateCategorie () {
    const [name, setName] = useState('');
    const [isHasLimitAmount, setIsHasLimitAmount] = useState(false);
    const [amount, setAmount] = useState(0);
    const [categorie, setCategorie] = useState(null);
    const categories = await prisma.categorie.findMany();
    const options = categories.map((categorie : Categorie) => {return {value: categorie.id, label: categorie.name}})
    return(
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white text-center py-3">Add new type of expenses</h2>
                <form className="mx-auto">
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div className="sm:col-span-2">
                            <label htmlFor="name" className="">Related category</label>
                            {/*<Select 
                                value={categorie}
                                options={options}
                            />*/}
                        </div>
                        
                        <div className="w-full">
                            <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Limit amount</label>
                            <input
                                type="number"
                                step="0.1"
                                name="amount"
                                id="amount"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Amount limit"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value? parseFloat(e.target.value) : 0)}
                                required
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Limit amount</label>
                            <input
                                type="number"
                                step="0.1"
                                name="amount"
                                id="amount"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Amount limit"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value? parseFloat(e.target.value) : 0)}
                                required
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="name" className="">Related category</label>
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
                            
                    </div>
                    <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-500 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-blue-700">Add categorie</button>
                </form>
            </div>
        </section>
    );
}