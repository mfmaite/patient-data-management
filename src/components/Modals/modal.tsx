import React, { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import styles from './modals.module.scss';
import { ReactComponent as CloseSVG } from 'assets/icons/close.svg';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  className?: string;
  children: ReactNode;
}

const Modal = ({
  isOpen, onClose, title, className = '', children,
}: ModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            className="fixed bg-black top-0 left-0 w-screen h-screen"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`
              ${styles.modal}
              bg-blue-50 rounded-lg p-7 z-10
              ${className}
            `}
          >
            <button
              className="absolute top-4 right-4"
              onClick={onClose}
            >
              <CloseSVG className="w-4 h-4" />
            </button>

            <h4 className="h4 mb-4">{title}</h4>

            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export { Modal };
