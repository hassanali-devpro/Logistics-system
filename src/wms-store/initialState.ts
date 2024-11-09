import { Warehouse } from '../components/CreateWarehouse/types'

import { FormTypes, WarehouseSetupSteps } from './constants'

export const initialState = {
  appNavigation: {
    isNavbarOpen: false
  },
  auth: {
    currentUser: {},
    users: [] as any[],
    userProfiles: {} as { [key: string]: any }, // the key will be the _id of the user and the value will be the profile
    settingsProfileId: undefined
  },
  role: {
    activeRoles: [] as any[]
  },
  warehouse: {
    navigationState: {
      step: WarehouseSetupSteps.SetWarehouseBoundary,
      isLeftSideBarOpen: false,
      isRightSideBarOpen: false,
      formType: FormTypes.WarehouseDetails,
      currentTab: 0
    },
    warehouses: [] as Warehouse[],
    activeWarehouses: [] as any[],
    currentWarehouse: {} as any,
    rackModels: [],
    zones: [] as any[],
    obstacles: [] as any[],
    racks: [] as any[],
    editComponent: undefined as any,
    submittedComponentId: undefined,
    detailsNavBackIndices: { bayBackIndex: 0, levelBackIndex: 0 },
    detailsNavCurrentIndex: undefined,
    currentRackDetails: {},
    currentBayDetails: {},
    currentLevelDetails: {},
    currentLocationDetails: {}
  }
}
