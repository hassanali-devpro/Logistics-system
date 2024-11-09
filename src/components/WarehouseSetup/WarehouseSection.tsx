import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography } from '@mui/material'

import { EditWarehouseIcon } from '../../shared/icons'
import { FormTypes } from '../../wms-store/constants'
import { setNavigationState } from '../../wms-store/reducers/warehouseReducer'

export const WarehouseSection = () => {
  const dispatch = useDispatch()
  const { isRightSideBarOpen, formType } = useSelector((state: any) => state.warehouse.navigationState)
  const currentWarehouseName = useSelector((state: any) => state.warehouse.currentWarehouse.name)
  const isSelected = formType === FormTypes.WarehouseDetails && isRightSideBarOpen

  const handleWarehouseClick = () => {
    dispatch(
      setNavigationState({
        isRightSideBarOpen: !isSelected,
        formType: FormTypes.WarehouseDetails
      })
    )
  }

  return (
    <Box px="8px" display="flex" flexDirection="column" gap="12px">
      <Typography className="!font-semibold" variant="caption">
        Warehouse
      </Typography>
      <div
        className={`flex items-center cursor-pointer rounded-md ${isSelected ? 'bg-[#EBF1FF]' : ''}`}
        onClick={handleWarehouseClick}>
        <div className="flex items-center gap-3 p-1">
          <EditWarehouseIcon size={20} stroke={isSelected ? '#1F69FF' : '#353A46'} />
          <div
            className={`text-sm font-normal font-['Outfit'] leading-tight ${isSelected ? 'text-[#1F69FF]' : 'text-[#353A46]'}`}>
            {currentWarehouseName}
          </div>
        </div>
      </div>
    </Box>
  )
}
