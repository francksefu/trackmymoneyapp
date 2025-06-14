'use client'
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
    const links = [
        {
            id: 1,
            title: 'Expenses',
            contents: [
                {
                    id: 11,
                    title: 'List expenses',
                    href: '/expenses'
                },
                {
                    id: 12,
                    title: 'Create expenses',
                    href: '/expenses/new'
                },
            ],
            expendedMenu: null
        },
        {
            id: 2,
            title: 'Categories',
            contents: [
                {
                    id: 21,
                    title: 'List categories',
                    href: '/categories'
                },
                {
                    id: 22,
                    title: 'Create categories',
                    href: '/categories/new'
                },
            ],
            expendedMenu: null
        },
    ]
    return(
        <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">TrackMoneyApp</span>
                </a>
                <button data-collapse-toggle="navbar-dropdown" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-dropdown" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        {links.map((link) => (
                            <NavItemDropdown key={link.id} items={link} />
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

type Menu = {
    id: number,
    title: string,
    href: string
}
const NavItem = ({items}: {items: Menu}) => {
    return(
        <li key={items.id}>
            <Link href={items.href} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" aria-current="page">{items.title}</Link>
        </li>
    );
}

const NavItemDropdown = ({items}:{items:({id: number, title: string, contents: Menu[], expendedMenu: Menu|null})}) => {
    const [dropdown, setDropdown] = useState(false);
    return(
        <li>
            <button onClick={() => setDropdown(! dropdown)} onMouseEnter={() => setDropdown(true)} className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">{items.title} 
                <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                </svg>
            </button>
            {dropdown && (
                <div onMouseLeave={() => setDropdown(false)} className="absolute z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-400">
                    {items.contents.map((content: Menu) => (
                        <NavItem key={content.id} items={content} />
                    ))}             
                </ul>
                {items.expendedMenu && (
                    <div className="py-1">
                        <a href={items.expendedMenu.href} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">{items.expendedMenu.title}</a>
                    </div>
                )}
                
            </div>
            )}
            
        </li>
    );
}

export default Navbar;