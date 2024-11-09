import React, { useEffect, useState } from 'react'
import { ReactSVG } from 'react-svg'

import dropdownUser from '/icons/dropdownUser.svg'
import role from '/icons/key.svg'
import Cross from '/icons/MenuCross.png'
import product from '/icons/package.svg'

interface NewItemMenuProps {
  isOpen: boolean
  onClose: () => void
  openModal: () => void
}

const NewItemMenu: React.FC<NewItemMenuProps> = ({ isOpen, onClose, openModal }) => {
  const [isAnimating, setIsAnimating] = useState(false)
  const [isVisible, setIsVisible] = useState(isOpen)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      requestAnimationFrame(() => {
        setIsAnimating(true)
      })
    } else {
      setIsAnimating(false)
      setTimeout(() => setIsVisible(false), 300) // Wait for animation to finish
    }
  }, [isOpen])

  if (!isVisible) return null

  return (
    <div className="">
      <div
        className={`${
          isVisible ? 'block' : 'hidden'
        } fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10`}></div>
      <div className="fixed inset-0 z-50 flex items-end justify-center md:hidden">
        {/* Menu Content */}
        <div
          className={`bg-white w-full p-4 rounded-t-3xl shadow-lg transform transition-transform duration-300 ${isAnimating ? 'translate-y-0' : 'translate-y-full'}`}>
          <div className="flex justify-between items-center px-4">
            <span className="font-semibold text-[18px] text-[#1A1D23] py-2">New Item</span>
            <button className="" onClick={onClose}>
              <img src={Cross} className="w-5" alt="Close" />
            </button>
          </div>
          <div
            className="cursor-pointer text-[14px] flex flex-row items-center p-4 my-4 gap-[12px] w-full h-[36px] rounded-lg"
            onClick={openModal}>
            <ReactSVG src={dropdownUser} className="ml-[6px]" />
            <span className="font-normal text-[16px] leading-[24px] flex items-center text-[#4F5668] ml-3">User</span>
          </div>
          <div className="cursor-pointer text-[14px] flex flex-row items-center p-4 my-4 gap-[12px] w-full h-[36px] rounded-lg">
            <ReactSVG src={role} className="w-[20px] h-[20px]" />
            <span className="font-normal text-[16px] leading-[24px] flex items-center text-[#4F5668] ml-3">Role</span>
          </div>
          <div className="cursor-pointer text-[14px] flex flex-row items-center p-4 my-4 gap-[12px] w-full h-[36px] rounded-lg">
            <ReactSVG src={product} className="w-[20px] h-[20px]" />
            <span className="font-normal text-[16px] leading-[24px] flex items-center text-[#4F5668] ml-3">
              Product
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewItemMenu
