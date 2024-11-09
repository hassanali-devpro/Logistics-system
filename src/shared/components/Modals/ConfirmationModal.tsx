import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography
} from '@mui/material'
import { IconX } from '@tabler/icons-react'

const ConfirmationModal = (props: any) => {
  const {
    id,
    handleClose,
    open,
    title,
    cancelAction,
    okBtnText,
    cancelBtnText,
    onConfirmation,
    body,
    alertIcon,
    deleteConfirmation,
    divider
  } = props

  const deleteResource = () => {
    onConfirmation()
    handleClose()
  }

  const cancelResource = (action: () => void) => {
    action()
    handleClose()
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        disableEscapeKeyDown={false}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle className="flex justify-between !p-6 gap-6" id="alert-dialog-title">
          <Box display="flex" gap="16px" alignItems="center">
            {alertIcon !== undefined ? alertIcon : <></>}

            <Typography variant="h4" color="#1A1D23" className="font-bold">
              {title}
            </Typography>
          </Box>

          <IconButton onClick={handleClose}>
            <IconX className="" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {divider && <hr />}
          <DialogContentText id="alert-dialog-description">
            <Typography variant="body1" className="font-normal">
              {body}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions className="!p-6" data-testid={id && `${id}-actions`}>
          <Button
            onClick={
              cancelAction
                ? () => {
                    cancelResource(cancelAction)
                  }
                : handleClose
            }
            variant="outlined">
            {cancelBtnText ?? 'Cancel'}
          </Button>
          <Button
            onClick={deleteResource}
            autoFocus
            color={deleteConfirmation ? 'error' : 'primary'}
            variant="contained">
            {okBtnText ?? `YES, CONFIRM`}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ConfirmationModal
