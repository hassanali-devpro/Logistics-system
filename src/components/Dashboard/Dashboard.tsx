import { Route, Routes } from 'react-router-dom'

import CreateWarehouse from '../CreateWarehouse/CreateWarehouse'
import DashboardContent from '../DashboardContent/DashboardContent'
import DashboardHeader from '../DashboardHeader/DashboardHeader'
import UserComponent from '../UsersPage/UsersPage'

const Dashboard = () => {
  return (
    <div>
      <div className="w-full">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <DashboardHeader heading="Settings" />
                <DashboardContent />
              </>
            }
          />
          <Route path="users" element={<UserComponent />} />
          <Route path="warehouseCreate" element={<CreateWarehouse />} />
        </Routes>
      </div>
    </div>
  )
}

export default Dashboard
