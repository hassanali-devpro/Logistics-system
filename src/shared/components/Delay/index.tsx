import { Box, CircularProgress } from '@mui/material'

export const Delay = ({ size }: { size?: string }) => (
  <Box height="-webkit-fill-available" display="flex" justifyContent="center" alignItems="center">
    <CircularProgress size={size ?? '8vw'} />
  </Box>
)
