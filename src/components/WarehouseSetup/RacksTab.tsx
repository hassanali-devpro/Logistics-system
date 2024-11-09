import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, IconButton, Typography } from '@mui/material'
import { IconPlus } from '@tabler/icons-react'

import { SearchTextField } from '../../shared/components'
import { FormTypes, WarehouseSetupSteps } from '../../wms-store/constants'
import { setEditComponent, setNavigationState } from '../../wms-store/reducers/warehouseReducer'

import { NestedList } from './NestedList'
import { WarehouseSection } from './WarehouseSection'

export const RacksTab = () => {
  const dispatch = useDispatch()
  const racks = useSelector((state: any) => state.warehouse.racks)
  const [searchText, setSearchText] = useState('')
  const initialListStatus: { [key: string]: boolean } = {}

  const [filteredRacks, setFilteredRacks] = useState(racks)
  const [listStatus, setListStatus] = useState(initialListStatus)

  const filterRacks = (searchTerm: string, racks: any[]): any[] => {
    if (searchTerm.length === 0) return racks

    const lowercasedTerm = searchTerm.toLowerCase()

    return racks
      .map((rack) => {
        if (rack.name.toLowerCase().includes(lowercasedTerm)) {
          return rack
        }

        const baysMatchingSearch = rack.bays.filter((bay: any) => bay.name.toLowerCase().includes(lowercasedTerm))

        if (baysMatchingSearch.length > 0) {
          setListStatus((prevStatus) => ({
            ...prevStatus,
            [rack.id]: true
          }))

          return {
            ...rack,
            bays: baysMatchingSearch
          }
        }

        return null
      })
      .filter((rack) => rack !== null)
  }

  const handleSearchChange = useCallback(
    (e: any) => {
      const value = e.target.value
      setSearchText(value)
      setFilteredRacks(filterRacks(value, racks))
    },
    [racks]
  )

  const handleCancel = () => {
    setSearchText('')
    setFilteredRacks(racks)
  }

  useEffect(() => {
    setFilteredRacks(filterRacks(searchText, racks))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [racks])

  return (
    <Box display="flex" flexDirection="column" gap="8px">
      <Box py="8px">
        <SearchTextField
          placeholder="Search"
          onChange={handleSearchChange}
          onCancel={handleCancel}
          value={searchText}
        />
      </Box>

      <WarehouseSection />

      <Box px="8px" display="flex" justifyContent="space-between" alignItems="center">
        <Typography className="!font-semibold" variant="caption">
          Racks
        </Typography>

        <IconButton
          onClick={() => {
            dispatch(
              setNavigationState({
                step: WarehouseSetupSteps.SetWarehouseComponents,
                isLeftSideBarOpen: true,
                isRightSideBarOpen: true,
                formType: FormTypes.CreateRack
              })
            )
            dispatch(setEditComponent(undefined))
          }}>
          <IconPlus color="#8B93A7" size={16} />
        </IconButton>
      </Box>

      <NestedList listStatus={listStatus} setListStatus={setListStatus} racks={filteredRacks} />
    </Box>
  )
}
