'use client'
import Update from "@/app/categories/edit/[id]/page";
import { useState } from "react";
import Modal from "react-modal";


export default async function Page({ params }: { params: Promise< {id: string}>}) {
    const {id} = await params;
    const [modalIsOpen, setIsOpen] = useState(true);

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
        >
          <Update params={params}/>  
        </Modal>
    );
  }