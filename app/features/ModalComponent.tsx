'use client'
import Modal from "react-modal";
import { useState } from "react";
import AddOrUpdateCategorie from "../categories/addOrUpdateCategorie";
import { useRouter } from 'next/navigation';

export default function ModalComponent ({data}: {data: null|{name: string, isHasLimitAmount: boolean, amount: null|number, id: number}}) {
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
          <AddOrUpdateCategorie data={data} />
                           
        </Modal>
    );
}