import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Divider, Menu, MenuItem, Typography } from '@mui/material'
import { IconAdjustmentsHorizontal, IconLogout, IconUserCircle } from '@tabler/icons-react'

import { AvatarWithLabel } from '../../shared/components'
import { capitalizeFirstLetter } from '../../shared/helpers/applicationHelpers'
import { useLogoutMutation } from '../../wms-store/services/authService'

import profileImage from '/images/profile.png'

export const UserProfileMenu = ({
  anchorEl,
  handleMenuClose
}: {
  anchorEl: HTMLElement | null
  handleMenuClose: () => void
}) => {
  const menuOpen = Boolean(anchorEl)
  const navigate = useNavigate()
  const [logoutMutation] = useLogoutMutation()
  const userData = useSelector((state: any) => state.auth.currentUser)
  const userImage = userData?.image ? userData.image : profileImage
  const userName = `${userData?.givenName} ${userData?.lastName}` || ''
  const userRole = userData?.role

  const handleLogout = () => {
    handleMenuClose()
    if (window.confirm(`Are you sure you want to logout ${userData?.givenName} ?`)) {
      logoutMutation({})
        .then((res) => {
          if (res.data.status === 1) {
            navigate('/auth')
          }
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }

  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={menuOpen}
      disableAutoFocusItem
      slotProps={{ paper: { sx: { width: '280px', borderRadius: '8px' } } }}
      style={{ padding: '8px 16px' }}
      onClose={handleMenuClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      MenuListProps={{
        'aria-labelledby': 'basic-button'
      }}>
      <MenuItem disableRipple className="!cursor-default hover:!bg-inherit" key="profile">
        <AvatarWithLabel largeText label={userName} subLabel={capitalizeFirstLetter(userRole)} imgSrc={userImage} />
      </MenuItem>

      <Divider style={{ marginLeft: 16, marginRight: 16 }} />

      <MenuItem
        key="view_profile"
        onClick={() => {
          handleMenuClose()
          navigate('/settings/profile')
        }}>
        <IconUserCircle className="mr-3" color="#353A46" size={20} />
        <Typography variant="subtitle1" color="#353A46">
          View Profile
        </Typography>
      </MenuItem>

      <MenuItem
        key="app_preferences"
        onClick={() => {
          handleMenuClose()
          navigate('/settings/appPreferences')
        }}>
        <IconAdjustmentsHorizontal className="mr-3" color="#353A46" size={20} />
        <Typography variant="subtitle1" color="#353A46">
          App Preferences
        </Typography>
      </MenuItem>

      <Divider style={{ marginLeft: 16, marginRight: 16 }} />

      <MenuItem key="logout" onClick={handleLogout}>
        <IconLogout className="mr-3" color="#F53939" size={20} />
        <Typography variant="subtitle1" color="#F53939">
          Log out
        </Typography>
      </MenuItem>
    </Menu>
  )
}
