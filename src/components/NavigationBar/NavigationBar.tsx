import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { useMediaQuery } from '@mui/material'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import MuiDrawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import { CSSObject, styled, Theme } from '@mui/material/styles'
import { IconLayoutSidebarLeftCollapse, IconLayoutSidebarLeftExpand } from '@tabler/icons-react'

import { SearchTextField } from '../../shared/components'
import { isSideBarHiddenRoutes } from '../../shared/constants'
import { GlobalSearchIcon } from '../../shared/icons'
import { setNavbarState } from '../../wms-store/reducers/appNavigationReducer'

import { AppRoute, drawerWidth, primaryAppRoutes, secondaryAppRoutes } from './constants'
import { RouteList } from './RouteList'
import { UserProfileItem } from './UserProfileItem'

import '../../shared/styles/ScrollbarStyles.css'

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme)
      }
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme)
      }
    }
  ]
}))

export default function NavigationBar(props: any) {
  const { children } = props
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [searchText, setSearchText] = useState('')
  const isNavbarOpen = useSelector((state: any) => state.appNavigation.isNavbarOpen)
  const isSmallScreen = useMediaQuery('(max-width:768px)')
  const hideSidebar = isSideBarHiddenRoutes.includes(location.pathname.toLocaleLowerCase()) || isSmallScreen

  const handleDrawerToggle = () => {
    dispatch(setNavbarState(!isNavbarOpen))
  }

  const handleRouteClick = (route: AppRoute) => {
    navigate(route.path)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <Drawer className={`${hideSidebar ? 'hidden' : ''}`} variant="permanent" open={isNavbarOpen}>
        <DrawerHeader className={`flex justify-center items-center !p-0 ${isNavbarOpen ? '!pr-0' : '!pr-1'}`}>
          {isNavbarOpen ? (
            <img src="/icons/profileLogo.svg" alt="logo" className="mt-2 mr-2 w-[155.713px] h-12 self-start" />
          ) : (
            <img src="/logo.svg" className="mr-1 h-12" alt="logo" />
          )}
          <IconButton
            sx={{
              padding: '0px',
              borderRadius: '8px',
              marginLeft: isNavbarOpen ? '4px' : '0px',
              marginRight: isNavbarOpen ? '12px' : '6px'
            }}
            onClick={handleDrawerToggle}>
            <Box className="border rounded-lg border-[#E8E9ED] p-2">
              {isNavbarOpen ? (
                <IconLayoutSidebarLeftCollapse size={24} color="#4F5668" />
              ) : (
                <IconLayoutSidebarLeftExpand size={24} color="#4F5668" />
              )}
            </Box>
          </IconButton>
        </DrawerHeader>

        <Box className="ml-2">
          <SearchTextField
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Ask or Search..."
            maxHeight="40px"
            fontSize="16px"
            lineHeight="24px"
            fontWeight={400}
            hideBorders
            startAdornment={
              <Box className="mr-3">
                <GlobalSearchIcon />
              </Box>
            }
          />
        </Box>

        <Box height="100%" id="scroll-bar-id" className="overflow-y-auto overflow-x-hidden">
          <RouteList open={isNavbarOpen} routes={primaryAppRoutes} handleRouteClick={handleRouteClick} />
        </Box>

        <RouteList open={isNavbarOpen} routes={secondaryAppRoutes} handleRouteClick={handleRouteClick} />

        <UserProfileItem isNavbarOpen={isNavbarOpen} />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
    </Box>
  )
}
