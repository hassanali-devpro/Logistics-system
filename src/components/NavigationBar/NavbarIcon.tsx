import { useLocation } from 'react-router-dom'

import { AppRoute } from './constants'

export const NavbarIcon = ({ route }: { route: AppRoute }) => {
  const location = useLocation()
  const IconComponent = route?.icon

  if (IconComponent) {
    return <IconComponent color={location.pathname.startsWith(route.path) ? '#1F69FF' : '#4F5668'} size={24} />
  } else return null
}
