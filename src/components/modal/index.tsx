import React from "react";

type modal = { children: React.ReactNode, closeModal: () => void}

const Modal = ({ children, closeModal }: modal) => {
    return (
        <div className='modal' onClick={() => closeModal()}>
            <div className='modal-content'>
                {children}
            </div>
        </div>
    )
}

export default Modal;