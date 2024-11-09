import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import NavigationBar from '../components/NavigationBar/NavigationBar'
import TopBar from '../components/TopBar/Index'
import { privateRoutes } from '../Routes/privateRouteElements'
import { Delay } from '../shared/components/Delay'

const PrivateRoutes = () => {
  return (
    <NavigationBar>
      <div className="h-screen flex md:flex-row flex-col">
        <TopBar />
        <div className="flex-grow">
          <Suspense fallback={<Delay />}>
            <Routes>
              {privateRoutes.map(({ path, element: Component }) => (
                <Route key={path} path={path} element={<Component />} />
              ))}
            </Routes>
          </Suspense>
        </div>
      </div>
    </NavigationBar>
  )
}

export default PrivateRoutes
