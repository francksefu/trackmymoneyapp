'use client'
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

type Categorie = {
    name: string;
    id: number;
    amount: number | null;
    isHasLimitAmount: boolean;
    userId: number
};

export default function Home({categories, calculateExpensePerCategorie}:{categories: Categorie[], calculateExpensePerCategorie: number[]}) {
    
    const chartData = {
        labels: categories.map((categorie: Categorie) => categorie.name),
        datasets: [
            {
                label: "expenses related to differents categories",
                data: calculateExpensePerCategorie,
                backgroundColor: [
                    "#162456",
                ],
                borderColor: "black",
                borderWidth: 2
            }
        ]
    }
    Chart.register(CategoryScale);
    return (
        <>
            <h1 className="text-2xl text-center text-blue-950">Your Data will be display here ! keep creating !</h1>
            <div className="flex justify-center">
                <div className="chart-container w-4xl">
                    <h2 style={{ textAlign: "center" }}>Bar Chart</h2>
                    <Bar
                        data={chartData}
                        options={{
                        plugins: {
                            title: {
                            display: true,
                            text: "Expenses related to differents categories"
                            },
                            legend: {
                            display: false
                            }
                        }
                        }}
                    />
                </div>
            </div>
            <div className="grid sm:grid-cols-3 grid-cols-1 content-center p-3">
                <div className="max-w-sm sm:animate-bounce hover:animate-none p-6 bg-gray-300 border border-green-200 rounded-lg shadow-lg ">
                    <svg className="w-7 h-7 text-black dark:text-gray-400 mb-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z"/>
                    </svg>
                    <h5 className="mb-2 text-2xl font-semibold tracking-tight text-black">Track my money app</h5>
                    <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">You don't need to be an accountant men to track all your expenses you know, just write it here by category and track them</p>
                </div>
                <div className="max-w-sm p-6 bg-orange-300 border border-green-200 rounded-lg shadow-lg ">
                    <svg className="w-7 h-7 text-black dark:text-gray-400 mb-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z"/>
                    </svg>
                    <h5 className="mb-2 text-2xl font-semibold tracking-tight text-black">How to use <span className="text-3xl">🤔</span></h5>
                    <p className="mb-3 font-normal text-black ">After login or create a simple account, add a category, and after that add differents expenses linked to your category and let the app do the math for you!<span className="text-3xl">⚡</span></p>
                </div>
                <div className="max-w-sm p-6 bg-gray-300 border border-green-200 rounded-lg shadow-lg ">
                    <svg className="w-7 h-7 text-black dark:text-gray-400 mb-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z"/>
                    </svg>
                    <h5 className="mb-2 text-2xl font-semibold tracking-tight text-black">Track my money app</h5>
                    <p className="mb-3 font-normal text-gray-500 dark:text-gray-400"><span className="text-3xl">👌</span>Enjoy dude !<span className="text-4xlxs">🔥</span></p>
                </div>
            </div>
        </>
    );
}