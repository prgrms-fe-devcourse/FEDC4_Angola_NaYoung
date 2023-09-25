import React, { useEffect, useRef } from 'react';
import { Icon } from '@components';
import styled from '@emotion/styled';
import { ANGOLA_STYLES } from '@styles/commonStyles';
import { createPortal } from 'react-dom';
import ModalViewer from './components/ModalViewer';

interface ModalProps {
  onClose: VoidFunction;
  onConfirm?: VoidFunction;
  children: React.ReactNode;
  footerShow?: boolean;
}

const Modal = ({ onClose, onConfirm, children, footerShow }: ModalProps) => {
  const appNode = document.getElementById('app');

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
