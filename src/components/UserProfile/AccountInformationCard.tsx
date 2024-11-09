import { Box, Divider, Typography } from '@mui/material'
import { IconChevronRight, IconUserX } from '@tabler/icons-react'

import { useModalContext } from '../../shared/components'
import { FORM_MODAL } from '../../shared/constants'
import { formatDateFromTimestamp } from '../../shared/helpers/unixTimestampHelpers'
import { DeactivateUserForm } from '../SettingsUserProfile/DeactivateUserForm'

import '../../shared/styles/HoverShadowStyles.css'

export const AccountInformationCard = ({ currentUser }: { currentUser: any }) => {
  const { handleOpen, handleClose } = useModalContext()

  const handleDeactivateClick = () => {
    handleOpen({
      modalType: FORM_MODAL,
      modalProps: {
        fullscreen: false,
        width: 'sm',
        form: <DeactivateUserForm handleClose={handleClose} currentUser={currentUser} />,
        title: (
          <Box display="flex" alignItems="center" gap="8px">
            <Box p="8px" borderRadius="8px" bgcolor="#FEECEC">
              <IconUserX size={24} color="#F53939" />
            </Box>

            <Box>Deactivate Account</Box>
          </Box>
        )
      }
    })
  }

  return (
    <div className="bg-white border border-[#D1D4DC] sm:px-6 px-4 py-6 rounded-xl">
      <div className="flex flex-col mb-4">
        <div className="text-lg font-semibold py-2">Account Information</div>
        <Box display="flex" flexDirection="column">
          <Typography variant="caption" color="#8B93A7">
            Creation Date
          </Typography>

          <Typography variant="body2" color="#353A46">
            {formatDateFromTimestamp(currentUser?.createdAt, 'MMM. DD YYYY', ' ')}
          </Typography>
        </Box>

        <Divider className="text-[#D1D4DC] !my-4" />

        <Box display="flex" alignItems="center" gap="16px">
          <Box display="flex" flexDirection="column">
            <Typography variant="body1" color="#353A46">
              Deactivate account
            </Typography>

            <Typography variant="caption" color="#8B93A7">
              Use this option to permanently delete this user account and all associated data from our platform. Please
              note that this action is irreversible and cannot be undone.
            </Typography>
          </Box>

          <div
            className="flex whitespace-nowrap text-[#F53939] md:mt-0 mt-4 items-center space-x-2 cursor-pointer px-4 py-2 rounded-lg custom-hover-shadow"
            onClick={handleDeactivateClick}>
            <div>Deactivate Account</div>

            <IconChevronRight size={16} color="#F53939" />
          </div>
        </Box>
      </div>
    </div>
  )
}
