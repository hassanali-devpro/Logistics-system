import { parsePhoneNumber } from 'react-phone-number-input'
import { IconEdit } from '@tabler/icons-react'

import { useModalContext } from '../../shared/components'
import { FORM_MODAL } from '../../shared/constants'

import { EmergencyContactForm } from './EmergencyContactForm'

import '../../shared/styles/HoverShadowStyles.css'

export const EmergencyContactCard = ({ currentUser }: { currentUser: any }) => {
  const { handleOpen, handleClose } = useModalContext()

  const handleEditEmergencyContactClick = () => {
    const formatEmergencyContact = parsePhoneNumber(currentUser?.emergencyContact?.phoneNumber ?? '')

    handleOpen({
      modalType: FORM_MODAL,
      modalProps: {
        fullscreen: false,
        width: 'sm',
        form: (
          <EmergencyContactForm
            defaultCountry={formatEmergencyContact?.country ?? 'AU'}
            handleClose={handleClose}
            currentUser={currentUser}
            defaultValues={{
              emergencyName: currentUser?.emergencyContact?.name,
              emergencyRelationship: currentUser?.emergencyContact?.relationship,
              emergencyPhone: formatEmergencyContact?.number
            }}
          />
        ),
        title: 'Emergency Contact',
        subtitle: 'In case of an emergency, whom to contact'
      }
    })
  }

  return (
    <div className="bg-white border border-[#D1D4DC] sm:px-6 px-4 py-6 rounded-xl">
      <div onClick={handleEditEmergencyContactClick} className="flex justify-between items-center mb-4">
        <div className="text-lg font-semibold">Emergency Contact</div>
        <div className="flex items-center cursor-pointer px-4 py-2 rounded-lg custom-hover-shadow">
          <IconEdit className="mr-1" size={20} color="#4F5668" />
          Edit
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid md:grid-cols-2 md:gap-4 gap-6">
          <div>
            <div className="text-[#8b93a7] text-xs font-normal leading-none">Full Name</div>
            <div>{currentUser?.emergencyContact?.name}</div>
          </div>
          <div>
            <div className="text-[#8b93a7] text-xs font-normal leading-none">Relationship</div>
            <div>{currentUser?.emergencyContact?.relationship}</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-[#8b93a7] text-xs font-normal leading-none">Emergency Phone Number</div>
            <div>{currentUser?.emergencyContact?.phoneNumber}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
