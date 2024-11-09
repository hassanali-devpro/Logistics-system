import React, { useEffect } from 'react'
import { RgbColor, RgbColorPicker } from 'react-colorful'
import { Box, Popper, Typography } from '@mui/material'
import { IconChevronDown, IconX } from '@tabler/icons-react'

import { rgbToCssString } from '../../helpers/applicationHelpers'

export type LabelledColorPickerProps = {
  label?: string
  subLabel?: string
  onChange: any
  value: RgbColor
}

export const LabelledColorPicker = ({ label, subLabel, onChange, value }: LabelledColorPickerProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popper' : undefined

  const popperRef = React.useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const clickedElement = event.target as HTMLElement
      const isPopper = clickedElement.closest('.MuiPopper-root')
      const isColorPicker = clickedElement.closest('.react-colorful')

      if (anchorEl && !anchorEl.contains(clickedElement) && !isPopper && !isColorPicker) {
        handleClose()
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [anchorEl, open])

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

      <Box
        className="border border-solid border-[#D1D4DC] rounded cursor-pointer"
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap="4px"
        width="48px"
        height="28px"
        onClick={handleClick}>
        <Box
          height="20px"
          width="20px"
          className="rounded"
          sx={{
            backgroundColor: rgbToCssString(value)
          }}
        />

        {open ? <IconX size={16} color="#353A46" /> : <IconChevronDown size={16} color="#353A46" />}
      </Box>

      <Popper id={id} placement="bottom-start" open={open} anchorEl={anchorEl} ref={popperRef}>
        <RgbColorPicker color={value} onChange={onChange} />
      </Popper>
    </Box>
  )
}
