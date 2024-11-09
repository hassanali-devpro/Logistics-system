import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import AuthRoutes from '../../route/AuthRoutes'
import PrivateRoutes from '../../route/PrivateRoutes'
import { handleReceiveMessage } from '../../shared/helpers/applicationHelpers'
import { useGetUserProfileQuery } from '../../wms-store/services/authService'
import NotFound from '../NotFound/Index'
import Profile from '../Profile/Profile'

export const Component = () => {
  const dispatch = useDispatch()
  useGetUserProfileQuery({ userKey: localStorage.getItem('currentUserKey') as string })

  useEffect(() => {
    const handleMessage = (event: any) => {
      handleReceiveMessage(event, dispatch)
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [dispatch])

  return (
    <Router>
      <Routes>
        <Route path="auth/*" element={<AuthRoutes />} />
        <Route path="/*" element={<PrivateRoutes />} />
        <Route path="profile-edit" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}
