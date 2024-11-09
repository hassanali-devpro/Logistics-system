import { Typography } from '@mui/material'
import { Box } from '@mui/system'

export const FormSectionHeader = ({ heading }: { heading: string }) => (
  <Box p="8px 8px 8px 16px">
    <Typography variant="caption" className="!font-semibold">
      {heading}
    </Typography>
  </Box>
)
