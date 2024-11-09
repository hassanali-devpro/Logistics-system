/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useState } from 'react'

interface Modal {
  modalType: string
  modalProps: object
}

interface ModalContextType {
  modals: Modal[]
  handleOpen: (modal: Modal) => void
  handleClose: () => void
  handleCloseAll: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const ModalContextProvider: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const [modals, setModals] = useState<Modal[]>([])

  const handleClose = () => {
    setModals((prevModals) => {
      const newModals = [...prevModals]
      newModals.pop()
      return newModals
    })
  }

  const handleCloseAll = () => setModals([])

  const handleOpen = (modal: Modal) => {
    setModals((prevModals) => {
      const newModals = [...prevModals, modal]
      return newModals
    })
  }

  return (
    <ModalContext.Provider
      value={{
        modals,
        handleOpen,
        handleClose,
        handleCloseAll
      }}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModalContext = (): ModalContextType => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModalContext must be used within a ModalContextProvider')
  }
  return context
}
