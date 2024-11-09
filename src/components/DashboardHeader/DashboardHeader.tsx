import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { ReactSVG } from 'react-svg'

import { Breadcrumbs, useModalContext } from '../../shared/components'
import { FORM_MODAL } from '../../shared/constants'
import { mapObjectsToOptions } from '../../shared/helpers/applicationHelpers'
import { useGetActiveRolesQuery } from '../../wms-store/services/roleService'
import NewItemMenu from '../NewItemMenu/Index'
import { AddUserForm } from '../UsersPage/AddUserForm'

import careDown from '/icons/caretDown.svg'
import dropdownUser from '/icons/dropdownUser.svg'
import role from '/icons/key.svg'
import product from '/icons/package.svg'
import plus from '/icons/plus.svg'
import topSearchBar from '/icons/topSearchBar.svg'

interface DashboardHeaderProps {
  heading?: string // Make heading optional
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ heading }) => {
  const roles = useSelector((state: any) => state.role.activeRoles.roles)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isPopupMenuOpen, setIsPopupMenuOpen] = useState(false)
  const { handleOpen, handleClose } = useModalContext()
  useGetActiveRolesQuery({})

  const RoleOptions = useMemo(() => {
    return mapObjectsToOptions(roles, '_id', 'name')
  }, [roles])

  const dropdownRef = useRef<HTMLDivElement>(null)
  const popupMenuRef = useRef<HTMLDivElement>(null) // Ref for the popup menu

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const openModal = () => {
    setIsPopupMenuOpen(false)
    handleOpen({
      modalType: FORM_MODAL,
      modalProps: {
        fullscreen: false,
        width: 'sm',
        form: <AddUserForm roleOptions={RoleOptions} handleClose={handleClose} />,
        title: 'Add user',
        subtitle: 'Create new user to join your workspace'
      }
    })
  }

  const togglePopupMenu = () => {
    setIsPopupMenuOpen(!isPopupMenuOpen)
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
      if (popupMenuRef.current && !popupMenuRef.current.contains(event.target as Node)) {
        setIsPopupMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownRef, popupMenuRef])

  return (
    <div className="2xl:px-12 px-6 py-5 text-outfit">
      <Breadcrumbs />

      <div className="flex justify-between mb-2">
        <div className="font-bold text-[32px] leading-[36px] text-[#1A1D23]">{heading}</div>
        <div className="flex items-center relative">
          <div className="hidden box-border md:flex flex-row items-center p-[8px_12px] mr-3 gap-[8px] w-[260px] h-[40px] bg-white border border-[#D1D4DC] rounded-lg ">
            <ReactSVG src={topSearchBar} className="w-[20px] h-[20px]" />
            <input
              type="text"
              placeholder="Search Settings"
              className="flex-1 border-none outline-none w-[96px] h-[20px] text-[14px] leading-[20px] flex items-center text-[#8B93A7]"
            />
          </div>
          <div className="static inline-block md:hidden" ref={popupMenuRef}>
            <button
              className="flex flex-row justify-center items-center p-[8px_16px] gap-[4px] sm:w-[105px] sm:h-[40px] w-[60px] h-[40px] bg-[#1F69FF] shadow-xs rounded-lg text-white cursor-pointer"
              onClick={togglePopupMenu}>
              <ReactSVG src={plus} className="w-[24px] h-[24px] mt-[7px]" />
              <div className="w-[29px] h-[20px] font-semibold text-[14px] leading-[20px] text-center text-[#F3F4F6] sm:block hidden ">
                New
              </div>
              <ReactSVG src={careDown} className="w-[12px] h-[12px] mt-[7px]" />
            </button>
          </div>
          <div className="static hidden md:block" ref={dropdownRef}>
            <button
              className="flex flex-row justify-center items-center p-[8px_16px] gap-[4px] sm:w-[105px] sm:h-[40px] w-[60px] h-[40px] bg-[#1F69FF] shadow-xs rounded-lg text-white cursor-pointer"
              onClick={toggleDropdown}>
              <ReactSVG src={plus} className="w-[24px] h-[24px] mt-[7px]" />
              <div className="w-[29px] h-[20px] font-semibold text-[14px] leading-[20px] text-center text-[#F3F4F6] sm:block hidden ">
                New
              </div>
              <ReactSVG src={careDown} className="w-[12px] h-[12px] mt-[7px]" />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-[calc(90%+5px)] right-0 bg-white border border-[#ccc] rounded-lg p-[10px] shadow-md z-10">
                {/* Dropdown items */}
                <div className="w-[248px] h-[16px] text-[12px] leading-[16px] flex items-center text-[#8B93A7] ml-[10px]">
                  <span>New Item</span>
                </div>
                <div
                  className="cursor-pointer text-[14px] flex flex-row items-center p-[8px] gap-[12px] w-[264px] h-[36px] rounded-lg"
                  onClick={openModal}>
                  <ReactSVG src={dropdownUser} className="ml-[6px]" />
                  <span className="font-normal text-[16px] leading-[24px] flex items=center text-[#4F5668]">User</span>
                </div>
                <div className="cursor-pointer text-[14px] flex flex-row items-center p-[8px] gap-[12px] w-[264px] h-[36px] rounded-lg">
                  <ReactSVG src={role} className="w-[20px] h-[20px]" />
                  <span className="font-normal text-[16px] leading-[24px] flex items=center text-[#4F5668]">Role</span>
                </div>
                <div className="cursor-pointer text-[14px] flex flex-row items-center p-[8px] gap-[12px] w-[264px] h-[36px] rounded-lg">
                  <ReactSVG src={product} className="w-[20px] h-[20px]" />
                  <span className="font-normal text-[16px] leading-[24px] flex items=center text-[#4F5668]">
                    Product
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <NewItemMenu isOpen={isPopupMenuOpen} onClose={togglePopupMenu} openModal={openModal} />
      <div className="mb-4 md:mb-0 font-normal h-[24px] text-[18px] leading-[24px] flex items-center text-[#8B93A7]">
        Manage everything in a single place
      </div>
      <div className="md:hidden box-border flex flex-row items-center p-[8px_12px] gap-[8px] h-[40px] bg-white border border-[#D1D4DC] rounded-lg ">
        <ReactSVG src={topSearchBar} className="w-[20px] h-[20px]" />
        <input
          type="text"
          placeholder="Search Settings"
          className="flex-1 border-none outline-none w-[96px] h-[20px] text-[14px] leading-[20px] flex items-center text-[#8B93A7]"
        />
      </div>
    </div>
  )
}

export default DashboardHeader
