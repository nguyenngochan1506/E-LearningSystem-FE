import React from 'react';

interface ModalProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

const Modal = ({ id, title, children }: ModalProps) => {
  return (
    <dialog id={id} className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <h3 className="font-bold text-lg">{title}</h3>
        <div className="py-4">{children}</div>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
