import { createPortal } from 'react-dom';
import ModalViewer from './components/ModalViewer';

interface ModalProps {
  onClose: VoidFunction;
  onConfirm?: VoidFunction;
  children: React.ReactNode;
  footerShow?: boolean;
}

const Modal = ({ onClose, onConfirm, children, footerShow }: ModalProps) => {
  const appNode = document.getElementById('root');

  return (
    <>
      {appNode &&
        createPortal(
          <ModalViewer
            onClose={onClose}
            onConfirm={onConfirm}
            footerShow={footerShow}>
            {children}
          </ModalViewer>,
          appNode,
        )}
    </>
  );
};

export default Modal;
