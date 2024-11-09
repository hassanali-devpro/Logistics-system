/* eslint-disable no-unused-vars */
import React from 'react'
import { useLocation } from 'react-router-dom'
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Popover, Typography } from '@mui/material'

import { AppRoute } from './constants'
import { NavbarIcon } from './NavbarIcon'

export const RouteList = ({
  routes,
  open,
  handleRouteClick
}: {
  routes: AppRoute[]
  open: boolean
  handleRouteClick: (route: AppRoute) => void
}) => {
  const location = useLocation()
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)
  const [popperContent, setPopperContent] = React.useState('')
  const popoverOpen = Boolean(anchorEl)

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>, route: AppRoute) => {
    if (!open) {
      setAnchorEl(event.currentTarget)
      setPopperContent(route.label)
    }
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  return (
    <List>
      {routes.map((route) => (
        <ListItem key={route.path} disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            onMouseEnter={(event) => handlePopoverOpen(event, route)}
            onMouseLeave={handlePopoverClose}
            onClick={() => handleRouteClick(route)}
            sx={[
              {
                minHeight: 48,
                px: 2.5
              },
              open
                ? {
                    justifyContent: 'initial'
                  }
                : {
                    justifyContent: 'center'
                  }
            ]}>
            <ListItemIcon
              sx={[
                {
                  minWidth: 0,
                  justifyContent: 'center'
                },
                open
                  ? {
                      mr: 3
                    }
                  : {
                      mr: 'auto'
                    }
              ]}>
              <NavbarIcon route={route} />
            </ListItemIcon>
            <Popover
              id="mouse-over-popover"
              sx={{ pointerEvents: 'none' }}
              open={popoverOpen}
              anchorEl={anchorEl}
              slotProps={{
                paper: {
                  sx: {
                    width: 'fit-content',
                    padding: '12px',
                    borderRadius: '8px',
                    marginLeft: '8px',
                    boxShadow: 1
                  }
                }
              }}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              onClose={handlePopoverClose}
              disableRestoreFocus>
              <Typography variant="body1">{popperContent}</Typography>
            </Popover>
            <ListItemText
              primary={route.label}
              primaryTypographyProps={{
                fontSize: '16px',
                lineHeight: '24px',
                fontWeight: 400,
                color: location.pathname.startsWith(route.path) ? '#1F69FF' : '#4F5668'
              }}
              sx={[
                open
                  ? {
                      opacity: 1
                    }
                  : {
                      opacity: 0
                    }
              ]}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}
