import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, IconButton, Typography } from '@mui/material'
import { IconBarrierBlock, IconMarquee2, IconPlus } from '@tabler/icons-react'

import { SearchTextField } from '../../shared/components'
import { rgbToCssString } from '../../shared/helpers/applicationHelpers'
import { theme } from '../../shared/theme'
import { FormTypes, WarehouseSetupSteps } from '../../wms-store/constants'
import { setEditComponent, setNavigationState } from '../../wms-store/reducers/warehouseReducer'

import { WarehouseSection } from './WarehouseSection'

export const ZonesTab = () => {
  const dispatch = useDispatch()
  const zones = useSelector((state: any) => state.warehouse.zones)
  const obstacles = useSelector((state: any) => state.warehouse.obstacles)
  const [clickedZoneIndex, setClickedZoneIndex] = useState<number | null>(null)
  const [clickedObstacleIndex, setClickedObstacleIndex] = useState<number | null>(null)
  const [searchText, setSearchText] = useState('')
  const [filteredZones, setFilteredZones] = useState(zones)
  const [filteredObstacles, setFilteredObstacles] = useState(obstacles)

  useEffect(() => {
    setFilteredZones(searchByName(searchText, zones))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zones])

  useEffect(() => {
    setFilteredObstacles(searchByName(searchText, obstacles))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [obstacles])

  const handleZoneClick = (index: number) => {
    setClickedZoneIndex(index === clickedZoneIndex ? null : index)
    setClickedObstacleIndex(null)
    dispatch(setEditComponent(zones[index]))
    dispatch(
      setNavigationState({
        step: WarehouseSetupSteps.SetWarehouseComponents,
        isLeftSideBarOpen: true,
        isRightSideBarOpen: true,
        formType: FormTypes.CreateZone
      })
    )
  }

  const handleObstacleClick = (index: number) => {
    setClickedObstacleIndex(index === clickedObstacleIndex ? null : index)
    setClickedZoneIndex(null)
    dispatch(setEditComponent(obstacles[index]))
    dispatch(
      setNavigationState({
        step: WarehouseSetupSteps.SetWarehouseComponents,
        isLeftSideBarOpen: true,
        isRightSideBarOpen: true,
        formType: FormTypes.CreateObstacle
      })
    )
  }

  const searchByName = (search: string, components: any) =>
    components.filter((component: any) => component.name.toLowerCase().includes(search.toLowerCase()))

  const handleSearchChange = useCallback(
    (e: any) => {
      const value = e.target.value
      setSearchText(value)
      setFilteredZones(searchByName(value, zones))
      setFilteredObstacles(searchByName(value, obstacles))
    },
    [zones, obstacles]
  )

  const handleCancel = () => {
    setSearchText('')
    setFilteredZones(zones)
    setFilteredObstacles(obstacles)
  }

  return (
    <>
      <Box py="8px">
        <SearchTextField
          placeholder="Search"
          onChange={handleSearchChange}
          onCancel={handleCancel}
          value={searchText}
        />
      </Box>

      <WarehouseSection />

      <Box px="8px" display="flex" flexDirection="column" gap="8px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography className="!font-semibold" variant="caption">
            Areas
          </Typography>

          <IconButton
            onClick={() => {
              dispatch(
                setNavigationState({
                  step: WarehouseSetupSteps.SetWarehouseComponents,
                  isLeftSideBarOpen: true,
                  isRightSideBarOpen: true,
                  formType: FormTypes.CreateZone
                })
              )
              dispatch(setEditComponent(undefined))
            }}>
            <IconPlus color="#8B93A7" size={16} />
          </IconButton>
        </Box>
        {filteredZones.map((item: any, index: number) => (
          <div
            key={index}
            onClick={() => handleZoneClick(index)}
            className={`h-10 px-4 py-1 justify-start items-center gap-2 inline-flex cursor-pointer rounded-lg ${
              clickedZoneIndex === index ? 'bg-gray-300' : 'hover:bg-gray-100'
            }`}>
            <Box borderRadius="4px" bgcolor={rgbToCssString(item.color)}>
              <IconMarquee2 size={16} color={theme.palette.getContrastText(rgbToCssString(item.color))} />
            </Box>
            <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
              <div
                className={`self-stretch text-sm font-normal font-['Outfit'] leading-tight ${
                  clickedZoneIndex === index ? 'text-blue-500' : 'text-[#353a46]'
                }`}>
                {item.name || 'Unknown'}
              </div>
              <div
                className={`self-stretch text-xs font-normal font-['Outfit'] ${
                  clickedZoneIndex === index ? 'text-blue-500' : 'text-[#8B93A7]'
                }`}>
                {item.zoneType || 'Unknown'}
              </div>
            </div>
          </div>
        ))}

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography className="!font-semibold" variant="caption">
            Obstacles
          </Typography>

          <IconButton
            onClick={() => {
              dispatch(
                setNavigationState({
                  step: WarehouseSetupSteps.SetWarehouseComponents,
                  isLeftSideBarOpen: true,
                  isRightSideBarOpen: true,
                  formType: FormTypes.CreateObstacle
                })
              )
              dispatch(setEditComponent(undefined))
            }}>
            <IconPlus color="#8B93A7" size={16} />
          </IconButton>
        </Box>
        {filteredObstacles.map((item: any, index: number) => (
          <div
            key={index}
            onClick={() => handleObstacleClick(index)}
            className={`h-10 px-4 py-1 justify-start items-center gap-2 inline-flex cursor-pointer rounded-lg ${
              clickedObstacleIndex === index ? 'bg-gray-300' : 'hover:bg-gray-100'
            }`}>
            <Box borderRadius="4px" bgcolor={rgbToCssString(item.color)}>
              <IconBarrierBlock size={16} color={theme.palette.getContrastText(rgbToCssString(item.color))} />
            </Box>
            <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
              <div
                className={`self-stretch text-sm font-normal font-['Outfit'] leading-tight ${
                  clickedObstacleIndex === index ? 'text-blue-500' : 'text-[#353a46]'
                }`}>
                {item.name}
              </div>
            </div>
          </div>
        ))}
      </Box>
    </>
  )
}

export default ZonesTab
