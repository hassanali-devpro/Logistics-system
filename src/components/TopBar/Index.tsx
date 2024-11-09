import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

import { primaryAppRoutes, secondaryAppRoutes } from '../NavigationBar/constants'
import { NavbarIcon } from '../NavigationBar/NavbarIcon'
import { UserProfileItem } from '../NavigationBar/UserProfileItem'
import { UserProfileMenu } from '../NavigationBar/UserProfileMenu'

import './Index.css'

import Logo from '/icons/logo.png'
import BarsIcon from '/icons/MenuBars.png'
import CrossIcon from '/icons/MenuCross.png'
import SearchIcon from '/icons/search-icon.png'
import ProfileImage from '/images/profile.png'

const Index: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMenuClosing, setIsMenuClosing] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  // eslint-disable-next-line no-undef
  let closeTimeout: NodeJS.Timeout

  const handleProfileIconClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const toggleMenu = () => {
    if (isMenuOpen) {
      setIsMenuClosing(true)
      closeTimeout = setTimeout(() => {
        setIsMenuOpen(false)
        setIsMenuClosing(false)
      }, 300)
    } else {
      setIsMenuOpen(true)
    }
  }

  const closeMenu = () => {
    setIsMenuClosing(true)
    closeTimeout = setTimeout(() => {
      setIsMenuOpen(false)
      setIsMenuClosing(false)
    }, 300)
  }

  useEffect(() => {
    return () => {
      clearTimeout(closeTimeout)
    }
  }, [])

  return (
    <div className="bg-white">
      {/* Mobile Header */}
      <div className={isMenuOpen ? 'hidden ' : 'block h-[60px]'}>
        <div
          className={`${isMenuOpen ? 'hidden ' : 'flex'} justify-between items-center w-full py-2 px-4 md:hidden fixed top-0 left-0 bg-white z-50`}>
          <button onClick={toggleMenu}>
            <img src={BarsIcon} alt="Menu Bars" className="w-[24px]" />
          </button>
          <img className="w-[155px]" src={Logo} alt="Logo" />
          <div>
            <button onClick={handleProfileIconClick}>
              <img src={ProfileImage} alt="User Profile" className="w-[40px] rounded-full" />
            </button>

            <UserProfileMenu anchorEl={anchorEl} handleMenuClose={handleMenuClose} />
          </div>
        </div>
      </div>

      {/* Sidebar Menu */}
      <div
        className={`${isMenuOpen ? (isMenuClosing ? 'menu-popdown' : 'menu-popup') : 'hidden'} bg-white rounded-t-3xl h-full w-full fixed z-30`}>
        <div className="w-full justify-start bg-white fixed top-0">
          <div className="flex justify-between w-full p-2">
            <button onClick={toggleMenu}>
              <img src={CrossIcon} alt="Close Menu" className="w-[24px]" />
            </button>
            <img className="w-[155px]" src={Logo} alt="Logo" />
            <div className="w-[50px]"></div>
          </div>
          <div className="flex items-center mb-2 px-4 py-3">
            <img src={SearchIcon} alt="Search Icon" className="w-5 h-5 mr-2" />
            <input
              type="text"
              placeholder="Ask or Search..."
              className="w-full text-lg border-none rounded h-5 p-2 bg-white focus:border-2 focus:border-teal-600"
            />
          </div>
        </div>

        {/* Scrollable Sidebar Content */}
        <div className="mt-[115px] hide-pb-50 overflow-y-auto h-[calc(100vh-115px)]">
          <ul className="list-none w-full">
            {primaryAppRoutes.map((item, index) => (
              <li key={index} className="mb-1 cursor-pointer">
                <NavLink
                  to={item.path}
                  className={({ isActive }) => (isActive ? 'active text-blue-600 bg-gray-200' : 'text-gray-700')}
                  onClick={closeMenu}>
                  <div className="flex my-1 py-3 px-4">
                    <NavbarIcon route={item} />
                    <span className="text-lg font-normal leading-6 ml-2">{item.label}</span>
                  </div>
                </NavLink>
              </li>
            ))}
          </ul>
          <ul className="list-none w-full">
            {secondaryAppRoutes.map((item, index) => (
              <li key={index} className="mb-1 cursor-pointer">
                <NavLink
                  to={item.path}
                  className={({ isActive }) => (isActive ? 'active text-blue-600 bg-gray-200' : 'text-gray-700')}
                  onClick={closeMenu}>
                  <div className="flex py-3 px-4">
                    <NavbarIcon route={item} />
                    <span className="font-outfit text-lg font-normal leading-6 ml-2">{item.label}</span>
                  </div>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <UserProfileItem isNavbarOpen />
      </div>
    </div>
  )
}

export default Index
