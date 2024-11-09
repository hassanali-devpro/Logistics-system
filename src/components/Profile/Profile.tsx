import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { parsePhoneNumber } from 'react-phone-number-input'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Typography } from '@mui/material'
import { IconHelp, IconPlus } from '@tabler/icons-react'

import { LoadingButton, ProfileImageUpdate } from '../../shared/components'
import { getFormattedPhone } from '../../shared/helpers/authHelpers'
import { formatDateFromTimestamp } from '../../shared/helpers/unixTimestampHelpers'
import { useUpdateUserInfoMutation } from '../../wms-store/services/authService'
import LoginFooter from '../Login/LoginFooter'
import { GenderOptions } from '../UserProfile/constants'
import { EmergencyContactFields } from '../UserProfile/EmergencyContactFields'
import { PersonalInformationFields } from '../UserProfile/PersonalInformationFields'

import { ProfileEditSchema } from './constants'

import 'react-datepicker/dist/react-datepicker.css'

const Profile = () => {
  const navigate = useNavigate()
  const currentUser = useSelector((state: any) => state.auth.currentUser)
  const [showEmergencyContact, setShowEmergencyContact] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedImageFile, setSelectedImageFile] = useState<any | null>(null)
  const [profileError, setProfileError] = useState<string>('')
  const [updateUserInfo, { isLoading }] = useUpdateUserInfoMutation()
  const formatEmergencyContact = parsePhoneNumber(currentUser?.emergencyContact?.phoneNumber ?? '')
  const { formattedPhone, countryCode } = getFormattedPhone(currentUser?.phone ?? '')

  const {
    register,
    trigger,
    reset,
    setValue,
    watch,
    handleSubmit,
    formState: { isSubmitting, errors, isDirty }
  } = useForm({
    mode: 'all',
    resolver: yupResolver(ProfileEditSchema),
    defaultValues: {
      firstName: currentUser?.givenName ?? '',
      lastName: currentUser?.lastName ?? '',
      email: currentUser?.email ?? '',
      phone: formattedPhone ?? '',
      gender: currentUser?.gender ?? GenderOptions[0].value,
      dateOfBirth: formatDateFromTimestamp(currentUser?.DOB, 'YYYY-MM-DD', '-') || '',
      emergencyName: currentUser?.emergencyContact?.name ?? '',
      emergencyRelationship: currentUser?.emergencyContact?.relationship ?? '',
      emergencyPhone: formatEmergencyContact?.number
    },
    context: { showEmergencyContact }
  })

  const handleConfirm = (values: any) => {
    if (!selectedImage) {
      setProfileError('Please add a profile image')
      return
    }

    const phoneNumber = parsePhoneNumber(values.phone)

    const profileData = {
      givenName: values.firstName,
      lastName: values.lastName,
      password: '',
      phone: {
        cc: phoneNumber ? `+${phoneNumber.countryCallingCode}` : '',
        number: phoneNumber ? phoneNumber.nationalNumber : ''
      },
      deleteImage: false,
      gender: values.gender,
      DOB: `${Date.parse(values.dateOfBirth)}`
    }

    const emergencyContactData = {
      name: values.emergencyName,
      relationship: values.emergencyRelationship,
      phoneNumber: values.emergencyPhone
    }

    const payload = new FormData()
    payload.append('image', selectedImageFile)
    payload.append('givenName', values.firstName)
    payload.append('lastName', values.lastName)
    payload.append('phone', JSON.stringify(profileData.phone))
    payload.append('gender', values.gender)
    payload.append('DOB', `${Date.parse(values.dateOfBirth)}`)
    payload.append('emergencyContact', JSON.stringify(emergencyContactData))

    updateUserInfo({ payload })
      .then((res) => {
        if (res.data.status === 1) {
          toast.success('Profile updated successfully')
          navigate('/settings')
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const handleAddContact = () => {
    setShowEmergencyContact(true)
  }

  useEffect(() => {
    reset({
      firstName: currentUser?.givenName ?? '',
      lastName: currentUser?.lastName ?? '',
      email: currentUser?.email ?? '',
      phone: formattedPhone ?? '',
      gender: currentUser?.gender ?? GenderOptions[0].value,
      dateOfBirth: formatDateFromTimestamp(currentUser?.DOB, 'YYYY-MM-DD', '-') || '',
      emergencyName: currentUser?.emergencyContact?.name ?? '',
      emergencyRelationship: currentUser?.emergencyContact?.relationship ?? '',
      emergencyPhone: formatEmergencyContact?.number
    })
  }, [currentUser])

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex justify-between items-center w-full h-[60px] p-6 fixed top-0 bg-white z-20">
        <img src="/icons/profileLogo.svg" alt="logo" className="w-[155.713px] h-12" />

        <div className="items-center p-2 gap-2 w-[175px] h-[40px] rounded-[8px] md:flex hidden">
          <IconHelp color="#4F5668" size={24} />

          <div className="font-semibold text-[14px] leading-[20px] text-[#4F5668]">Need Assistance?</div>
        </div>
      </div>
      <div className="h-[60px]"></div>
      <div className="flex justify-center items-center w-full md:px-0 px-6 ">
        <form onSubmit={handleSubmit(handleConfirm)}>
          <div className="flex flex-col items-start md:w-[560px] w-full">
            <div className="flex flex-col items-start w-full mb-12">
              <div className="text-2xl font-bold text-[#1A1D23] my-4">Welcome {currentUser?.data?.name}</div>
              <div className="text-lg font-normal text-[#4F5668]">
                Before you dive into the full experience, please take a moment to complete your profile to make
                collaboration easy.
              </div>
            </div>
            <div className="flex flex-col items-start w-full gap-6">
              <ProfileImageUpdate
                selectedImage={selectedImage}
                setProfileError={setProfileError}
                setSelectedImage={setSelectedImage}
                setSelectedImageFile={setSelectedImageFile}
                overlayText={`${watch('firstName')} ${watch('lastName')}`}
              />

              <Typography mt="3px" mr="14px" color="#d32f2f" variant="caption">
                {profileError}
              </Typography>

              <PersonalInformationFields
                register={register}
                setValue={setValue}
                trigger={trigger}
                watch={watch}
                defaultCountry={countryCode || 'AU'}
                errors={errors}
                hideEmail
              />

              {!showEmergencyContact && (
                <div
                  className="mt-[-24px] flex flex-row gap-1 items-center p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={handleAddContact}>
                  <IconPlus className="w-5 h-5 text-[#1F69FF]" />

                  <div className="text-sm font-normal text-[#1F69FF]">Add Emergency Contact</div>
                </div>
              )}
              {showEmergencyContact && (
                <Box>
                  <Typography mt="-24px" mb="24px" color="#1A1D23" variant="h6" fontWeight={600}>
                    Emergency Contact
                  </Typography>

                  <EmergencyContactFields
                    register={register}
                    watch={watch}
                    trigger={trigger}
                    setValue={setValue}
                    errors={errors}
                    defaultCountry={formatEmergencyContact?.country || 'AU'}
                  />
                </Box>
              )}
            </div>
            <div className="flex flex-col mt-6 w-full">
              <div className="flex justify-end">
                <LoadingButton
                  isLoading={isSubmitting || isLoading}
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting || !isDirty || isLoading}>
                  Confirm
                </LoadingButton>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="mt-[80px]"></div>
      <div className="flex justify-center items-center w-full bg-white">
        <LoginFooter />
      </div>
    </div>
  )
}

export default Profile
