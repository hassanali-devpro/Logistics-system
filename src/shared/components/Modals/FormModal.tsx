import { Box, Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material'
import { IconX } from '@tabler/icons-react'

import '../../styles/ThinScrollbarStyles.css'

const FormModal = (props: any) => {
  const {
    disableCloseOnEscapeKeyDown,
    form,
    fullscreen,
    handleClose,
    open,
    subtitle,
    title,
    width,
    hideCancelButton = false,
    divider
  } = props

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={true}
      maxWidth={width || 'md'}
      className="thin-scrollbar-class"
      disableEscapeKeyDown={disableCloseOnEscapeKeyDown || false}
      fullScreen={fullscreen ? true : false}>
      <DialogTitle className="!p-6 flex justify-between" id="alert-dialog-title">
        <Box display="flex" flexDirection="column" gap="4px">
          <Typography variant="h3" className="!font-bold" color="#1A1D23">
            {title ? title : 'Title'}
          </Typography>

          <Typography variant="h6" color="rgba(9, 12, 42, 0.50)">
            {subtitle}
          </Typography>
        </Box>
        {!hideCancelButton && (
          <IconButton className="h-fit" onClick={handleClose}>
            <IconX />
          </IconButton>
        )}
      </DialogTitle>
      <DialogContent className="!pb-6">
        {divider && <hr />}
        {form}
      </DialogContent>
    </Dialog>
  )
}

export default FormModal
