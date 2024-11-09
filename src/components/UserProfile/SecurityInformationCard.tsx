import { toast } from 'react-toastify'
import { Box } from '@mui/material'
import { IconChevronRight, IconShieldLock } from '@tabler/icons-react'

import { useModalContext } from '../../shared/components'
import { CONFIRMATION_MODAL, FORM_MODAL } from '../../shared/constants'
import { formatDateFromTimestamp } from '../../shared/helpers/unixTimestampHelpers'
import { useResetPasswordRequestMutation } from '../../wms-store/services/authService'

import { ChangePasswordForm } from './ChangePasswordForm'

import '../../shared/styles/HoverShadowStyles.css'

export const SecurityInformationCard = ({ currentUser, isReset }: { currentUser: any; isReset?: boolean }) => {
  const { handleOpen, handleClose } = useModalContext()
  const [resetPasswordRequest] = useResetPasswordRequestMutation()

  const handleChangePasswordClick = () => {
    handleOpen({
      modalType: FORM_MODAL,
      modalProps: {
        fullscreen: false,
        width: 'sm',
        form: <ChangePasswordForm currentUser={currentUser} handleClose={handleClose} />,
        title: 'Change Password'
      }
    })
  }

  const handlePasswordResetRequest = async () => {
    try {
      const response = await resetPasswordRequest({ email: currentUser?.email })
      if (response.data.status === 1) {
        toast.success('Email sent successfully')
      }
    } catch (error) {
      console.error('Email resend failed:', error)
    }
  }

  const handleResetPasswordClick = () => {
    handleOpen({
      modalType: CONFIRMATION_MODAL,
      modalProps: {
        onConfirmation: handlePasswordResetRequest,
        fullscreen: false,
        width: 'sm',
        title: 'Reset Password?',
        body: `Are you sure you want to reset password for ${currentUser?.givenName + ' ' + currentUser?.lastName}? A message will be sent to ${currentUser?.email} with instructions and a link to define a new password.`,
        handleClose: handleClose,
        okBtnText: 'Confirm and Send Message',
        alertIcon: (
          <Box p="8px" borderRadius="8px" bgcolor="#EBF1FF">
            <IconShieldLock size={24} color="#1F69FF" />
          </Box>
        )
      }
    })
  }

  return (
    <div className="bg-white border border-[#D1D4DC] sm:px-6 px-4 py-6 rounded-xl">
      <div className="flex flex-col justify-between items-start mb-4">
        <div className="text-lg font-semibold py-2">Security</div>

        <div className="md:flex justify-between w-full pt-4">
          <div className="flex flex-col ">
            <div className="text-[#353a46] text-base font-normal leading-normal">Password</div>

            <div className="text-[#8b93a7] text-xs font-normal leading-none">
              Last modification: {formatDateFromTimestamp(currentUser?.['lastModificationPwd'], 'MMM. DD YYYY', ' ')}
            </div>
          </div>

          <div
            className="flex md:mt-0 mt-4 items-center space-x-2 cursor-pointer px-4 py-2 rounded-lg custom-hover-shadow"
            onClick={isReset ? handleResetPasswordClick : handleChangePasswordClick}>
            <div>{isReset ? 'Reset Password' : 'Change Password'}</div>

            <IconChevronRight size={16} color="#4F5668" className="mt-1" />
          </div>
        </div>
      </div>
    </div>
  )
}
