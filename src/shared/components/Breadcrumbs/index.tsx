import { Link as RouterLink, useLocation } from 'react-router-dom'
import { Breadcrumbs as MuiBreadcrumbs, Link, LinkProps, Typography } from '@mui/material'
import { IconChevronRight, IconHome } from '@tabler/icons-react'

import { breadcrumbNameMap } from './constants'

interface LinkRouterProps extends LinkProps {
  to: string
  replace?: boolean
}

function LinkRouter(props: LinkRouterProps) {
  return <Link {...props} component={RouterLink as any} />
}

export const Breadcrumbs = () => {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter((x) => x)

  return (
    <MuiBreadcrumbs
      className="!mb-4"
      separator={<IconChevronRight size={16} color="#8B93A7" />}
      aria-label="breadcrumb">
      <LinkRouter underline="hover" color="inherit" to="/">
        <IconHome size={16} color="#8B93A7" />
      </LinkRouter>
      {pathnames.map((_value, index) => {
        const last = index === pathnames.length - 1
        const to = `/${pathnames.slice(0, index + 1).join('/')}`

        return last ? (
          <Typography variant="subtitle1" key={to} color="#353A46">
            {breadcrumbNameMap[to]}
          </Typography>
        ) : (
          <LinkRouter className="text-sm font-normal" underline="hover" color="inherit" to={to} key={to}>
            {breadcrumbNameMap[to]}
          </LinkRouter>
        )
      })}
    </MuiBreadcrumbs>
  )
}
