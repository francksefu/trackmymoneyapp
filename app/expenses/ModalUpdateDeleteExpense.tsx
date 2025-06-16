'use client'
import Modal from "react-modal";
import { useState } from "react";
import AddOrUpdateExpense from "./new/expenseForm";
import { useRouter } from 'next/navigation';
import { DeleteExpense } from "./createExpense";


export default function ModalUpdateDeleteExpense ({data, categories, deleteId}: {data: null|({
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
}), categories: null|{
    name: string;
    id: number;
    amount: number | null;
    isHasLimitAmount: boolean;
    }[],
deleteId: null|number}) {
    const [modalIsOpen, setIsOpen] = useState(true);
    const router = useRouter();
    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          width: '80%',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
    };
    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
        router.push('/expenses');
    }

    function afterOpenModal() {
        console.log('debug purpose');
    }
    return (
        <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example"
            ariaHideApp={false}
        >
            {! deleteId ? <AddOrUpdateExpense data={data} categories={categories} /> : (<div>
                <p className="text-center text-gray-700"> Do you really want to delete this expense ? his Id is {deleteId}</p>
                <p className="text-center text-red-300"> so let me ask you again, do you really want delete this ?</p>
                <form action={DeleteExpense}>
                    <input type="hidden" name="id" value={deleteId} />
                    <div className="mx-auto text-center">
                      <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-red-500 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-red-700">Delete categorie</button>
                    </div>
                </form>
            </div>)}              
        </Modal>
    );
}