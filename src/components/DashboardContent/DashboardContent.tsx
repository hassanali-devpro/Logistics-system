import React from 'react'
import { useNavigate } from 'react-router-dom'

import { settingsItems } from './constants'

const DashboardContent = () => {
  const navigate = useNavigate()

  const handleMenuItemClick = (path: string) => {
    navigate(path)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 2xl:px-8 px-2 text-outfit">
      {settingsItems.map((menu, index) => (
        <React.Fragment key={menu.path}>
          {index === 2 && <div className="hidden xl:block"></div>}
          <div
            className={`flex text-inherit p-4 border-0 border-solid border-gray-300 rounded-lg cursor-pointer hover:bg-[#F3F4F6] ${
              index === 5 ? 'hidden md:flex' : ''
            }`}
            onClick={() => handleMenuItemClick(menu.path)}>
            <div className="mr-[13px] box-border flex flex-row justify-center items-center p-0 gap-2.5 w-11 h-11 bg-white border border-[#D1D4DC] rounded-lg flex-none order-0 flex-grow-0">
              {menu.icon}
            </div>
            <div className="flex flex-col">
              <div className="font-semibold text-[18px] leading-6 flex items-center text-[#1A1D23]">{menu.label}</div>
              <div className="font-normal text-[14px] leading-5 flex items-center text-[#8B93A7]">{menu.text}</div>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  )
}

export default DashboardContent
