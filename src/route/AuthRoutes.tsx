import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import LoginFooter from '../components/Login/LoginFooter'
import LoginHeader from '../components/Login/LoginHeader'
import LoginRight from '../components/Login/LoginRight'
import { authRoutes } from '../Routes/authRouteElements'
import { Delay } from '../shared/components/Delay'

const AuthRoutes = () => {
  return (
    <div className="flex w-full h-screen">
      <div className="w-full h-full flex flex-col justify-between">
        <LoginHeader />
        <Suspense fallback={<Delay />}>
          <Routes>
            {authRoutes.map(({ path, element: Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Routes>
        </Suspense>
        <LoginFooter />
      </div>
      <LoginRight />
    </div>
  )
}

export default AuthRoutes
