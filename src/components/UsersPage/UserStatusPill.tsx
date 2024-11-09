import { Box, Typography } from '@mui/material'

import { userStatusBackgroundColors, userStatusIcons, userStatusText, userStatusTextColors } from './constants'

export const UserStatusPill = ({ status }: { status: string }) => {
  const getStatusIcon = (status: string, props: any) => {
    const IconComponent = userStatusIcons[status]

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
      bgcolor={userStatusBackgroundColors[status]}>
      {getStatusIcon(status, {
        size: 16,
        color: userStatusTextColors[status]
      })}

      <Typography variant="caption" color={userStatusTextColors[status]} className="!font-semibold">
        {userStatusText[status]}
      </Typography>
    </Box>
  )
}
