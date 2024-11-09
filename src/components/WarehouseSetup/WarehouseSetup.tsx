import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { Box } from '@mui/material'

import { config } from '../../config'
import { Delay } from '../../shared/components/Delay'
import { DYNAMAKER_IFRAME_ID } from '../../shared/constants'
import { useGetWarehouseQuery } from '../../wms-store/services/warehouseService'

import { TOP_NAV_HEIGHT } from './constants'
import { LeftSideBar } from './LeftSideBar'
import { RightSideBar } from './RightSideBar'
import { TopNavBar } from './TopNavBar'

const WarehouseSetup = () => {
  const location = useLocation()
  const whKey = location?.state?.whKey
  const { isLoading, isFetching } = useGetWarehouseQuery(whKey, { skip: !whKey })
  const { isLeftSideBarOpen, isRightSideBarOpen } = useSelector((state: any) => state.warehouse.navigationState)

  return (
    <Box display="flex" flexDirection="column" height="100%" width="100%">
      {isFetching || isLoading ? (
        <Delay />
      ) : (
        <>
          <TopNavBar />

          <Box display="flex" flexDirection="row" height={`calc(100% - ${TOP_NAV_HEIGHT}px)`} width="100%">
            <LeftSideBar />

            <Box height="100%" width={isLeftSideBarOpen ? (isRightSideBarOpen ? '60%' : '80%') : '100%'}>
              <iframe
                id={DYNAMAKER_IFRAME_ID}
                title="dynamaker-iframe"
                className="w-full h-full"
                src={config.DYNAMAKER_ORIGIN}
              />
            </Box>

            <RightSideBar />
          </Box>
        </>
      )}
    </Box>
  )
}

export default WarehouseSetup
