import { Box, Typography } from '@mui/material'

import { warehouseStatusBackgroundColors, warehouseStatusIcons, warehouseStatusTextColors } from './constants'

export const WarehouseStatusPill = ({ status }: { status: string }) => {
  const getStatusIcon = (status: string, props: any) => {
    const IconComponent = warehouseStatusIcons[status]

    return IconComponent ? <IconComponent {...props} /> : <></>
  }

  return (
    <Box
      borderRadius="999px"
      display="flex"
      alignItems="center"
      gap="4px"
      p="4px 8px"
      width="fit-content"
      bgcolor={warehouseStatusBackgroundColors[status]}>
      {getStatusIcon(status, {
        size: 16,
        color: warehouseStatusTextColors[status]
      })}

      <Typography
        textTransform="capitalize"
        variant="caption"
        color={warehouseStatusTextColors[status]}
        className="!font-semibold">
        {status}
      </Typography>
    </Box>
  )
}
