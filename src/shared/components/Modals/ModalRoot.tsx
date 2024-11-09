import React from 'react'

import ConfirmationModal from './ConfirmationModal'
import { CONFIRMATION_MODAL, FORM_MODAL } from './constants'
import FormModal from './FormModal'
import { useModalContext } from './ModalContextProvider'

const MODAL_COMPONENTS = {
  [CONFIRMATION_MODAL]: ConfirmationModal,
  [FORM_MODAL]: FormModal
}

type ModalType = keyof typeof MODAL_COMPONENTS

const ModalRoot: React.FC = () => {
  const { modals, handleClose } = useModalContext()

  return modals.length ? (
    <>
      {modals.map((modal, index) => {
        if (!modal.modalType) return <></>

        const Modal = MODAL_COMPONENTS[modal.modalType as ModalType]
        return <Modal key={index} open {...modal.modalProps} handleClose={handleClose} />
      })}
    </>
  ) : (
    <></>
  )
}

export default ModalRoot
