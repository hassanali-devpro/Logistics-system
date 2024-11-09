import { IconEdit } from '@tabler/icons-react'

import { useModalContext } from '../../shared/components'
import { FORM_MODAL } from '../../shared/constants'
import { getFormattedPhone } from '../../shared/helpers/authHelpers'
import { formatDateFromTimestamp } from '../../shared/helpers/unixTimestampHelpers'

import { GenderOptions } from './constants'
import { PersonalInformationForm } from './PersonalInformationForm'

import '../../shared/styles/HoverShadowStyles.css'

export const PersonalInformationCard = ({ currentUser, header }: { currentUser: any; header?: string }) => {
  const { handleOpen, handleClose } = useModalContext()

  const handleEditClick = () => {
    const { formattedPhone, countryCode } = getFormattedPhone(currentUser?.phone)

    handleOpen({
      modalType: FORM_MODAL,
      modalProps: {
        fullscreen: false,
        width: 'sm',
        form: (
          <PersonalInformationForm
            defaultCountry={countryCode || 'AU'}
            handleClose={handleClose}
            currentUser={currentUser}
            defaultValues={{
              firstName: currentUser?.givenName || '',
              lastName: currentUser?.lastName || '',
              phone: formattedPhone,
              email: currentUser?.email || '',
              dateOfBirth: formatDateFromTimestamp(currentUser?.DOB, 'YYYY-MM-DD', '-') || '',
              gender: currentUser?.gender || GenderOptions[0].value
            }}
          />
        ),
        title: 'Personal Information'
      }
    })
  }

  return (
    <div className="bg-white border border-[#D1D4DC] sm:px-6 px-4 py-6 rounded-xl">
      <div className="flex justify-between items-center mb-4 ">
        <div className="text-lg font-semibold">{header ?? 'Personal Information'}</div>
        <div
          className="flex items-center cursor-pointer rounded-lg px-4 py-2 custom-hover-shadow"
          onClick={handleEditClick}>
          <IconEdit className="mr-1" size={20} color="#4F5668" />
          Edit
        </div>
      </div>

      <div className="">
        <div className="grid grid-cols-2 gap-4 ">
          <div>
            <div className="text-[#8b93a7] text-xs font-normal leading-none">First Name</div>
            <div>{currentUser?.givenName}</div>
          </div>
          <div>
            <div className="text-[#8b93a7] text-xs font-normal leading-none">Last Name</div>
            <div>{currentUser?.lastName}</div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div>
            <div className="text-[#8b93a7] text-xs font-normal leading-none">Email Address</div>
            <div>{currentUser?.email}</div>
          </div>
          <div>
            <div className="text-[#8b93a7] text-xs font-normal leading-none">Phone Number</div>
            <div>
              {currentUser?.phone?.cc} {currentUser?.phone?.number}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <div className="text-[#8b93a7] text-xs font-normal leading-none">Date of Birth</div>
            <div>{currentUser?.DOB ? formatDateFromTimestamp(currentUser?.DOB, 'MMM. DD YYYY', ' ') : ''}</div>
          </div>
          <div>
            <div className="text-[#8b93a7] text-xs font-normal leading-none">Gender</div>
            <div>{currentUser?.gender}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
