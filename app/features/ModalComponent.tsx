'use client'
import Modal from "react-modal";
import { useState } from "react";
import AddOrUpdateCategorie from "../categories/addOrUpdateCategorie";
import { useRouter } from 'next/navigation';
import { DeleteCategorie } from "../categories/new/createCategorie";

export default function ModalComponent ({data, deleteId}: {data: null|{name: string, isHasLimitAmount: boolean, amount: null|number, id: number}, deleteId: null|number}) {
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
        router.push('/categories');
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
            {! deleteId ? <AddOrUpdateCategorie data={data} /> : (<div>
                <p className="text-center text-gray-700"> Do you really want to delete this categorie ? his Id is {deleteId}</p>
                <p className="text-center text-red-300"> This will trigger the deletions of all expenses related to category, so let me ask you again, do you really want delete this ?</p>
                <form action={DeleteCategorie}>
                    <input type="hidden" name="id" value={deleteId} />
                    <div className="mx-auto text-center">
                      <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-red-500 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-red-700">Delete categorie</button>
                    </div>
                </form>
            </div>)}              
        </Modal>
    );
}