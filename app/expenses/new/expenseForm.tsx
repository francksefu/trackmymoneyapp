'use client'
import { useState } from "react";
import Select from "react-select";
import CreateExpenses from "../createExpense";

export default function AddOrUpdateExpense ({categories}: {categories: {
    name: string;
    id: number;
    amount: number | null;
    isHasLimitAmount: boolean;
    }[]}) {
    const [description, setDescription] = useState('');
    const [datetime, setDatetime] = useState(new Date().toISOString().slice(0, 16));
    const [amount, setAmount] = useState(0);
    const [categorie, setCategorie] = useState({value: 0, label: 'Choose'});
    const options = categories.map((categorie :{
        name: string;
        id: number;
        amount: number | null;
        isHasLimitAmount: boolean;
    }) => {return {value: categorie.id, label: categorie.name}})
    return(
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white text-center py-3">Add new type of expenses</h2>
                <form className="mx-auto" action={CreateExpenses}>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div className="sm:col-span-2">
                            <label htmlFor="name" className="">Related category</label>
                            <Select 
                                id="select-expenses"
                                defaultValue={categorie}
                                options={options}
                                name="idCategorie"
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
                        <div className="w-full">
                            <label htmlFor="datetime" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
                            <input
                                type="datetime-local"
                                name="date"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Date"
                                value={datetime}
                                onChange={(e) => setDatetime(e.target.value)}
                                required
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="name" className="">Related category</label>
                            <textarea
                                id="message"
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."
                                defaultValue={description}
                                onChange={(e) => setDescription(e.target.value)}
                            >
                            </textarea>
                        </div>
                            
                    </div>
                    <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-500 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-blue-700">Add categorie</button>
                </form>
            </div>
        </section>
    );
}