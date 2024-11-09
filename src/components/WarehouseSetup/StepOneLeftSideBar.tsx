import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Tab, Tabs } from '@mui/material'
import { IconMarquee2 } from '@tabler/icons-react'

import { RackIcon } from '../../shared/icons'
import { setNavigationState } from '../../wms-store/reducers/warehouseReducer'

import { StepOneStyles } from './styles/StepOneStyles'
import { RacksTab } from './RacksTab'
import { ZonesTab } from './ZonesTab'

export const StepOneLeftSideBar = () => {
  const dispatch = useDispatch()
  const currentTab = useSelector((state: any) => state.warehouse.navigationState.currentTab)

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    dispatch(
      setNavigationState({
        isLeftSideBarOpen: true,
        currentTab: newValue
      })
    )
  }

  return (
    <Box display="flex" flexDirection="column" gap="8px">
      <Tabs
        value={currentTab}
        variant="fullWidth"
        onChange={handleChange}
        style={StepOneStyles().tabs}
        TabIndicatorProps={StepOneStyles().tabIndicator}>
        <Tab
          icon={<IconMarquee2 className="!mr-0" size={16} color={currentTab === 0 ? '#1F69FF' : '#353A46'} />}
          iconPosition="start"
          label="Zones"
          style={StepOneStyles(0, currentTab).tab}
        />
        <Tab
          icon={<RackIcon stroke={currentTab === 1 ? '#1F69FF' : '#353A46'} />}
          iconPosition="start"
          label="Racks"
          style={StepOneStyles(1, currentTab).tab}
        />
      </Tabs>

      {currentTab === 0 ? <ZonesTab /> : <RacksTab />}
    </Box>
  )
}
