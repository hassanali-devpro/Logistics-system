import { useSelector } from 'react-redux'
import { Box, Button, IconButton, Typography } from '@mui/material'
import { IconArrowLeft, IconArrowRight, IconChevronLeft } from '@tabler/icons-react'

export const DetailsTopNavBar = ({
  totalItems,
  handleBack,
  handlePrev,
  handleNext
}: {
  totalItems: number
  handleBack?: () => void
  handlePrev: () => void
  handleNext: () => void
}) => {
  const currentIndex = useSelector((state: any) => state.warehouse.detailsNavCurrentIndex)

  return (
    <Box p="8px" display="flex" justifyContent="space-between">
      <Button disabled={handleBack === undefined} variant="text" onClick={handleBack}>
        <IconChevronLeft size={16} color="#8B93A7" className="mr-1" />
        <Typography variant="caption" color="#8B93A7">
          Back
        </Typography>
      </Button>

      <Box display="flex" gap="4px" alignItems="center">
        <IconButton disabled={currentIndex === 0} onClick={handlePrev}>
          <IconArrowLeft size={16} color="#8B93A7" />
        </IconButton>

        <Typography variant="caption" color="#8B93A7">
          {currentIndex + 1} / {totalItems}
        </Typography>

        <IconButton disabled={currentIndex === totalItems - 1} onClick={handleNext}>
          <IconArrowRight size={16} color="#8B93A7" />
        </IconButton>
      </Box>
    </Box>
  )
}
