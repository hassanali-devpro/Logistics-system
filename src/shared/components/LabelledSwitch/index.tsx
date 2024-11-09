/* eslint-disable no-unused-vars */

import { Box, Typography } from '@mui/material'

import { IOSSwitch } from '../IOSSwitch'

export type LabelledSwitchProps = {
  label?: string
  subLabel?: string
  onChange: (event: any) => void
  checked: boolean
}

export const LabelledSwitch = ({ label, subLabel, onChange, checked }: LabelledSwitchProps) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Box display="flex" flexDirection="column">
        <Typography noWrap variant="subtitle1">
          {label}
        </Typography>

        <Typography noWrap variant="caption">
          {subLabel}
        </Typography>
      </Box>

      <IOSSwitch onChange={onChange} checked={checked} />
    </Box>
  )
}
