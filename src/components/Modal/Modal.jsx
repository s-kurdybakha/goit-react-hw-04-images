import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { IoClose } from 'react-icons/io5';
import css from './modal.module.css';

const modalRoot = document.getElementById('modal-root');
console.log(modalRoot);

const Modal = ({ close, children }) => {
  const closeModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') close();
  };

  useEffect(() => {
    document.addEventListener('keydown', closeModal);

    return () => document.removeEventListener('keydown', closeModal);
  });

  return createPortal(
    <div onClick={closeModal} className={css.overlay}>
      <div className={css.modal}>
        <button onClick={close} className={css.closeBtn}>
          <span className={css.buttonLabelClose}>
            <IoClose />
          </span>
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
