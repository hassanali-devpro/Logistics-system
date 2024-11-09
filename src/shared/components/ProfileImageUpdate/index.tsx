import React, { useState } from 'react'
import { Backdrop, Box, Divider, Drawer, IconButton, Menu, MenuItem, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { IconCamera, IconCircleX, IconDotsVertical, IconPhotoPlus, IconPhotoUp, IconX } from '@tabler/icons-react'

import { WebcamCapture } from './WebcamCapture'

export const ProfileImageUpdate = ({
  selectedImage,
  setSelectedImage,
  setSelectedImageFile,
  setProfileError,
  overlayText,
  handleImageUpdate
}: {
  selectedImage: string | null
  setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>
  setSelectedImageFile?: React.Dispatch<React.SetStateAction<File | null>>
  setProfileError?: React.Dispatch<React.SetStateAction<string>>
  overlayText?: string
  handleImageUpdate?: any
}) => {
  const [takePhoto, setTakePhoto] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const open = Boolean(anchorEl)

  const handlePhotoIconClick = (event: any) => {
    if (isMobile) {
      setMobileMenuOpen(true)
    } else {
      setAnchorEl(event.currentTarget)
    }
  }

  const handleClose = () => {
    setAnchorEl(null)
    setMobileMenuOpen(false)
  }

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleClose()

    const file = event.target.files?.[0]
    if (file) {
      setSelectedImageFile && setSelectedImageFile(file)
      handleImageUpdate && handleImageUpdate(file)

      const reader = new FileReader()
      reader.onload = () => {
        setSelectedImage(reader.result as string)
        setProfileError && setProfileError('')
      }
      reader.onerror = () => {
        console.error('Failed to read file')
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemovePhoto = () => {
    setSelectedImage(null)
    setSelectedImageFile && setSelectedImageFile(null)
    handleImageUpdate && handleImageUpdate(null)
    handleClose()
  }

  const PhotoDropdownMenuItems = () => {
    return (
      <>
        <MenuItem key="header" disableRipple className="!cursor-default hover:!bg-inherit">
          <Box className="flex justify-between items-center w-full">
            <Typography
              variant={mobileMenuOpen ? 'h6' : 'caption'}
              fontWeight={mobileMenuOpen ? 600 : 400}
              color={mobileMenuOpen ? '#353A46' : '#8B93A7'}>
              Update Profile Photo
            </Typography>

            {mobileMenuOpen && (
              <IconButton className="rounded-full !bg-[#F3F4F6]" onClick={handleClose}>
                <IconX size={20} strokeWidth={3} color="#4F5668" />
              </IconButton>
            )}
          </Box>
        </MenuItem>

        {!selectedImage && (
          <MenuItem key="upload-a-photo">
            <IconPhotoUp className="mr-3" size={20} color="#353A46" />

            <label className="font-normal text-[14px] leading-[20px] text-[#353A46]">
              <input type="file" accept=".png,.jpg,.jpeg" style={{ display: 'none' }} onChange={handleImageSelect} />
              Upload a Photo
            </label>
          </MenuItem>
        )}

        <MenuItem
          key="take-a-photo"
          onClick={() => {
            handleClose()
            setTakePhoto(true)
          }}>
          <IconCamera className="mr-3" size={20} color="#353A46" />

          <div className="font-normal text-[14px] leading-[20px] text-[#353A46]">Take a Photo</div>
        </MenuItem>

        {selectedImage && <Divider className="!mx-4 text-[#E8E9ED]" />}

        {selectedImage && (
          <MenuItem key="remove-a-photo" onClick={handleRemovePhoto}>
            <IconCircleX className="mr-3" size={20} color="#F53939" />

            <div className="font-normal text-[14px] leading-[20px] text-[#F53939]">Remove Photo</div>
          </MenuItem>
        )}
      </>
    )
  }

  const PhotoDropdown = () => (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      disableAutoFocusItem
      slotProps={{ paper: { sx: { width: '260px', borderRadius: '8px' } } }}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button'
      }}>
      <PhotoDropdownMenuItems />
    </Menu>
  )

  const MobilePhotoDrawer = () => (
    <Drawer
      anchor="bottom"
      open={mobileMenuOpen}
      onClose={handleClose}
      PaperProps={{
        sx: {
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          height: 'auto',
          overflow: 'visible'
        }
      }}>
      <Box sx={{ padding: 2 }}>
        <PhotoDropdownMenuItems />
      </Box>
    </Drawer>
  )

  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col w-[160px] relative">
        {takePhoto ? (
          <WebcamCapture
            setTakePhoto={setTakePhoto}
            setImgSrc={setSelectedImage}
            setSelectedImageFile={setSelectedImageFile}
            handleImageUpdate={handleImageUpdate}
          />
        ) : selectedImage ? (
          <img src={selectedImage} alt="Selected" className="w-full h-full rounded-full" />
        ) : (
          <>
            <img src="/icons/avatar.svg" alt="profile" className="w-[160px] h-full rounded-full bg-[#745BD7]" />

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[18px] font-semibold text-[#232222]">
              {overlayText}
            </div>
          </>
        )}

        <div
          className={`${takePhoto ? 'hidden' : 'flex'} items-center justify-center absolute bottom-0 right-0 w-[40px] h-[40px] bg-white rounded-full cursor-pointer z-10`}
          onClick={handlePhotoIconClick}>
          {selectedImage ? <IconDotsVertical size={24} color="#8B93A7" /> : <IconPhotoPlus size={24} color="#8B93A7" />}
        </div>

        {/* Menu for medium screens and above */}
        {!isMobile && <PhotoDropdown />}

        {/* Drawer for mobile view */}
        {isMobile && <MobilePhotoDrawer />}
      </div>

      {/* Backdrop for mobile view */}
      {isMobile && (
        <Backdrop
          open={mobileMenuOpen}
          sx={{
            zIndex: theme.zIndex.drawer - 1,
            backdropFilter: 'blur(5px)'
          }}
          onClick={handleClose}
        />
      )}
    </div>
  )
}
