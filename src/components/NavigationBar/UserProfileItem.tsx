import * as React from 'react'
import { useSelector } from 'react-redux'
import { Tooltip, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import { IconDotsVertical } from '@tabler/icons-react'

import { UserProfileMenu } from './UserProfileMenu'

import profileImage from '/images/profile.png'

export const UserProfileItem = ({ isNavbarOpen }: { isNavbarOpen: boolean }) => {
  const textRef = React.useRef<HTMLDivElement>(null)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [isTextOverflowing, setIsTextOverflowing] = React.useState(false)
  const menuOpen = Boolean(anchorEl)
  const userData = useSelector((state: any) => state.auth.currentUser)
  const userImage = userData?.image ? userData.image : profileImage
  const userName = `${userData?.givenName} ${userData?.lastName}` || ''

  const handleProfileIconClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  // Function to check if text is overflowing
  React.useEffect(() => {
    const checkOverflow = () => {
      const el = textRef.current
      if (el) {
        setIsTextOverflowing(el.offsetWidth < el.scrollWidth)
      }
    }

    checkOverflow()
  }, [userName])

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" py="4px" pr="4px" pl="16px">
      <Box display="flex" gap="16px">
        <img
          onClick={isNavbarOpen ? undefined : handleProfileIconClick}
          src={userImage}
          alt="User Profile"
          className="w-8 h-8 rounded-full"
        />

        {/* Optionally show tooltip when text overflows */}
        <Tooltip title={userName} disableHoverListener={!isTextOverflowing}>
          <Typography
            ref={textRef}
            variant="body2"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '130px'
            }}>
            {userName}
          </Typography>
        </Tooltip>
      </Box>

      <Box>
        <IconButton
          id="basic-button"
          aria-controls={menuOpen ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={menuOpen ? 'true' : undefined}
          onClick={handleProfileIconClick}>
          <IconDotsVertical color="#8B93A7" size={24} />
        </IconButton>

        <UserProfileMenu anchorEl={anchorEl} handleMenuClose={handleMenuClose} />
      </Box>
    </Box>
  )
}
